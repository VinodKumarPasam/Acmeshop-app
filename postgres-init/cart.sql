\connect acmeshop;

CREATE TABLE IF NOT EXISTS cart_items (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    product_id INTEGER NOT NULL,

    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, product_id)

);