import React from 'react'
import { useState } from 'react'
import { backendURL } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


function List({token}) {
  let [list , setlist] = useState([]);

  const fetchList = async() =>{
    try {
       const response  = await axios.get(backendURL + "/api/product/list");
       if(response.data.success){
        setlist(response.data.product)
       }else{
        toast.error(response.data.message)
        console.log("hello")
       }
    } catch (error) {
       toast.error(error.message);
       console.log(error);
    }
   
  }
  const removeProduct = async(id) =>{
        try {
          let response = await axios.post(backendURL + "/api/product/remove" ,{id} ,{headers:{token}})
   console.log("hii");
          if(response.data.success){
            toast.success(response.data.message)
            await fetchList() 
          }else{
        toast.error(response.data.message);
          }
        } catch (error) {
           toast.error(error.message);
           console.log(error); 
        }
  }
   useEffect(() => {
     fetchList();
   }, []);
  return (
    <div>
      <p>All Products</p>
      <div className="">
        <div className="hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] md:py-2 text-center bg-gray-200 mb-2 ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        <div className='flex  flex-col gap-2'>
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] h-24 text-center py-2 items-center border border-gray-300"
            >
              <p className='flex items-center justify-center'>
                <img src={item.image[0]} alt=""  className='w-18 '/>
              </p>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>{removeProduct(item._id)}}>X</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List