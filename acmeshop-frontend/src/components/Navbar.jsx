import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {

    localStorage.removeItem("token");

    alert("✅ Logged Out Successfully");

    navigate("/login", { replace: true });

  }

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (

    <nav
      style={{
        background: "#020617",
        color: "white",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
      }}
    >

      <h2
        style={{
          color: "#3B82F6",
          cursor: "pointer"
        }}
        onClick={() => navigate("/products")}
      >
        🛒 AcmeShop
      </h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
          fontSize: "18px",
        }}
      >

        {
          token ? (
            <>

              <Link style={linkStyle} to="/products">
                Products
              </Link>

              <Link style={linkStyle} to="/cart">
                Cart
              </Link>

              <Link style={linkStyle} to="/orders">
                Orders
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: "#EF4444",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Logout
              </button>

            </>
          ) : (
            <>

              <Link style={linkStyle} to="/login">
                Login
              </Link>

              <Link style={linkStyle} to="/signup">
                Signup
              </Link>

            </>
          )
        }

      </div>

    </nav>

  );

}

export default Navbar;