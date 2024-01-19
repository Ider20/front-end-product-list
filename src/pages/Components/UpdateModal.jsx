import React, { useEffect } from "react";
import { useState } from "react";

export const UpdateModal = ({
  showUpdateModal,
  closeUpdateModal,
  productName,
  setProductName,
  setProductPrice,
  setProductDescription,
  name,
  price,
  description,
  fetchProducts,
}) => {
  const [inputProductNameValue, setInputProductNameValue] = useState("");
  const [inputProductPriceValue, setInputProductPriceValue] = useState("");
  const [inputProductDescriptionValue, setInputProductDescriptionValue] =
    useState("");

  console.log("inputProductNameValue", inputProductNameValue);

  const handleCloseWindow = (e) => {
    if (e.target.classList.contains("bg-light-black")) {
      closeUpdateModal();
    }
  };

  const handleInputProductValue = (e) => {
    setInputProductNameValue(e.target.value);
    // {
    //   setInputProductNameValue(test);
    // }
  };

  useEffect(() => {
    setInputProductNameValue(name);
    setInputProductPriceValue(Number(price));
    setInputProductDescriptionValue(description);
  }, [name, price, description]);

  if (!showUpdateModal) return null;

  return (
    <div
      className="bg-light-black w-full h-full absolute flex justify-center items-center"
      onClick={handleCloseWindow}
    >
      <form
        className="bg-white w-[210px] h-[275px] flex flex-col p-4 rounded-lg gap-3"
        // onSubmit={handleSubmit}
      >
        <div className="flex justify-end items-center gap-6 ">
          <div className="text-xs text-gray-400">Updating product</div>
          <button
            onClick={closeUpdateModal}
            className="border cursor-pointer p-1 rounded-md hover:bg-black hover:text-white duration-300"
          >
            Close
          </button>
        </div>

        <div>
          <label>
            Product Name:
            <input
              value={inputProductNameValue}
              onChange={handleInputProductValue}
              className="border rounded"
            />
          </label>
          <label>
            Product Price:
            <input
              placeholder=""
              onChange={setInputProductPriceValue}
              value={inputProductPriceValue}
              className="border rounded"
            />
          </label>
          <label>
            Product Description:
            <input
              placeholder=""
              onChange={setInputProductDescriptionValue}
              value={inputProductDescriptionValue}
              className="border rounded"
            />
          </label>
        </div>

        <button
          className="border p-1 rounded-md w-[100px] hover:bg-black hover:text-white duration-300"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateModal;
