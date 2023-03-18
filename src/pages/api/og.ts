import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const imageUrl = typeof req.query.image === 'string' ? req.query.image : 'https://dicespec.vercel.app';
  const imageRes = await fetch(imageUrl);
  const blob = await imageRes.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const contentType = imageRes.headers.get('Content-Type');

  res.setHeader('content-Type', contentType ?? 'image/png');

  res.send(Buffer.from(arrayBuffer));
};

export default handler;
