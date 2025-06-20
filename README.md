================================================
FILE: README.md
================================================
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


================================================
FILE: awscliv2.zip
================================================
[Non-text file]


================================================
FILE: jest.config.js
================================================
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/tests/'
  ],
  setupFiles: ['dotenv/config']
};


================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2025 Daniel Monterroza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: package.json
================================================
{
  "name": "reto-tecnico-softtek",
  "version": "1.0.0",
  "description": "API RESTful para reto técnico Backend Node.js/AWS",
  "main": "dist/src/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/src/server.js",
    "dev": "cross-env ENVIRONMENT=local ts-node src/server.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "offline": "serverless offline",
    "deploy": "npm run build && serverless deploy",
    "remove": "serverless remove",
    "logs": "serverless logs -f api -t",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix"
  },
  "keywords": [
    "serverless",
    "aws",
    "nodejs",
    "typescript",
    "api"
  ],
  "author": "Daniel Monterroza",
  "license": "MIT",
  "devDependencies": {
    "@types/express": "^4.17.23",
    "@types/jest": "^29.5.12",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^20.11.30",
    "@types/supertest": "^6.0.2",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/yamljs": "^0.2.34",
    "@typescript-eslint/eslint-plugin": "^7.3.1",
    "@typescript-eslint/parser": "^7.3.1",
    "cross-env": "^7.0.3",
    "dotenv": "^16.4.5",
    "esbuild": "^0.25.5",
    "eslint": "^8.57.0",
    "jest": "^29.7.0",
    "serverless": "^3.38.0",
    "serverless-dotenv-plugin": "^6.0.0",
    "serverless-esbuild": "^1.52.1",
    "serverless-offline": "^13.3.3",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.3"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.830.0",
    "@aws-sdk/lib-dynamodb": "^3.830.0",
    "@aws-sdk/util-dynamodb": "^3.830.0",
    "aws-sdk": "^2.1585.0",
    "axios": "^1.6.8",
    "express": "^4.19.2",
    "express-rate-limit": "^7.5.0",
    "jsonwebtoken": "^9.0.2",
    "redis": "^4.7.1",
    "serverless-http": "^3.2.0",
    "swagger-ui-express": "^5.0.0",
    "yamljs": "^0.3.0"
  },
  "directories": {
    "doc": "docs",
    "test": "tests"
  },
  "repository": {
    "type": "git",
    "url": "reto-tecnico-softtek"
  }
}



================================================
FILE: serverless.yml
================================================
service: softtek-reto-backend

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: dev
  memorySize: 256
  timeout: 15
  environment:
    SWAPI_URL: https://swapi.dev/api
    WEATHER_API_KEY: ${env:WEATHER_API_KEY}
    JWT_SECRET: ${env:JWT_SECRET}
    REDIS_URL: ${env:REDIS_URL}
    DYNAMODB_TABLE: ${self:service}-${self:provider.stage}-FusionadosHistory
    AWS_REGION: ${self:provider.region}

  # Permisos necesarios para que Lambda acceda a DynamoDB
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:PutItem
        - dynamodb:Scan
        - dynamodb:Query
        - dynamodb:GetItem
      Resource: 
        - "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"
        - "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}/index/*"

functions:
  api:
    handler: dist/src/server.handler
    events:
      - http: 
          path: /
          method: ANY
          cors: true
      - http: 
          path: /{proxy+}
          method: ANY
          cors: true

plugins:
  - serverless-offline
  - serverless-esbuild

custom:
  esbuild:
    bundle: true
    minify: false
    sourcemap: true
    exclude: ['aws-sdk']
    target: 'node20'
    platform: 'node'
    concurrency: 10

resources:
  Resources:
    FusionadosHistoryTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:provider.environment.DYNAMODB_TABLE}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
          - AttributeName: createdAt
            AttributeType: S
          - AttributeName: type
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        GlobalSecondaryIndexes:
          - IndexName: TypeCreatedAtIndex
            KeySchema:
              - AttributeName: type
                KeyType: HASH
              - AttributeName: createdAt
                KeyType: RANGE
            Projection:
              ProjectionType: ALL
        BillingMode: PAY_PER_REQUEST


================================================
FILE: setup.sh
================================================
#!/usr/bin/env bash
set -e

# 1. Clonar y entrar en carpeta
if [ ! -d softtek-reto-backend ]; then
  git clone <https://github.com/Monkeybuisnes/reto-tecnico-softtek> softtek-reto-backend
fi
cd softtek-reto-backend

# 2. Instalar dependencias y compilar
npm install
npx tsc

# 3. Ejecutar tests
npx jest

# 4. Levantar servidor local
npx serverless offline &
SERVER_PID=$!

echo "Servidor serverless offline iniciado con PID $SERVER_PID"

echo "Presiona cualquier tecla para terminar..."
read -n 1
kill $SERVER_PID


================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": false,
    "removeComments": true,
    "noImplicitAny": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}


================================================
FILE: .env.example
================================================
# .env.example
SWAPI_URL=https://swapi.dev/api
WEATHER_API_KEY=your_openweathermap_api_key_here
JWT_SECRET=your_super_secure_jwt_secret_here
REDIS_URL=redis://localhost:6379
DYNAMODB_TABLE=softtek-reto-backend-dev-FusionadosHistory
AWS_REGION=us-east-1
NODE_ENV=development
LOG_LEVEL=debug


================================================
FILE: aws/README.md
================================================
# AWS CLI v2

This bundle contains a built executable of the AWS CLI v2.

## Installation

To install the AWS CLI v2, run the `install` script:
```
$ sudo ./install 
You can now run: /usr/local/bin/aws --version
```
This will install the AWS CLI v2 at `/usr/local/bin/aws`.  Assuming
`/usr/local/bin` is on your `PATH`, you can now run:
```
$ aws --version
```


### Installing without sudo

If you don't have ``sudo`` permissions or want to install the AWS
CLI v2 only for the current user, run the `install` script with the `-b`
and `-i` options:
```
$ ./install -i ~/.local/aws-cli -b ~/.local/bin
``` 
This will install the AWS CLI v2 in `~/.local/aws-cli` and create
symlinks for `aws` and `aws_completer` in `~/.local/bin`. For more
information about these options, run the `install` script with `-h`:
```
$ ./install -h
```

### Updating

If you run the `install` script and there is a previously installed version
of the AWS CLI v2, the script will error out. To update to the version included
in this bundle, run the `install` script with `--update`:
```
$ sudo ./install --update
```


### Removing the installation

To remove the AWS CLI v2, delete the its installation and symlinks:
```
$ sudo rm -rf /usr/local/aws-cli
$ sudo rm /usr/local/bin/aws
$ sudo rm /usr/local/bin/aws_completer
```
Note if you installed the AWS CLI v2 using the `-b` or `-i` options, you will
need to remove the installation and the symlinks in the directories you
specified.



================================================
FILE: aws/install
================================================
#!/bin/sh
# Copyright 2012-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You
# may not use this file except in compliance with the License. A copy of
# the License is located at
#
#     http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is
# distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
# ANY KIND, either express or implied. See the License for the specific
# language governing permissions and limitations under the License.

usage() {
  cat 1>&2 <<EOF
Installs the AWS CLI v2

USAGE:
    install [FLAGS] [OPTIONS]

FLAGS:
    -u, --update              Updates the AWS CLI v2 if a different version
                              is previously installed. By default, this script
                              will not update the AWS CLI if a previous
                              installation is detected.

    -h, --help                Prints help information

OPTIONS:
    -i, --install-dir <path>  The directory to install the AWS CLI v2. By
                              default, this directory is: /usr/local/aws-cli

    -b, --bin-dir <path>      The directory to store symlinks to executables
                              for the AWS CLI v2. By default, the directory
                              used is: /usr/local/bin
EOF
}

parse_commandline() {
  while test $# -gt 0
  do
    key="$1"
	case "$key" in
	  -i|--install-dir)
	    PARSED_INSTALL_DIR="$2"
		shift
	   ;;
	  -b|--bin-dir)
	    PARSED_BIN_DIR="$2"
		shift
	   ;;
	  -u|--update)
	    PARSED_UPGRADE="yes"
	  ;;
	  -h|--help)
	    usage
        exit 0
	  ;;
	  *)
	   die "Got an unexpected argument: $1"
	  ;;
    esac
	shift
  done
}

