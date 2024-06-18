import { TextField } from "@mui/material";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Form as RouterForm, useOutletContext } from "react-router-dom";
import { contractManagerInstance } from "../ContractEntities/contractManager";

function Funds({onlyView,funds, submitting, account, role}) {
  //const { funds, submitting, account, role } = useOutletContext()
  return (

        <Card className="rounded mt-3 justify-content-center shadow text-center">
          <Card.Header>
            Fondos: {funds}
            {" SC"}
          </Card.Header>
          {(!onlyView &&(funds > 0 || role.includes("buyer"))  ) && (
            <Card.Body >
              <Form as={RouterForm} method="post">
                <input type={"hidden"} name="account" value={account}></input>
                {role.includes("buyer") && (
                  <>
                    <Form.Control 
                      className="mb-2 text-center "
                      type={"number"}
                      required
                      id="outlined-basic"
                      label="Cantidad"
                      variant="outlined"
                      name="quantity"
                    />
                    <Button
                      type="submit"
                      disabled={submitting}
                      value={"addFunds"}
                      name="intent"
                    >
                      {!submitting ? "Añadir fondos" : "Enviando"}
                    </Button>
                  </>
                )}
              </Form>
              <Form as={RouterForm} method="post" className="mt-2">
                <input type={"hidden"} name="account" value={account}></input>
                {funds > 0 && (
                  <Button
                    type="submit"
                    disabled={submitting}
                    value="withdrawFunds"
                    name="intent"
                  >
                    {!submitting ? "Retirar fondos" : "Enviando"}
                  </Button>
                )}
              </Form>
            </Card.Body>
          )}
        </Card>
  );
}
export default Funds;

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const formEntries = Object.fromEntries(form);
  const action = formEntries.intent;
  switch (action) {
    case "addFunds":
      await contractManagerInstance.getSuplyChainContract().addFunds(formEntries.account,formEntries.quantity)
      break
    case "withdrawFunds":
      await contractManagerInstance.getSuplyChainContract().withdrawFunds(formEntries.account)
      break
    default:
      break;
  }


return true
}