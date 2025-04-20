import jwt from "jsonwebtoken"

export const generateToken = (studentId, res) =>{
    const token = jwt.sign({studentId}, process.env.JWT_SECRET, { expiresIn: "7d"})

    res.cookie("jwt", token, { maxAge: 7*24*60*60*1000, httpOnly: true, sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    "secure": process.env.NODE_ENV === "production"});

    return token;
}