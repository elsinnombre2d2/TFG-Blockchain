import { Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";

import { Button, Card, Col, Row ,Form} from "react-bootstrap";
import { Form as RouterForm, useLoaderData } from "react-router-dom";
import { contractManagerInstance } from "../../ContractEntities/contractManager";
import ProductTable from "./ProductTable";

function CreateProduct(){

    const [validated, setValidated] = useState(false);
    
    const {precedentProducts} = useLoaderData()
    const [selectedProducts, setSelectedProducts] = useState({});


    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
     form.elements.products.value=JSON.stringify(selectedProducts)
      setValidated(true);
    };

    const handleSelectedChanges = (index,newSelected) =>{
      let auxProducts= selectedProducts
        auxProducts[index]=newSelected  
      setSelectedProducts(auxProducts)
    }
return (
  <Form
    noValidate
    validated={validated}
    as={RouterForm}
    method="post"
    onSubmit={handleSubmit}
  >
    <Card className="rounded m-3 justify-content-center shadow">
      <Card.Header>
        <Card.Title>Nuevo Producto</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={2} className="mb-2">
            <b>Cantidad</b>
          </Col>
          <Col>
            <Form.Control
              required
              type="string"
              placeholder="100"
              onKeyDown={(event) => {
                if (
                  !/[0-9]/.test(event.key) &&
                  event.key !== "Backspace" &&
                  event.key !== "Delete" &&
                  event.key !== "Tab"
                ) {
                  event.preventDefault();
                }
              }}
              name="quantity"
            />
          </Col>
        </Row>
        <Stack spacing={7} marginTop={5}>
        {precedentProducts.map(supplyChain=>{
         
         return <Box key={supplyChain.supplyChainAddress}>
               <Typography>{supplyChain.supplyChainAddress}</Typography>
            <ProductTable products={supplyChain.products} addSelect onSelectedChanges={handleSelectedChanges} supplyChainAddress={supplyChain.supplyChainAddress} selected={selectedProducts[supplyChain.supplyChainAddress]}></ProductTable>
            </Box>
        })

        }
        <Button type="submit" >Crear Producto</Button>
        </Stack>
        <input type={"hidden"} name="products" value={JSON.stringify(selectedProducts)}></input>
        
      </Card.Body>
    </Card>

  </Form>
);

} export default CreateProduct

export const loader = async ({params})=>{
  const precedentProducts= await contractManagerInstance.getSuplyChainContract().getFinishedPrecedentProducts()
  return {precedentProducts}
}

export const action =
  (account) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    let groupedProducts=[]
      for (const [key, value] of Object.entries(JSON.parse(data.products))) {
        groupedProducts=groupedProducts.concat(value)
      }
    await contractManagerInstance.getSuplyChainContract().createProduct(account,data.quantity,groupedProducts);
    return null;
  };