import { useContext,useState } from "react";
import { Context } from "../Utilities/Provider";
import { Button, Card, Col, Row ,Form} from "react-bootstrap";
import { Form as RouterForm, useOutletContext } from "react-router-dom";
import { contractManagerInstance } from "../ContractEntities/contractManager";

function CreateSupplyChain(props){
    const {account} = useOutletContext();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    return(
        <Form noValidate validated={validated} as={RouterForm} method="post" onSubmit={handleSubmit}>
      <Card className="rounded m-3 justify-content-center shadow">
        <Card.Header>
          <Card.Title>Nueva cadena de suministros</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={2} className="mb-2">
              <b>Nombre del producto</b>
            </Col>
            <Col ><Form.Control required type="string" placeholder="Leche" name="productName"/></Col>       
          </Row>

          <hr></hr>

          <Row>
            <Col md={2} className="mb-2">
              <b>Comprador</b>
            </Col>
            <Col ><Form.Control key={account} style={{backgroundColor:"#E9ECEF" }} required type="string" placeholder="0x0000000000000000000000000000000000000000" pattern="^(0x){1}[0-9a-fA-F]{40}$" name="buyer" defaultValue={account} readOnly /></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2} className="mb-2">
              <b>Vendedor</b>
            </Col>
            <Col ><Form.Control required type="string" placeholder="0x0000000000000000000000000000000000000000" pattern="^(0x){1}[0-9a-fA-F]{40}$" name="seller" /></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2} className="mb-2">
              <b>Transportista</b>
            </Col>
            <Col><Form.Control required type="string" placeholder="0x0000000000000000000000000000000000000000" pattern="^(0x){1}[0-9a-fA-F]{40}$" name="carrier" /></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2} className="mb-2">
              <b>Certificador</b>
            </Col>
            <Col><Form.Control required type="string" placeholder="0x0000000000000000000000000000000000000000" pattern="^(0x){1}[0-9a-fA-F]{40}$" name="certifier"/></Col>
          </Row>

          <hr></hr>
          <Row>
            <Col md={2} className="mb-2">
              <b>Precio</b>
            </Col>
            <Col ><Form.Control required type="string" placeholder="100"  onKeyDown={(event) => {
        if (!/[0-9]/.test(event.key) && (event.key !== "Backspace" ) && (event.key !== "Delete" ) && (event.key !== "Tab" )) {
          event.preventDefault();
        }
      }}  name="price"/></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2} className="mb-2">
              <b>Precio del transportista</b>
            </Col>
            <Col><Form.Control required type="string" placeholder="100"  onKeyDown={(event) => {
        if (!/[0-9]/.test(event.key) && (event.key !== "Backspace" ) && (event.key !== "Delete" ) && (event.key !== "Tab" )) {
          event.preventDefault();
        }
      }}  name="carrierPrice"/></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2} className="mb-2">
              <b>Fecha fin de contrato</b>
            </Col>
            <Col >
            <Form.Control required type="date"  name="duration" />
            </Col>
          </Row>

          <hr></hr>
          
            <Button type="submit" >Crear cadena</Button>
         
        </Card.Body>
      </Card>
      </Form>
    )
} export default CreateSupplyChain;

export const action =
  (account) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    await contractManagerInstance.getAppContract().createSupplyChain(account,data);
    return null;
  };