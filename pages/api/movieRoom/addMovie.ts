// movieRoom.find({roomid: '5wz-eiu7', pass1: 'pass'}).toArray()
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://amey-kudari:newpass@cluster0.9pwrmbn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const movieRoom = client.db('ameykudari').collection('movierooms');


function createId() {
  var dt = new Date().getTime();
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let id = "";
  for(let i=0;i<7;i++){
    id+=characters[(dt + Math.floor(Math.random() * characters.length))%characters.length]
    if(i==2) id+='-';
  }
  return id;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    const { roomid, movie } = req.body;
    if(!roomid || !movie){
      res.status(400).json({error: true});
      return;
    }

    await client.connect();
    

    try {
      const result = await movieRoom.updateOne({ roomid }, { $push: { movies: movie } });
      res.status(200).json({error: false, data: result});
      // const rooms = await movieRoom.find({roomid}).toArray();
      // if(rooms.length > 0 && (rooms[0].pass1 === pass || rooms[0].pass2 === pass)){
      //   res.status(200).json({error: false, data : {...rooms[0], user : rooms[0].pass1 === pass ? rooms[0].user1 : rooms[0].user2 }});
      // } else res.status(400).json({error: true});
  } catch {
    res.status(500).json({error: true});
  }
}