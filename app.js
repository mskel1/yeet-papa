const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;  

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://barry:dGtkiX5G9ogB9DUZ@cluster0.taug6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log("before connection");

client.connect(err => {
  console.log("in connect method");
  const collection = client.db("papa").collection("dev-profiles");
  console.log("decl collection");
  console.log(collection.findOne()); 
  client.close();
});


app.get('/', (req, res) => {
  res.send('Hello World This is Barry 3!');

  client.connect(err => {
    console.log("in connect method");
    const collection = client.db("papa").collection("dev-profiles");
    console.log("decl collection");
    console.log(collection); 
    client.close();
  });

})

console.log('in the node console');

app.listen(PORT, () => {
  console.log(`Example app listening on port ${ PORT }`)
})