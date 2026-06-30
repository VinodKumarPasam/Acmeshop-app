import { cartApi } from "../services/api";

function ProductCard({ product }) {
  

  async function handleAddToCart() {
    console.log("🔥 Button Clicked");

    try {
      console.log("📤 Sending Request...");

      const response = await cartApi.post("/", {
        product_id: product.id,
        quantity: 1,
      });
      console.log("✅ Response:", response.data);

      alert("✅ Product Added To Cart");

    } catch (err) {

      console.error(err);
      if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Data:", err.response.data);
    } 

      alert("❌ Failed To Add Cart");

    }

  }

  return (

    <div
      style={{
        background: "#1E293B",
        color: "white",
        borderRadius: "12px",
        padding: "25px",
        border: "1px solid #334155",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      }}
    >

      <h2>{product.name}</h2>

      <p
        style={{
          color: "#CBD5E1",
          marginTop: "10px",
        }}
      >
        {product.description}
      </p>

      <h2
        style={{
          color: "#22C55E",
          marginTop: "15px",
        }}
      >
        ₹ {product.price}
      </h2>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        🛒 Add To Cart
      </button>

    </div>

  );

}

export default ProductCard;