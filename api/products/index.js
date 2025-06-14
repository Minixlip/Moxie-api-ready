import dbConnect from '../../lib/dbConnect';
import Product from '../../models/ProductModel';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { category } = req.query; // Get category from query string, e.g., /api/products?category=MEN

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
      return res.status(400).json({ error: 'Invalid category specified' });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
