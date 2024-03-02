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


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    const { roomid, movie } = req.body;
    if(!roomid || !movie){
      res.status(400).json({error: true});
      return;
    }

    const { w1, w2, name } = movie;

    await client.connect();
    try {
      const result = await movieRoom.updateOne({roomid, "movies.name": name }, {  $set: { "movies.$.w1": w1, "movies.$.w2": w2 } });
      if(result.modifiedCount) res.status(200).json({error: false, message: "Deleted Successfully"});
      else res.status(400).json({error: true, message: "Bad Request"});
    } catch {
      res.status(500).json({error: true});
    }
}