set_global_vars() {
  ROOT_INSTALL_DIR=${PARSED_INSTALL_DIR:-/usr/local/aws-cli}
  BIN_DIR=${PARSED_BIN_DIR:-/usr/local/bin}
  UPGRADE=${PARSED_UPGRADE:-no}

  EXE_NAME="aws"
  COMPLETER_EXE_NAME="aws_completer"
  INSTALLER_DIR="$( cd "$( dirname "$0" )" >/dev/null 2>&1 && pwd )"
  INSTALLER_DIST_DIR="$INSTALLER_DIR/dist"
  INSTALLER_EXE="$INSTALLER_DIST_DIR/$EXE_NAME"
  AWS_EXE_VERSION=$($INSTALLER_EXE --version | cut -d ' ' -f 1 | cut -d '/' -f 2)

  INSTALL_DIR="$ROOT_INSTALL_DIR/v2/$AWS_EXE_VERSION"
  INSTALL_DIR="$INSTALL_DIR"
  INSTALL_DIST_DIR="$INSTALL_DIR/dist"
  INSTALL_BIN_DIR="$INSTALL_DIR/bin"
  INSTALL_AWS_EXE="$INSTALL_BIN_DIR/$EXE_NAME"
  INSTALL_AWS_COMPLETER_EXE="$INSTALL_BIN_DIR/$COMPLETER_EXE_NAME"

  CURRENT_INSTALL_DIR="$ROOT_INSTALL_DIR/v2/current"
  CURRENT_AWS_EXE="$CURRENT_INSTALL_DIR/bin/$EXE_NAME"
  CURRENT_AWS_COMPLETER_EXE="$CURRENT_INSTALL_DIR/bin/$COMPLETER_EXE_NAME"

  BIN_AWS_EXE="$BIN_DIR/$EXE_NAME"
  BIN_AWS_COMPLETER_EXE="$BIN_DIR/$COMPLETER_EXE_NAME"
}

create_install_dir() {
  mkdir -p "$INSTALL_DIR" || exit 1
  {
    setup_install_dist &&
    setup_install_bin &&
    create_current_symlink
  } || {
    rm -rf "$INSTALL_DIR"
    exit 1
  }
}

check_preexisting_install() {
  if [ -L "$CURRENT_INSTALL_DIR" ] && [ "$UPGRADE" = "no" ]
  then
    die "Found preexisting AWS CLI installation: $CURRENT_INSTALL_DIR. Please rerun install script with --update flag."
  fi
  if [ -d "$INSTALL_DIR" ]
  then
    echo "Found same AWS CLI version: $INSTALL_DIR. Skipping install."
    exit 0
  fi
}

setup_install_dist() {
  cp -r "$INSTALLER_DIST_DIR" "$INSTALL_DIST_DIR"
}

setup_install_bin() {
  mkdir -p "$INSTALL_BIN_DIR"
  ln -s "../dist/$EXE_NAME" "$INSTALL_AWS_EXE"
  ln -s "../dist/$COMPLETER_EXE_NAME" "$INSTALL_AWS_COMPLETER_EXE"
}

create_current_symlink() {
  ln -snf "$INSTALL_DIR" "$CURRENT_INSTALL_DIR"
}

create_bin_symlinks() {
  mkdir -p "$BIN_DIR"
  ln -sf "$CURRENT_AWS_EXE" "$BIN_AWS_EXE"
  ln -sf "$CURRENT_AWS_COMPLETER_EXE" "$BIN_AWS_COMPLETER_EXE"
}

die() {
	err_msg="$1"
	echo "$err_msg" >&2
	exit 1
}

main() {
  parse_commandline "$@"
  set_global_vars
  check_preexisting_install
  create_install_dir
  create_bin_symlinks
  echo "You can now run: $BIN_AWS_EXE --version"
  exit 0
}

main "$@" || exit 1



================================================
FILE: aws/THIRD_PARTY_LICENSES
================================================
** botocore; version 2 -- https://github.com/boto/botocore/tree/v2
Botocore
Copyright 2012-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

----

Botocore includes a vendorized copy of the requests python library to ease
installation.

Requests License
================

Copyright 2013 Kenneth Reitz

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


The requests library also includes some vendorized python libraries to ease
installation.

Urllib3 License
===============

This is the MIT license: http://www.opensource.org/licenses/mit-license.php

Copyright 2008-2011 Andrey Petrov and contributors (see CONTRIBUTORS.txt),
Modifications copyright 2012 Kenneth Reitz.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this
software and associated documentation files (the "Software"), to deal in the
Software
without restriction, including without limitation the rights to use, copy,
modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons
to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all
copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER
DEALINGS IN THE SOFTWARE.

Chardet License
===============

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
02110-1301  USA

Bundle of CA Root Certificates
==============================

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
02110-1301
** s3transfer; version 0 -- https://github.com/boto/s3transfer
s3transfer
Copyright 2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Apache License

Version 2.0, January 2004

