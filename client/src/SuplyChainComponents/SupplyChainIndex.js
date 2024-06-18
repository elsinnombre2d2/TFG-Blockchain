import { Grid, Paper, Typography } from "@mui/material";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { contractManagerInstance } from "../ContractEntities/contractManager";
import Funds from "./Funds";
import ProductTable from "./ProductComponents/ProductTable";
import SignSupplyChain from "./SignSupplyChain"
import SupplyChainDetails from "./SupplyChainDetails"

function SupplyChainIndex(){
    const {precedentsInfo} = useLoaderData()
    const {productListInfo} = useRouteLoaderData("supplyChainLayout")
    return(
        <>
        <Grid container spacing={2}>
            <Grid item >
            <SignSupplyChain></SignSupplyChain>
            
            </Grid>
            <Grid item >
            <Funds onlyView></Funds>
            </Grid>
        
        </Grid>
        <SupplyChainDetails precedentsInfo={precedentsInfo}></SupplyChainDetails>

         {/*<Paper elevation={4} sx={{marginTop:2}}>        
       <ProductTable products={productListInfo}></ProductTable>
        </Paper>
        */}
        </>
    )
}export default SupplyChainIndex

export const loader =
  (account) =>
  async ({ request, params }) => {
    let precedentsInfo = await  contractManagerInstance
      .getSuplyChainContract().getPrecedentsInfo()

   
    return { precedentsInfo };
  };

  export const action = async ({ request, params }) => {
    const form = await request.formData();
    const formEntries = Object.fromEntries(form);
    const action = formEntries.intent;
    switch (action) {
      case "sign":
        const roleArray = formEntries.role.split(",");
  
        const promises = await Promise.all(
          roleArray.map(async (role) => {
            return contractManagerInstance
              .getSuplyChainContract()
              .signSupplyChain(role, formEntries.account);
          })
        );
        //const a=await contractManagerInstance.getSuplyChainContract().signSupplyChain(formEntries.role,formEntries.account)
        break;
         default:
          break;
        }
        return true
      }