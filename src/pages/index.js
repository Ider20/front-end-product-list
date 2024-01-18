import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // Fetching Data from BackEnd
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [products]);

  const handleOpen = () => {
    setIsOpen(true);
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
  //--------------------------------------
  // Handling Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedId = () => {
      return Math.floor(Math.random() * 100);
    };
    const productData = {
      id: generatedId(),
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
      } else {
        alert("Failed to create product");
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other issues
    }
  };

  return (
    <div>
      <div>
        <label>Add product</label>
        <button onClick={handleOpen}>Click here</button>
        {isOpen ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Product Name:
                <input
                  placeholder=""
                  value={productName}
                  onChange={inputProName}
                />
              </label>
              <label>
                Product Price:
                <input
                  placeholder=""
                  onChange={inputProPrice}
                  value={productPrice}
                />
              </label>
              <label>
                Product Description:
                <input
                  placeholder=""
                  onChange={inputProDes}
                  value={productDescription}
                />
              </label>
            </div>

            <button className="border p-1 rounded-lg" type="submit">
              Submit
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
      {products.map((product) => {
        return (
          <div className="flex gap-10">
            <div className="w-[200px]">{product?.name}</div>
            <div>{product?.price}</div>
            <div>{product?.description}</div>
            <button className="border p-1 rounded-lg">Delete</button>
          </div>
        );
      })}
    </div>
  );
}
