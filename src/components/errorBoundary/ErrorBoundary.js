import {Component} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";


class ErrorBoundary extends Component{

    state={
        error:null
    };

    static getDerivedStateFromError(error){
        return {error};
    }

    render() {
        const {error} = this.state;
        if(error){
            return(
                <ErrorMessage/>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;