import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema({

    videofile: {
        type: String, // cloudnary Url
        required: true
    },
    thumbnail: {
        type: String, //cloudnary Url
        required: true
    },

    title: {
        type: String,
        required: true
    }, 

    Description: {
        type: String,
        required: true
    },

    Duration : {
        type: Number, //cloudinary Url
        required : true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished : {
        type: Boolean,
        default: true
    },
    
    Owner: {
        type: Schema.Types.ObjectID,
        ref: "User"
    }
   
},
{
    timestamps: true

}
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)

/*

videoSchema has much methods. Inside an Mongoose Many Middleware are present, itself plugin can be injected
pre -> before saving data perform some Action or (post) -> After Saving Some data perform some action.
Data(Post).

2. Now has to install an bcrypt() and jsonwebtoken

*/