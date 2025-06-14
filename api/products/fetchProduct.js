import dbConnect from '../../lib/dbConnect';
import Product from '../../models/ProductModel';

export default async function handler(req, res) {
  // Handle the browser's preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // We only want to accept POST requests for this endpoint
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // Get the item's name from the request body
  const { itemName } = req.body;

  if (!itemName) {
    return res
      .status(400)
      .json({
        success: false,
        error: 'itemName not provided in request body.',
      });
  }

  try {
    await dbConnect();

    // Find the product in the database by its name
    const product = await Product.findOne({ name: itemName });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found in database' });
    }

    // If found, return the product data
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
