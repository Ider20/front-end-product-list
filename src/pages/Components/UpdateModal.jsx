import React from "react";
import { useState } from "react";

export const UpdateModal = ({
  showUpdateModal,
  closeUpdateModal,
  productName,
  setProductName,
  setProductPrice,
  setProductDescription,
  test,
}) => {
  const [inputProductNameValue, setInputProductNameValue] = useState("");
  const [inputProductPriceValue, setInputProductPriceValue] = useState("");
  const [inputProductDescriptionValue, setInputProductDescriptionValue] =
    useState("");

  const handleCloseWindow = (e) => {
    if (e.target.classList.contains("bg-light-black")) {
      closeUpdateModal();
    }
  };
  console.log(test, "test");
  const handleInputProductValue = () => {
    {
      setInputProductNameValue(test);
    }
  };

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
              placeholder=""
              value={inputProductNameValue}
              onChange={handleInputProductValue}
              className="border rounded"
            />
          </label>
          <label>
            Product Price:
            <input
              placeholder=""
              //   onChange={inputProPrice}
              value={inputProductPriceValue}
              className="border rounded"
            />
          </label>
          <label>
            Product Description:
            <input
              placeholder=""
              //   onChange={inputProDes}
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
