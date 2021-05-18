import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema  = new Schema({
    username:{
        type: String,
        unique: true,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    id:{
        type: String        
    }
});

export default mongoose.model('User', userSchema);