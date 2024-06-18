import { useContext,useState } from "react";
import { Context } from "./Utilities/Provider";
import {useNavigate, useLoaderData} from "react-router-dom";
import Web3 from "web3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy,faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { Button } from "react-bootstrap";

function Login(props){
    
    const contextProvider= useContext(Context);
    const {provider, isMetaMaskInstalled}= useLoaderData()
    const [isConnecting, setIsConnecting] = useState(false);
    const [isCopied,setIsCopied] = useState(false);
    const navigate = useNavigate();
   
    

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
          contextProvider.changeAccount("");
        } else if (accounts[0] !== contextProvider.account) {
          contextProvider.changeAccount(accounts[0]);
        }
      };
      if(provider)
      provider.on("accountsChanged", handleAccountsChanged);
    const onLoginHandler = async () => {
        setIsConnecting(true);
        await provider.request({
          method: "eth_requestAccounts",
        }).then(async ()=>{
          const web3 = new Web3(provider);
          const accounts =  await web3.eth.getAccounts();
        if (accounts.length === 0) {
          console.log("Please connect to MetaMask!");
        } else if (accounts[0] !== contextProvider.account) {
          contextProvider.changeAccount(accounts[0])
        }
        }).catch(e=> {});
        setIsConnecting(false);
    
      };

    const renderForm = (
      <div>
        {!contextProvider.account && (
          <div>
            {isMetaMaskInstalled && (
              <Button onClick={onLoginHandler}>
                {!isConnecting && "Connect"}
                {isConnecting && "Loading..."}
              </Button>
            )}
            {!isMetaMaskInstalled && (
              <p>
                <a href="/">Install MetaMask</a>
              </p>
            )}
          </div>
        )}
        {contextProvider.account && (
          <div>
            <Button variant="link"
              onClick={() => {
                navigate("/users/" + contextProvider.account);
              }}
            >
             
              {contextProvider.account.substring(0,6)+"......"+contextProvider.account.slice(-4)}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(contextProvider.account);
                setIsCopied(true)
                setTimeout(()=>{
                  setIsCopied(false)
                },1000)
              }}
            >
              <FontAwesomeIcon icon={!isCopied ? faCopy:faCheckCircle } />
            </Button>
          </div>
        )}
      </div>
    );
      
      return renderForm;
    }
    export default Login;

    export function loader(){
        let provider;
        let isMetaMaskInstalled=false;
        if (window.ethereum) {
            provider = window.ethereum;
            isMetaMaskInstalled=true;
        } 
         return{ provider , isMetaMaskInstalled};
    } 