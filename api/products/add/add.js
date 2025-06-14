import dbConnect from '../../lib/dbConnect';
import Product from '../../models/ProductModel';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const {
    name,
    price,
    img,
    gender,
    adult,
    description,
    size,
    chest,
    waist,
    hips,
    height,
    material,
    specifications,
  } = req.body;

  try {
    await dbConnect();

    const product = await Product.create({
      name,
      price,
      img,
      gender,
      adult,
      description,
      size,
      chest,
      waist,
      hips,
      height,
      material,
      specifications,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
