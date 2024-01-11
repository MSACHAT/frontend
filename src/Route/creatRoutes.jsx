import {Route} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";

const createRoutes = (routes) => {
    return routes.map(({ path, component, isPublic }) => {
        const Element = isPublic ? component : <ProtectedRoute>{component}</ProtectedRoute>;
        return <Route key={path} path={path} element={Element} />;
    });
};

export default createRoutes;