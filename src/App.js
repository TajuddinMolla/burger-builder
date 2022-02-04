import Layout from "./components/layouts/Layouts";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout'
import { Routes, Route, Navigate } from "react-router";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as action from './store/actions/index'
import { useEffect } from "react";
import { useNavigate } from "react-router";

function App(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.onCheckSignUpSign();
  }, []);
  return (
    <div >
      <Layout>
        <Routes>
          <Route path='/' element={<BurgerBuilder />} />
          {
            props.isAuthenticated
              ? <>
                <Route path='/checkout' element={<Checkout />}>
                  <Route path=':contact-data' element={<ContactData />} />
                </Route>
                <Route path='/orders' element={<Orders />} />
              </>
              : null
          }

          <Route path='/auth' element={<Auth />} />
          <Route path='/logout' element={<Logout />} />
          {/* <Route path='*' element={<h2 style={{ textAlign: 'center' }}>Url Not Found</h2>} /> */}
        </Routes>

      </Layout>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCheckSignUpSign: () => dispatch(action.checkSignUpSign())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
