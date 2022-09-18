const mongoose = require ("mongoose")
mongoose.connect("mongodb+srv://muhaz:6VE8Lk82R6vAuBok@cluster0.syf7fzi.mongodb.net/user-db",{
    useNewURLParser : true,
    useUnifiedTopology : true
    // useCreateIndex : true
})
.then(()=>{
    console.log("MongoDB is connected...");
})
.catch((error)=>{
    console.log("Sorry, couldn't connect to MongoDB !");
})