import { faMehRollingEyes } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { Form, useOutletContext } from "react-router-dom";

function SignSupplyChain() {

const { supplyChainSignatures, role, account, submitting } = useOutletContext()

let newRoles=role.filter((element)=>{
    
    return !supplyChainSignatures[element+"Signed"] && element!=="buyer"
})
let showSignButton = newRoles.length>0
  return (
    <>
      {!supplyChainSignatures.init && (
        <>

          <Card className="rounded mt-3 justify-content-center shadow">
            <Card.Body>
              <Row>
                <Col md={6} className="align-self-end">
                  <Row>
                    <Col className="align-self-end">
                      <b>Firmado por vendedor</b>
                    </Col>
                    <Col className="align-self-end">
                      {supplyChainSignatures.sellerSigned ? "Sí" : "No"}
                    </Col>
                  </Row>
                  <hr></hr>
                </Col>
                <Col md={6} className="align-self-end">
                  <Row>
                    <Col className="align-self-end">
                      <b>Firmado por certificador</b>
                    </Col>
                    <Col className="align-self-end">
                      {supplyChainSignatures.certifierSigned ? "Sí" : "No"}
                    </Col>
                  </Row>
                  <hr></hr>
                </Col>
                <Col md={6} className="align-self-end">
                  <Row>
                    <Col className="align-self-end">
                      <b>Firmado por transportista</b>
                    </Col>
                    <Col className="align-self-end">
                      {supplyChainSignatures.carrierSigned ? "Sí" : "No"}
                    </Col>
                  </Row>
                  <hr></hr>
                </Col>
              </Row>
              {showSignButton && (
                <Form
                  method="post"
                                 >
                  <input type={"hidden"} name="role" value={newRoles}></input>
                  <input type={"hidden"} name="account" value={account}></input>
                  <Button type="submit" disabled={submitting} name="intent" value={"sign"}>
                    {submitting ? "Firmando" : "Firmar"}
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
}
export default SignSupplyChain;
