import { NextApiRequest, NextApiResponse } from 'next';
import { account_register } from '../../../api';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) return res.status(400).json({ message: 'No body provided' });
  const { student_id, email, name } = JSON.parse(req.body);
  if (!email || !student_id || !name) return res.status(400).json({ message: 'No student id or name provided' });

  try {
    const registerRes = await account_register({ email, name, student_id });
    if (!registerRes.ok) return res.status(500).json({ message: 'Internal server error' });

    return res.status(200).json({ message: 'Successfully registered' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
