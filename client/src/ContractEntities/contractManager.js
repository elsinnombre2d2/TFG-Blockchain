import AppContract from "./appContract";
import StepContract from "./stepContract";
import SupplyChainContract from "./supplyChainContract";


class ContractManager{
    appContract=null
    web3Provider=null
    supplyChainContract=null

    setWeb3Provider(provider){
        this.web3Provider=provider;
    }

    setAppContract() {   
        this.appContract= new AppContract(this.web3Provider)
    }

    async setStepContract(){
        this.stepContract= new StepContract(this.web3Provider,await this.appContract.getStepChain())
    }

    setSuplyChainContract (supplyChainAddress){
        this.supplyChainContract= new SupplyChainContract(this.web3Provider,supplyChainAddress)
    }

    getWeb3Provider(provider){
        return this.web3Provider
    }

    getAppContract = ()=>{
        return this.appContract
    }

    getStepContract= () =>{
        return this.stepContract;
    }
    getSuplyChainContract = (supplyChainAddress)=>{
        return this.supplyChainContract
    }

} export const contractManagerInstance = new ContractManager();