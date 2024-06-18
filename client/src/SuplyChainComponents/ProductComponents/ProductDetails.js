import { Card, CardGroup, Col, Row } from "react-bootstrap"
import Address from "../../Utilities/Address"
import QRCode from "react-qr-code";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

function ProductDetails({supplyChainAddress,productInfo}){
    return(


<Box>
<Grid container spacing={2}>
<Grid item >
<Card className="rounded justify-content-center shadow">
        <Card.Header>
          <Card.Title>{productInfo.id}</Card.Title>
        </Card.Header>
        <Card.Body className="">
            
          <Row>
          <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Cantidad</b>
                </Col>
                <Col className="align-self-end">{productInfo.quantity}</Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row >
                <Col className="align-self-end">
                  <b>Estado</b>
                </Col>
                <Col className="align-self-end">{productInfo.state}</Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row >
                <Col className="align-self-end">
                  <b>Última modificación</b>
                </Col>
                <Col className="align-self-end">{productInfo.timestamp}</Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Certificado en origen</b>
                </Col>
                <Col className="align-self-end">{productInfo.certificate1 ? "Si" : "No"}</Col>
              </Row>
              <hr></hr>
            </Col>

            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Certificado en destino</b>
                </Col>
                <Col className="align-self-end">{productInfo.certificate2 ? "Si" : "No"}</Col>
              </Row>
              <hr></hr>
            </Col>


            
          </Row>
         
        </Card.Body>
      </Card>

</Grid>
<Grid item >
<Card  className="rounded  justify-content-center shadow text-center" >
        <Card.Header> Producto QR</Card.Header>
        <Card.Body><QRCode size={178} value={"http://localhost:3000/supplyChains/"+supplyChainAddress+"/products/"+productInfo.id} /></Card.Body>
      </Card>
</Grid>

</Grid>

</Box>

    )
} export default ProductDetails