import { useState, useEffect } from "react";
import { userApi } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/products", { replace: true });
    }

  }, [navigate]);

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response = await userApi.post("/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("✅ Login Successful");

      navigate("/products", { replace: true });

    } catch (err) {

      console.error(err);

      alert("❌ Login Failed");

    }

  }

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >

      <form
        onSubmit={handleLogin}
        style={{
          width: "420px",
          background: "#1E293B",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #475569",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "1px solid #475569",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;