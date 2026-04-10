import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const ShopContext = createContext();

const ShopContextProvider = (props) =>{
    let [searchBarRes , setSearchBarRes] = useState("");
    let [showSearch , setShowSearch] = useState(false);
    const currency = "$"
    const delivery_fee = 10;
    let [cartItem , setCartItems] = useState({});
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [products,setProducts] = useState([]);
    const [token,settoken] = useState("");
    const navigate = useNavigate();

    const addToCart = async(itemId , size) =>{
        if(!size){
            toast.error("PLEASE SELECT SIZE");
            return;
        }
        let copyCart = structuredClone(cartItem);

        if(copyCart[itemId]){
            if(copyCart[itemId][size]){
                copyCart[itemId][size] += 1; //if cart have same item with same size so increase the count
            }
            else{
                copyCart[itemId][size] = 1; 
            }
        }else{
            copyCart[itemId] = {};
            copyCart[itemId][size] = 1; 
        }
        setCartItems(copyCart)
        if(token){
            try {
                let response = await axios.post(
                  backendURL + "/api/cart/add",
                  { itemId, size },
                  { headers: { token } },
                );
            } catch (error) {
                toast.error(error.message)
                console.log(error);
            }

        }
    }
    
    const getCartCount = () =>{
        let totalcount = 0
        for (const items in cartItem) {
            for (const item in cartItem[items]) {  //for size bcz if person have selected 2 same items of same size 
             
                try {
                    if(cartItem[items][item] > 0){
                        totalcount += cartItem[items][item]
                    }
                } catch (error) {
                    
                }
                
            }
            
        }
        return totalcount;
    }
    const updateQuantity = async(itemId , size , quantity) =>{
          let cartData = structuredClone(cartItem);
           if (!cartData[itemId]) {
             cartData[itemId] = {};
           }

          cartData[itemId][size] = quantity;
          setCartItems(cartData)

          if(token){
            try {
                 await axios.post(backendURL + "/api/cart/update", {
                   itemId,
                   size,
                   quantity,
                 } , {headers:{token}});
            } catch (error) {
              toast.error(error.message);
              console.log(error);   
            }
          }
    }
    const getCartData = async(token) =>{
          try {
               let response  = await axios.post(backendURL + "/api/cart/get" ,{}, {headers:{token}});
               if(response.data.success){
                    setCartItems(response.data.cartItem);  
               }else{
                console.log(response.data.message);
                toast.error(response.data.message)
               }
          } catch (error) {
             toast.error(error.message);
             console.log(error);
          }
    }
    const getCartAmount = () =>{
      let totalAmount = 0;
      for (const items in cartItem) {
        let itemInfo = products.find((product) => product._id === items);
       for (const items in cartItem) {
  let itemInfo = products.find((product) => product._id === items);

  if (!itemInfo) continue; // ⛔ prevents crash

  for (const item in cartItem[items]) {
    if (cartItem[items][item] > 0) {
      totalAmount += itemInfo.price * cartItem[items][item];
    }
  }

            
        }
        
      } 

      return totalAmount;  
    }
    const getProductData  = async() =>{
           try {
              const response = await axios.get(
                backendURL + "/api/product/list", );
                  if (response.data.success) {
                    setProducts(response.data.product);
                  }
             else{
                toast.error(response.data.message);
             }
           } catch (error) {
                toast.error(error.message)
           }
    }
    useEffect(()=>{
        getProductData();
    },[])

   useEffect(()=>{
    if(!token && localStorage.getItem("token")){
          settoken(localStorage.getItem("token"));
          getCartData(localStorage.getItem("token"));
    }
   })

const value = {
  products,
  currency,
  delivery_fee,
  searchBarRes,
  setSearchBarRes,
  setShowSearch,
  showSearch,
  setCartItems,
  cartItem,
  addToCart,
  getCartCount,
  updateQuantity,getCartAmount,navigate,backendURL,token,settoken
};
    return(
         <ShopContext.Provider value={value}>
            {props.children}
         </ShopContext.Provider>
    )
  }
export default ShopContextProvider;