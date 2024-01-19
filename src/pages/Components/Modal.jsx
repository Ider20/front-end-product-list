import React from "react";
import { useState } from "react";
import { UpdateModal } from "./UpdateModal";

export const Modal = ({ showModal, closeModal }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleCloseWindow = (e) => {
    if (e.target.classList.contains("bg-light-black")) {
      closeModal();
    }
    // console.log(e.target.classList.contains("bg-light-black"));
  };

  const inputProName = (e) => {
    console.log(e.target.value);
    setProductName(e.target.value);
  };
  const inputProPrice = (e) => {
    console.log(e.target.value);
    setProductPrice(e.target.value);
  };
  const inputProDes = (e) => {
    console.log(e.target.value);
    setProductDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const generatedId = () => {
    //   return Math.floor(Math.random() * 100);
    // };
    const productData = {
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
    };

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product created successfully!");
        // Redirect or show success message as needed
        closeModal();
      } else {
        alert("Failed to create product");
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other issues
    }
  };

  if (!showModal) return null;
  return (
    <div
      className="bg-light-black w-full h-full absolute flex justify-center items-center"
      onClick={handleCloseWindow}
    >
      <div className="hidden">
        <UpdateModal
          productName={productName}
          productPrice={productPrice}
          productDescription={productDescription}
          setProductName={setProductName}
          setProductPrice={setProductPrice}
          setProductDescription={setProductDescription}
        />
      </div>

      <form
        className="bg-white w-[210px] h-[275px] flex flex-col p-4 rounded-lg gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-end items-center gap-7 ">
          <div className="text-xs text-gray-400">Adding product</div>
          <button
            onClick={closeModal}
            className="border cursor-pointer p-1 rounded-md hover:bg-black hover:text-white duration-300"
          >
            Close
          </button>
        </div>

        <div>
          <label>
            Product Name:
            <input
              placeholder=""
              value={productName}
              onChange={inputProName}
              className="border rounded"
            />
          </label>
          <label>
            Product Price:
            <input
              placeholder=""
              onChange={inputProPrice}
              value={productPrice}
              className="border rounded"
            />
          </label>
          <label>
            Product Description:
            <input
              placeholder=""
              onChange={inputProDes}
              value={productDescription}
              className="border rounded"
            />
          </label>
        </div>

        <button
          className="border p-1 rounded-md w-[100px] hover:bg-black hover:text-white duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Modal;
