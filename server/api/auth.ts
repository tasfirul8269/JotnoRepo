import { Router, Request, Response } from 'express';
const router = Router();

router.post('/signup', (req: Request, res: Response) => {
  const { name, role } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Missing required field: name' });
  } else {
    res.status(201).json({ message: 'Signup successful', user: { name, role: role || 'patient' } });
  }
}); 