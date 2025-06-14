import dbConnect from '../../lib/dbConnect';
import Product from '../../models/ProductModel';

export default async function handler(req, res) {
  // First, handle the browser's preflight OPTIONS request.
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Next, ensure we only accept GET requests for the main logic.
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { category } = req.query;

  try {
    await dbConnect();

    let products;
    if (!category || category.toUpperCase() === 'ALL') {
      products = await Product.find({});
    } else if (category.toUpperCase() === 'MEN') {
      products = await Product.find({ gender: 'male', adult: true });
    } else if (category.toUpperCase() === 'WOMEN') {
      products = await Product.find({ gender: 'female', adult: true });
    } else if (category.toUpperCase() === 'KIDS') {
      products = await Product.find({ adult: false });
    } else {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid category specified' });
    }

    res.status(200).json({ products }); // Sending the nested object as your frontend expects
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
