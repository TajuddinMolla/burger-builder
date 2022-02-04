import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import * as action from '../../../store/actions/index'

function Logout(props) {
    useEffect(() => {
        props.onLogout();
    }, []);
  return <Navigate to="/"/>;
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(action.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
