import express from 'express';
import bodyParser from 'body-parser';
import { getFusionados } from './handlers/fusionHandler';
import { postAlmacenar } from './handlers/almacenar';
import { getHistorial } from './handlers/historial';
import { postToken, validateToken } from './handlers/auth';
import { apiLimiter, externalApiLimiter, authLimiter } from './middleware/rateLimits';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { authenticate } from './middleware/authMiddleware';

// Crear la aplicación Express
const app = express();

// Configuración de middlewares básicos
app.use(bodyParser.json({ limit: '10mb' })); // Aumentamos el límite para datos grandes
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar headers de CORS para desarrollo
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Responder a preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

// Configurar Swagger - Documentación de la API
try {
  const swaggerPath = path.resolve(__dirname, '../docs/swagger.yaml');
  const swaggerDocument = YAML.load(swaggerPath);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Softtek Challenge API Documentation"
  }));
  console.log('Swagger documentation available at /docs');
} catch (error) {
  console.warn('Could not load Swagger documentation:', error);
}

// Endpoint de salud para verificar que la API está funcionando
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Endpoints de autenticación (con rate limiting específico)
app.post('/token', authLimiter, postToken);
app.get('/validate-token', authenticate, validateToken);

// Endpoints principales con rate limiting diferenciado
// /fusionados consume APIs externas, por lo que necesita rate limiting más estricto
app.get('/fusionados', externalApiLimiter, getFusionados);

// Endpoints protegidos con autenticación y rate limiting general
app.post('/almacenar', apiLimiter, authenticate, postAlmacenar);
app.get('/historial', apiLimiter, authenticate, getHistorial);

// Endpoint para información general de la API
app.get('/', (req, res) => {
  res.json({
    message: 'Softtek Challenge API',
    version: '1.0.0',
    documentation: '/docs',
    health: '/health',
    endpoints: {
      authentication: {
        'POST /token': 'Generar token JWT',
        'GET /validate-token': 'Validar token (requiere autenticación)'
      },
      main: {
        'GET /fusionados': 'Obtener datos fusionados de SWAPI y clima',
        'POST /almacenar': 'Almacenar datos personalizados (requiere autenticación)',
        'GET /historial': 'Obtener historial de datos (requiere autenticación)'
      }
    }
  });
});

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.originalUrl} no existe`,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /docs',
      'POST /token',
      'GET /validate-token',
      'GET /fusionados',
      'POST /almacenar',
      'GET /historial'
    ]
  });
});

// Middleware de manejo de errores mejorado
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Log del error para debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Diferentes tipos de error requieren diferentes respuestas
  if (err.name === 'ValidationError') {
    // Errores de validación
    res.status(400).json({
      error: 'Datos de entrada inválidos',
      message: err.message,
      details: err.details || null
    });
  } else if (err.name === 'UnauthorizedError' || err.message.includes('token')) {
    // Errores de autenticación
    res.status(401).json({
      error: 'No autorizado',
      message: 'Token de autenticación inválido o faltante'
    });
  } else if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    // Errores de conexión externa (APIs, base de datos, etc.)
    res.status(503).json({
      error: 'Servicio no disponible',
      message: 'Error de conexión con servicios externos'
    });
  } else if (err.status) {
    // Errores con código de estado específico
    res.status(err.status).json({
      error: err.message || 'Error del servidor',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  } else {
    // Error genérico del servidor
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ha ocurrido un error inesperado',
      ...(process.env.NODE_ENV === 'development' && { 
        details: err.message,
        stack: err.stack 
      })
    });
  }
});

export default app;