import { Paper } from "@mui/material";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLoaderData } from "react-router-dom";
import { contractInstance } from "../ContractEntities/appContract";
import { contractManagerInstance } from "../ContractEntities/contractManager";

import Address from "../Utilities/Address";
import SupplyChainTable from "./SupplyChainTable2";

function SupplyChainList(props) {
  const { supplyChains } = useLoaderData();
  return (
    <Paper elevation={4}>
    <SupplyChainTable supplyChains={supplyChains}/>
    </Paper>
  );
}
export default SupplyChainList;

export const loader = async () => {
  let supplyChains = await contractManagerInstance.getAppContract().getSupplyChains()
  return { supplyChains };
};
