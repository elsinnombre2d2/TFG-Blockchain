pragma solidity >=0.8.0 <0.9.0;

import "./SupplyChain.sol";
import "./StepChain.sol";

contract App {
    address[] public supplyChainList;
    StepChain public stepChain = new StepChain();
    mapping(address => User) public userList;
    address[] public userAddresses;
    struct User {
        string name;
        string location;
        uint256 postCode;
        uint256 phoneNumber;
        string email;
        uint256 createdAt;

        bool init;
    }

    constructor() {}

    function createSupplyChain(
        string memory _productName,
        address _seller,
        address _buyer,
        address _carrier,
        address _certifier,
        uint256 _price,
        uint256 _carrierPrice,
        uint256 _duration
    ) public {
        supplyChainList.push(
            address(
                new SupplyChain(
                    _productName,
                    _seller,
                    _buyer,
                    _carrier,
                    _certifier,
                    _price,
                    _carrierPrice,
                    _duration,
                    address(stepChain)
                )
            )
        );
    }

    function getSupplyChainList() external view returns (address[] memory) {
        return supplyChainList;
    }

    function newUser(
        string memory _name,
        string memory _location,
        uint256 _postCode,
        uint256 _phoneNumber,
        string memory _email
    ) public {

        require(userList[msg.sender].init==false,"User already exists for the related account");
        User memory user =  User(_name,_location,_postCode,_phoneNumber,_email,block.timestamp,true); 
        userList[msg.sender]= user;
        userAddresses.push(msg.sender);
    }

    function getUsers() public view returns(User[] memory,address[] memory){
        User[] memory users = new User[](userAddresses.length);
       for(uint256 i=0; i<userAddresses.length;i++){
            users[i]=userList[userAddresses[i]];
       }
       return (users,userAddresses);
    }
}