http://www.apache.org/licenses/ TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND
DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction, and
      distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by the
      copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all other
      entities that control, are controlled by, or are under common control
      with that entity. For the purposes of this definition, "control" means
      (i) the power, direct or indirect, to cause the direction or management
      of such entity, whether by contract or otherwise, or (ii) ownership of
      fifty percent (50%) or more of the outstanding shares, or (iii)
      beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity exercising
      permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation source,
      and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but not limited
      to compiled object code, generated documentation, and conversions to
      other media types.

      "Work" shall mean the work of authorship, whether in Source or Object
      form, made available under the License, as indicated by a copyright
      notice that is included in or attached to the work (an example is
      provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object form,
      that is based on (or derived from) the Work and for which the editorial
      revisions, annotations, elaborations, or other modifications represent,
      as a whole, an original work of authorship. For the purposes of this
      License, Derivative Works shall not include works that remain separable
      from, or merely link (or bind by name) to the interfaces of, the Work and
      Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including the original
      version of the Work and any modifications or additions to that Work or
      Derivative Works thereof, that is intentionally submitted to Licensor for
      inclusion in the Work by the copyright owner or by an individual or Legal
      Entity authorized to submit on behalf of the copyright owner. For the
      purposes of this definition, "submitted" means any form of electronic,
      verbal, or written communication sent to the Licensor or its
      representatives, including but not limited to communication on electronic
      mailing lists, source code control systems, and issue tracking systems
      that are managed by, or on behalf of, the Licensor for the purpose of
      discussing and improving the Work, but excluding communication that is
      conspicuously marked or otherwise designated in writing by the copyright
      owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity on
      behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of this
   License, each Contributor hereby grants to You a perpetual, worldwide,
   non-exclusive, no-charge, royalty-free, irrevocable copyright license to
   reproduce, prepare Derivative Works of, publicly display, publicly perform,
   sublicense, and distribute the Work and such Derivative Works in Source or
   Object form.

   3. Grant of Patent License. Subject to the terms and conditions of this
   License, each Contributor hereby grants to You a perpetual, worldwide,
   non-exclusive, no-charge, royalty-free, irrevocable (except as stated in
   this section) patent license to make, have made, use, offer to sell, sell,
   import, and otherwise transfer the Work, where such license applies only to
   those patent claims licensable by such Contributor that are necessarily
   infringed by their Contribution(s) alone or by combination of their
   Contribution(s) with the Work to which such Contribution(s) was submitted.
   If You institute patent litigation against any entity (including a
   cross-claim or counterclaim in a lawsuit) alleging that the Work or a
   Contribution incorporated within the Work constitutes direct or contributory
   patent infringement, then any patent licenses granted to You under this
   License for that Work shall terminate as of the date such litigation is
   filed.

   4. Redistribution. You may reproduce and distribute copies of the Work or
   Derivative Works thereof in any medium, with or without modifications, and
   in Source or Object form, provided that You meet the following conditions:

      (a) You must give any other recipients of the Work or Derivative Works a
      copy of this License; and

      (b) You must cause any modified files to carry prominent notices stating
      that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works that You
      distribute, all copyright, patent, trademark, and attribution notices
      from the Source form of the Work, excluding those notices that do not
      pertain to any part of the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
      distribution, then any Derivative Works that You distribute must include
      a readable copy of the attribution notices contained within such NOTICE
      file, excluding those notices that do not pertain to any part of the
      Derivative Works, in at least one of the following places: within a
      NOTICE text file distributed as part of the Derivative Works; within the
      Source form or documentation, if provided along with the Derivative
      Works; or, within a display generated by the Derivative Works, if and
      wherever such third-party notices normally appear. The contents of the
      NOTICE file are for informational purposes only and do not modify the
      License. You may add Your own attribution notices within Derivative Works
      that You distribute, alongside or as an addendum to the NOTICE text from
      the Work, provided that such additional attribution notices cannot be
      construed as modifying the License.

      You may add Your own copyright statement to Your modifications and may
      provide additional or different license terms and conditions for use,
      reproduction, or distribution of Your modifications, or for any such
      Derivative Works as a whole, provided Your use, reproduction, and
      distribution of the Work otherwise complies with the conditions stated in
      this License.

   5. Submission of Contributions. Unless You explicitly state otherwise, any
   Contribution intentionally submitted for inclusion in the Work by You to the
   Licensor shall be under the terms and conditions of this License, without
   any additional terms or conditions. Notwithstanding the above, nothing
   herein shall supersede or modify the terms of any separate license agreement
   you may have executed with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
   names, trademarks, service marks, or product names of the Licensor, except
   as required for reasonable and customary use in describing the origin of the
   Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or agreed to in
   writing, Licensor provides the Work (and each Contributor provides its
   Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
   KIND, either express or implied, including, without limitation, any
   warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or
   FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining
   the appropriateness of using or redistributing the Work and assume any risks
   associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory, whether
   in tort (including negligence), contract, or otherwise, unless required by
   applicable law (such as deliberate and grossly negligent acts) or agreed to
   in writing, shall any Contributor be liable to You for damages, including
   any direct, indirect, special, incidental, or consequential damages of any
   character arising as a result of this License or out of the use or inability
   to use the Work (including but not limited to damages for loss of goodwill,
   work stoppage, computer failure or malfunction, or any and all other
   commercial damages or losses), even if such Contributor has been advised of
   the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing the Work
   or Derivative Works thereof, You may choose to offer, and charge a fee for,
   acceptance of support, warranty, indemnity, or other liability obligations
   and/or rights consistent with this License. However, in accepting such
   obligations, You may act only on Your own behalf and on Your sole
   responsibility, not on behalf of any other Contributor, and only if You
   agree to indemnify, defend, and hold each Contributor harmless for any
   liability incurred by, or claims asserted against, such Contributor by
   reason of your accepting any such warranty or additional liability. END OF
   TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

To apply the Apache License to your work, attach the following boilerplate
notice, with the fields enclosed by brackets "[]" replaced with your own
identifying information. (Don't include the brackets!) The text should be
enclosed in the appropriate comment syntax for the file format. We also
recommend that a file or class name and description of purpose be included on
the same "printed page" as the copyright notice for easier identification
within third-party archives.

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");

you may not use this file except in compliance with the License.

You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software

distributed under the License is distributed on an "AS IS" BASIS,

WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and

limitations under the License.

* For botocore see also this required NOTICE:
    Botocore
    Copyright 2012-2017 Amazon.com, Inc. or its affiliates. All Rights
    Reserved.

    ----

    Botocore includes a vendorized copy of the requests python library to ease
    installation.

    Requests License
    ================

    Copyright 2013 Kenneth Reitz

       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.


    The requests library also includes some vendorized python libraries to ease
    installation.

    Urllib3 License
    ===============

    This is the MIT license: http://www.opensource.org/licenses/mit-license.php

    Copyright 2008-2011 Andrey Petrov and contributors (see CONTRIBUTORS.txt),
    Modifications copyright 2012 Kenneth Reitz.

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this
    software and associated documentation files (the "Software"), to deal in
    the Software
    without restriction, including without limitation the rights to use, copy,
    modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software, and to
    permit persons
    to whom the Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or
    substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED,
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR
    A PARTICULAR
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE
    FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
    CONTRACT, TORT OR
    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    USE OR OTHER
    DEALINGS IN THE SOFTWARE.

    Chardet License
    ===============

    This library is free software; you can redistribute it and/or
    modify it under the terms of the GNU Lesser General Public
    License as published by the Free Software Foundation; either
    version 2.1 of the License, or (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with this library; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
    02110-1301  USA

    Bundle of CA Root Certificates
    ==============================

    This library is free software; you can redistribute it and/or
    modify it under the terms of the GNU Lesser General Public
    License as published by the Free Software Foundation; either
    version 2.1 of the License, or (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with this library; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
    02110-1301
* For s3transfer see also this required NOTICE:
    s3transfer
    Copyright 2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.

------

** colorama; version 0.4.2 -- https://pypi.org/project/colorama/
Copyright (c) 2010 Jonathan Hartley
All rights reserved.

Copyright (c) 2010 Jonathan Hartley
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holders, nor those of its contributors
  may be used to endorse or promote products derived from this software without
  specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

------

** prompt-toolkit; version 2.0.10 --
https://github.com/prompt-toolkit/python-prompt-toolkit/tree/2.0.10
Copyright (c) 2014, Jonathan Slenders
All rights reserved.

Copyright (c) 2014, Jonathan Slenders
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the {organization} nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

------

** dateutil; version 2.8.0 -- https://github.com/dateutil/dateutil/tree/2.8.0
Copyright 2017- Paul Ganssle <paul@ganssle.io>
Copyright 2017- dateutil contributors (see AUTHORS file)

Copyright 2017- Paul Ganssle <paul@ganssle.io>
Copyright 2017- dateutil contributors (see AUTHORS file)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

The above license applies to all contributions after 2017-12-01, as well as
all contributions that have been re-licensed (see AUTHORS file for the list of
contributors who have re-licensed their code).
--------------------------------------------------------------------------------
dateutil - Extensions to the standard Python datetime module.

Copyright (c) 2003-2011 - Gustavo Niemeyer <gustavo@niemeyer.net>
Copyright (c) 2012-2014 - Tomi Pieviläinen <tomi.pievilainen@iki.fi>
Copyright (c) 2014-2016 - Yaron de Leeuw <me@jarondl.net>
Copyright (c) 2015-     - Paul Ganssle <paul@ganssle.io>
Copyright (c) 2015-     - dateutil contributors (see AUTHORS file)

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.
    * Neither the name of the copyright holder nor the names of its
      contributors may be used to endorse or promote products derived from
      this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The above BSD License Applies to all code, even that also covered by Apache
2.0.

------

** Pyintaller 3.5; version 3.5 --
https://github.com/pyinstaller/pyinstaller/tree/v3.5
Copyright (c) 2010-2020, PyInstaller Development Team
Copyright (c) 2005-2009, Giovanni Bajo
Based on previous work under copyright (c) 2002 McMillan Enterprises, Inc.

    * Package Pyintaller 3.5's source code may be found at:
      https://files.pythonhosted.org/packages/e2/c9/0b44b2ea87ba36395483a672fddd07e6a9cb2b8d3c4a28d7ae76c7e7e1e5/PyInstaller-3.5.tar.gz

================================
 The PyInstaller licensing terms
================================


Copyright (c) 2010-2020, PyInstaller Development Team
Copyright (c) 2005-2009, Giovanni Bajo
Based on previous work under copyright (c) 2002 McMillan Enterprises, Inc.


PyInstaller is licensed under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2 of the License,
or (at your option) any later version.


Bootloader Exception
--------------------

In addition to the permissions in the GNU General Public License, the
authors give you unlimited permission to link or embed compiled bootloader
and related files into combinations with other programs, and to distribute
those combinations without any restriction coming from the use of those
files. (The General Public License restrictions do apply in other respects;
for example, they cover modification of the files, and distribution when
not linked into a combined executable.)


Bootloader and Related Files
----------------------------

Bootloader and related files are files which are embedded within the
final executable. This includes files in directories:

./bootloader/
./PyInstaller/loader


About the PyInstaller Development Team
--------------------------------------

The PyInstaller Development Team is the set of contributors
to the PyInstaller project. A full list with details is kept
in the documentation directory, in the file
``doc/CREDITS.rst``.

The core team that coordinates development on GitHub can be found here:
https://github.com/pyinstaller/pyinstaller.  As of 2015, it consists of:

* Hartmut Goebel
* Martin Zibricky
* David Vierra
* David Cortesi


Our Copyright Policy
--------------------

PyInstaller uses a shared copyright model. Each contributor maintains copyright
over their contributions to PyInstaller. But, it is important to note that
these
contributions are typically only changes to the repositories. Thus,
the PyInstaller source code, in its entirety is not the copyright of any single
person or institution.  Instead, it is the collective copyright of the entire
PyInstaller Development Team.  If individual contributors want to maintain
a record of what changes/contributions they have specific copyright on, they
should indicate their copyright in the commit message of the change, when they
commit the change to the PyInstaller repository.

With this in mind, the following banner should be used in any source code file
to indicate the copyright and license terms:


#-----------------------------------------------------------------------------
# Copyright (c) 2005-2020, PyInstaller Development Team.
#
# Distributed under the terms of the GNU General Public License (version 2
# or later) with exception for distributing the bootloader.
#
# The full license is in the file COPYING.txt, distributed with this software.
#
# SPDX-License-Identifier: (GPL-2.0-or-later WITH Bootloader-exception)
#-----------------------------------------------------------------------------



GNU General Public License
--------------------------

https://gnu.org/licenses/gpl-2.0.html


		    GNU GENERAL PUBLIC LICENSE
		       Version 2, June 1991

 Copyright (C) 1989, 1991 Free Software Foundation, Inc.
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

			    Preamble

  The licenses for most software are designed to take away your
freedom to share and change it.  By contrast, the GNU General Public
License is intended to guarantee your freedom to share and change free
software--to make sure the software is free for all its users.  This
General Public License applies to most of the Free Software
Foundation's software and to any other program whose authors commit to
using it.  (Some other Free Software Foundation software is covered by
the GNU Library General Public License instead.)  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
this service if you wish), that you receive source code or can get it
if you want it, that you can change the software or use pieces of it
in new free programs; and that you know you can do these things.

  To protect your rights, we need to make restrictions that forbid
anyone to deny you these rights or to ask you to surrender the rights.
These restrictions translate to certain responsibilities for you if you
distribute copies of the software, or if you modify it.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must give the recipients all the rights that
you have.  You must make sure that they, too, receive or can get the
source code.  And you must show them these terms so they know their
rights.

  We protect your rights with two steps: (1) copyright the software, and
(2) offer you this license which gives you legal permission to copy,
distribute and/or modify the software.

  Also, for each author's protection and ours, we want to make certain
that everyone understands that there is no warranty for this free
software.  If the software is modified by someone else and passed on, we
want its recipients to know that what they have is not the original, so
that any problems introduced by others will not reflect on the original
authors' reputations.

  Finally, any free program is threatened constantly by software
patents.  We wish to avoid the danger that redistributors of a free
program will individually obtain patent licenses, in effect making the
program proprietary.  To prevent this, we have made it clear that any
patent must be licensed for everyone's free use or not licensed at all.

  The precise terms and conditions for copying, distribution and
modification follow.

		    GNU GENERAL PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. This License applies to any program or other work which contains
a notice placed by the copyright holder saying it may be distributed
under the terms of this General Public License.  The "Program", below,
refers to any such program or work, and a "work based on the Program"
means either the Program or any derivative work under copyright law:
that is to say, a work containing the Program or a portion of it,
either verbatim or with modifications and/or translated into another
language.  (Hereinafter, translation is included without limitation in
the term "modification".)  Each licensee is addressed as "you".

Activities other than copying, distribution and modification are not
covered by this License; they are outside its scope.  The act of
running the Program is not restricted, and the output from the Program
is covered only if its contents constitute a work based on the
Program (independent of having been made by running the Program).
Whether that is true depends on what the Program does.

  1. You may copy and distribute verbatim copies of the Program's
source code as you receive it, in any medium, provided that you
conspicuously and appropriately publish on each copy an appropriate
copyright notice and disclaimer of warranty; keep intact all the
notices that refer to this License and to the absence of any warranty;
and give any other recipients of the Program a copy of this License
along with the Program.

You may charge a fee for the physical act of transferring a copy, and
you may at your option offer warranty protection in exchange for a fee.

  2. You may modify your copy or copies of the Program or any portion
of it, thus forming a work based on the Program, and copy and
distribute such modifications or work under the terms of Section 1
above, provided that you also meet all of these conditions:

    a) You must cause the modified files to carry prominent notices
    stating that you changed the files and the date of any change.

    b) You must cause any work that you distribute or publish, that in
    whole or in part contains or is derived from the Program or any
    part thereof, to be licensed as a whole at no charge to all third
    parties under the terms of this License.

    c) If the modified program normally reads commands interactively
    when run, you must cause it, when started running for such
    interactive use in the most ordinary way, to print or display an
    announcement including an appropriate copyright notice and a
    notice that there is no warranty (or else, saying that you provide
    a warranty) and that users may redistribute the program under
    these conditions, and telling the user how to view a copy of this
    License.  (Exception: if the Program itself is interactive but
    does not normally print such an announcement, your work based on
    the Program is not required to print an announcement.)

These requirements apply to the modified work as a whole.  If
identifiable sections of that work are not derived from the Program,
and can be reasonably considered independent and separate works in
themselves, then this License, and its terms, do not apply to those
sections when you distribute them as separate works.  But when you
distribute the same sections as part of a whole which is a work based
on the Program, the distribution of the whole must be on the terms of
this License, whose permissions for other licensees extend to the
entire whole, and thus to each and every part regardless of who wrote it.

Thus, it is not the intent of this section to claim rights or contest
your rights to work written entirely by you; rather, the intent is to
exercise the right to control the distribution of derivative or
collective works based on the Program.

In addition, mere aggregation of another work not based on the Program
with the Program (or with a work based on the Program) on a volume of
a storage or distribution medium does not bring the other work under
the scope of this License.

  3. You may copy and distribute the Program (or a work based on it,
under Section 2) in object code or executable form under the terms of
Sections 1 and 2 above provided that you also do one of the following:

    a) Accompany it with the complete corresponding machine-readable
    source code, which must be distributed under the terms of Sections
    1 and 2 above on a medium customarily used for software interchange; or,

    b) Accompany it with a written offer, valid for at least three
    years, to give any third party, for a charge no more than your
    cost of physically performing source distribution, a complete
    machine-readable copy of the corresponding source code, to be
    distributed under the terms of Sections 1 and 2 above on a medium
    customarily used for software interchange; or,

    c) Accompany it with the information you received as to the offer
    to distribute corresponding source code.  (This alternative is
    allowed only for noncommercial distribution and only if you
    received the program in object code or executable form with such
    an offer, in accord with Subsection b above.)

