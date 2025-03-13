import prisma from "../config/db.config.js";

class UserController {

    static async getUser(req, res) {
     try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where:{
                id: id
            }
        });

        return res.status(200).json(user);
     } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
     }

    }

}


export default UserController;