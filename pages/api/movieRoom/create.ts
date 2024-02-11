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
    const { user1, pass1, user2, pass2 } = req.body;
    await client.connect();
    if(!user1 || !pass1 || !user2 || !pass2){
      res.status(400).json({error: true});
      return;
    }

    try {
      let roomid = createId() || 'asdf-qwer-qwer';
      let idExists = await movieRoom.findOne({roomid});
      while(idExists?.roomid){
        roomid = createId();
        idExists = await movieRoom.findOne({roomid});
      }

      await movieRoom.insertOne({
        roomid,
        user1,
        pass1,
        user2,
        pass2,
        movies : [],
      });
      res.status(200).json({error: false, roomid});
  } catch {
    res.status(500).json({error: true});
  }
}