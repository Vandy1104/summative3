const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js'); //this refers to the structure for user ojects
const Product = require('./models/product.js'); //this refers to the structure for product ojects
const Comment = require('./models/comment.js'); //this refers to the structure for comment ojects

const port = 3000; //set server port

//connect to db

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/summative3db?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // connect to above
.then(()=> console.log('DB connected!')) //success message
.catch(err =>{ //error catch
  console.log(`DBConnectionError: ${err.message}`); //error message
});

//test the connectivity
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function() { // on open do this once
  console.log('We are connected to mongo db'); // success message
});


//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // for creating encrypted passwords
app.use(cors());



// *******  code from Pearly start

//sets request format
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`); //missed this bit but keep it
  next();//include this to go to the next middleware
});

//prints message on load
app.get('/', (req, res) => res.send('Hello World!'))




// code from Pearly end here




// ********** code from Vandy start


// code from Vandy end here





//********** code from Kristine start

//register user start
app.post('/registerUser', (req,res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{

    if (userResult){
      res.send('username taken already. Please try another one');
    } else{
       const hash = bcryptjs.hashSync(req.body.password);
       const user = new User({
         _id : new mongoose.Types.ObjectId,
         username : req.body.username,
         firstName : req.body.firstName,
         lastName : req.body.lastName,
         email : req.body.email,
         password : hash,
         businessName : req.body.businessName,
         businessAbout : req.body.businessAbout
       });

       user.save().then(result =>{
         res.send(result);
       }).catch(err => res.send(err));
    }
  })
});
//register user end

//login the user start
app.post('/loginUser', (req,res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      if (bcryptjs.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else {
        res.send('not authorized');
      }
    } else {
       res.send('user not found. Please register');
    }
  });
});
//login the user end

// update user start
app.patch('/updateUser/:uID', (req,res)=>{
  const idParam = req.params.uID;
    User.findById(idParam, (err,result)=>{
      const updateUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        businessName : req.body.businessName,
        businessAbout : req.body.businessAbout
      };
      User.updateOne({_id:idParam}, updateUser).then(result=>{
        res.send(result);
      }).catch(err=> res.send(err));
    }).catch(err=>res.send("Not found"))
});



//********** code from Kristine end here


//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))
