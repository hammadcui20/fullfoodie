import mongoose from 'mongoose';

const review=new mongoose.Schema({
    rating:{
        type:Number
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
    ,
    Comments:{
        type:String,
        required:true
    }
},{
    timestamps: true
  })

const reviews=mongoose.model("review",review);

export default reviews;