import {publicIp, publicIpv4, publicIpv6} from 'public-ip';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler( req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    // Get the user's IP address
    const ip = await publicIp();
    const ipv4 = await publicIpv4();
    const ipv6 = await publicIpv6();
    const rd = JSON.stringify(req.body);
    const data = {
      ip, ipv4, ipv6, rd
    };
    // await movieRoom.insertOne(data);
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