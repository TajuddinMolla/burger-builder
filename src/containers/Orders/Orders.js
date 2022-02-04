import React from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Spiner from '../../components/Ui/Spiner/Spiner';
import * as action from '../../store/actions/index'


function Orders(props) {
   
    const orderData = [];
    const navigate = useNavigate();
    let increment = 0;
    const [updateOrder, setUpdateOrder] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        axios.get('orders.json?auth='+ props.token + '&orderBy="userId"&equalTo="' + props.userId + '"')
            .then(response => {
                for (let orderKey in response.data) {
                    orderData[increment] = {
                        ...response.data[orderKey],
                        id: orderKey
                    };
                    increment++;

                }
                setOrderList(orderData);
                setLoading(true);
                
            })
           
    }, [updateOrder]);

    //deleteOrder Function 
    const deleteOrder = (orderID) => {
        
        axios.delete(`orders/${orderID}.json?auth=${props.token}`)
            .then(response => {
                setUpdateOrder(!updateOrder);
                navigate('/orders');
            })
    }

    return (
        <div>
            {
                loading ? (
                    orderList.map(orderItem => (
                        <Order
                            key={orderItem.id}
                            ingredients={orderItem.ingredients}
                            price={orderItem.price}
                            id={orderItem.id}
                            deleteOrder={deleteOrder}
                        />
                    ))
                ) : <Spiner />
            }
        </div>
    );
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
       onCheckSignUpSign: () => dispatch(action.checkSignUpSign())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
