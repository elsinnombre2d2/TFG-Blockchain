import   AppContractJSON from "../build/contracts/App.json"
import SupplyChainContract from "../ContractEntities/supplyChainContract";


class AppContract{
    
   constructor(web3Provider){
        this.contract= new web3Provider.eth.Contract(AppContractJSON.abi, AppContractJSON.networks[876].address)
        this.web3Provider= web3Provider
   }
    async getUsers (){
       let tuple= await this.contract.methods.getUsers().call()
       let users=[];
       tuple[0].forEach((element,index) => {
        users.push(Object.assign({}, element));
        users[index].account=tuple[1][index]
       });
       return users
    }
    async getUser(id){
        let user= await this.contract.methods.userList(id).call();
        user.account=id
         return user;
        ;
    }

    async createUser(account,data){
        this.contract.methods.newUser(data.name,data.location,data.postCode,data.phoneNumber,data.email).send({
            from: account,
            gas: String(await this.contract.methods.newUser(data.name,data.location,data.postCode,data.phoneNumber,data.email).estimateGas({from:account})*2)
        })
    }

    async getSupplyChains(){
        const supplyChainList =await this.contract.methods.getSupplyChainList().call();

        const supplyChainListInfo= await Promise.all(supplyChainList.map(async contractAddress=>{
            const supplyContract = new SupplyChainContract(this.web3Provider,contractAddress)
            return supplyContract.getSupplyChainInformation();
            }))
        return (supplyChainListInfo)
    }

    async createSupplyChain(creator,data){
        
        data.duration=new Date(data.duration).getTime()/1000;

        await this.contract.methods.createSupplyChain(data.productName,data.seller,data.buyer,data.carrier,data.certifier,this.web3Provider.utils.toWei(data.price,'ether'),this.web3Provider.utils.toWei(data.carrierPrice,'ether'),data.duration).send({
            from: creator,
            gas: String(await this.contract.methods.createSupplyChain(data.productName,data.seller,data.buyer,data.carrier,data.certifier,this.web3Provider.utils.toWei(data.price,'ether'),this.web3Provider.utils.toWei(data.carrierPrice,'ether'),data.duration).estimateGas()*2)
        })
    }

    async getStepChain(){
        return await this.contract.methods.stepChain.call().call()
    }
} export default AppContract;

