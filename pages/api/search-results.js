// pages/api/search-results.js
import dbConnect from '../../lib/db';
import { SearchResult } from '../../lib/schemas';

export default async function handler(req, res) {
  try {
    await dbConnect();
    if (req.method === 'GET') {
      const results = await SearchResult.find({});
      res.status(200).json(results);
    } else if (req.method === 'POST') {
      const result = new SearchResult(req.body);
      await result.save();
      res.status(201).json(result);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error('API /search-results error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