The source code for a work means the preferred form of the work for
making modifications to it.  For an executable work, complete source
code means all the source code for all modules it contains, plus any
associated interface definition files, plus the scripts used to
control compilation and installation of the executable.  However, as a
special exception, the source code distributed need not include
anything that is normally distributed (in either source or binary
form) with the major components (compiler, kernel, and so on) of the
operating system on which the executable runs, unless that component
itself accompanies the executable.

If distribution of executable or object code is made by offering
access to copy from a designated place, then offering equivalent
access to copy the source code from the same place counts as
distribution of the source code, even though third parties are not
compelled to copy the source along with the object code.

  4. You may not copy, modify, sublicense, or distribute the Program
except as expressly provided under this License.  Any attempt
otherwise to copy, modify, sublicense or distribute the Program is
void, and will automatically terminate your rights under this License.
However, parties who have received copies, or rights, from you under
this License will not have their licenses terminated so long as such
parties remain in full compliance.

  5. You are not required to accept this License, since you have not
signed it.  However, nothing else grants you permission to modify or
distribute the Program or its derivative works.  These actions are
prohibited by law if you do not accept this License.  Therefore, by
modifying or distributing the Program (or any work based on the
Program), you indicate your acceptance of this License to do so, and
all its terms and conditions for copying, distributing or modifying
the Program or works based on it.

  6. Each time you redistribute the Program (or any work based on the
Program), the recipient automatically receives a license from the
original licensor to copy, distribute or modify the Program subject to
these terms and conditions.  You may not impose any further
restrictions on the recipients' exercise of the rights granted herein.
You are not responsible for enforcing compliance by third parties to
this License.

  7. If, as a consequence of a court judgment or allegation of patent
