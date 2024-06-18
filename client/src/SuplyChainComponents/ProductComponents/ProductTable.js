
import { DataGrid } from '@mui/x-data-grid';
import Address from "../../Utilities/Address";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { Box } from '@mui/system';

function ProductTable({products,addSelect,selected, onSelectedChanges,supplyChainAddress}) {

    
    const columns = [
        {
          field: "id",
          headerName: "Producto",
          renderCell: (props) => (
            <MaterialLink
              component={Link}
              underline="hover"
              to={"/supplyChains/"+supplyChainAddress+"/products/"+props.value}
            >
              <Address address={props.value}></Address>
            </MaterialLink>
          ),
          flex: 1,
        },
        { field: "quantity", headerName: "Cantidad",flex:1 },
        { field: "certificate1", headerName: "Certificado en origen",flex: 1 },
        { field: "certificate2", headerName: "Certificado en destino" ,flex: 1},
        { field: "state", headerName: "Estado" ,flex: 1},
        { field: "timestamp", headerName: "Última modificación" ,flex: 1},
      ];
     
    return(
        <Box  style={{ height: 370 }}>
                  <Typography variant="h4" sx={{marginLeft:1}}>
        Productos
      </Typography>
        
    
        <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={addSelect}
        getRowId={(row) => row.id}
        onSelectionModelChange={(newSelected)=>{
          onSelectedChanges(supplyChainAddress,newSelected)}}
        disableSelectionOnClick={!addSelect}
          selectionModel={selected}
      /> 
      
      
      </Box>
    )
} export default ProductTable