require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;  
const bodyParser = require('body-parser')

const { MongoClient, ServerApiVersion } = require('mongodb');

//process.env.MONGO_PWD;
process.env.MONGO_URI;

//const uri = "mongodb+srv://mskel:pqS8mfOlkDVffucp@cluster0.3rcspda.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("fruits");
  // perform actions on the collection object
  client.close();
});
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("test").collection("fruits");
    // const collection = client.db("papa").collection("dev-profiles");
    const result = await collection.find().toArray();
    //const result = await collection.findOne(); 
    console.log("cxnDB result: ", result);
    return result; 
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}

app.get('/', (req, res) => {
  //res.send('Hello World This is Meghan! <br/> <a href="mongo">mongo</a>');

  res.render('index');
})

app.get('/mongo', async (req, res) => {

  // res.send("check your node console, bro");

  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[1].name); 

  res.send(`here ya go, joe. ${ result[1].name }` ); 

})

app.get('/update', async (req, res) => {
  
  //get data from the form
  
  console.log("in get to slash update:", req.query.ejsFormName); 
  myName = req.query.ejsFormName;
  
  //update in the database

  client.connect; 
  const collection = client.db("test").collection("fruits");
  await collection.insertOne({
    name: "mango"
  })
})

console.log('in the node console');

app.listen(PORT, () => {
  console.log(`Example app listening on port ${ PORT }`)
})