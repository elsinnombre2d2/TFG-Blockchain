import { useContext,useState } from "react";
import { Context } from "../Utilities/Provider";
import { Form as RouterForm, redirect, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { Alert, Button, Card, Col, Container, Row,Form } from "react-bootstrap";
import { contractInstance } from "../ContractEntities/appContract";
import { contractManagerInstance } from "../ContractEntities/contractManager";

function EditUser(props) {
  const { user } = useLoaderData();
  const contextProvider = useContext(Context);
  const { account } = useOutletContext();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
        <Form noValidate validated={validated} as={RouterForm} method="post" onSubmit={handleSubmit}>
      <Card className="rounded m-3 justify-content-center shadow">

        <Card.Body>
        <Row>
            <Col md={2}>
              <b>Dirección de cuenta</b>
            </Col>
            <Col md={4}><Form.Control readOnly required type="string" name="account" value={account}/></Col>       
          </Row>
          <hr></hr>
          <Row>
            <Col md={2}>
              <b>Nombre</b>
            </Col>
            <Col md={4}><Form.Control required type="string" placeholder="Einstein S.A." name="name"/></Col>       
          </Row>

          <hr></hr>

          <Row>
            <Col md={2}>
              <b>Dirección</b>
            </Col>
            <Col md={4}><Form.Control required type="string" placeholder="Einstein S.A." name="location"/></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2}>
              <b>Código Postal</b>
            </Col>
            <Col md={4}><Form.Control required type="string" placeholder="11111" maxLength={5} minLength={5} onKeyDown={(event) => {
        if (!/[0-9]/.test(event.key) && (event.key !== "Backspace" ) && (event.key !== "Delete" ) && (event.key !== "Tab" )) {
          event.preventDefault();
        }
      }}  name="postCode"/></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2}>
              <b>Número de teléfono</b>
            </Col>
            <Col md={4}><Form.Control required type="string" placeholder="111111111" minLength={9} onKeyDown={(event) => {
        if (!/[0-9]/.test(event.key) && (event.key !== "Backspace" ) && (event.key !== "Delete" ) && (event.key !== "Tab" )) {
          event.preventDefault();
        }
      }} name="phoneNumber"/></Col>
          </Row>

          <hr></hr>

          <Row>
            <Col md={2}>
              <b>Correo electrónico</b>
            </Col>
            <Col md={4}>
            <Form.Control required type="email" placeholder="einstein@gmail.com" name="email" />
            </Col>
          </Row>

          <hr></hr>
          
            <Button type="submit" >Registrarse</Button>
         
        </Card.Body>
      </Card>
      </Form>
    </Container>
  );
}
export default EditUser;

export const loader =
  async ({ params }) => {
    let user ={}// await contextProvider.appContract.getUser(params.userId);
    return { user };
  };

export const action =
  (account) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    await contractManagerInstance.getAppContract().createUser(account ,data);
    return null;
  };
