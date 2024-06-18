import { useContext, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Outlet, useLoaderData, useNavigation, useOutletContext } from "react-router-dom";
import { contractManagerInstance } from "../ContractEntities/contractManager";
import Address from "../Utilities/Address";
import { Context } from "../Utilities/Provider";
import Funds from "./Funds";
import PrecedentSupplyChains from "./PrecedentSupplyChains";
import ProductTable from "./ProductComponents/ProductTable";
import SignSupplyChain from "./SignSupplyChain";
import SupplyChainDetails from "./SupplyChainDetails";
import SupplyChainTable from "./SupplyChainTable";

function SupplyChainLayout(props) {
  const {account} = useOutletContext();
  const { supplyChainInfo, supplyChainSignatures,role ,supplyChainFunds,productList,precedentsInfo} = useLoaderData(); 

    //const precedents= ["0x651b28BE6E07C38F147927e7888214315B270448","0xaE6f632a92dF00eeb5BE51f33C46aE60Beb6EfA8"]
    //supplyChainInfo.precedents=precedents
  const navigation = useNavigation();


  return (
<>
{!supplyChainSignatures.init && (
          <Alert className="mt-3 shadow" key={"warning"} variant={"warning"}>
            Cadena pendiente de firmas
          </Alert>)}
          <Funds onlyView funds={supplyChainFunds} ></Funds>
<SupplyChainDetails supplyChainInfo={supplyChainInfo} precedentsInfo={precedentsInfo}></SupplyChainDetails>
<Outlet context={{account,role,submitting:navigation.state === 'submitting', funds: supplyChainFunds,precedentInfo:[supplyChainInfo],supplyChainInfo,supplyChainSignatures ,price:supplyChainInfo.price }}></Outlet>
        
</>


  );
}
export default SupplyChainLayout;

export const loader = account=> async ({ request, params }) => {
  contractManagerInstance.setSuplyChainContract(params.supplyChainAddress);
  const supplyChainInfo =  await contractManagerInstance
    .getSuplyChainContract()
    .getSupplyChainInformation();
  const supplyChainSignatures = await contractManagerInstance
    .getSuplyChainContract()
    .getSupplyChainSignatures();
    let precedentsInfo = await  contractManagerInstance
    .getSuplyChainContract().getPrecedentsInfo()  
    let role=[];
    if (!account) role.push("viewer")
    else {if (
        //provider.role === "seller" &&
        supplyChainInfo.seller &&
        account.toLowerCase() === supplyChainInfo.seller.toLowerCase()
      ) {
        role.push("seller");
      }  if (
        //provider.role === "carrier" &&
        supplyChainInfo.carrier &&
        account.toLowerCase() === supplyChainInfo.carrier.toLowerCase()
      ) {
        role.push("carrier");
      }  if (
        //provider.role === "buyer" &&
        supplyChainInfo.buyer &&
        account.toLowerCase() ===supplyChainInfo.buyer.toLowerCase()
      ) {
        role.push("buyer");
      }  if (
        //provider.role === "certifier" &&
        supplyChainInfo.certifier &&
        account.toLowerCase() === supplyChainInfo.certifier.toLowerCase()
      ) {
        role.push("certifier");
      } if(role.length===0) {
        role.push("viewer");
      }
    }
    const supplyChainFunds =await  contractManagerInstance.getSuplyChainContract().getFunds(account);
    
      let productListInfo= await  contractManagerInstance
      .getSuplyChainContract().getProductListInfo()
   // await Promise.all(supplyChainFunds,supplyChainInfo,supplyChainSignatures)
  return { supplyChainInfo, supplyChainSignatures ,role,supplyChainFunds,productListInfo,precedentsInfo };
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

    case "addFunds":
        await contractManagerInstance.getSuplyChainContract().addFunds(formEntries.account,formEntries.quantity)
      break;

    case "withdrawFunds":
        await contractManagerInstance.getSuplyChainContract().withdrawFunds(formEntries.account)
      break;
    default:
      break;
  }

  return true;
};