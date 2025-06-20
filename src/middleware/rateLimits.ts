import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

/**
 * Configuración de rate limiting para endpoints públicos
 * Permite 100 peticiones por 15 minutos por IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
  max: 100, // Máximo 100 peticiones por ventana de tiempo
  message: {
    error: 'Demasiadas peticiones',
    message: 'Has excedido el límite de peticiones. Intenta de nuevo después de 15 minutos.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true, // Incluir headers de rate limit en la respuesta
  legacyHeaders: false, // Deshabilitar headers legacy
  // Función personalizada para generar la clave de identificación
  keyGenerator: (req: Request): string => {
    // Usamos la IP del cliente como identificador
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  // Handler personalizado cuando se excede el límite
  handler: (req: Request, res: Response) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Demasiadas peticiones',
      message: 'Has excedido el límite de peticiones. Intenta de nuevo después de 15 minutos.',
      retryAfter: '15 minutos',
      limit: 100,
      window: '15 minutos'
    });
  }
});

/**
 * Rate limiting más estricto para endpoints que consumen APIs externas
 * Permite 20 peticiones por 15 minutos por IP
 */
export const externalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Máximo 20 peticiones por ventana de tiempo
  message: {
    error: 'Límite de API externa excedido',
    message: 'Has excedido el límite de peticiones a APIs externas. Intenta de nuevo después de 15 minutos.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request): string => {
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  handler: (req: Request, res: Response) => {
    console.log(`External API rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Límite de API externa excedido',
      message: 'Has excedido el límite de peticiones a APIs externas. Intenta de nuevo después de 15 minutos.',
      retryAfter: '15 minutos',
      limit: 20,
      window: '15 minutos'
    });
  }
});

/**
 * Rate limiting para endpoints de autenticación
 * Más restrictivo para prevenir ataques de fuerza bruta
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos de autenticación por 15 minutos
  message: {
    error: 'Demasiados intentos de autenticación',
    message: 'Has excedido el límite de intentos de autenticación. Intenta de nuevo después de 15 minutos.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // No contar peticiones exitosas
  keyGenerator: (req: Request): string => {
    return req.ip || req.connection.remoteAddress || 'unknown';
  }
});