import type { NextApiHandler } from 'next';

import { calcExpectedValue } from '@/features/parser/expect';

const apiHandler: NextApiHandler = async (req, res) => {
  const query = req.query.query;

  if (typeof query !== 'string') {
    res.status(400).json({
      ok: false,
      reason: 'please set "query"',
    });
    return;
  }

  try {
    const result = await calcExpectedValue(query);

    res.status(200).json({
      ok: true,
      result,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      reason: 'your query is not valid',
    });
  }
};

export default apiHandler;
