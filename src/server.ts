import app from './app';
import serverless from 'serverless-http';

// Exportar para AWS Lambda
export const handler = serverless(app);

// Ejecución local
if (process.env.ENVIRONMENT === 'local') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}