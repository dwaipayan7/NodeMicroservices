import prisma from "../config/db.config.js";
import axios from "axios";

class PostController {

    static async index (req, res){

        try {

            const posts = await prisma.post.findMany({});

            let userIds = [];

            posts.map((post) => {
                userIds.push(post.user_id);
            });

            //Method 1

            let postWithUsers = await Promise.all(
                posts.map(async (post) => {

                    const res = await axios.get(`${process.env.AUTH_MICRO_URL}/api/getUser/${post.user_id}`);

                    return {
                        ...post,
                        ...res.data
    
                }

                })

             
            )
        

            // return res.status(200).json({posts,  userIds});
            return res.status(200).json({postWithUsers});
            
        } catch (error) {
            
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

    }



    static async store(req, res){
        try {

            const authUser = req.user;
            const { title, content } = req.body;

            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    user_id: authUser.id
                }
            });

            return res.status(201).json({msg:"Post created successfully", post});
            
        } catch (error) {
            
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}


export default PostController;