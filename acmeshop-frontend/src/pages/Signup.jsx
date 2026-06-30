import { useState } from "react";
import { userApi } from "../services/api";

function Signup() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  async function handleSignup() {
    console.log("Signup button clicked");

    try {

      const response =
        await userApi.post(
          "/signup",
          {
            name,
            email,
            password
          }
        );

      alert(
        "User created successfully"
      );
      setName("");
      setEmail("");
      setPassword("");

      console.log(response.data);

    } catch (err) {

      console.error(err);

      alert(
        "Signup Failed"
      );

    }

  }

  return (

    <div className="container">

      <h1>Signup</h1>

      <br />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button
        onClick={handleSignup}
      >
        Signup
      </button>

    </div>

  );
}

export default Signup;