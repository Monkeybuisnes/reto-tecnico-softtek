import { Request, Response } from 'express';
import { saveCustomData } from '../services/database';

export const postAlmacenar = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Datos requeridos' });
    }

    await saveCustomData(data);
    res.status(201).json({ message: 'Datos almacenados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al almacenar datos' });
  }
};