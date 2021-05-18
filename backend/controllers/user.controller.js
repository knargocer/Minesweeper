import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.entity.js';

export const signin = async(req,res) =>{
    const {username, email, password} = req.body;
    const flag = email?true:false;
    let accountHolder = null;
    try{
        
        if(flag){
        accountHolder = await User.findOne({email})
        }
        
        else{
        accountHolder = await User.findOne({username}) ;}
    
        if(!accountHolder) {
            alert('no such user')
            return res.status(400).json({message:'invalid username or password'})
            
        }
        const passwordCheck = await bcrypt.compare(password, accountHolder.password)
        
        if(!passwordCheck){
            return res.status(400).json({message:'invalid username or password'})
        }
        
        const token =jwt.sign({ userId: accountHolder._id, username: accountHolder.username }, 'process.env.JWT_SECRET', {expiresIn:'1h'});
   
        res.status(200).json({result: accountHolder, token })
        }

    catch(err){
        res.status(500).json({message:'There was an error!'})
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body;
  
    try {
      const accountHolder = await User.findOne({ username });
  
      if (accountHolder) return res.status(400).json({ message: 'Username already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email,username, password: hashedPassword, firstName, lastName });
  
      const token = jwt.sign( { email: result.email, id: result._id }, 'process.env.JWT_SECRET', { expiresIn: '1h'});
  
      res.status(200).json({ result, token });
    } catch (error) {
      res.status(500).json({ message:'There was an error'  });
      
      console.log(error);
    }
  };