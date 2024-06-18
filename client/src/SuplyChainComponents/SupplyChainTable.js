import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Address from "../Utilities/Address";

function SupplyChainTable({supplyChains,addSelect}) {
    return(
        <Table  className="shadow bg-light mt-3 rounded" bordered hover responsive>
        <thead>
          <tr>
            {addSelect && <th></th>}
        <th >Cadena de suministro</th>
                <th >Producto</th>
                <th >Comprador</th>
                <th >Vendedor</th>
                <th >Transportista</th>
                <th >Certificador</th>
                <th >Precio en SC</th>
                <th >Precio de Transportista en SC</th>
                <th >Fin del contrato</th>
                </tr>
        </thead>
        <tbody>
          {supplyChains.map((element) => {
            return (<LinkContainer style={{cursor:"pointer"}} to={"/supplyChains/"+element.contractAddress} key={element.contractAddress} >
              <tr  >
                {addSelect && <td> <input type="checkbox" id={element.contractAddress}  value={element.contractAddress } ></input></td>}
                  <td><Address address={element.contractAddress}/></td>
                <td>{element.productName}</td>
                <td> <Address address={element.buyer} replaceByName/></td>
                <td><Address address={element.seller} replaceByName/></td>
                <td><Address address={element.carrier} replaceByName/></td>
                <td><Address address={element.certifier} replaceByName/></td>
                <td>{element.price}</td>
                <td>{element.carrierPrice}</td>
                <td>{element.duration}</td>
              </tr>
              </LinkContainer>
            );
          })}
        </tbody>
      </Table>
    )
} export default SupplyChainTable;