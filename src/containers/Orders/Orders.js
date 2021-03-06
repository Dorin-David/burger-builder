import { Component } from "react";
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))
           
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProp = state => ({
    orders: state.orderRdx.orders,
    loading: state.orderRdx.loading,
    token: state.authRdx.token,
    userId: state.authRdx.userId
})

const dispatchToProps = dispatch => ({
    fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})


export default connect(mapStateToProp, dispatchToProps)(withErrorHandler(Orders, axios))