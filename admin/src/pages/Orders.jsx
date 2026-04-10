import React from 'react'
import { useContext ,useEffect,useState} from 'react'
import {backendURL ,currency} from '../App';
import {toast} from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';
function Orders({token}) {
  const [orders,setorders] = useState([]);

  const fetchAllOrders = async() =>{
     if (!token) {
       return console.log("PLEASE LOGIN TO SEE YOUR ORDERS");
     }
       try {

         const response = await axios.post(backendURL + "/api/order/list" , {}, {headers:{token}});
         if(response.data.success){
            setorders(response.data.orders.reverse());
         } else{
          toast.error(response.data.message);
            console.log(response.data.message);
         }
       } catch (error) {
         console.log(error.message);
         toast.error(error.message);
       }
  }
  const statusHandler = async(e , orderId) =>{
    let status = e.target.value;
    try {
      const response = await axios.post(
        backendURL + "/api/order/status",
        { orderId, status },
        { headers: { token } },
      );
      if(response.data.success){
       
        fetchAllOrders();
      } else{
        console.log(response.data.message);
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
  <h1>Orders</h1>
  <div>
    {orders.map((order, index) => {
      return (
        <div key={index}>
          <div
            className="grid grid-cols-2 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
          items-start gap-3 border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 "
          >
            <img className="w-12 " src={assets.parcel_icon} alt="" />

            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="py-0.5">
                  {item.name} X {item.quantity} {item.size}
                  {idx !== order.items.length - 1 ? " ," : ""}
                </p>
              ))}

              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city} , {order.address.state} ,{" "}
                  {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              name=""
              id=""
              value={order.status}
              className="p-2 font-medium"
              onChange={(event) => statusHandler(event, order._id)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Order Packed">Order Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      );
    })}
  </div>
</div>
  )
}

export default Orders