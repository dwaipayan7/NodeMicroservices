import bcrypt from 'bcrypt';
import prisma from '../config/db.config.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "All fields (name, email, password) are required" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            const user = await prisma.user.create({
                data: { 
                    name,
                    email,
                    password: hashedPassword
                }
            });


            return res.status(201).json({
                message: "User created successfully",
                user
            });

        } catch (error) {
            console.error("Registration Error:", error);  
            return res.status(500).json({ error: "Internal server error", details: error.message });
        }
    }


    static async login(req, res) {
        try {

            const {email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "All fields (email, password) are required" });
            }

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            if(!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const payload = {
                id: user.id,
                name:user.name,
                email:user.email
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

            return res.status(200).json({
                message: "Login successful",
                token
            });

            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", details: error.message });
            
        }
    }


}

export default AuthController;
