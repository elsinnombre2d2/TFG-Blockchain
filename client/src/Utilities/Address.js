import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { contractInstance } from "../ContractEntities/appContract";
import { contractManagerInstance } from "../ContractEntities/contractManager";

function Address(props) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const loadData = async () => {
      setUserInfo(
        await contractManagerInstance.getAppContract().getUser(props.address)
      );
    };
    if (props.replaceByName) loadData();
  }, [props.address, props.replaceByName]);

  return props.replaceByName && userInfo.name ? (
    <MaterialLink
      component={Link}
      underline="hover"
      to={"/users/" + props.address}
      color={props.color}
    >
      {userInfo.name}
    </MaterialLink>
  ) : (
    props.expand ? props.address : props.address.substring(0, 6) + "......" + props.address.slice(-4)
  );
}
export default Address;
