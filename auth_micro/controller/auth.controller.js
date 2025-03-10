import bcrypt from 'bcrypt';
import prisma from '../config/db.config.js';

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
}

export default AuthController;
