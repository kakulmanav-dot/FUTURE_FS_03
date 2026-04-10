import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItems from './ProductItems.jsx'

function LatestCollection() {
    let { products } = useContext(ShopContext)
    console.log(products)
    let [latestProduct , setLatestProducts] = useState([]);
    useEffect(()=>{
          if (Array.isArray(products)) {
            setLatestProducts(products.slice(0, 10));
          }
    },[products])
  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="text-gray-500">
          Fresh drops, new season. Our latest collection brings bold styles and
          clean fits that are made for right now.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6 p-2 gap-4">
        {latestProduct.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection