import { Button, Card, Form } from "react-bootstrap";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Form as RouterForm } from "react-router-dom";
import { contractManagerInstance } from "../ContractEntities/contractManager";
function ModifyPrice() {
  const { submitting, account, role, price } = useOutletContext();
  const { sellerNewPrice, buyerNewPrice } = useLoaderData();
  return (
    <Card className="rounded mt-3 justify-content-center shadow text-center">
      <Card.Header>
        <b>Modificar precio</b>
      </Card.Header>

      <Card.Body>
        <Card.Text> Precio actual: {price + " SC"}</Card.Text>
        <Form as={RouterForm} method="post">
          <input type={"hidden"} name="account" value={account}></input>
          {sellerNewPrice === 0 && buyerNewPrice === 0 ? (
            <>
              <Form.Control
                className="mb-2 text-center "
                type={"number"}
                required
                id="outlined-basic"
                label="Nuevo Precio"
                variant="outlined"
                name="quantity"
              />
              <Button
                type="submit"
                disabled={submitting}
                value={"modifyPrice"}
                name="intent"
              >
                {!submitting ? "Modificar precio" : "Enviando"}
              </Button>
            </>
          ):<div>
          {(sellerNewPrice !== 0 && role.includes("seller")) ? (
            <>
              Has solicitado un cambio de precio de {price} SC a{" "}
              {sellerNewPrice} SC.{" "}
            </>
          ) : role.includes("seller") &&(
            <>
            <Card.Text>Nuevo precio: { buyerNewPrice} SC</Card.Text>
              {" "}
              <input
                type={"hidden"}
                name="quantity"
                value={buyerNewPrice}
              ></input>{" "}
              <Button
                type="submit"
                disabled={submitting}
                value={"acceptnewPrice"}
                name="intent"
              >
                {!submitting ? "Aceptar modificación" : "Enviando"}
              </Button>
            </>
          )}
          {buyerNewPrice !== 0 && role.includes("buyer") ? (
            <>
              Has solicitado un cambio de precio de {price} SC a {buyerNewPrice}{" "}
              SC.
            </>
          ) : role.includes("buyer") &&(
            <>  <Card.Text>Nuevo precio: { sellerNewPrice} SC</Card.Text>
              {" "}
              <input
                type={"hidden"}
                name="quantity"
                value={sellerNewPrice}
              ></input>{" "}
              <Button
                type="submit"
                disabled={submitting}
                value={"acceptnewPrice"}
                name="intent"
              >
                {!submitting ? "Aceptar modificación" : "Enviando"}
              </Button>
            </>
          )}
          </div>}
        </Form>
      </Card.Body>
    </Card>
  );
}
export default ModifyPrice;

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const formEntries = Object.fromEntries(form);

  await contractManagerInstance
    .getSuplyChainContract()
    .modifyPrice(formEntries.account, formEntries.quantity);
  return true;
};

export const loader = async ({ request, params }) => {
  const { sellerNewPrice, buyerNewPrice } = 
    await contractManagerInstance.getSuplyChainContract().getNewPrices()
  

  return { sellerNewPrice, buyerNewPrice };
};
