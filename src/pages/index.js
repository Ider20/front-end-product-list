import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { Modal } from "./Components/Modal";
import { UpdateModal } from "./Components/UpdateModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [showUpdateModal, setShowUpdateModel] = useState(false);

  const [test, setTest] = useState("");
  const openUpdateModal = (e) => {
    console.log(e.parentNode.children[0].innerText);
    setTest(e.parentNode.children[0].innerText);
    setShowUpdateModel(true);
  };
  const closeUpdateModal = () => setShowUpdateModel(false);

  // Fetching Data from BackEnd
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  //===========================================================================
  //Handling delete
  const handleDelete = async (id) => {
    console.log("product id", id);
    try {
      const response = await fetch("http://localhost:8080/products/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert("We have problem to delete");
    }
    fetchProducts();
  };

  return (
    <div className="">
      <Modal showModal={showModal} closeModal={closeModal} />
      <UpdateModal
        test={test}
        showUpdateModal={showUpdateModal}
        closeUpdateModal={closeUpdateModal}
      />
      <div className="flex justify-center items-center gap-10 mb-10 pt-10">
        <label>Add a product to This list</label>
        <button onClick={openModal} className="border p-1 rounded-md">
          Click here
        </button>
      </div>
      {products.map((product) => {
        return (
          <div className="flex gap-2 justify-center items-center">
            <div className="w-[200px] mb-6">{product?.name}</div>
            <div className="w-[200px] mb-6">{product?.price}</div>
            <div className="w-[200px] mb-6">{product?.description}</div>
            <button
              className="border p-1 rounded-lg w-[100px] h-[40px] mb-6"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
            <button
              onClick={(e) => openUpdateModal(e.target)}
              className="border p-1 rounded-lg w-[100px] h-[40px] cursor-pointer mb-6"
            >
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
}
