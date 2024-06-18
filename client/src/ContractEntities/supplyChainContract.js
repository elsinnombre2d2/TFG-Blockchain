import  SupplyChainContractJSON from "../build/contracts/SupplyChain.json"
import { contractManagerInstance } from "./contractManager"

class SupplyChainContract {
  constructor(web3Provider, contractAddress) {
    this.contract = new web3Provider.eth.Contract(
      SupplyChainContractJSON.abi,
      contractAddress
    );
    this.web3Provider = web3Provider;
    this.contractAddress = contractAddress;
  }

  async getSupplyChainInformation() {
    const data = {};
    data.contractAddress = this.contract._address;
    data.productName = await this.contract.methods.productName.call().call();
    data.buyer = await this.contract.methods.buyer.call().call();
    data.seller = await this.contract.methods.seller.call().call();
    data.carrier = await this.contract.methods.carrier.call().call();
    data.certifier = await this.contract.methods.certifier.call().call();
    // Obtener el precio en Wei desde el contrato y convertirlo a Ether
    const priceWei = await this.contract.methods.price().call();
    data.price = this.web3Provider.utils.fromWei(priceWei, 'ether');

    // Obtener el precio del transportista en Wei desde el contrato y convertirlo a Ether
    const carrierPriceWei = await this.contract.methods.carrierPrice().call();
    data.carrierPrice = this.web3Provider.utils.fromWei(carrierPriceWei, 'ether');
    data.duration = new Date(
      (await this.contract.methods.duration.call().call()) * 1000
    ).toLocaleDateString();
    data.precedents = await this.contract.methods.getPrecedents.call().call();

    return data;
  }

  async getSupplyChainSignatures() {
    const data = {};

    data.init = await this.contract.methods.init.call().call();
    data.sellerSigned = await this.contract.methods.sellerFirm.call().call();
    data.carrierSigned = await this.contract.methods.carrierFirm.call().call();
    data.certifierSigned = await this.contract.methods.certifierFirm
      .call()
      .call();
    return data;
  }

  async signSupplyChain(role, account) {
    if (role === "carrier") {
      await this.contract.methods["firmCarrier"]().send({
        from: account,
        gas: String(
          (await this.contract.methods["firmCarrier"]().estimateGas({
            from: account,
          })) * 2
        ),
      });
    }
    if (role === "certifier") {
      await this.contract.methods["firmCertifier"]().send({
        from: account,
        gas: String(
          (await this.contract.methods["firmCertifier"]().estimateGas({
            from: account,
          })) * 2
        ),
      });
    }
    if (role === "seller") {
      await this.contract.methods["firmSeller"]().send({
        from: account,
        gas: String(
          (await this.contract.methods["firmSeller"]().estimateGas({
            from: account,
          })) * 2
        ),
      });
    }
    return true;
  }

  async getFunds(account) {
    return this.web3Provider.utils.fromWei(
      await this.contract.methods.pendingWithdrawals(account).call()
    );
  }
  async addFunds(account, quantity) {
    await this.contract.methods
      .addFunds()
      .send({ from: account, value: this.web3Provider.utils.toWei(quantity) });
  }

  async withdrawFunds(account) {
    await this.contract.methods.withdraw().send({ from: account });
  }

  async addPrecedentSupplyChains(precedents, account) {
    await this.contract.methods.addPrecedents(precedents).send({
      from: account,
      gas: String(
        (await this.contract.methods
          .addPrecedents(precedents)
          .estimateGas({ from: account })) * 2
      ),
    });
  }

  async getPrecedentsInfo() {
    let precedents = await this.contract.methods.getPrecedents.call().call();
    const precedentsInfo = await Promise.all(
      precedents.map(async (address) => {
        const supplyContract = new SupplyChainContract(
          this.web3Provider,
          address
        );
        return await supplyContract.getSupplyChainInformation();
      })
    );
    return precedentsInfo;
  }

  async modifyPrice(account, newPrice) {
    console.log(newPrice);
    this.contract.methods.modifyPrice(String(newPrice * 1e18)).send({
      from: account,
      gas: String(
        (await this.contract.methods
          .modifyPrice(String(newPrice * 1e18))
          .estimateGas({ from: account })) * 2
      ),
    });
  }

  async getNewPrices() {
    const sellerNewPrice =
      parseInt(await this.contract.methods.newPriceArray(0).call()) / 1e18;
    const buyerNewPrice =
      parseInt(await this.contract.methods.newPriceArray(1).call()) / 1e18;

    return { sellerNewPrice, buyerNewPrice };
  }
  async createProduct(account, quantity, precedents) {
    console.log(this.contract);
    await this.contract.methods.createProduct(quantity, precedents).send({
      from: account,
      gas: String(
        (await this.contract.methods
          .createProduct(quantity, precedents)
          .estimateGas({ from: account })) * 2
      ),
    });
  }

  async getProductListInfo() {
    const rawProducts = await this.contract.methods.getProductList().call();
    const products = [];
    rawProducts.forEach((element) => {
      products.push(Object.assign({}, element));
    });

    for (let i = 0; i < products.length; i++) {
      let data = await contractManagerInstance
        .getStepContract()
        .getLastStepInfo(products[i].id);
      products[i].state = data.description;
      products[i].timestamp = data.timestamp;
    }
    return products;
  }

  async makeShipment(account, productId) {
    return await this.contract.methods.makeShipment(productId).send({
      from: account,
      gas: String(
        (await this.contract.methods.makeShipment(productId).estimateGas()) * 2
      ),
    });
  }
  async receiveShipment(account, productId) {
    return await this.contract.methods.receiveShipment(productId).send({
      from: account,
      gas: String(
        (await this.contract.methods.receiveShipment(productId).estimateGas()) * 2
      ),
    });
  }
  async certifyAtOrigin(account, productId) {
    return await this.contract.methods.certify1(productId).send({
      from: account,
      gas: String(
        (await this.contract.methods.certify1(productId).estimateGas()) * 2
      ),
    });
  }
  async certifyAtDestination(account, productId) {
    return await this.contract.methods.certify2(productId).send({
      from: account,
      gas: String(
        (await this.contract.methods.certify2(productId).estimateGas()) * 2
      ),
    });
  }
  async getPrecedentProductsInfo(){
    const precedents= await this.contract.methods.getPrecedents.call().call()
    const precedentsInfo=await Promise.all( precedents.map(async (element)=>{
      const precedentContract=new SupplyChainContract(this.web3Provider,element)
      
      return {
        supplyChainAddress: element,
        products: await precedentContract.getProductListInfo(),
      };
    }))
    return precedentsInfo
  }
  async getFinishedProductsInfo(){
    const productInfo= await this.getProductListInfo()
    const finishedProducts=productInfo.filter(element=>{
      return element.finished
    })
    return finishedProducts
  }
  async getFinishedPrecedentProducts(){
    const precedentProductsInfo=await this.getPrecedentProductsInfo()
    const finishedProducts = precedentProductsInfo.map(supplyChain=>{
      supplyChain.products= supplyChain.products.filter(products=>{
          return products.finished
      })
    return supplyChain
    })
    return finishedProducts
  }
} export default SupplyChainContract;