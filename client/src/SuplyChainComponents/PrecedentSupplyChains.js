import { Form, useLoaderData, useOutletContext, useRouteLoaderData } from "react-router-dom";
import SupplyChainTable from "./SupplyChainTable2";
import { DataGrid } from "@mui/x-data-grid";
import Address from "../Utilities/Address";
import { Button, Paper } from "@mui/material";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { contractManagerInstance } from "../ContractEntities/contractManager";
import { Box } from "@mui/system";

function PrecedentSupplyChains() {
  const columns = [
    {
      field: "contractAddress",
      headerName: "Cadena de suministro",
      renderCell: (props) => (
        <MaterialLink
          component={Link}
          underline="hover"
          to={"/supplyChains/" + props.value}
        >
          <Address address={props.value}></Address>
        </MaterialLink>
      ),
      width: 200,
    },
    { field: "productName", headerName: "Producto" },
    {
      field: "buyer",
      headerName: "Comprador",
      renderCell: (props) => (
        <Address address={props.value} replaceByName></Address>
      ),
      width: 200,
    },
    {
      field: "seller",
      headerName: "Vendedor",
      renderCell: (props) => (
        <Address address={props.value} replaceByName></Address>
      ),
      width: 200,
    },
    {
      field: "carrier",
      headerName: "Transportista",
      renderCell: (props) => (
        <Address address={props.value} replaceByName></Address>
      ),
      width: 200,
    },
    {
      field: "certifier",
      headerName: "Certificador",
      renderCell: (props) => (
        <Address address={props.value} replaceByName></Address>
      ),
      width: 200,
    },
    { field: "price", headerName: "Precio(SC)" },
    { field: "carrierPrice", headerName: "Precio transporte" },
    { field: "duration", headerName: "Fin contrato" },
  ];

  const { availablePrecedents } = useLoaderData();
  const {supplyChainInfo} = useRouteLoaderData("supplyChainLayout")
  
  const [selectedChains, setSelectedChains] = useState(supplyChainInfo.precedents);

  const handleSelectedChanges = (newSelected) =>{
    setSelectedChains(newSelected)
  }
  return (
    <Paper elevation={4}>
    <SupplyChainTable
      supplyChains={availablePrecedents}
      addSelect
      selected={selectedChains}
      onSelectedChanges={handleSelectedChanges}
    />
    
    <Form method="post">
        <input type={"hidden"} name="precedents" value={selectedChains}></input>
        <Button sx={ {m: 1} } variant="contained" type="submit">Modificar</Button>
    </Form>
    
    </Paper>
    
  );
}
export default PrecedentSupplyChains;

export const loader =
  (account) =>
  async ({ request, params }) => {
    let supplyChains = await contractManagerInstance
      .getAppContract()
      .getSupplyChains();

    const availablePrecedents = supplyChains.filter((element) => {
      return element.buyer.toLowerCase() === account.toLowerCase();
    });
    
    return { availablePrecedents };
  };

  export const action =(account)=> async ({ request, params }) => {
    const form = await request.formData();
    const formEntries = Object.fromEntries(form);
    console.log(formEntries.precedents)
    contractManagerInstance.getSuplyChainContract().addPrecedentSupplyChains(formEntries.precedents.split(","),account)
    return true
  }
