// pages/api/track.js

import {publicIp, publicIpv4, publicIpv6} from 'public-ip';
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

const movieRoom = client.db('ameykudari').collection('keyval');


export default async function handler( req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  // Ensure it's a GET request
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    // Get the user's IP address
    const ip = await publicIp();
    const ipv4 = await publicIp();
    const ipv6 = await publicIp();
    const rd = JSON.stringify(req.body);
    const roomid = 't5s-guaa';
    const data = {
      ip, ipv4, ipv6, rd
    };
    await movieRoom.insertOne(data);




    res.status(200).json({
      ip,
      ipv4,
      ipv6,
      rd,
    });
  } catch (error) {
    console.error('Error tracking IP and location:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}