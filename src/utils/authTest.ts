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