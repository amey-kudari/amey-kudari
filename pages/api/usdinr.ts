import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';


const headers = {
  'authority': 'query1.finance.yahoo.com',
  'accept': '*/*',
  'accept-language': 'en-GB,en;q=0.9',
  'origin': 'https://finance.yahoo.com',
  'referer': 'https://finance.yahoo.com/',
  'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

const params = {
  'symbol': 'INR=X',
  'period1': '1397372400',
  'period2': '11706654493',
  // 'interval': '1d',
  'interval': '1wk',
  'region': 'US',
}

export const getUsdInr = () => {
  const url = 'https://query1.finance.yahoo.com/v8/finance/chart/INR=X';
  return axios.get(url, {
    headers,
    params,
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  getUsdInr().then(tres => {
    res.status(200).json(tres.data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close);
  }).catch(err => {
    res.status(400).json({message: 'FAIL'});
  })
}