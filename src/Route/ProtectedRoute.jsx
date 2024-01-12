import {Navigate, useLocation} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {IsAuthenticated} from "../store";
import routeConfig from "../config/RouteConfig";

export const ProtectedRoute = ({ children }) => {

    const location = useLocation();
    function authenticated() {
        return localStorage.getItem('token') !== null;
    }

    if (!authenticated()) {

        return <Navigate to={routeConfig.login}  />;
    }

    return children;
};