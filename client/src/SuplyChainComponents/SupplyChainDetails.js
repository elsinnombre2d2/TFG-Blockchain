import { Card, Col, Row } from "react-bootstrap"
import { useLoaderData, useOutletContext } from "react-router-dom"
import { contractManagerInstance } from "../ContractEntities/contractManager"
import Address from "../Utilities/Address"
import SupplyChainTable from "./SupplyChainTable"

function SupplyChainDetails({supplyChainInfo, precedentsInfo}){
  const outletContext= useOutletContext()
  
  const info= supplyChainInfo?? outletContext.supplyChainInfo
    return(
        <Card className="rounded mt-3 justify-content-center shadow">
        <Card.Header>
          <Card.Title>{info.productName}</Card.Title>
        </Card.Header>
        <Card.Body className="">
          <Row>
            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Dirección</b>
                </Col>
                <Col className="align-self-end"><Address address={info.contractAddress}></Address></Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Comprador</b>
                </Col>
                <Col className="align-self-end">
                  <Address address={info.buyer} replaceByName />
                </Col>
              </Row>
              <hr></hr>
            </Col>

            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Vendedor</b>
                </Col>
                <Col className="align-self-end">
                  <Address address={info.seller} replaceByName />
                </Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Transportista</b>
                </Col>
                <Col className="align-self-end">
                  <Address address={info.carrier} replaceByName />
                </Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6}>
              <Row>
                <Col className="align-self-end">
                  <b>Certificador</b>
                </Col>
                <Col className="align-self-end">
                  <Address address={info.certifier} replaceByName />
                </Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Precio en SC</b>
                </Col>
                <Col className="align-self-end">{info.price}</Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row >
                <Col className="align-self-end">
                  <b>Precio de transporte</b>
                </Col>
                <Col className="align-self-end">{info.carrierPrice}</Col>
              </Row>
              <hr></hr>
            </Col>
            <Col md={6} className="align-self-end">
              <Row>
                <Col className="align-self-end">
                  <b>Fin del contrato</b>
                </Col>
                <Col className="align-self-end">{info.duration}</Col>
              </Row>
              <hr></hr>
            </Col>
            
          </Row>
          {precedentsInfo.length>0 &&<>
          <b> Cadenas Precedentes</b>
          <SupplyChainTable supplyChains={precedentsInfo}></SupplyChainTable>
          </>}
        </Card.Body>
      </Card>
    )
} export default SupplyChainDetails


