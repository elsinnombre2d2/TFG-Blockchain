import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faCopy, faCheckCircle } from "@fortawesome/free-regular-svg-icons";

import { Link } from "@mui/material";
import Address from "./Utilities/Address";


function Login({ account, onLogin, provider }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleOnConnect = async () => {
    setIsConnecting(true);
        onLogin();
    setIsConnecting(false);
  };




  return (
    <>
      {account ? (
        <div>

            <Address address={account} replaceByName color="white"></Address>
          
         {/* <Button variant="light"
            onClick={() => {
              navigator.clipboard.writeText(account);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1000);
            }}
          >
            <FontAwesomeIcon icon={!isCopied ? faCopy : faCheckCircle} />
          </Button>*/}
        </div>
      ) : provider ? (
        <Button onClick={handleOnConnect}>
                {!isConnecting && "Connect"}
                {isConnecting && "Loading..."}
        </Button>
      ) : (
        <div className="text-light">Instala Metamask</div>
      )}
    </>
  );
}
export default Login;
