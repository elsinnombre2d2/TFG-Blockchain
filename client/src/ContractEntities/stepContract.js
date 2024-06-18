import   StepChainJSON from "../build/contracts/StepChain.json"

class StepContract{
    
    constructor(web3Provider,stepChainAddress){
         this.contract= new web3Provider.eth.Contract(StepChainJSON.abi, stepChainAddress)
         this.web3Provider= web3Provider
    }

    async getLastStepInfo(productAddress){

        const lastStep= await this.contract.methods
        .lastSteps(productAddress)
        .call();
        const data= await this.contract.methods.steps(lastStep).call()
        data.timestamp= new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(data.timestamp * 1000)
        return data
    }

    async getProductSteps(productAddress){
        const loadStep= async(id)=>{
            
            const step= await this.contract.methods.steps(id).call()
            step.timestamp= new Intl.DateTimeFormat("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(step.timestamp * 1000)

              return step
          }

          const loadPrecedents= async(id)=>{
            return this.contract.methods.getprecedents(id).call()
            
          }

        let steps=[]
        
        let stepId;
        let precedentId = await this.contract.methods.lastSteps(productAddress).call();
        
        do{
          if(Array.isArray(precedentId))
            stepId=precedentId[0]
          else stepId=precedentId
            
            steps.push(await loadStep(stepId))
             precedentId= await loadPrecedents(stepId);
        } while(steps[steps.length-1].item===productAddress && precedentId[0])

        if(steps[steps.length-1].item!==productAddress){
            steps.pop(steps.length-1);
        }
        return steps.reverse();
    }

    async getPrecedentProducts(id){
      let stepId = [await this.contract.methods.lastSteps(id).call()];
        let step;
        do {
          step = await this.contract.methods.steps(stepId[0]).call();
          if (step.item === id)
            stepId = await this.contract.methods
              .getprecedents(stepId[0])
              .call();
        } while (step.item === id && stepId.length > 0);
        let precedents = [];
        stepId.forEach(async (id) => {
          precedents.push(this.contract.methods.steps(id).call());
        });
       return await Promise.all(precedents)
      
    }
} export default StepContract