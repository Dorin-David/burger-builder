import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState({ showSideDrawer: false })
    }

    openSideDrawer = () => {
        this.setState(state => ({ showSideDrawer: !state.showSideDrawer }))
    }
    render() {
        return (
            <Fragment>
                <Toolbar
                    isAuth={this.props.isUserAuthenticated}
                    clicked={this.openSideDrawer} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    isAuth={this.props.isUserAuthenticated}
                    closed={this.closeSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isUserAuthenticated: state.authRdx.token !== null
})

export default connect(mapStateToProps)(Layout)