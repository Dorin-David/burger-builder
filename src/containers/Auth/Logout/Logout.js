import { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../../../store/actions/index'


class Logout extends Component {
    componentDidMount(){
        this.props.logoutUser()
    }
    render(){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => ({
   logoutUser: () => dispatch(actionTypes.logout())
})


export default connect(null, mapDispatchToProps)(Logout)