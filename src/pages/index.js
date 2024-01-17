import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState([]);

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
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <>
            <div>{product.products}</div>
            <div>{product.last_name}</div>
          </>
        );
      })}
    </div>
  );
}
