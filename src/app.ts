import express from 'express';
import bodyParser from 'body-parser';
import { getFusionados } from './handlers/fusionados';
import { postAlmacenar } from './handlers/almacenar';
import { getHistorial } from './handlers/historial';
import { apiLimiter } from './middleware/rateLimit';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { authenticate } from './middleware/auth';

const app = express();
app.use(bodyParser.json());

// Configurar Swagger
const swaggerPath = path.resolve(__dirname, '../docs/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Aplicar rate limiting
app.use(apiLimiter);

// Endpoints
app.get('/fusionados', getFusionados);
app.post('/almacenar', authenticate, postAlmacenar);
app.get('/historial', authenticate, getHistorial);

// Middleware de error
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;