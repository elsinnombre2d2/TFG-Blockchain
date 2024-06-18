pragma solidity >=0.8.0 <0.9.0;

import "./StepChain.sol";

contract SupplyChain {
    string public productName;
    address public owner;
    address public seller;
    address public buyer;
    address public carrier;
    address public certifier;
    uint256 public funds;
    uint256 public duration;
    uint256 public price;
    uint256 public carrierPrice;
    mapping(address => uint256) public pendingWithdrawals;

    address[] public precedentSupplyChains;



    //Sign cnotract variables
    bool public init= false;
    bool public sellerFirm = false;
    bool public carrierFirm = false;
    bool public certifierFirm = false;


    StepChain public stepChain;
    //uint256 public minQuantity;
    //uint256 public maxQuantity;
    struct Product {
        uint256 quantity;
        address id;
        bool coolChain;
        bool certificate1;
        bool certificate2;
        bool finished;
    }

    uint256 public productCount;
    Product[] public productList;

    mapping(address => uint256) public productMapping;

    constructor(
        string memory _productName,
        address _seller,
        address _buyer,
        address _carrier,
        address _certifier,
        uint256 _price,
        uint256 _carrierPrice,
        uint256 _duration,
        address _stepChain
    ) {
        productName=_productName;
        seller = _seller;
        buyer = _buyer;
        carrier = _carrier;
        productCount = 0;
        certifier = _certifier;
        price = _price;
        carrierPrice = _carrierPrice;
        duration = _duration;
        owner = msg.sender;
        stepChain=StepChain(_stepChain);
    }

    function getProductList() external view returns (Product[] memory) {
        return productList;
    }
    function getPrecedents() external view returns (address[] memory) {
        return precedentSupplyChains;
    }

    function getProduct(address id) public view returns (Product memory) {
        return productList[productMapping[id]];
    }

    function createProduct(uint256 _quantity,address[] memory _precedentProducts) public returns (address) {
        require(_precedentProducts.length>=precedentSupplyChains.length,"length incorrect");
        require(init==true,"contract not initialized");
        require(msg.sender==seller,"You are not the seller");
        address productId = address(
            bytes20(keccak256(abi.encodePacked(msg.sender, block.timestamp)))
        );
        Product memory product = Product(
            _quantity,
            productId,
            true,
            false,
            false,
            false
        );

        //Comprueba que hay minimo un producto precedente por cadena de suministro precedente
        bool[] memory hasPrecedent= new bool[](precedentSupplyChains.length);
        uint256[] memory stepPrecedents = new uint256[](_precedentProducts.length);
        for (uint256 i = 0; i < _precedentProducts.length; i++) {
            for(uint256 j =0; j< precedentSupplyChains.length;j++)
                if(isValidPrecedentProduct(_precedentProducts[i])==precedentSupplyChains[j])
                    hasPrecedent[j]=true;
            //require(isValidPrecedentProduct(_precedentProducts[i])!=address(0),"Product not valid");
            stepPrecedents[i]=stepChain.lastSteps(_precedentProducts[i]);
        }
        for(uint256 j =0; j< precedentSupplyChains.length;j++){
            require(hasPrecedent[j],"More precedent products required");
        }

        productList.push(product);
        productMapping[productId] = productCount;
        productCount++;

        stepChain.newStep(productId, stepPrecedents, msg.sender, "Creation");
        return productId;
    }

    function makeShipment(address _productId) public {
        uint256[] memory _precedentProducts = new uint256[](1);
        _precedentProducts[0] = stepChain.lastSteps(_productId);
        stepChain.newStep(_productId, _precedentProducts, msg.sender, "Shipment");
    }

    function receiveShipment(address _productId) public {
        uint256[] memory _precedentProducts = new uint256[](1);
        _precedentProducts[0] = stepChain.lastSteps(_productId);
        stepChain.newStep(_productId, _precedentProducts, msg.sender, "Delivery");
        pendingWithdrawals[carrier] += carrierPrice;
        pendingWithdrawals[buyer]-=carrierPrice;
        uint256 _quantity = productList[productMapping[_productId]].quantity;
        pendingWithdrawals[seller] += (_quantity * price);
        pendingWithdrawals[buyer] -=(_quantity*price);
        productList[productMapping[_productId]].finished = true;
    }

    function certify1(address _productId) public {
        uint256[] memory _precedentProducts = new uint256[](1);
        _precedentProducts[0] = stepChain.lastSteps(_productId);
        productList[productMapping[_productId]].certificate1 = true;
        stepChain.newStep(_productId, _precedentProducts, msg.sender, "Certified 1");
    }

    function certify2(address _productId) public {
        uint256[] memory _precedentProducts = new uint256[](1);
        _precedentProducts[0] = stepChain.lastSteps(_productId);
        productList[productMapping[_productId]].certificate2 = true;
        stepChain.newStep(_productId, _precedentProducts, msg.sender, "Certified 2");
    }

    function breakCoolChain(address _productId) public {
        uint256[] memory _precedentProducts = new uint256[](1);
        _precedentProducts[0] = stepChain.lastSteps(_productId);
        productList[productMapping[_productId]].coolChain = false;
        stepChain.newStep(
            _productId,
            _precedentProducts,
            msg.sender,
            "Cool chain broken"
        );
    }

    function withdraw() public {
        uint256 amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function addFunds() public payable {
        require(msg.sender==buyer,"Only buyer can add funds.");
        pendingWithdrawals[buyer]+=msg.value;
    }

//Change price functions
uint256[] public newPriceArray = [0,0];
function modifyPrice(uint256 newPrice) public {
    require(msg.sender==seller || msg.sender ==buyer,"Only seller or buyer can modify price." );

    if(msg.sender==seller){
        if(newPriceArray[1]!=0 && newPriceArray[1]==newPrice){
            price=newPrice;
            newPriceArray[0]=0;
            newPriceArray[1]=0;
        }
        else{
            newPriceArray[0]=newPrice;
            newPriceArray[1]=0;
        }
    }
    else if(msg.sender==buyer){
        if(newPriceArray[0]!=0 && newPriceArray[0]==newPrice){
            price=newPrice;
            newPriceArray[0]=0;
            newPriceArray[1]=0;
        }
        else{
            newPriceArray[1]=newPrice;
            newPriceArray[0]=0;
        }
    }

}

    function getBalance() public view returns (uint256){

        if (msg.sender==buyer || msg.sender == owner)
            return address(this).balance;
        else
            return pendingWithdrawals[msg.sender];

    }

//Firms functions
function firmSeller() public {
    require(msg.sender==seller);
    sellerFirm=true;
    initContract();
}

function firmCarrier() public {
    require(msg.sender==carrier);
    carrierFirm=true;
    initContract();
}
function firmCertifier() public {
    require(msg.sender==certifier);
    certifierFirm=true;
    initContract();
}

function initContract() private{
    if(sellerFirm && carrierFirm && certifierFirm)
        init=true;
}

function addPrecedents(address[] memory _precedentProducts) public{
    require(msg.sender==seller);
    precedentSupplyChains= _precedentProducts;
}

function isValidPrecedentProduct(address productId) private view returns(address supplyChainParent){
    supplyChainParent=address(0);
for(uint i = 0; i<precedentSupplyChains.length; i++){
 SupplyChain supplyChain = SupplyChain(precedentSupplyChains[i]);
 if(supplyChain.productCount()>0 && supplyChain.getProduct(productId).id == productId && supplyChain.getProduct(productId).finished){
    supplyChainParent=precedentSupplyChains[i];
    break;
 }
    
}

}
}
