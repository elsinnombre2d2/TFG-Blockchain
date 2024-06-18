import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy,faCheckCircle } from '@fortawesome/free-regular-svg-icons'

function ClipboardButton(props){
    const [isCopied,setIsCopied] = useState(false);
return(
    <Button className="m-1"
              onClick={() => {
                navigator.clipboard.writeText(props.account);
                setIsCopied(true)
                setTimeout(()=>{
                  setIsCopied(false)
                },1000)
              }}
            >
              <FontAwesomeIcon icon={!isCopied ? faCopy:faCheckCircle } />
    </Button>)
} export default ClipboardButton