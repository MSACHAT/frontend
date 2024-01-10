import {Navigate, useLocation} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsAuthenticated} from "../store";
import routeConfig from "../config/RouteConfig";

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useRecoilValue(IsAuthenticated)
    const location = useLocation();

    if (!isAuthenticated) {

        return <Navigate to={routeConfig.login} state={{ from: location }} replace />;
    }

    return children;
};