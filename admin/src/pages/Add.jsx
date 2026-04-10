import React , {useState} from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
function Add({token}) {
    const [image1,setimage1] = useState(false);
    const [image2,setimage2] = useState(false);
    const [image3,setimage3] = useState(false);
    const [image4,setimage4] = useState(false);

    const[name,setname] = useState("");
    const[description,setdescription] = useState("");
    const [price,setprice ] = useState("");
    const [category , setcategory] = useState("Men")
    const [subcategory , setsubcategory] = useState("TopWear")
    const [bestsellers , setbestsellers] = useState(false)
    const [sizes , setsizes] = useState([]);

    async function submitHandler(e){
            e.preventDefault();
            try {
                const formData = new FormData();

                formData.append("name" , name)
                formData.append("description" , description)
                formData.append("price" , price)
                formData.append("category" , category)
                formData.append("subcategory" , subcategory)
                formData.append("bestseller" , bestsellers)
                formData.append("sizes" , JSON.stringify(sizes))

              image1 &&  formData.append("image1", image1)
              image2 &&  formData.append("image2", image2)
              image3 &&  formData.append("image3", image3)
              image4 &&  formData.append("image4", image4)

              const response = await axios.post(
                backendURL + "/api/product/add",
                formData,
                { headers: { token } },
              );
             if(response.data.success){
               toast.success(response.data.message);
               setname("");
               setdescription("");
               setprice("");
               setimage1(false);
               setimage2(false);
               setimage3(false);
               setimage4(false);
               
             }else{
              toast.error(response.data.message)
             }
            } catch (error) {
                 console.log(error);
                 toast.error(error.message)
            }
    }
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <div>
          <h1 className="font-medium mb-5">Upload Image</h1>
          <div className="grid sm:grid-cols-4 grid-cols-4  gap-2 w-68 sm:w-120 ">
            <label htmlFor="image1" className="flex ">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
                className="sm:w-25 w-17"
              />
              <input
                onChange={(e) => {
                  setimage1(e.target.files[0]);
                }}
                type="file"
                id="image1"
                className="opacity-0 absolute w-0 h-0"
                required
              />
            </label>
            <label htmlFor="image2" className="flex ">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                className="sm:w-25 w-17"
                alt=""
              />
              <input
                onChange={(e) => {
                  setimage2(e.target.files[0]);
                }}
                type="file"
                id="image2"
                className="opacity-0 absolute w-0 h-0"
              />
            </label>{" "}
            <label htmlFor="image3" className="flex ">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
                className="sm:w-25 w-17"
              />
              <input
                onChange={(e) => {
                  setimage3(e.target.files[0]);
                }}
                type="file"
                id="image3"
                className="opacity-0 absolute w-0 h-0"
              />
            </label>{" "}
            <label htmlFor="image4" className="flex ">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
                className="sm:w-25 w-17"
              />
              <input
                onChange={(e) => {
                  setimage4(e.target.files[0]);
                }}
                type="file"
                id="image4"
                className="opacity-0 absolute w-0 h-0"
              />
            </label>
          </div>
        </div>
        <div className="mt-5">
          <p>Product Name</p>
          <input
            type="text"
            className="py-2 px-2 w-full sm:w-2/3 placeholder:px-2"
            placeholder="Name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            value={name}
            required
          />
        </div>
        <div className="mt-5">
          <p>Product Description</p>
          <textarea
            type="text"
            className="py-2 px-4 w-full sm:w-2/3 placeholder:px-2"
            placeholder="Description"
            required
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            value={description}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-10 w-120 sm:w-full">
          <div className="mt-5 w-2/4 sm:w-1/4">
            <p>Product Category</p>
            <select
              name=""
              id=""
              className="py-2 px-2 w-full placeholder:px-2"
              onChange={(e) => {
                setcategory(e.target.value);
              }}
              value={category}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="mt-5 w-2/4">
            <p>Product Subcategory</p>
            <select
              name=""
              id=""
              className="py-2 px-2 w-full placeholder:px-2"
              onChange={(e) => {
                setsubcategory(e.target.value);
              }}
              value={subcategory}
            >
              <option value="TopWear">TopWear</option>
              <option value="BottomWear">BottomWear</option>
              <option value="InnerWear">InnerWear</option>
            </select>
          </div>
          <div className="mt-5 w-2/4">
            <p>Product price</p>
            <input
              type="number"
              placeholder="100"
              className="py-2 px-2 w-full placeholder:px-2"
              onChange={(e) => {
                setprice(e.target.value);
              }}
              value={price}
            />
          </div>
        </div>
        <div className="mt-5">
          <p>Sizes</p>
          <div className="flex gap-3">
            <div
              onClick={() => {
                setsizes((prev) =>
                  prev.includes("XS")
                    ? prev.filter((item) => item !== "XS")
                    : [...prev, "XS"],
                );
              }}
            >
              <p
                className={`${sizes.includes("XS") ? "bg-pink-100" : "bg-slate-300"} px-2 py-1 w-10 text-center`}
              >
                XS
              </p>
            </div>{" "}
            <div
              onClick={() => {
                setsizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"],
                );
              }}
            >
              <p
                className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-300"} px-2 py-1 w-10 text-center`}
              >
                S
              </p>
            </div>{" "}
            <div
              onClick={() => {
                setsizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"],
                );
              }}
            >
              <p
                className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-300"} px-2 py-1 w-10 text-center`}
              >
                M
              </p>
            </div>{" "}
            <div
              onClick={() => {
                setsizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"],
                );
              }}
            >
              <p
                className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-300"} px-2 py-1 w-10 text-center`}
              >
                L
              </p>
            </div>{" "}
            <div
              onClick={() => {
                setsizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"],
                );
              }}
            >
              <p
                className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-300"} px-2 py-1 w-10 text-center`}
              >
                XL
              </p>
            </div>{" "}
            <div
              onClick={() => {
                setsizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"],
                );
              }}
            >
              <p
                className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-300"} px-2 py-1 w-10 text-center`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8  flex gap-2">
          <input
            type="checkbox"
            id="bestsellers"
            checked={bestsellers}
            onChange={() => {
              setbestsellers((prev) => !prev);
            }}
          />
          <label htmlFor="">Add to bestsellers</label>
        </div>
        <button
          type="submit"
          onClick={() => {
            console.log("button clicked");
          }}
          className="px-7 ml-4 rounded py-2 bg-black text-white mt-8"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add