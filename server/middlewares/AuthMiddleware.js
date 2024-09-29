import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.status(400).send("Invalid token.");
        }
        req.userId = payload.userId;
        next();
    });
}