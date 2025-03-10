import bcrypt from 'bcrypt';

class AuthController{

    static async register(req, res){

        const payload = req.body;

        return res.send(payload);

    }

}


export default AuthController;