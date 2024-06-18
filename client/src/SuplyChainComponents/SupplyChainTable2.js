
import { DataGrid } from '@mui/x-data-grid';
import Address from "../Utilities/Address";
import { Paper } from "@mui/material";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { Box } from '@mui/system';

function SupplyChainTable({supplyChains,addSelect,selected, onSelectedChanges}) {

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
          flex: 1,
        },
        { field: "productName", headerName: "Producto" },
        {
          field: "buyer",
          headerName: "Comprador",
          renderCell: (props) => (
            <Address address={props.value} replaceByName></Address>
          ),
          flex: 1,
        },
        {
          field: "seller",
          headerName: "Vendedor",
          renderCell: (props) => (
            <Address address={props.value} replaceByName></Address>
          ),
          flex: 1,
        },
        {
          field: "carrier",
          headerName: "Transportista",
          renderCell: (props) => (
            <Address address={props.value} replaceByName></Address>
          ),
          flex: 1,
        },
        {
          field: "certifier",
          headerName: "Certificador",
          renderCell: (props) => (
            <Address address={props.value} replaceByName></Address>
          ),
          flex: 1,
        },
        { field: "price", headerName: "Precio(SC)",flex: 0.5 },
        { field: "carrierPrice", headerName: "Precio transporte" ,flex: 0.75},
        { field: "duration", headerName: "Fin contrato" ,flex: 0.5},
      ];
     
    return(
        <Box mt={2} style={{ height: 370 }}>

        
    
        <DataGrid
        rows={supplyChains}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={addSelect}
        getRowId={(row) => row.contractAddress}
        onSelectionModelChange={onSelectedChanges}
        disableSelectionOnClick={!addSelect}
          selectionModel={selected}
      /> 
      
      
      </Box>
    )
} export default SupplyChainTable