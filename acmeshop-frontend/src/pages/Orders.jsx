import { useEffect, useState } from "react";

import { orderApi } from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    async function loadOrders() {

        const res = await orderApi.get("/");

        setOrders(res.data);

    }

    return (

        <div style={{ padding: "40px" }}>

            <h1>My Orders</h1>

            {

                orders.map(order => (

                    <div

                        key={order.id}

                        style={{

                            background: "#1E293B",

                            color: "white",

                            padding: "20px",

                            marginBottom: "20px",

                            borderRadius: "10px"

                        }}

                    >

                        <h2>

                            Order #{order.id}

                        </h2>

                        <p>

                            Status :

                            {order.status}

                        </p>

                        <h3>

                            ₹ {order.total}

                        </h3>

                    </div>

                ))

            }

        </div>

    );

}

export default Orders;