infringement or for any other reason (not limited to patent issues),
conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot
distribute so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you
may not distribute the Program at all.  For example, if a patent
license would not permit royalty-free redistribution of the Program by
all those who receive copies directly or indirectly through you, then
the only way you could satisfy both it and this License would be to
refrain entirely from distribution of the Program.

If any portion of this section is held invalid or unenforceable under
any particular circumstance, the balance of the section is intended to
apply and the section as a whole is intended to apply in other
circumstances.

It is not the purpose of this section to induce you to infringe any
patents or other property right claims or to contest validity of any
such claims; this section has the sole purpose of protecting the
integrity of the free software distribution system, which is
implemented by public license practices.  Many people have made
generous contributions to the wide range of software distributed
through that system in reliance on consistent application of that
system; it is up to the author/donor to decide if he or she is willing
to distribute software through any other system and a licensee cannot
impose that choice.

This section is intended to make thoroughly clear what is believed to
be a consequence of the rest of this License.

  8. If the distribution and/or use of the Program is restricted in
certain countries either by patents or by copyrighted interfaces, the
original copyright holder who places the Program under this License
may add an explicit geographical distribution limitation excluding
those countries, so that distribution is permitted only in or among
countries not thus excluded.  In such case, this License incorporates
the limitation as if written in the body of this License.

  9. The Free Software Foundation may publish revised and/or new versions
of the General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

Each version is given a distinguishing version number.  If the Program
specifies a version number of this License which applies to it and "any
later version", you have the option of following the terms and conditions
either of that version or of any later version published by the Free
Software Foundation.  If the Program does not specify a version number of
this License, you may choose any version ever published by the Free Software
Foundation.

  10. If you wish to incorporate parts of the Program into other free
programs whose distribution conditions are different, write to the author
to ask for permission.  For software which is copyrighted by the Free
Software Foundation, write to the Free Software Foundation; we sometimes
make exceptions for this.  Our decision will be guided by the two goals
of preserving the free status of all derivatives of our free software and
of promoting the sharing and reuse of software generally.

			    NO WARRANTY

  11. BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY
FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW.  EXCEPT WHEN
OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES
PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED
OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.  THE ENTIRE RISK AS
TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU.  SHOULD THE
PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING,
REPAIR OR CORRECTION.

  12. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR
REDISTRIBUTE THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES,
INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING
OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED
TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY
YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER
PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGES.

		     END OF TERMS AND CONDITIONS

------

** six; version 1.14.0 -- https://github.com/benjaminp/six/tree/1.14.0
Copyright (c) 2010-2020 Benjamin Peterson

Copyright (c) 2010-2020 Benjamin Peterson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

------

** urllib3; version 1.25.8 -- https://github.com/urllib3/urllib3/tree/1.25.8
Copyright (c) 2008-2019 Andrey Petrov and contributors (see CONTRIBUTORS.txt)

MIT License

Copyright (c) 2008-2019 Andrey Petrov and contributors (see CONTRIBUTORS.txt)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

------

** setuptools; version 45.2.0 --
https://github.com/pypa/setuptools/tree/v45.2.0
Copyright (C) 2016 Jason R Coombs <jaraco@jaraco.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

------

** wcwidth; version 0.1.8 -- https://github.com/jquast/wcwidth/tree/0.1.8
Copyright (c) 2014 Jeff Quast <contact@jeffquast.com>

The MIT License (MIT)

Copyright (c) 2014 Jeff Quast <contact@jeffquast.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

------

** jmespath; version 0.9.4 --
https://github.com/jmespath/jmespath.py/tree/0.9.4
Copyright (c) 2013 Amazon.com, Inc. or its affiliates.  All Rights Reserved

Copyright (c) 2013 Amazon.com, Inc. or its affiliates.  All Rights Reserved

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, dis-
tribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the fol-
lowing conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABIL-
ITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
SHALL THE AUTHOR BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

------

** ruamel.yaml; version 0.15.100 --
https://sourceforge.net/p/ruamel-yaml/code/ci/default/tree/
Copyright (c) 2014-2019 Anthon van der Neut, Ruamel bvba

 The MIT License (MIT)

 Copyright (c) 2014-2020 Anthon van der Neut, Ruamel bvba

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

------

** OpenSSL; version 1.0.2s --
https://github.com/openssl/openssl/tree/OpenSSL_1_0_1s
Copyright (c) 1998-2011 The OpenSSL Project.  All rights reserved.
Copyright (C) 1995-1998 Eric Young (eay@cryptsoft.com)

LICENSE ISSUES
  ==============

  The OpenSSL toolkit stays under a double license, i.e. both the conditions of
  the OpenSSL License and the original SSLeay license apply to the toolkit.
  See below for the actual license texts.

  OpenSSL License
  ---------------

/* ====================================================================
 * Copyright (c) 1998-2017 The OpenSSL Project.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 *
 * 3. All advertising materials mentioning features or use of this
 *    software must display the following acknowledgment:
 *    "This product includes software developed by the OpenSSL Project
 *    for use in the OpenSSL Toolkit. (http://www.openssl.org/)"
 *
 * 4. The names "OpenSSL Toolkit" and "OpenSSL Project" must not be used to
 *    endorse or promote products derived from this software without
 *    prior written permission. For written permission, please contact
 *    openssl-core@openssl.org.
 *
 * 5. Products derived from this software may not be called "OpenSSL"
 *    nor may "OpenSSL" appear in their names without prior written
 *    permission of the OpenSSL Project.
 *
 * 6. Redistributions of any form whatsoever must retain the following
 *    acknowledgment:
 *    "This product includes software developed by the OpenSSL Project
 *    for use in the OpenSSL Toolkit (http://www.openssl.org/)"
 *
 * THIS SOFTWARE IS PROVIDED BY THE OpenSSL PROJECT ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE OpenSSL PROJECT OR
 * ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ====================================================================
 *
 * This product includes cryptographic software written by Eric Young
 * (eay@cryptsoft.com).  This product includes software written by Tim
 * Hudson (tjh@cryptsoft.com).
 *
 */

 Original SSLeay License
 -----------------------

/* Copyright (C) 1995-1998 Eric Young (eay@cryptsoft.com)
 * All rights reserved.
 *
 * This package is an SSL implementation written
 * by Eric Young (eay@cryptsoft.com).
 * The implementation was written so as to conform with Netscapes SSL.
 *
 * This library is free for commercial and non-commercial use as long as
 * the following conditions are aheared to.  The following conditions
 * apply to all code found in this distribution, be it the RC4, RSA,
 * lhash, DES, etc., code; not just the SSL code.  The SSL documentation
 * included with this distribution is covered by the same copyright terms
 * except that the holder is Tim Hudson (tjh@cryptsoft.com).
 *
 * Copyright remains Eric Young's, and as such any Copyright notices in
 * the code are not to be removed.
 * If this package is used in a product, Eric Young should be given attribution
 * as the author of the parts of the library used.
 * This can be in the form of a textual message at program startup or
 * in documentation (online or textual) provided with the package.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software
 *    must display the following acknowledgement:
 *    "This product includes cryptographic software written by
 *     Eric Young (eay@cryptsoft.com)"
 *    The word 'cryptographic' can be left out if the rouines from the library
 *    being used are not cryptographic related :-).
 * 4. If you include any Windows specific code (or a derivative thereof) from
 * the apps directory (application code) you must include an acknowledgement:
 * "This product includes software written by Tim Hudson (tjh@cryptsoft.com)"
 *
 * THIS SOFTWARE IS PROVIDED BY ERIC YOUNG ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 *
 * The licence and distribution terms for any publically available version or
 * derivative of this code cannot be changed.  i.e. this code cannot simply be
 * copied and put under another distribution licence
 * [including the GNU Public Licence.]
 */

