import { useContext } from "react";
import { Context } from "../Utilities/Provider";
import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { Button, Card, Container, Row,Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { contractManagerInstance } from "../ContractEntities/contractManager";

function User(props) {
  const  user  = useLoaderData() ?? props.userInfo;
  const contextProvider = useContext(Context);
  const { userId } = useParams();
  return (
    <Container>
        {!user.init && <Alert className="m-3" key={"warning"} variant={"warning"}>¡Este podrías ser tú! {<Link to={"edit"}>¡Regístrate!</Link>}</Alert>}
    
    <Card className="rounded m-3 justify-content-center shadow">
      <Card.Header>
        <Card.Title>{user.name}</Card.Title>
      </Card.Header>
      <Card.Body>
      
        <Row>
            <Col md={2}>
            <b>Dirección de cuenta</b>
            </Col>
            <Col md={4}>
            {userId}
            </Col>
        </Row>
        
        <hr></hr>
        
        <Row>
            <Col md={2}>
            <b>Dirección</b>
            </Col>
            <Col md={4}>
            {user.location}
            </Col>
        </Row>
           
        
        <hr></hr>
        
        <Row>
            <Col md={2}>
            <b>Código Postal</b> 
            </Col>
            <Col md={4}>
            {user.postCode}
            </Col>
        </Row>
          
        
        <hr></hr>
        
        <Row>
            <Col md={2}>
            <b>Número de teléfono</b>
            </Col>
            <Col md={4}>
            {user.phoneNumber}
            </Col>
        </Row>
           
       
        <hr></hr>
        
        <Row>
            <Col md={2}>
            <b>Correo electrónico</b> 
            </Col>
            <Col md={4}>
            {user.email}
            </Col>
        </Row>
          
        
        {!user.init &&(<div><hr></hr>
        <Form  action="edit">
          <Button type="submit">Registrarse</Button>
        </Form></div>)}
        </Card.Body>
      
    </Card>
    </Container>
  );
}
export default User;

export const loader =
  async ({ params }) => {
    let user = await contractManagerInstance.getAppContract().getUser(params.userId);
    if(!user.init){
    user.name = "Einstein S.A.";
    user.location = "Calle de la Relatividad 14 3A"
    user.postCode = "42123"
    user.phoneNumber= "299792458"
    user.email ="test@test.com"
    }
    return  user ;
  };

