require('dotenv').config();

const express = require("express");
const {MongoClient, ObjectId} = require("mongodb");
const app = express();
const port=process.env.PORT|| 3000;

const mongoClient = new MongoClient(process.env.ATLAS_URI);

app.get("/api/home/", async (req,res)=>{
    try {
        await mongoClient.connect();
        const data = await mongoClient.db('homes').collection('states').find().toArray();       
        res.send(data);
    } catch (error) {
        console.error('Request failed!', error);
    }
});

app.get("/api/home/:id", async (req,res)=>{
    try {
        await mongoClient.connect();
        const data = await mongoClient.db('homes').collection('states').find({_id:new ObjectId(req.params.id)}).toArray();       
        res.send(data);
    } catch (error) {
        console.error('Request failed!', error);
    }
});

app.post("/api/home/", async (req,res)=>{
    try {
        await mongoClient.connect();
        const data = await mongoClient.db('homes').collection('states').insertOne({
            router: false,
            music: false,
            rooms: [
              {
                id: 0,
                name: "Wohnzimmer",
                light: false,
                temperature: 25,
                tempChangable: true,
                controlTemperature: 0,
                humidity: 50
              },
              {
                id: 1,
                name: "Schlafzimmer",
                light: false,
                temperature: 25,
                tempChangable: true,
                controlTemperature: 0,
                humidity: 50
              },
              {
                id: 2,
                name: "Küche",
                light: false,
                fridge: true,
                temperature: 25,
                tempChangable: true,
                controlTemperature: 0,
                humidity: 50
              },
              {
                id: 3,
                name: "Bad",
                light: false,
                temperature: 25,
                tempChangable: true,
                controlTemperature: 0,
                humidity: 50
              },
              {
                id: 4,
                name: "Balkon",
                light: false,
                temperature: 25,
                tempChangable: false,
                controlTemperature: 0,
                humidity: 50
              }
            ]
          });       
        res.send(data);
    } catch (error) {
        console.error('Request failed!', error);
    }
});

app.delete("/api/home/:id", async (req, res)=>{
  try {
    await mongoClient.connect();
    if((await mongoClient.db('homes').collection('states').find().toArray()).length !== 0) {
      const data = await mongoClient.db('homes').collection('states').deleteOne({_id: new ObjectId(req.params.id)});
      res.send(data);
    } else {
      res.status(404).send("Ist net verfuegbar");
    }
      
  } catch (error) {
    console.error('Request failed!', error);
  }
});

app.listen(port, () => {
  console.log(`Listening on :${port}`);
});