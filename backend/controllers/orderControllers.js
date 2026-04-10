import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global variable
const currency = "INR";
const deliveryCharges = 10; 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//place order using Cod
const placeOrder = async(req,res) =>{
     try {
         let {userId , address , items , amount } = req.body;

         let orderData = {
            userId,
            address,
            items,
            amount,
            paymentMethod: "COD",
            payment:false,
            date: Date.now()
         }

         const newOrder = new orderModel(orderData);
         await newOrder.save();

         //empty the cart data
         await userModel.findByIdAndUpdate(userId , {cartItem : {}});

         res.json({success: true , message:"Order Placed"})
     } catch (error) {
        
     }
}
//place order using stripe
const placeOrderStripe = async(req,res) =>{
    try {
        const {userId , address , items , amount} = req.body;
        if (amount < 50) {
          return res.json({
            success: false,
            message: "Minimum order amount should be ₹50",
          });
        }
     
        const origin = req.headers.origin || "http://localhost:5173";
        const orderData = {
          userId,
          address,
          items,
          amount,
          paymentMethod: "Stripe",
          payment: false,
          date: Date.now(),
        };
        const neworder = new orderModel(orderData);
        await neworder.save();

        const line_items = items
          .filter((item) => item.quantity && item.quantity > 0)
          .map((item) => ({
            price_data: {
              currency: currency,
              product_data: { name: item.name },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          }));
        line_items.push({
            price_data: {
               currency: currency,
                product_data: { name: "Delivery Charges" },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,    
        })
        const session = await stripe.checkout.sessions.create({
          success_url: `${origin}/verify?success=true&orderId=${neworder._id}&userId=${userId}`,
          cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`,
          line_items,
          mode: "payment",
        }) 
        res.json({ success: true, session_url: session.url });
        console.log("successhit",userId)
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
//verify stripe
const verifyStripePayment = async(req,res) =>{
     const { orderId, success, userId } = req.body;
    try {
       if(success === true || success === "true"){
        await orderModel.findByIdAndUpdate(orderId , {payment: true});
        await userModel.findByIdAndUpdate(userId , {cartItem: {}});
        res.json({success: true , message:"Payment Verified and Order Placed"})
       }else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success: false , message:"Payment Failed. Please try again"})
       }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}



//all orders for admin panel
const allOrders = async(req,res) =>{
try {
    const orders = await orderModel.find({});
    res.json({success: true , orders});
} catch (error) {
    console.log(error.message);
    res.json({success: false , message: error.message});
}
}
 //user orders data for frontend
const userOrders = async(req,res) =>{
   try {
    const {userId} = req.body;

    const orders = await orderModel.find({userId});
    res.json({success: true , orders});
   } catch (error) {
    res.json({success: false , message: error.message});
   }
}
 //update orders status from admin panel
const updateStatus = async(req,res) =>{
 try {
    let {orderId , status} = req.body;
    let response = await orderModel.findByIdAndUpdate(orderId , {status});
    if(response){
        res.json({success: true , message:"Status Updated"})
    } else{
        res.json({success: false , message:"Unable to update status"})
    }
 } catch (error) {
    res.json({ success: false, message: error.message });
 }
}
 
export {placeOrder ,verifyStripePayment , placeOrderStripe ,allOrders,userOrders,updateStatus}