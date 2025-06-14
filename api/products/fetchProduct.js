import dbConnect from '../../lib/dbConnect';
import Product from '../../models/ProductModel';

export default async function handler(req, res) {
  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Ensure we only accept GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // This is the key change: We get the name from the query parameter
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, error: 'Product name not provided in query.' });
  }

  try {
    await dbConnect();

    // The query name is already decoded.
    const product = await Product.findOne({ name: name });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found in database' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