------

** Python 3.9.11; version 3.9.11 -- https://github.com/python/cpython/tree/v3.9.11
Copyright © 2001-2020 Python Software Foundation. All rights reserved.

PYTHON SOFTWARE FOUNDATION LICENSE VERSION 2
--------------------------------------------

1. This LICENSE AGREEMENT is between the Python Software Foundation
("PSF"), and the Individual or Organization ("Licensee") accessing and
otherwise using this software ("Python") in source or binary form and
its associated documentation.

2. Subject to the terms and conditions of this License Agreement, PSF hereby
grants Licensee a nonexclusive, royalty-free, world-wide license to reproduce,
analyze, test, perform and/or display publicly, prepare derivative works,
distribute, and otherwise use Python alone or in any derivative version,
provided, however, that PSF's License Agreement and PSF's notice of copyright,
i.e., "Copyright (c) 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
2010,
2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 Python Software
Foundation;
All Rights Reserved" are retained in Python alone or in any derivative version
prepared by Licensee.

3. In the event Licensee prepares a derivative work that is based on
or incorporates Python or any part thereof, and wants to make
the derivative work available to others as provided herein, then
Licensee hereby agrees to include in any such work a brief summary of
the changes made to Python.

4. PSF is making Python available to Licensee on an "AS IS"
basis.  PSF MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR
IMPLIED.  BY WAY OF EXAMPLE, BUT NOT LIMITATION, PSF MAKES NO AND
DISCLAIMS ANY REPRESENTATION OR WARRANTY OF MERCHANTABILITY OR FITNESS
FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF PYTHON WILL NOT
INFRINGE ANY THIRD PARTY RIGHTS.

5. PSF SHALL NOT BE LIABLE TO LICENSEE OR ANY OTHER USERS OF PYTHON
FOR ANY INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES OR LOSS AS
A RESULT OF MODIFYING, DISTRIBUTING, OR OTHERWISE USING PYTHON,
OR ANY DERIVATIVE THEREOF, EVEN IF ADVISED OF THE POSSIBILITY THEREOF.

6. This License Agreement will automatically terminate upon a material
breach of its terms and conditions.

7. Nothing in this License Agreement shall be deemed to create any
relationship of agency, partnership, or joint venture between PSF and
Licensee.  This License Agreement does not grant permission to use PSF
trademarks or trade name in a trademark sense to endorse or promote
products or services of Licensee, or any third party.

8. By copying, installing or otherwise using Python, Licensee
agrees to be bound by the terms and conditions of this License
Agreement.



------

** docutils; version 0.15.2 --
https://sourceforge.net/p/docutils/code/HEAD/tree/trunk/docutils/
:Author: David Goodger
:Contact: goodger@python.org
:Date: $Date: 2015-05-08 15:56:32 +0000 (Fri, 08 May 2015) $
:Web site: http://docutils.sourceforge.net/
:Copyright: This document has been placed in the public domain.

==================
 Copying Docutils
==================

:Author: David Goodger
:Contact: goodger@python.org
:Date: $Date: 2015-05-08 15:56:32 +0000 (Fri, 08 May 2015) $
:Web site: http://docutils.sourceforge.net/
:Copyright: This document has been placed in the public domain.

Most of the files included in this project have been placed in the
public domain, and therefore have no license requirements and no
restrictions on copying or usage; see the `Public Domain Dedication`_
below.  There are a few exceptions_, listed below.
Files in the Sandbox_ are not distributed with Docutils releases and
may have different license terms.


Public Domain Dedication
========================

The persons who have associated their work with this project (the
"Dedicator": David Goodger and the many contributors to the Docutils
project) hereby dedicate the entire copyright, less the exceptions_
listed below, in the work of authorship known as "Docutils" identified
below (the "Work") to the public domain.

The primary repository for the Work is the Internet World Wide Web
site <http://docutils.sourceforge.net/>.  The Work consists of the
files within the "docutils" module of the Docutils project Subversion
repository (Internet host docutils.svn.sourceforge.net, filesystem path
/svnroot/docutils), whose Internet web interface is located at
<http://docutils.svn.sourceforge.net/viewvc/docutils/>.  Files dedicated to the
public domain may be identified by the inclusion, near the beginning
of each file, of a declaration of the form::

    Copyright: This document/module/DTD/stylesheet/file/etc. has been
               placed in the public domain.

Dedicator makes this dedication for the benefit of the public at large
and to the detriment of Dedicator's heirs and successors.  Dedicator
intends this dedication to be an overt act of relinquishment in
perpetuity of all present and future rights under copyright law,
whether vested or contingent, in the Work.  Dedicator understands that
such relinquishment of all rights includes the relinquishment of all
rights to enforce (by lawsuit or otherwise) those copyrights in the
Work.

Dedicator recognizes that, once placed in the public domain, the Work
may be freely reproduced, distributed, transmitted, used, modified,
built upon, or otherwise exploited by anyone for any purpose,
commercial or non-commercial, and in any way, including by methods
that have not yet been invented or conceived.

