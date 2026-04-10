import React from 'react'

function LetterBox() {
    function submitHandler(event){
             event.preventDefault();
    }
  return (
    <div className="flex justify-center items-center flex-col mt-10 sm:mt-0">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="sm:font-medium  text-1xl font-semibold sm:text-2xl">
          Subscribe now & get 20% off
        </h1>
        <p className="text-gray-500 text-sm sm:text-xl text-center sm:w-full w-1/2">
          Subscribe now and be the first to know about new arrivals, exclusive
          deals, and seasonal sales — straight to your inbox.
        </p>
      </div>
      <form
        action=""
        onSubmit={submitHandler}
        className="w-full sm:w-2/3 flex  justify-between items-center border rounded mt-10 mb-8"
      >
        <input
          type="text"
          required
          className=" px-7 sm:px-18 py-3 sm:placeholder:px-3 placeholder:px-0 outline-none"
          placeholder="Enter your Email "
        />
        <button
          type="submit"
          className="bg-black text-white py-4 sm:py-4 px-2 sm:px-4 sm:rounded-none rounded"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default LetterBox