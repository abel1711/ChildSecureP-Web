import { BrowserRouter } from "react-router"
import PublicRoutes from "./PublicRoutes"

const RouterApp = () => {
    return (
        <BrowserRouter>
            <PublicRoutes />
        </BrowserRouter>
    )
}

export default RouterApp