(This dedication is derived from the text of the `Creative Commons
Public Domain Dedication`. [#]_)

.. [#] Creative Commons has `retired this legal tool`__ and does not
   recommend that it be applied to works: This tool is based on United
   States law and may not be applicable outside the US. For dedicating new
   works to the public domain, Creative Commons recommend the replacement
   Public Domain Dedication CC0_ (CC zero, "No Rights Reserved"). So does
   the Free Software Foundation in its license-list_.

   __  http://creativecommons.org/retiredlicenses
   .. _CC0: http://creativecommons.org/about/cc0

Exceptions
==========

The exceptions to the `Public Domain Dedication`_ above are:

* docutils/writers/s5_html/themes/default/iepngfix.htc:

      IE5.5+ PNG Alpha Fix v1.0 by Angus Turnbull
      <http://www.twinhelix.com>.  Free usage permitted as long as
      this notice remains intact.

* docutils/utils/math/__init__.py,
  docutils/utils/math/latex2mathml.py,
  docutils/writers/xetex/__init__.py,
  docutils/writers/latex2e/docutils-05-compat.sty,
  docs/user/docutils-05-compat.sty.txt,
  docutils/utils/error_reporting.py,
  docutils/test/transforms/test_smartquotes.py:

  Copyright © Günter Milde.
  Released under the terms of the `2-Clause BSD license`_
  (`local copy <licenses/BSD-2-Clause.txt>`__).

* docutils/utils/smartquotes.py

  Copyright © 2011 Günter Milde,
  based on `SmartyPants`_ © 2003 John Gruber
  (released under a 3-Clause BSD license included in the file)
  and smartypants.py © 2004, 2007 Chad Miller.
  Released under the terms of the `2-Clause BSD license`_
  (`local copy <licenses/BSD-2-Clause.txt>`__).

  .. _SmartyPants: http://daringfireball.net/projects/smartypants/

* docutils/utils/math/math2html.py,
  docutils/writers/html4css1/math.css

  Copyright © Alex Fernández
  These files are part of eLyXer_, released under the `GNU
  General Public License`_ version 3 or later. The author relicensed
  them for Docutils under the terms of the `2-Clause BSD license`_
  (`local copy <licenses/BSD-2-Clause.txt>`__).

  .. _eLyXer: http://www.nongnu.org/elyxer/

* docutils/utils/roman.py, copyright by Mark Pilgrim, released under the
  `Python 2.1.1 license`_ (`local copy`__).

  __ licenses/python-2-1-1.txt

* tools/editors/emacs/rst.el, copyright by Free Software Foundation,
  Inc., released under the `GNU General Public License`_ version 3 or
  later (`local copy`__).

  __ licenses/gpl-3-0.txt

The `2-Clause BSD license`_ and the Python licenses are OSI-approved_
and GPL-compatible_.

Plaintext versions of all the linked-to licenses are provided in the
licenses_ directory.

.. _sandbox: http://docutils.sourceforge.net/sandbox/README.html
.. _licenses: licenses/
.. _Python 2.1.1 license: http://www.python.org/2.1.1/license.html
.. _GNU General Public License: http://www.gnu.org/copyleft/gpl.html
.. _2-Clause BSD license: http://www.spdx.org/licenses/BSD-2-Clause
.. _OSI-approved: http://opensource.org/licenses/
.. _license-list:
.. _GPL-compatible: http://www.gnu.org/licenses/license-list.html


================================================
FILE: docs/swagger.yaml
================================================
openapi: 3.0.0
info:
  title: Softtek Challenge API
  version: 1.0.0
  description: API para el reto técnico de Softtek

servers:
  - url: http://localhost:3000
    description: Servidor local
  - url: https://xxxx.execute-api.us-east-1.amazonaws.com/dev
    description: Servidor AWS

paths:
  /fusionados:
    get:
      summary: Obtiene datos fusionados de Star Wars y clima
      responses:
        '200':
          description: Datos fusionados
          content:
            application/json:
              schema:
                type: object
                properties:
                  source:
                    type: string
                    description: Fuente de los datos (cache o api)
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Fusionado'
  /almacenar:
    post:
      summary: Almacena datos personalizados
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
      responses:
        '201':
          description: Datos almacenados
  /historial:
    get:
      summary: Obtiene historial de datos fusionados
      security:
        - bearerAuth: []
      parameters:
        - in: query
          name: page
          schema:
            type: integer
          description: Número de página
        - in: query
          name: limit
          schema:
            type: integer
          description: Límite de resultados por página
      responses:
        '200':
          description: Historial paginado

components:
  schemas:
    Fusionado:
      type: object
      properties:
        name:
          type: string
        height:
          type: number
          nullable: true
        mass:
          type: number
          nullable: true
        homeworld:
          type: string
        birth_year:
          type: string
        weather:
          $ref: '#/components/schemas/Clima'
    Clima:
      type: object
      properties:
        temperature:
          type: number
          nullable: true
        humidity:
          type: number
          nullable: true
        description:
          type: string
        windSpeed:
          type: number
          nullable: true
        location:
          type: string
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT


================================================
FILE: src/app.ts
================================================
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


================================================
FILE: src/server.ts
================================================
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


================================================
FILE: src/handlers/almacenar.ts
================================================
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


================================================
FILE: src/handlers/auth.ts
================================================
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


================================================
FILE: src/handlers/fusionHandler.ts
================================================
import { Request, Response } from 'express';
import { getCachedData, cacheData } from '../services/cache';
import { fetchSwapiPeople, fetchWeatherData } from '../services/api';
import { normalizeWeatherData, normalizeCharacterData } from '../utils/normalizer';
import { saveToHistory } from '../services/database';

export const getFusionados = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'fusionados';
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return res.json({
        source: 'cache',
        data: cachedData
      });
    }

    const characters = await fetchSwapiPeople();
    
    if (!characters || characters.length === 0) {
      return res.status(404).json({ error: 'No se encontraron personajes' });
    }

    // Obtener clima para cada planeta
    const weatherPromises = characters.map(char => 
      fetchWeatherData(char.homeworld).catch(() => null)
    );
    const weatherDataList = await Promise.all(weatherPromises);
    
    const mergedData = characters.map((char, index) => {
      const normalizedChar = normalizeCharacterData(char);
      return {
        ...normalizedChar,
        weather: normalizeWeatherData(weatherDataList[index])
      };
    });

    await cacheData(cacheKey, mergedData, 1800); // Cache por 30 min
    await saveToHistory(mergedData);

    res.json({
      source: 'api',
      data: mergedData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos fusionados' });
  }
};


================================================
FILE: src/handlers/historial.ts
================================================
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


================================================
FILE: src/middleware/authMiddleware.ts
================================================
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


================================================
FILE: src/middleware/errorMiddleware.ts
================================================



================================================
FILE: src/middleware/rateLimits.ts
================================================
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


================================================
FILE: src/middleware/weather.ts
================================================



================================================
FILE: src/models/character.ts
================================================
export interface Character {
  name: string;
  height: number | null;
  mass: number | null;
  homeworld: string;
  birth_year: string;
  weather?: WeatherData;
}

export interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  description: string;
  windSpeed: number | null;
  location: string;
}


================================================
FILE: src/models/fusionadoHistory.ts
================================================



================================================
FILE: src/services/api.ts
================================================
import axios from 'axios';

// Mejorar manejo de variables de entorno con validación
const SWAPI_URL = process.env.SWAPI_URL || 'https://swapi.dev/api';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface Character {
  name: string;
  height: string;
  mass: string;
  homeworld: string;
  birth_year: string;
}

export const fetchSwapiPeople = async (): Promise<Character[]> => {
  try {
    const response = await axios.get(`${SWAPI_URL}/people`);
    return response.data.results.map((person: any) => ({
      name: person.name,
      height: person.height,
      mass: person.mass,
      homeworld: person.homeworld,
      birth_year: person.birth_year
    }));
  } catch (error) {
    console.error('Error fetching SWAPI data:', error);
    throw new Error('Failed to fetch Star Wars data');
  }
};

export const fetchWeatherData = async (location: string): Promise<any> => {
  // Validar que la API key existe y no es un valor placeholder antes de hacer la llamada
  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_API_KEY' || WEATHER_API_KEY === 'default_weather_key') {
    console.warn('Weather API key not configured properly, returning mock data');
    return null;
  }

  try {
    const response = await axios.get(OPEN_WEATHER_URL, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: 'metric'
      },
      timeout: 5000 // Timeout de 5 segundos para evitar bloqueos
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather for ${location}:`, error);
    return null;
  }
};


================================================
FILE: src/services/cache.ts
================================================
// src/services/cache.ts
import { createClient } from 'redis';

// Definimos el tipo de cliente de manera más simple
type RedisClient = ReturnType<typeof createClient>;

let redisClient: RedisClient | null = null;

/**
 * Obtiene una instancia del cliente Redis, creándola si no existe
 * Esta función implementa el patrón Singleton para el cliente Redis
 */
const getRedisClient = (): RedisClient => {
  if (!redisClient) {
    // Crear el cliente con configuración básica
    redisClient = createClient({ 
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      // Configuración de reconexión automática
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000)
      }
    });
    
    // Configurar manejadores de eventos para monitoreo
    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis connected successfully');
    });

    redisClient.on('reconnecting', () => {
      console.log('Redis reconnecting...');
    });

    redisClient.on('ready', () => {
      console.log('Redis client ready');
    });
  }
  return redisClient;
};

/**
 * Establece la conexión con Redis si no está ya conectado
 * Esta función es segura para llamar múltiples veces
 */
export const connectRedis = async (): Promise<void> => {
  const client = getRedisClient();
  
  // Solo conectar si el cliente no está ya conectado
  if (!client.isOpen) {
    try {
      await client.connect();
      console.log('Redis connection established');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      throw error;
    }
  }
};

/**
 * Obtiene datos del cache de Redis
 * @param key - La clave para buscar en el cache
 * @returns Los datos parseados o null si no existen o hay error
 */
export const getCachedData = async (key: string): Promise<any> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    const data = await client.get(key);
    
    if (data) {
      console.log(`Cache hit for key: ${key}`);
      return JSON.parse(data);
    } else {
      console.log(`Cache miss for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Cache read error:', error);
    // En caso de error, devolvemos null para que la aplicación continúe
    return null;
  }
};

/**
 * Almacena datos en el cache de Redis con TTL
 * @param key - La clave para almacenar
 * @param value - El valor a almacenar (será convertido a JSON)
 * @param ttl - Tiempo de vida en segundos (por defecto 30 minutos)
 */
