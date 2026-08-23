import { useEffect, useState } from "react";
import { cartApi, orderApi } from "../services/api";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  async function loadCart() {

    try {

      const res = await cartApi.get("/");

      setCartItems(res.data);

    } catch (err) {

      console.error(err);

    }

  }

  useEffect(() => {

    loadCart();

  }, []);

  async function increase(item) {

    await cartApi.patch(`/${item.id}`, {
      quantity: item.quantity + 1
    });

    loadCart();

  }

  async function decrease(item) {

    await cartApi.patch(`/${item.id}`, {
      quantity: item.quantity - 1
    });

    loadCart();

  }

  async function removeItem(id) {

    await cartApi.delete(`/${id}`);

    loadCart();

  }

  function total() {

    return cartItems.reduce(

      (sum, item) => sum + Number(item.price) * item.quantity,

      0

    );

  }

  async function checkout() {

    try {

      await orderApi.post("/");

      alert("✅ Order Created");

      loadCart();

    } catch (err) {

      console.error(err);

      alert("❌ Checkout Failed");

    }

  }

  return (

    <div style={{ padding: "40px" }}>

      <h1>Your Cart</h1>

      {

        cartItems.length === 0 &&

        <h3>Cart Empty</h3>

      }

      {

        cartItems.map((item) => (

          <div

            key={item.id}

            style={{

              background: "#1E293B",

              color: "white",

              padding: "25px",

              borderRadius: "10px",

              marginBottom: "25px"

            }}

          >

            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center"
              }}
            >

              <img
                src={`/images/${item.image}`}
                alt={item.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                  background: "white",
                  borderRadius: "10px",
                  padding: "10px"
                }}
              />

              <div>

                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <h3>

                  Price :

                  ₹ {Number(item.price).toLocaleString("en-IN")}

                </h3>

              </div>

            </div>

            <div

              style={{

                display: "flex",

                alignItems: "center",

                gap: "15px",

                marginTop: "20px"

              }}

            >

              <button

                onClick={() => decrease(item)}

              >

                -

              </button>

              <h3>

                {item.quantity}

              </h3>

              <button

                onClick={() => increase(item)}

              >

                +

              </button>

            </div>

            <h3>

              Subtotal :

              ₹ {(Number(item.price) * item.quantity).toLocaleString("en-IN")}

            </h3>

            <button

              onClick={() => removeItem(item.id)}

              style={{

                background: "red",

                color: "white",

                padding: "10px",

                marginTop: "15px"

              }}

            >

              Remove

            </button>

          </div>

        ))

      }

      <hr />

      <h2>

        Grand Total :

        ₹ {total().toLocaleString("en-IN")}

      </h2>

      {

        cartItems.length > 0 &&

        <button

          onClick={checkout}

          style={{

            padding: "15px",

            background: "#2563EB",

            color: "white",

            marginTop: "20px"

          }}

        >

          Proceed To Checkout

        </button>

      }

    </div>

  );

}

export default Cart;