import {Navigate, useLocation} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {IsAuthenticated} from "../store";
import routeConfig from "../config/RouteConfig";

export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated,setIsAuthenticated] = useRecoilState(IsAuthenticated)
    const location = useLocation();
    function authenticated() {
        if (localStorage.getItem('token') === null) {
            return false;
        } else {
            setIsAuthenticated(true)
            return true;

        }
    }

    if (!authenticated()) {

        return <Navigate to={routeConfig.login} state={{ from: location }} replace />;
    }

    return children;
};