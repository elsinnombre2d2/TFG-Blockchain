import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import AppContract from "../ContractEntities/appContract";
import supplyChainContract from "../ContractEntities/supplyChainContract";

export const Context = createContext(null);

export default function Provider({ children }) {
  const [account, setAccount] = useState(() => {
    const storedAccount = window.localStorage.getItem("account");
    if (storedAccount) return storedAccount;
    else return "";
  });

  const [web3Provider,setWeb3Provider]= useState(()=>{
    if(account)
      return new Web3(window.ethereum)
      else return null;
  })

  const [appContract,setAppContract]=useState(()=>{
    if(web3Provider)
      return new AppContract(web3Provider);
  });

  const [supplyChainContract, setSupplyChainContract] = useState(null)



  const context = {
    account: account,
    changeAccount: (newAccount) => {
      setAccount(newAccount);
      if (!web3Provider) 
        setWeb3Provider(new Web3(window.ethereum))
        console.log(newAccount)
    },
    appContract: appContract,
    web3Provider: web3Provider
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}
