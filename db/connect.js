const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(
            //url 
            "mongodb+srv://kin:kd0MNdBgDOs8Iy4O@cluster0.p7omz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				autoIndex: false,
			}
        )
        console.log("Connect Database")
    }catch(err){
        throw new Error(err)
    }
}

const disconnectDB = async()=>{
    try{
        await mongoose.disconnect()
        console.log("Disconnect Database")
    }catch (err){
        throw new Error(err) 
    }
}

module.exports = { connectDB , disconnectDB}