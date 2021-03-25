import React, { Fragment, useEffect, useState } from 'react';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

        let [prevState, updateState] = useState({ error: null });
        let reqInterceptor = axios.interceptors.request.use(req => {
            return req
        }, error => {
            updateState({ error: error })
        })
        let resInterceptor = axios.interceptors.response.use(res => res, error => {
            updateState({ error: error })
        })

        useEffect(() => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }, [reqInterceptor, resInterceptor])

        const closeErrorHandler = () => {
            updateState({ error: null })
        }

        return (
            <Fragment>
                <Modal
                    showModal={prevState.error}
                    closeModal={closeErrorHandler}
                >
                    Something went wrong:
                        {prevState.error ? prevState.error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        )
    }


}

export default withErrorHandler;