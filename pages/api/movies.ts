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

// mongodb+srv://<username>:<password>@cluster0.9pwrmbn.mongodb.net/?retryWrites=true&w=majority
const setMovies = (movies: any) => {
  const collection = client.db("test").collection("test");
  return collection.updateOne({}, { $set: { movies } });
};

const getMovies = () => {
  const collection = client.db("test").collection("test");
  return collection
    .findOne({})
    .then((res) => res?.movies)
    .catch((err) => err);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    const movies = req.body.movies;
    if(movies){
      setMovies(movies).then(() => res.json({ message: 'SET SUCCESSFULLY' })).catch(err => res.status(400).json({message: 'NO MOVIES'}));
    } else res.status(400).json({});
    res.json({});
  } else {
    getMovies().then(moviesRes => res.status(200).json(moviesRes)).catch(err => res.status(400).json({}));
  }
}