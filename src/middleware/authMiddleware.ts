import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

/**
 * Middleware de autenticación JWT
 * Verifica que el token sea válido y extrae la información del usuario
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Extraemos el header de autorización
    const authHeader = req.headers.authorization;
    
    // Verificamos que el header exista y tenga el formato correcto
    if (!authHeader) {
      res.status(401).json({ 
        error: 'Token de autorización requerido',
        message: 'Debe incluir el header Authorization con el token Bearer'
      });
      return;
    }

    // Verificamos que el header comience con "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        error: 'Formato de token inválido',
        message: 'El token debe tener el formato: Bearer <token>'
      });
      return;
    }

    // Extraemos el token (removemos "Bearer " del inicio)
    const token = authHeader.substring(7); // "Bearer ".length = 7
    
    // Verificamos que el token no esté vacío
    if (!token) {
      res.status(401).json({ 
        error: 'Token vacío',
        message: 'Debe proporcionar un token válido'
      });
      return;
    }

    // Verificamos y decodificamos el token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      res.status(401).json({ 
        error: 'Token inválido o expirado',
        message: 'El token proporcionado no es válido o ha expirado'
      });
      return;
    }

    // Agregamos la información del usuario al objeto request
    // Esto permite que los handlers posteriores accedan a esta información
    (req as any).user = decoded;
    
    // Continuamos con el siguiente middleware o handler
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'Error al procesar el token de autenticación'
    });
  }
};

/**
 * Middleware opcional para rutas que pueden funcionar con o sin autenticación
 */
export const optionalAuthenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  // Si no hay header de autorización, continuamos sin autenticar
  if (!authHeader) {
    next();
    return;
  }

  // Si hay header, intentamos autenticar
  // Pero no fallaremos si el token es inválido
  try {
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      
      if (decoded) {
        (req as any).user = decoded;
      }
    }
  } catch (error) {
    // Ignoramos errores en autenticación opcional
    console.log('Token opcional inválido, continuando sin autenticación');
  }
  
  next();
};