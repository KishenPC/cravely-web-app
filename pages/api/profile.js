// pages/api/profile.js
import dbConnect from '../../lib/db';
import { Profile } from '../../lib/schemas';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    // For demo, just return the first profile
    const profile = await Profile.findOne({});
    res.status(200).json(profile);
  } else if (req.method === 'POST') {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } else {
    res.status(405).end();
  }
}
