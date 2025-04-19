import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import Student from "../models/student.model.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if ( !email || !fullName || !password ) {
           return res.status(400).json({ message: "All fields are required"});
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }

        const student = await Student.findOne({email});
        if(student) return res.status(400).json({ message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newStudent) {
            generateToken(newStudent._id, res);
            await newStudent.save();

            res.status(201).json({ _id: newStudent._id,
                fullName: newStudent.fullName,
                email: newStudent.email,
                profilePic: newStudent.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid student data"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const login = async (req, res) => {
    const { email, password }= req.body;
    try {
        const student = await Student.findOne({ email})

        if(!student){
            return res.status(400).json({ message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, student.password)
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid Credentials"})
        }

        generateToken(student._id, res)

        res.status(200).json({ 
            _id: student._id,
            fullName: student.fullName,
            email: student.email,
            profilePic: student.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0})
        res.status(200).json({ message: "Logged out successfully"});
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const updateProfile = async (req, res) => {
    try {
      const studentId = req.student._id;
      const { fullName, email, profilePic } = req.body;
  
      const updatedData = {};
  
      if (fullName) updatedData.fullName = fullName;
      if (email) updatedData.email = email;
  
      // Only upload profilePic if provided
      if (profilePic) {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updatedData.profilePic = uploadResponse.secure_url;
      }
  
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        updatedData,
        { new: true }
      );
  
      res.status(200).json({
        _id: updatedStudent._id,
        fullName: updatedStudent.fullName,
        email: updatedStudent.email,
        profilePic: updatedStudent.profilePic,
      });
    } catch (error) {
      console.log("Error in updateProfile controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.student);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error"});
      
    }
  }
