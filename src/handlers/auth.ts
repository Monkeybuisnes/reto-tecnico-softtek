import { Request, Response } from 'express';
import { generateToken } from '../utils/auth';

/**
 * Interfaz para el cuerpo de la petición de token
 */
interface TokenRequest {
  username?: string;
  password?: string;
}

/**
 * Handler para generar tokens JWT
 * En un entorno real, aquí validarías credenciales contra una base de datos
 * Para este reto, simplificamos el proceso
 */
export const postToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: TokenRequest = req.body;
    
    // Validación básica de entrada
    if (!username) {
      res.status(400).json({ 
        error: 'Username es requerido',
        message: 'Debe proporcionar un username para generar el token'
      });
      return;
    }

    // En un entorno real, aquí verificarías las credenciales
    // Para este reto, aceptamos cualquier username válido
    // Podrías agregar validación de password si lo deseas
    
    const token = generateToken({ 
      username, 
      role: 'user' 
    });
    
    res.status(200).json({
      token,
      tokenType: 'Bearer',
      expiresIn: '1h',
      message: 'Token generado exitosamente'
    });
  } catch (error) {
    console.error('Error en postToken:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'No se pudo generar el token'
    });
  }
};

/**
 * Handler para validar tokens (útil para debugging)
 */
export const validateToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // El middleware de autenticación ya habrá validado el token
    // Si llegamos aquí, el token es válido
    const user = (req as any).user;
    
    res.status(200).json({
      valid: true,
      user,
      message: 'Token válido'
    });
  } catch (error) {
    console.error('Error en validateToken:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor'
    });
  }
};