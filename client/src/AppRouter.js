import {Route} from "react-router-dom";
import AppRoot from "./AppRoot";
import { loader as loginLoader } from "./Login";
import {RouterProvider,
    createRoutesFromElements,
    createBrowserRouter,
  } from "react-router-dom";
import Home from "./Home";
import UserList ,{loader as userListLoader} from "./UserComponents/UserList";
import User ,{loader as userLoader,} from "./UserComponents/User";
import EditUser ,{loader as editUserLoader, action as editUserAction} from "./UserComponents/EditUser";
import SupplyChainList,{loader as supplyChainListLoader} from "./SuplyChainComponents/SupplyChainList";

import { Context } from "./Utilities/Provider";
import { useContext, useState } from "react";
import CreateSupplyChain, {action as createSupplyChainAction}from "./SuplyChainComponents/createSupplyChain";
import SupplyChainLayout,{action as supplyChainAction, loader as supplyChainLoader} from "./SuplyChainComponents/supplyChainLayout";
import ErrorPage from "./ErrorPage"


import Web3 from "web3";
import { contractManagerInstance } from "./ContractEntities/contractManager";
import Funds, {action as FundsAction}from "./SuplyChainComponents/Funds";
import PrecedentSupplyChains ,{loader as precedentSuplyChainsLoader, action as precedentSuplyChainsAction} from "./SuplyChainComponents/PrecedentSupplyChains";
import SupplyChainDetails from "./SuplyChainComponents/SupplyChainDetails";
import SupplyChainIndex, {loader as supplyChainIndexLoader, action as supplyChainIndexAction}  from "./SuplyChainComponents/SupplyChainIndex";
import ModifyPrice,{action as ModifyPriceAction, loader as ModifyPriceLoader} from "./SuplyChainComponents/ModifyPrice";
import CreateProduct,{action as createProductAction, loader as createProductLoader} from "./SuplyChainComponents/ProductComponents/CreateProduct";
import ProductLayout,{loader as productLayouLoader} from "./SuplyChainComponents/ProductComponents/ProductLayout";
import ProductIndex, {loader as productIndexLoader, action as productIndexAction} from "./SuplyChainComponents/ProductComponents/ProductIndex";
import ProductList from "./SuplyChainComponents/ProductComponents/ProductList";
import SignSupplyChain from "./SuplyChainComponents/SignSupplyChain";
import ModifyFunds from "./SuplyChainComponents/ModifyFunds";



const storedAccount = window.localStorage.getItem("account");
const provider = window.ethereum ?? null;
var web3Provider= null
if(provider){
  web3Provider= new Web3(provider)
  contractManagerInstance.setWeb3Provider(web3Provider) 
  contractManagerInstance.setAppContract()
  contractManagerInstance.setStepContract()
  
}


function AppRouter(props) {
  
  const [account, setAccount] = useState(storedAccount)

  const handleAccountChanged = async (newAccounts) =>{
    if(newAccounts[0]){
      window.localStorage.setItem("account",newAccounts[0]);
            
    }
    else{
      window.localStorage.removeItem("account");   
    }
    setAccount(newAccounts[0])
}

const handleLogin= async ()=>{
  await provider
  .request({
    method: "eth_requestAccounts",
  })
  .then(async () => {
    const accounts = await web3Provider.eth.getAccounts()
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== account) {
      setAccount(accounts[0])
      window.localStorage.setItem("account",accounts[0]);
  }
  })
  .catch((e) => {});
  
}
    const router = createBrowserRouter(
        createRoutesFromElements(
        
        <Route errorElement={<ErrorPage/>} path={"/"} element={<AppRoot onLogin={handleLogin} account={account} provider={provider} onAccountChanged={handleAccountChanged}></AppRoot>}>
          <Route index element={<Home/>}/>
          <Route path="users/list" element={<UserList></UserList>} loader={userListLoader(account)}></Route>
          <Route path="users/:userId" element={<User></User>} loader={userLoader} ></Route>
          <Route path="users/create" element={<EditUser></EditUser>} loader={editUserLoader} action={editUserAction(account)}></Route>

          <Route path="supplyChains/list" element={<SupplyChainList></SupplyChainList>} loader={supplyChainListLoader}></Route>
          <Route path="supplyChains/:supplyChainAddress" element={<SupplyChainLayout></SupplyChainLayout>}  id="supplyChainLayout" loader={supplyChainLoader(account)} action={supplyChainAction}>
            <Route  path="sign" element={<SignSupplyChain></SignSupplyChain>} action={supplyChainIndexAction}></Route>
            <Route path="funds" element={<ModifyFunds></ModifyFunds> } action={FundsAction}></Route>
            <Route path="modifyPrice" element={<ModifyPrice></ModifyPrice> } loader={ModifyPriceLoader}action={ModifyPriceAction}></Route>
            <Route path="precedents" element={<PrecedentSupplyChains></PrecedentSupplyChains> } loader={precedentSuplyChainsLoader(account)} action={precedentSuplyChainsAction(account)}></Route>
            <Route path="products/list" element={<ProductList></ProductList>}> </Route>
            <Route path="products/:productId" element={<ProductLayout></ProductLayout> } loader={productLayouLoader(account)}>
              <Route index element={<ProductIndex></ProductIndex>} loader={productIndexLoader(account)}  action={productIndexAction}></Route>
            </Route>
            <Route path="product/create" element={<CreateProduct></CreateProduct> } loader={createProductLoader}action={createProductAction(account)}></Route>
          </Route>
          <Route path="supplyChains/create" element={<CreateSupplyChain></CreateSupplyChain> } action={createSupplyChainAction(account)}></Route>
        </Route>
        ))
  return (
    <RouterProvider router={router} />    
    
  );
}
export default AppRouter;