export const cacheData = async (key: string, value: any, ttl: number = 1800): Promise<void> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    // Convertir el valor a JSON y almacenarlo con TTL
    await client.setEx(key, ttl, JSON.stringify(value));
    console.log(`Data cached successfully with key: ${key}, TTL: ${ttl}s`);
  } catch (error) {
    console.error('Cache write error:', error);
    // No lanzamos el error para que la aplicación continúe funcionando
    // incluso si el cache falla
  }
};

/**
 * Cierra la conexión con Redis de manera limpia
 * Útil para pruebas y cierre de la aplicación
 */
export const disconnectRedis = async (): Promise<void> => {
  if (redisClient && redisClient.isOpen) {
    try {
      await redisClient.disconnect();
      console.log('Redis connection closed');
      redisClient = null;
    } catch (error) {
      console.error('Error disconnecting from Redis:', error);
    }
  }
};

/**
 * Verifica si Redis está conectado y funcionando
 * @returns true si Redis está disponible, false en caso contrario
 */
export const isRedisConnected = async (): Promise<boolean> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    console.error('Redis health check failed:', error);
    return false;
  }
};


================================================
FILE: src/services/database.ts
================================================
// src/services/database.ts - Versión actualizada
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1'
});

const dynamoDb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE || 'FusionadosHistory';

export const saveToHistory = async (data: any): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: `fusion-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      data,
      createdAt: new Date().toISOString(),
      type: 'fusion'  // Campo necesario para el índice
    }
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log('Data saved to history successfully');
  } catch (error) {
    console.error('DynamoDB save error:', error);
    throw error;
  }
};

export const saveCustomData = async (data: any): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      ...data,
      createdAt: new Date().toISOString(),
      type: 'custom'  // Campo necesario para el índice
    }
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log('Custom data saved successfully');
  } catch (error) {
    console.error('DynamoDB save error:', error);
    throw error;
  }
};

export const getHistory = async (page: number, limit: number): Promise<any> => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'TypeCreatedAtIndex',  // Usar el nuevo índice
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames: {
      '#type': 'type'
    },
    ExpressionAttributeValues: {
      ':type': 'fusion'  // Filtrar solo elementos de tipo 'fusion'
    },
    ScanIndexForward: false,  // Orden descendente (más recientes primero)
    Limit: limit
  };

  try {
    const result = await dynamoDb.send(new QueryCommand(params));
    return {
      items: result.Items || [],
      lastEvaluatedKey: result.LastEvaluatedKey,
      page,
      limit,
      count: result.Count || 0
    };
  } catch (error) {
    console.error('DynamoDB query error:', error);
    throw error;
  }
};


================================================
FILE: src/services/historyService.ts
================================================



================================================
FILE: src/services/swapiService.ts
================================================



================================================
FILE: src/services/weatherService.ts
================================================



================================================
FILE: src/utils/auth.ts
================================================
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


================================================
FILE: src/utils/authTest.ts
================================================
import { generateToken, verifyToken, generateTestToken } from './auth';

/**
 * Función para testear manualmente el sistema de autenticación
 */
export const testAuthSystem = (): void => {
  console.log('🧪 Iniciando tests del sistema de autenticación...\n');

  try {
    // Test 1: Generar token válido
    console.log('Test 1: Generación de token');
    const token = generateToken({ username: 'test-user', role: 'user' });
    console.log('✅ Token generado:', token.substring(0, 50) + '...');

    // Test 2: Verificar token válido
    console.log('\nTest 2: Verificación de token válido');
    const { payload, error } = verifyToken(token);
    if (payload && !error) {
      console.log('✅ Token verificado correctamente');
      console.log('   Usuario:', payload.username);
      console.log('   Rol:', payload.role);
    } else {
      console.log('❌ Error verificando token:', error);
    }

    // Test 3: Verificar token inválido
    console.log('\nTest 3: Verificación de token inválido');
    const { payload: invalidPayload, error: invalidError } = verifyToken('token-invalido');
    if (!invalidPayload && invalidError) {
      console.log('✅ Token inválido detectado correctamente:', invalidError);
    } else {
      console.log('❌ Token inválido no detectado');
    }

    // Test 4: Token de testing
    console.log('\nTest 4: Token de testing');
    const testToken = generateTestToken();
    const { payload: testPayload } = verifyToken(testToken);
    if (testPayload) {
      console.log('✅ Token de testing funciona correctamente');
      console.log('   Usuario:', testPayload.username);
    }

    console.log('\n🎉 Todos los tests de autenticación completados');
  } catch (error) {
    console.error('❌ Error en tests:', error);
  }
};


================================================
FILE: src/utils/cache.ts
================================================



================================================
FILE: src/utils/logger.ts
================================================



================================================
FILE: src/utils/normalizer.ts
================================================
export const normalizeWeatherData = (weatherData: any): any => {
  if (!weatherData || !weatherData.main) {
    return {
      temperature: null,
      humidity: null,
      description: 'Datos no disponibles',
      windSpeed: null,
      location: 'Desconocido'
    };
  }
  
  return {
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    description: weatherData.weather?.[0]?.description || '',
    windSpeed: weatherData.wind?.speed,
    location: weatherData.name
  };
};

export const normalizeCharacterData = (character: any): any => {
  return {
    name: character.name,
    height: character.height === 'unknown' ? null : parseInt(character.height),
    mass: character.mass === 'unknown' ? null : parseInt(character.mass.replace(',', '')),
    homeworld: character.homeworld,
    birth_year: character.birth_year
  };
};


================================================
FILE: tests/integration/fusionHandler.test.ts
================================================



================================================
FILE: tests/integration/test-redis.js
================================================
// test-redis.js
const { connectRedis, cacheData, getCachedData, disconnectRedis } = require('./dist/src/services/cache');

async function testRedis() {
  try {
    console.log('Testing Redis connection...');
    
    // Probar almacenamiento
    await cacheData('test-key', { message: 'Hello Redis!' }, 60);
    
    // Probar lectura
    const data = await getCachedData('test-key');
    console.log('Retrieved data:', data);
    
    // Limpiar
    await disconnectRedis();
    console.log('Redis test completed successfully!');
  } catch (error) {
    console.error('Redis test failed:', error);
  }
}

testRedis();


================================================
FILE: tests/units/fusionados.tests.ts
================================================
import { getFusionados } from '../../src/handlers/fusionados';
import { Request, Response } from 'express';
import * as api from '../../src/services/api';
import * as cache from '../../src/services/cache';
import * as db from '../../src/services/database';

jest.mock('../../src/services/api');
jest.mock('../../src/services/cache');
jest.mock('../../src/services/database');

describe('GET /fusionados', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: sendMock });
    
    req = {};
    res = {
      status: statusMock,
      json: sendMock
    };
  });

  it('debe devolver datos desde caché', async () => {
    const cachedData = [{ name: 'Luke', weather: { temp: 25 } }];
    (cache.getCachedData as jest.Mock).mockResolvedValue(cachedData);
    
    await getFusionados(req as Request, res as Response);
    
    expect(res.json).toHaveBeenCalledWith({
      source: 'cache',
      data: cachedData
    });
  });

  it('debe devolver datos desde API cuando no hay caché', async () => {
    (cache.getCachedData as jest.Mock).mockResolvedValue(null);
    const characters = [{ name: 'Luke', homeworld: 'Tatooine' }];
    (api.fetchSwapiPeople as jest.Mock).mockResolvedValue(characters);
    (api.fetchWeatherData as jest.Mock).mockResolvedValue({ main: { temp: 25 } });
    
    await getFusionados(req as Request, res as Response);
    
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      source: 'api'
    }));
  });
});


================================================
FILE: tests/units/swapiService.test.ts
================================================



================================================
FILE: tests/units/weatherservice.test.ts
================================================



================================================
FILE: .devcontainer/devcontainer.json
================================================
{
  "name": "Reto Backend Dev",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:0-20",
  "postCreateCommand": "npm install",
  "forwardPorts": [3000, 9229],
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-azuretools.vscode-docker",
    "ms-vscode-remote.remote-containers"
  ]
}


================================================
FILE: .devcontainer/Dockerfile
================================================
FROM mcr.microsoft.com/devcontainers/typescript-node:0-20


RUN apt-get update\&& apt-get install -y awscli \ && npm install -g serverless