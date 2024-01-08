import React from "react";
import { useNavigate } from 'react-router-dom';
import url from "../config/RouteConfig";
class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };

    }

    componentDidCatch(error, info) {

        console.log(error, info);
        this.setState({ hasError: true });

        setTimeout(() => {
            const navigate = useNavigate();
            navigate(url.feed);
        }, 5000);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;