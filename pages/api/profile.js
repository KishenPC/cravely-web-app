// pages/api/profile.js
import dbConnect from '../../lib/db';
import { User } from '../../lib/schemas';

export default async function handler(req, res) {
  try {
    await dbConnect();
    if (req.method === 'GET') {
      // For demo, return the first user as the profile
      const profile = await User.findOne({});
      res.status(200).json(profile);
    } else if (req.method === 'POST') {
      const profile = new User(req.body);
      await profile.save();
      res.status(201).json(profile);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error('API /profile error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
