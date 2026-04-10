import React, { useContext ,useEffect,useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

function Orders() {
  let {currency ,backendURL, token} = useContext(ShopContext)
   const [orderData , setOrderData] = useState([]);

   const loadOrders = async() =>{
      try {
        if(!token){
          return toast.error("PLEASE LOGIN TO SEE YOUR ORDERS");
         
        }
         let response = await axios.post(
           backendURL + "/api/order/userorders",
           {},
           { headers: { token } },
         );
         if(response.data.success){
             let allOrdersItems = [];
             response.data.orders.map((order)=>{
              order.items.map((item)=>{
                 item['status'] = order.status;
                 item['payment'] = order.payment;
                 item['paymentMethod'] = order.paymentMethod;
                 item['date'] = order.date;
                 allOrdersItems.push(item);
                 setOrderData(allOrdersItems);
              })
              console.log(allOrdersItems);
             })
         }
      } catch (error) {
         console.log(error.message);
      }
   }
   useEffect(()=>{
  loadOrders();
   },[token])
  return (
    <div>
      <div className='flex'>
             <Title text1={"My"} text2={"Orders"}/>
      </div>
      <div className=''>
        {
          orderData.map((item , index) =>{
            return (
              <div key={index} className="grid grid-cols-[2fr_1fr_1fr] border-t mb-5">
                <div className="flex gap-4">
                  <div>
                    <img
                      src={item.image[0]}
                      className="w-20 h-15 mt-2"
                      alt=""
                    />
                  </div>
                  <div className="mt-2 font-medium">
                    <p>{item.name}</p>
                    <div className="flex gap-10 text-gray-500 font-light m-1">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity:{item.quantity} </p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="text-gray-500 font-medium">Date: {item.date}</p>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <p className="border w-3 h-3 rounded-full bg-green-500"></p>
                  <p>{item.status}</p>
                </div>
                <div className='flex items-center justify-end text-gray-500'>
                  <button className='border px-4 py-2 hover:bg-black hover:text-white'  onClick={()=>{loadOrders();}}>Track Order</button>
                </div>
              </div>
            );
          })
        }
      </div>
      
    </div>
  )
}

export default Orders