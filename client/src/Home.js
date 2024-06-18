import { Button, Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Home(props) {
  return (
    <Row className="justify-content-md-center mt-5">
      <Col  md={{ span: 4, offset: 0 }}>
        <Card
          className="text-center"
          style={{ width: "100%" }}
        >
          <Card.Img variant="top" src="home-user.jpg" />
          <Card.Body>
            <LinkContainer to={"users/list"}>
              <Button>Usuarios registrados</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={{}} md={{ span: 4, offset: 2 }}>
        <Card
          className="text-center"
          style={{ width: "100%" }}
        >
          <Card.Img variant="top" src="supplyChain-home2.jpg" />

          <Card.Body>
            <LinkContainer to={"supplyChains/list"}>
              <Button>Cadenas de suministros</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>
  );
}
export default Home;
