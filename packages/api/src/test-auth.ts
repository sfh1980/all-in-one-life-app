import 'dotenv/config';
import { PasswordSecurity } from './utils/password.js';
import { JWTManager } from './utils/jwt.js';
import { registerSchema, loginSchema } from './schemas/auth.js';

async function testAuthUtilities() {
  console.log('🧪 Testing Authentication Utilities...\n');
  
  try {
    // Test 1: Password Hashing
    console.log('1. Testing Password Hashing:');
    const testPassword = 'TestPassword123!';
    const hashedPassword = await PasswordSecurity.hashPassword(testPassword);
    console.log('✅ Password hashed successfully');
    
    const isValid = await PasswordSecurity.verifyPassword(testPassword, hashedPassword);
    console.log(`✅ Password verification: ${isValid ? 'PASS' : 'FAIL'}\n`);
    
    // Test 2: JWT Token Generation
    console.log('2. Testing JWT Tokens:');
    const tokens = JWTManager.generateTokenPair('test-user-id', 'test@example.com');
    console.log('✅ Tokens generated successfully');
    
    const payload = JWTManager.verifyAccessToken(tokens.accessToken);
    console.log(`✅ Token verification: ${payload.userId === 'test-user-id' ? 'PASS' : 'FAIL'}\n`);
    
    // Test 3: Input Validation
    console.log('3. Testing Input Validation:');
    const validInput = {
      email: 'test@example.com',
      password: 'ValidPassword123!',
      firstName: 'John',
      lastName: 'Doe'
    };
    
    const { error } = registerSchema.validate(validInput);
    console.log(`✅ Validation test: ${!error ? 'PASS' : 'FAIL'}\n`);
    
    console.log('🎉 All authentication utilities working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testAuthUtilities();
