📝 Descripción
Este proyecto implementa una API RESTful que integra datos de la API de Star Wars (SWAPI) y OpenWeatherMap, almacena resultados en DynamoDB, y utiliza Redis para caché. Cumple con los requisitos del reto técnico para el puesto de Backend Node.js/AWS Developer en Softtek.

✅ Características Principales
Integración de SWAPI y OpenWeatherMap

Sistema de caché con Redis (30 minutos)

Almacenamiento en DynamoDB

3 endpoints RESTful

Autenticación JWT (endpoints protegidos)

Documentación Swagger

Rate limiting (100 peticiones/15min/IP)

Pruebas unitarias con Jest

Despliegue serverless en AWS Lambda

🛠 Requisitos
Node.js 20.x

Yarn o npm

Cuenta AWS (para despliegue)

API Key de OpenWeatherMap

Docker (para Redis local)

🚀 Instalación

# Clonar repositorio
git clone https://github.com/tu-usuario/softtek-reto.git
cd softtek-reto

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
Editar .env con tus credenciales:

env
SWAPI_URL=https://swapi.dev/api
WEATHER_API_KEY=tu_api_key_openweathermap
JWT_SECRET=secret_key_para_jwt
REDIS_URL=redis://localhost:6379
DYNAMODB_TABLE=softtek-reto-backend-dev-FusionadosHistory
AWS_REGION=us-east-1

🖥 Ejecución Local
bash
# Iniciar Redis en Docker
docker run -p 6379:6379 redis

# Ejecutar servidor
npm run offline

# Servidor disponible en: http://localhost:3000
🌐 Endpoints
Endpoint	Método	Descripción	Autenticación
/fusionados	GET	Datos fusionados SWAPI + Clima	❌
/almacenar	POST	Almacenar datos personalizados	✅
/historial	GET	Historial de datos fusionados	✅
🔐 Autenticación
Los endpoints protegidos requieren un token JWT:


# Generar token
curl -X POST http://localhost:3000/token
Incluir en cabeceras:


Authorization: Bearer <token>
📊 Documentación API
Acceder a la documentación interactiva:


http://localhost:3000/docs

🧪 Pruebas

# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con cobertura
npm test -- --coverage

☁ Despliegue en AWS

# Configurar credenciales AWS
aws configure

# Desplegar
npm run deploy

# URL de API desplegada:
https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev
📂 Estructura del Proyecto
text
softtek-reto/
├── src/                  # Código fuente
│   ├── handlers/         # Controladores de endpoints
│   ├── services/         # Lógica de negocio (APIs, DB, caché)
│   ├── utils/            # Utilidades
│   ├── middleware/       # Autenticación y rate-limiting
│   ├── app.ts            # Configuración Express
│   └── server.ts         # Punto de entrada
├── tests/                # Pruebas unitarias
├── docs/                 # Documentación Swagger
├── serverless.yml        # Configuración Serverless Framework
└── .env                  # Variables de entorno
✅ Puntos del Reto Implementados
API RESTful con Node.js 20

Integración con SWAPI y OpenWeatherMap

3 endpoints funcionales

Cache con Redis (30 minutos)

Almacenamiento en DynamoDB

Pruebas unitarias con Jest

TypeScript para tipado estático

Despliegue con Serverless Framework

Optimización de costos AWS

Autenticación JWT (Bonus)

Documentación Swagger (Bonus)

Rate-limiting (Bonus)

Logging con CloudWatch (Bonus)

🔄 Flujo de Datos



🤝 Contribución
Haz fork del proyecto

Crea tu rama (git checkout -b feature/nueva-funcionalidad)

Realiza tus cambios

Haz commit (git commit -am 'Añade nueva funcionalidad')

Haz push (git push origin feature/nueva-funcionalidad)

Abre un Pull Request

📄 Licencia
Este proyecto está bajo la licencia MIT.

Nota: Antes de desplegar en producción, asegúrate de:

Configurar adecuadamente los permisos IAM en AWS

Habilitar encriptación en DynamoDB

Implementar rotación de claves JWT

Configurar alertas de costos en AWS

¡Gracias por revisar este proyecto! 🚀