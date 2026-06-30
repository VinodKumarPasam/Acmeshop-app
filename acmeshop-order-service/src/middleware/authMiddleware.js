const jwt = require("jsonwebtoken");

// Authentication Middleware
function authenticate(req, res, next) {

    console.log("\n==============================");
    console.log("NEW REQUEST");
    console.log("==============================");

    // Read Authorization Header
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:");
    console.log(authHeader);

    // No Authorization Header
    if (!authHeader) {

        console.log("❌ No Authorization Header Found");

        return res.status(401).json({
            error: "Token missing"
        });

    }

    try {

        // Extract Token
        const token = authHeader.split(" ")[1];

        console.log("\nExtracted Token:");
        console.log(token);

        console.log("\nJWT Secret:");
        console.log(process.env.JWT_SECRET);

        console.log("\nSecret Length:");
        console.log(process.env.JWT_SECRET?.length);

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("\n✅ JWT VERIFIED SUCCESSFULLY");
        console.log(decoded);

        // Store logged-in user
        req.user = decoded;

        next();

    } catch (err) {

        console.log("\n❌ JWT VERIFY FAILED");
        console.log("Error Name :", err.name);
        console.log("Error Message :", err.message);
        console.log(err);

        return res.status(401).json({
            error: err.message
        });

    }

}

module.exports = authenticate;