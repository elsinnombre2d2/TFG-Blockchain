const App = artifacts.require("App");
const StepChain = artifacts.require("StepChain");
const SupplyChain = artifacts.require("SupplyChain");
module.exports = function (deployer) {
  deployer.deploy(App);
  //deployer.deploy(SupplyChain,"0xe55E3423c4cE1Cff2CC65a34184e4f60dCF8C7A6","0x8db908137E701D4E44A058Fc7b8166550dF33765","0xC6480323e8d0355f9d6c6278d4deE7BB8E0e5EA5","0xa9fE3643BDc8223D97a0EabE26491C5BBbdB1813",1,10,10,"0xe55E3423c4cE1Cff2CC65a34184e4f60dCF8C7A6");

};
