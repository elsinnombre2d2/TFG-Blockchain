import { Outlet, useOutletContext } from "react-router-dom"

function ProductLayout(){

    const context= useOutletContext()
    return(
        <Outlet context={context}></Outlet>
    )
} export default ProductLayout

export const loader = account=> async ({ request, params }) => {

    return {}
}

