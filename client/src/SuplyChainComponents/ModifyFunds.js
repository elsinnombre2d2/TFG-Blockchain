import { useOutletContext } from "react-router-dom";
import Funds from "./Funds";

function ModifyFunds(){

    const { funds, submitting, account, role } = useOutletContext()
    return (
        <Funds funds={funds} submitting={submitting} account={account} role={role}></Funds>
    )
} export default ModifyFunds;