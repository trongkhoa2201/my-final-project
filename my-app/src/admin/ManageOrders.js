import { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { db } from "../firebase.config";

const ManageOrders = () => {
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
     // call your API to fetch the list of orders from your server
      const ordersSnapshot = await db.collection('orders').get();
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  const handleApprove = async (orderID) => {
    // call your API to mark the order as approved and update the status on your server
    try {
      const response = await fetch(`/api/orders/${orderID}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedOrders = orders.map((order) => {
          if (order.orderID === orderID) {
            return {
              ...order,
              status: 'approved',
            };
          }
          return order;
        });
        setOrders(updatedOrders);
        toast.success('Order approved!');
      } else {
        toast.error('Unable to approve order. Please try again later.');
      }
    } catch (error) {
      toast.error('Unable to approve order. Please try again later.');
    }
  };

  return (
    <div>
    <h1>Orders</h1>
    <ul>
      {orders.map((order) => (
        <li key={order.orderID}>
          <p>Order ID: {order.orderID}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
          <p>Customer Name: {order.customerName}</p>
          <p>Customer Email: {order.customerEmail}</p>
          <div>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value: order.total,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                handleApprove(data.orderID);
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);
};

export default ManageOrders;