const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;

require('dotenv').config()
const hostname="0.0.0.0";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port =process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wkh8y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ServiceCollection = client.db(`${process.env.DB_NAME}`).collection("services");
  const OrdersCollection = client.db(`${process.env.DB_NAME}`).collection("orders");
  //add service
  app.post('/addService',(req,res)=>{
    const addService=req.body;
    ServiceCollection.insertOne(addService)
    .then(result=>{
      console.log(result.insertedCount);
      res.send(result.insertedCount>0);
    })
  })

  //get all services to manage services

  app.get('/getAllServices',(req,res)=>{
    ServiceCollection.find({})
    .toArray((error,documents)=>{
      res.send(documents);
    })
  })
  
  //add Orders
  app.post('/addOrder',(req,res)=>{
    const addOrder=req.body;
    OrdersCollection.insertOne(addOrder)
    .then(result=>{
      console.log(result);
      res.send(result.insertedCount>0);
    })
  })

  //get all orders

  app.get('/getAllOrders',(req,res)=>{
    OrdersCollection.find({})
    .toArray((error,documents)=>{
      res.send(documents);
    })
  })
});


app.get('/', (req, res) => {
    res.send('Hello World')
  })
  
  app.listen(process.env.PORT || port);