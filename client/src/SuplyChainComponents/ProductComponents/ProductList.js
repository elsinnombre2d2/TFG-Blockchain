import { Paper } from "@mui/material"
import { useParams, useRouteLoaderData } from "react-router-dom"
import ProductTable from "./ProductTable"

function ProductList(){
    const {productListInfo} = useRouteLoaderData("supplyChainLayout")
    const {supplyChainAddress}=useParams() 
    return (
        <Paper elevation={4} sx={{marginTop:2}}>        
        <ProductTable products={productListInfo} supplyChainAddress={supplyChainAddress}></ProductTable>
        </Paper>
    )
} export default ProductList