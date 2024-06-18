import { useContext,useState } from "react";
import { Context } from "../Utilities/Provider";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Alert, Badge, Button, Card, Col, Container, Row, Stack,CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import ClipboardButton from "../Utilities/ClipboardButton";
import { contractManagerInstance } from "../ContractEntities/contractManager";

function UserList(props){

    const {users,userRegistered}= useLoaderData()
    const outletContext= useOutletContext();
    //pone la sombra solo cuando estas encima de la card
    /*onMouseEnter={(e)=>{
                
                e.currentTarget.className= e.currentTarget.className + " shadow"
            }}
            onMouseLeave={(e)=>{
                e.currentTarget.className =e.currentTarget.className.replace(" shadow","")
                
            }}
    */
    return(
        <Container fluid>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css" integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossOrigin="anonymous" />
            
            {!userRegistered && <Alert className="m-3 shadow" key={"warning"} variant={"warning"}>¡Aquí podrías estar tú! {<Link to={"/users/create"}>¡Regístrate!</Link>}</Alert>}
            <Row as={CardGroup} xs={1} md={1} lg={2} xl={3} className="g-4">
            {users && users.map((user)=>{
            return (
                    <Col  key={user.account}>
                    <Card  className="shadow p-0 mt-3 ms-1 me-1 h-100" >
                        <Card.Header className="text-center">{user.name}</Card.Header>
                        <Card.Body>
                        
                        <Card.Text className="text-muted mb-0 mt-2"><i className="mdi mdi-ethereum font-size-15 align-middle pe-2 text-primary"></i> {user.account}</Card.Text>
                        <Card.Text className="text-muted mb-0 mt-2"><i className="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> {user.phoneNumber}</Card.Text>
                        <Card.Text className="text-muted mb-0 mt-2"><i className="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> {user.email}</Card.Text>
                        <Card.Text className="text-muted mb-0 mt-2"><i className="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> {user.location}</Card.Text>
                        <LinkContainer to={"/users/"+user.account} >
                        <Button className="mt-4" variant="primary">Ver Perfil</Button>    
                        </LinkContainer>
                        </Card.Body>
                        
                    </Card>
                    </Col>

            )})}
            </Row>
        </Container>
        
    )
/* Copia de las Cards cuadradas. Faltan arreglos

<Container>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css" integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />

            {!userRegistered && <Alert className="m-3 shadow" key={"warning"} variant={"warning"}>¡Aquí podrías estar tú! {<Link to={contextProvider.account+"/edit"}>¡Regístrate!</Link>}</Alert>}
    
         {users && users.map((user)=>{
            return (
                
                <div class="row m-3">
                <div class="col-xl-4 col-sm-8 shadow">
                    <div class="card">
                        <div class="card-header">
                        <h5 class="font-size-16 mb-1"><div class="text-dark">{user.name}</div></h5>
                        </div>
                        <div class="card-body">
                            
                            
                        <div class="d-flex align-items-center">
                        <div class="flex-1 ms-3">
                            <h5 class="font-size-16 mb-1 text-dark" >{user.name}</h5>
                            <Badge className=" bg-secondary font"> {user.account}</Badge>
                        </div>
                    </div>
                                
                            
                            <div class="mt-3 pt-1">
                            
                                <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> {user.phoneNumber}</p>
                                <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> {user.email}</p>
                                <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> {user.location}</p>
                                <p class="text-muted mb-0 mt-2"><i class="mdi mdi-ethereum font-size-15 align-middle pe-2 text-primary"></i> {user.account}</p>
                            </div>
                            <div class="d-flex gap-2 pt-4">
                                   <button type="button" class="btn btn-primary btn-sm w-50"> Ver perfil</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            )
         })}
        </Container>

*/
    /*  SIgual que la card de user
             <Card key={user.account} className={"m-3 shadow"} >
                <Card.Header className="text-center">{user.account}<ClipboardButton account={user.account}></ClipboardButton></Card.Header>
                <Card.Body>
                <Row>
            <Col md={2}>
            <b>Nombre</b>
            </Col>
            <Col md={4}>
            {user.name}
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
        <hr></hr>
        <Row  className="text-center">
            <Col  >
                <LinkContainer to={user.account} >
           
                <Button >Ver perfil</Button>
                </LinkContainer>
                </Col>
        </Row>
                </Card.Body>
            </Card>*/ 
} export default UserList;

export  const loader =(account)=>async ()=>{
    
    let users= await contractManagerInstance.getAppContract().getUsers()
    let userRegistered= !users.every((element)=>{
       return element.account.toLowerCase()!== account.toLowerCase()
    })
    return {users,userRegistered};
}