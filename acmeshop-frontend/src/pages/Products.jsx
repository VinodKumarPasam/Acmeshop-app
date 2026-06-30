import { useEffect, useState } from "react";
import { productApi } from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  async function fetchProducts() {

    try {

      const response = await productApi.get("/");

      setProducts(response.data);

    } catch (err) {

      console.error(err);

    }

  }

  return (

    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "30px",
          color: "white",
        }}
      >
        Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "25px",
        }}
      >

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>

  );

}

export default Products;