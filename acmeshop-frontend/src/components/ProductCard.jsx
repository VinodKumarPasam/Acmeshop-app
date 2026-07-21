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
        transition: "0.3s",
      }}
    >

      {/* Product Image */}

      <img
        src={`/images/${product.image}`}
        alt={product.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "contain",
          background: "#fff",
          borderRadius: "10px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      {/* Product Name */}

      <h2
        style={{
          marginBottom: "10px",
        }}
      >
        {product.name}
      </h2>

      {/* Description */}

      <p
        style={{
          color: "#CBD5E1",
          minHeight: "60px",
          lineHeight: "1.5",
        }}
      >
        {product.description}
      </p>

      {/* Price */}

      <h2
        style={{
          color: "#22C55E",
          marginTop: "15px",
          marginBottom: "20px",
        }}
      >
        ₹ {Number(product.price).toLocaleString("en-IN")}
      </h2>

      {/* Add To Cart */}

      <button
        onClick={handleAddToCart}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🛒 Add To Cart
      </button>

    </div>

  );

}

export default ProductCard;