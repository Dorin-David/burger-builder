import React, {Component, Fragment } from 'react';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
      return class extends Component {
          state = {
              error: null
          }
         componentDidMount(){
             axios.interceptors.request.use(req => {
                 this.setState({error: null});
                 return req
             })
             axios.interceptors.response.use(res => res, error => {
                 this.setState({error: error});
             } )
         }
        closeErrorHandler = () => {
            this.setState({error: null})
        }
          render(){
            return (
                <Fragment>
                    <Modal 
                    showModal={this.state.error}
                    closeModal={this.closeErrorHandler}
                    >
                        Something went wrong:
                        {this.state.error ? this.state.error.message : null}
                        </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
          }
      }
   

}

export default withErrorHandler;