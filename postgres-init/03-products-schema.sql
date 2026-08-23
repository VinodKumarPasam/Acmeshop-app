\connect products_db;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, image) VALUES
('iPhone 16 Pro','Apple Smartphone',129999,'iphone16pro.jpg'),
('Samsung Galaxy S25','Samsung Smartphone',109999,'samsung_galaxy_s25.jpg'),
('MacBook Air M4','Apple Laptop',149999,'macbook_air_m4.jpg'),
('Sony WH1000XM6','Noise Cancelling Headphones',32999,'sony_wh1000xm6.jpg'),
('Apple Watch Ultra 2','Smart Watch',89999,'apple_watch_ultra2.jpg'),
('iPad Air','Apple Tablet',69999,'ipad_air.jpg'),
('Logitech MX Master 3S','Wireless Mouse',9999,'logitech_mx_master_3s.jpg'),
('Dell UltraSharp 27','Monitor',45999,'dell_ultrasharp_27.jpg'),
('Mechanical Keyboard','RGB Keyboard',7999,'mechanical_keyboard.jpg'),
('Kindle Paperwhite','E-Reader',15999,'kindle_paperwhite.jpg');