import { Button, Paper } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Form } from "react-router-dom";

function ProductActions({ role,submitting,account }) {
  return (
    <Box mt={2}>
    
        <Form method="post">
        
        <input type={"hidden"} name="account" value={account}></input>
        <Stack   direction="row" spacing={2}>
      {role.includes("carrier") && <Button type="submit" variant="contained" disabled={submitting} name="intent" value={"makeShipment"}>Realizar envío</Button>}
      {role.includes("buyer") && <Button type="submit" variant="contained" disabled={submitting} name="intent" value={"receiveShipment"}>Recibir envío</Button>}
      {role.includes("certifier") && <Button type="submit" variant="contained" disabled={submitting} name="intent" value={"certifyatOrigin"}>Certificar en origen</Button>}
      {role.includes("certifier") && <Button type="submit" variant="contained" disabled={submitting} name="intent" value={"certifyAtDestination"}>Certificar en destino</Button>}
      </Stack>
      </Form>
    </Box>
  );
}
export default ProductActions;
