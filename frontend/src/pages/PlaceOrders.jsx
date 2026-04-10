import React, { useContext, useEffect }  from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function PlaceOrders() {

  let [method , setMethod] = useState("cod");
let {   backendURL, token,cartItem , setCartItems , getCartAmount  , delivery_fee , products } = useContext(ShopContext);
  const navigate  = useNavigate();
useEffect(()=>{
    console.log(cartItem)
},[])
  const [formData , setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",

  })
  
  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData(prev => ({...prev , [name]: value}))
  
  }
  const onSubmitHandler = async(e) => {
       e.preventDefault();
       
      try {
          let orderItems = [];
          if(!cartItem){
            console.log("cart is empty");
            return;
          }
          for (const items in cartItem) {  // items tells about particular id
               for(const item in cartItem[items]) //item tell about the size
             {
               const product = products.find(product => product._id.toString() === items.toString());

             if (product) {
             const itemInfo = {...product};
             itemInfo.size = item;
             itemInfo.quantity = cartItem[items][item];
             orderItems.push(itemInfo);
            }
               }
             }
            
         let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee
         }
         switch(method){
          //Api calls for Cod
          case 'cod':
          {  const response = await axios.post(backendURL + "/api/order/place" , orderData , {headers:{token}});
            if(response.data.success === true){
              toast.success(response.data.message);
              setCartItems({});
               navigate("/orders");
            }else{
              toast.error(response.data.message);
            }
            break;}
          case 'stripe':
           { const responseStripe = await axios.post(backendURL + "/api/order/stripe" , orderData , {headers:{token}});  
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data;
              window.location.replace(session_url);
          }else
          {
            toast.error(responseStripe.data.message);
          }
          break;
        }
          default:
          break;
          
         }
        }
       
        catch (error) {
        console.log(error);
       }
  }
  return (
    <form onSubmit={onSubmitHandler}  className=" flex flex-col sm:flex-row   sm:justify-between sm:gap-20 sm:m-3 w-full">
      {/* -----------left side------------- */}
      <div className="w-full sm:w-[50%] px-3 sm:px-0">
        <div>
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className=" border-2 w-full p-2 rounded placeholder:font-medium  outline-none"
              placeholder="First Name"
            />
            <input
              type="text"
             
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className=" border-2 w-full p-2 rounded placeholder:font-medium outline-none"
              placeholder="Last Name"
            />
          </div>
          <input
            type="text"
          
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className=" border-2 w-full p-2 rounded placeholder:font-medium  outline-none"
            placeholder="Email"
          />
          <input
            type="text"
           
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className=" border-2 w-full p-2 rounded placeholder:font-medium  outline-none"
            placeholder="Street"
          />
          <div className="flex gap-2">
            <input
              type="text"
             
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className=" border-2 w-full p-2 rounded placeholder:font-medium  outline-none"
              placeholder="City"
            />
            <input
              type="text"
             
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className=" border-2 w-full p-2 rounded placeholder:font-medium outline-none"
              placeholder="State"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
            
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className=" border-2 w-full p-2 rounded placeholder:font-medium  outline-none"
              placeholder="Country"
            />
            <input
              type="text"
            
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className=" border-2 w-full p-2 rounded placeholder:font-medium outline-none"
              placeholder="Zip Code"
            />
          </div>
          <input
            type="text"
           
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className=" border-2 w-full p-2 rounded placeholder:font-medium  outline-none"
            placeholder="Phone Number"
          />
        </div>
      </div>
      {/* ------------Right Side----------- */}
      <div className="w-[50%] mt-8">
        <div className="mt-8 sm:ml-10 w-full sm:min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12 ml-6">
          <div className="text-center">
            <Title text1={"Payment"} text2={"Method"} />
          </div>
          {/* -------payment method-------- */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div
              onClick={() => {
                setMethod("stripe");
              }}
              className="border py-2  px-12 flex items-center gap-3"
            >
              <p
                className={`border h-3 w-3 rounded-full ${method === "stripe" ? "bg-green-600" : ""}`}
              ></p>
              <p>
                <img src={assets.stripe_logo} className=" h-4" alt="" />
              </p>
            </div>
           
            <div
              onClick={() => {
                setMethod("cod");
              }}
              className={`border py-2 px-5 flex items-center text-medium text-gray-600 gap-3 `}
            >
              <p
                className={`border h-3 w-3 rounded-full ${method === "cod" ? "bg-green-600" : ""}`}
              ></p>
              <p className=" ">Cash on Delivery</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button type='submit'
           
            className="bg-black text-white px-6 py-2 rounded "
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  ); 
}

export default PlaceOrders 
