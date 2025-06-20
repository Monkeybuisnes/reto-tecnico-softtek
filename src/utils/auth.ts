import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Configuración más segura del JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.warn('⚠️  JWT_SECRET no configurado, usando valor por defecto (NO USAR EN PRODUCCIÓN)');
  return 'default-secret-key-change-in-production';
})();

// Interfaces tipadas para mejor type safety
export interface TokenPayload {
  username: string;
  role: string;
  iat?: number; // Issued at
  exp?: number; // Expiration
}

interface TokenRequest {
  username?: string;
  password?: string;
}

interface TokenResponse {
  token: string;
  tokenType: string;
  expiresIn: string;
  message: string;
}

interface AuthError {
  error: string;
  message: string;
  code?: string;
}

/**
 * Genera un token JWT con payload tipado
 * @param payload - Datos del usuario (sin iat/exp que los maneja JWT)
 * @returns Token JWT firmado
 */
export const generateToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>): string => {
  try {
    if (!payload.username || !payload.role) {
      throw new Error('Username y role son requeridos para generar token');
    }

    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: '1h',
      algorithm: 'HS256' // Especificamos el algoritmo por seguridad
    });
  } catch (error) {
    console.error('Error generando token:', error);
    throw new Error('Fallo al generar token JWT');
  }
};

/**
 * Verifica y decodifica un token JWT con manejo detallado de errores
 * @param token - Token JWT a verificar
 * @returns Payload decodificado o null con información del error
 */
export const verifyToken = (token: string): { payload: TokenPayload | null; error?: string } => {
  try {
    if (!token || token.trim() === '') {
      return { payload: null, error: 'Token vacío' };
    }

    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'] // Solo aceptamos nuestro algoritmo
    }) as TokenPayload;

    return { payload: decoded };
  } catch (error) {
    // Manejo detallado de diferentes tipos de errores JWT
    if (error instanceof jwt.TokenExpiredError) {
      return { payload: null, error: 'Token expirado' };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { payload: null, error: 'Token malformado' };
    } else if (error instanceof jwt.NotBeforeError) {
      return { payload: null, error: 'Token no válido aún' };
    } else {
      console.error('Error desconocido verificando token:', error);
      return { payload: null, error: 'Error de verificación de token' };
    }
  }
};

/**
 * Handler para generar tokens JWT con validación robusta
 */
export const postToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: TokenRequest = req.body;
    
    // Validaciones de entrada más robustas
    const validationErrors: string[] = [];
    
    if (!username) {
      validationErrors.push('Username es requerido');
    } else if (typeof username !== 'string') {
      validationErrors.push('Username debe ser una cadena de texto');
    } else if (username.trim().length < 3) {
      validationErrors.push('Username debe tener al menos 3 caracteres');
    } else if (username.length > 50) {
      validationErrors.push('Username no puede exceder 50 caracteres');
    }

    // Validación opcional de password (para implementación futura)
    if (password !== undefined) {
      if (typeof password !== 'string') {
        validationErrors.push('Password debe ser una cadena de texto');
      } else if (password.length < 6) {
        validationErrors.push('Password debe tener al menos 6 caracteres');
      }
    }

    if (validationErrors.length > 0) {
      const errorResponse: AuthError = {
        error: 'Datos de entrada inválidos',
        message: validationErrors.join(', '),
        code: 'VALIDATION_ERROR'
      };
      res.status(400).json(errorResponse);
      return;
    }

    // En un entorno real, aquí validarías credenciales contra BD
    // Para este reto, simulamos validación exitosa
    const sanitizedUsername = username!.trim().toLowerCase();

    const token = generateToken({ 
      username: sanitizedUsername, 
      role: 'user' 
    });
    
    const response: TokenResponse = {
      token,
      tokenType: 'Bearer',
      expiresIn: '1h',
      message: 'Token generado exitosamente'
    };

    // Log para auditoría (sin información sensible)
    console.log(`Token generado para usuario: ${sanitizedUsername}`);
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error en postToken:', error);
    const errorResponse: AuthError = {
      error: 'Error interno del servidor',
      message: 'No se pudo generar el token',
      code: 'INTERNAL_ERROR'
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * Middleware de autenticación mejorado con mejor manejo de errores
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    // Validación del header de autorización
    if (!authHeader) {
      const errorResponse: AuthError = {
        error: 'Token de autorización requerido',
        message: 'Debe incluir el header Authorization',
        code: 'MISSING_AUTH_HEADER'
      };
      res.status(401).json(errorResponse);
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      const errorResponse: AuthError = {
        error: 'Formato de token inválido',
        message: 'El header debe tener el formato: Bearer <token>',
        code: 'INVALID_AUTH_FORMAT'
      };
      res.status(401).json(errorResponse);
      return;
    }

    const token = authHeader.substring(7); // Más claro que split
    
    if (!token) {
      const errorResponse: AuthError = {
        error: 'Token vacío',
        message: 'Debe proporcionar un token válido',
        code: 'EMPTY_TOKEN'
      };
      res.status(401).json(errorResponse);
      return;
    }

    // Verificación del token con manejo detallado de errores
    const { payload, error } = verifyToken(token);
    
    if (!payload || error) {
      const errorResponse: AuthError = {
        error: 'Token inválido',
        message: error || 'Token no válido',
        code: 'INVALID_TOKEN'
      };
      res.status(401).json(errorResponse);
      return;
    }

    // Agregar información del usuario al request
    (req as any).user = payload;
    
    // Log para auditoría
    console.log(`Usuario autenticado: ${payload.username}`);
    
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    const errorResponse: AuthError = {
      error: 'Error interno del servidor',
      message: 'Error al procesar autenticación',
      code: 'AUTH_PROCESSING_ERROR'
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * Handler para validar tokens existentes
 */
export const validateToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user as TokenPayload;
    
    if (!user) {
      res.status(401).json({
        valid: false,
        error: 'No hay información de usuario en el token',
        code: 'NO_USER_INFO'
      });
      return;
    }

    // Información adicional sobre el token
    const tokenInfo = {
      valid: true,
      user: {
        username: user.username,
        role: user.role,
        issuedAt: user.iat ? new Date(user.iat * 1000).toISOString() : null,
        expiresAt: user.exp ? new Date(user.exp * 1000).toISOString() : null
      },
      message: 'Token válido'
    };

    res.status(200).json(tokenInfo);
  } catch (error) {
    console.error('Error en validateToken:', error);
    res.status(500).json({ 
      valid: false,
      error: 'Error interno del servidor',
      code: 'VALIDATION_ERROR'
    });
  }
};

/**
 * Utilidad para generar tokens de testing
 */
export const generateTestToken = (): string => {
  return generateToken({
    username: 'test-user',
    role: 'user'
  });
};

/**
 * Middleware opcional para rutas que pueden funcionar con o sin autenticación
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No hay token, continuamos sin autenticar
    next();
    return;
  }

  const token = authHeader.substring(7);
  const { payload } = verifyToken(token);
  
  if (payload) {
    (req as any).user = payload;
  }
  
  // Continuamos independientemente de si el token es válido o no
  next();
};