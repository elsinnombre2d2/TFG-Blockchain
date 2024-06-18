import { Stack } from "@mui/system";
import { useLoaderData, useNavigation, useOutletContext, useParams, useRouteLoaderData } from "react-router-dom";
import { contractManagerInstance } from "../../ContractEntities/contractManager";
import ProductActions from "./ProductActions";
import ProductDetails from "./ProductDetails";
import StepList from "./StepList";

function ProductIndex() {
  const { productListInfo } = useRouteLoaderData("supplyChainLayout");
  const { steps } = useLoaderData();
  const { productId,supplyChainAddress } = useParams();
  const {account,role} = useOutletContext()
  const navigation = useNavigation();
  const currentProduct = productListInfo.filter((element) => {
    return element.id.toLowerCase() === productId.toLowerCase();
  });
  //console.log("current " +currentProduct)
  return (
    <>
      <Stack spacing={2} margin={2}>
        <ProductActions
          account={account}
          role={role}
          submitting={navigation.state === 'submitting'}
        ></ProductActions>
        <ProductDetails supplyChainAddress={supplyChainAddress}productInfo={currentProduct[0]}></ProductDetails>
        <StepList steps={steps}></StepList>
      </Stack>
    </>
  );
}
export default ProductIndex;

export const loader =
  (account) =>
  async ({ request, params }) => {
    await contractManagerInstance.setStepContract();
    const steps = await contractManagerInstance
      .getStepContract()
      .getProductSteps(params.productId);

    return { steps };
  };

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const formEntries = Object.fromEntries(form);
  const action = formEntries.intent;
  switch (action) {
    case "makeShipment":
        await contractManagerInstance.getSuplyChainContract().makeShipment(formEntries.account,params.productId)
      break;
    case "receiveShipment":
        await contractManagerInstance.getSuplyChainContract().receiveShipment(formEntries.account,params.productId)
      break;
    case "certifyatOrigin":
        await contractManagerInstance.getSuplyChainContract().certifyAtOrigin(formEntries.account,params.productId)
      break;
    case "certifyAtDestination":
        await contractManagerInstance.getSuplyChainContract().certifyAtDestination(formEntries.account,params.productId)
      break;

    default:
      break;
  }
  return true
};
