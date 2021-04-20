// nodemon is used so that we need not start the server again and again. refer "package.json scripts" to see how it is used.
//mongoose is used to use MongoDb

require('dotenv').config() //allows us to use the env variables in the main file.
const express =require('express'); //express is used to configure routes 
const mongoose=require('mongoose');
const morgan=require('morgan'); //used as middleware
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const expressValidator=require('express-validator');
const cors=require('cors'); //providing a Connect/Express middleware that can be used to enable CORS with various options.

//import routes
const authRoutes=require('./Routes/Auth');
const userRoutes=require('./Routes/User');
const categoryRoutes=require('./Routes/Category');
const productRoutes=require('./Routes/Product');

//app
const app=express();


//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    UseCreateIndex:true
}).then(()=>console.log("Database Connected"));


//middleware
app.use(morgan('dev'));
app.use(cors()); /*api can now handle requests coming form different origins in port 8000, 
                    suppose we run front end on 3000..to connect 3000 to 8000 we need this package*/
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());




//routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);


const port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


