import jwt from 'jsonwebtoken';

const auth = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        let data;
        if(token){
            data = jwt.verify(token, 'process.env.JWT_SECRET')
            req.userId = data?.id;
        }
    next();
    }
    catch(err){
        console.log(err)
    }
}