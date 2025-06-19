import { Request, Response } from 'express';
import { getHistory } from '../services/database';

export const getHistorial = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const history = await getHistory(page, limit);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};