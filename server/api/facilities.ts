import { Router, Request, Response } from 'express';
const router = Router();

router.get('/facilities', (req: Request, res: Response) => {
  // (Stub implementation) Return a dummy list of facilities (or an error if a query param 'error' is provided).
  const { error } = req.query;
  if (error) {
    res.status(500).json({ error: 'Internal server error (stub)' });
  } else {
    res.status(200).json({ facilities: [
      { id: '1', name: 'Dummy Hospital', type: 'hospital' },
      { id: '2', name: 'Dummy Clinic', type: 'clinic' },
      { id: '3', name: 'Dummy Pharmacy', type: 'pharmacy' },
      { id: '4', name: 'Dummy Ambulance Provider', type: 'ambulance' }
    ] });
  }
}); 