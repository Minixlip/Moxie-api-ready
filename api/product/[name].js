import dbConnect from '../../lib/dbConnect';
import Product from '../../models/ProductModel';

export default async function handler(req, res) {
  // Log the start of the function execution
  console.log('--- SINGLE PRODUCT API ENDPOINT TRIGGERED ---');

  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    console.log('Responding to OPTIONS request.');
    res.status(200).end();
    return;
  }

  // Ensure we only accept GET requests for the main logic
  if (req.method !== 'GET') {
    console.log(`Method ${req.method} not allowed.`);
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { name } = req.query;

  // Log the name received from the URL
  console.log(`Received raw name from URL query: '${name}'`);

  if (!name) {
    console.log('Error: No product name was provided in the URL.');
    return res
      .status(400)
      .json({ success: false, error: 'No product name provided.' });
  }

  try {
    await dbConnect();
    console.log('Database connection successful.');

    // The name from the URL is already decoded by Vercel/Next.js
    console.log(`Searching database for product with name: '${name}'`);

    // The 'findOne' query is case-sensitive.
    const product = await Product.findOne({ name: name });

    if (!product) {
      // This is a likely cause of the 404 error.
      console.log(`No product found in the database with the name: '${name}'`);
      return res
        .status(404)
        .json({ success: false, error: 'Product not found in database' });
    }

    console.log('SUCCESS: Product found in database!', product.name);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('--- SERVER-SIDE CATCH BLOCK ERROR ---:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
