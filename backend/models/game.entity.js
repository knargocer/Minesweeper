import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameSchema  = new Schema({
    player_username:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true,
        default: 0 
    },
    id:{
        type: String        
    },
});

export default mongoose.model('Game', gameSchema);