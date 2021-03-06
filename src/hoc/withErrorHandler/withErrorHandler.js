import React, {Component} from 'react';
import Auxiliary from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {


        state = {
            error: null
        }

        componentWillMount(){

            this.reqInterceptor = axios.interceptors.request.use( request => 
                {this.setState({error:null});
                return request;
        });

        this.resInterceptor = axios.interceptors
        .response.use(response => response, error => {this.setState({error: error})});
        }

        componentWillUnmount(){


            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConirmedHandler = ()=> {
            this.setState({error: null});
        }

        render() {
            return(
                <Auxiliary>
                <Modal
                show = {this.state.error}
                modalClose = {this.errorConirmedHandler}    
                >
                {this.state.error?this.state.error.message:null}
                </Modal>
                <WrappedComponent {...this.props}/>
                </Auxiliary>
            )
        }
    }

}

export default withErrorHandler;