import 'dotenv/config';

const API_BASE = 'http://localhost:3001/api/auth';

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: any;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
}

async function testAuthenticationFlow() {
  console.log('🧪 Testing Complete Authentication Flow...\n');
  
  try {
    // Test 1: User Registration
    console.log('1. Testing User Registration:');
    const registerResponse = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'User'
      })
    });
    
    const registerData: AuthResponse = await registerResponse.json();
    console.log(`✅ Registration: ${registerData.success ? 'PASS' : 'FAIL'}`);
    if (!registerData.success) {
      console.log('❌ Error:', registerData.error);
      return;
    }
    
    const { accessToken, refreshToken } = registerData.tokens!;
    console.log('✅ Tokens received\n');
    
    // Test 2: User Login
    console.log('2. Testing User Login:');
    const loginResponse = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'TestPassword123!'
      })
    });
    
    const loginData: AuthResponse = await loginResponse.json();
    console.log(`✅ Login: ${loginData.success ? 'PASS' : 'FAIL'}\n`);
    
    // Test 3: Token Refresh
    console.log('3. Testing Token Refresh:');
    const refreshResponse = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    });
    
    const refreshData: AuthResponse = await refreshResponse.json();
    console.log(`✅ Token Refresh: ${refreshData.success ? 'PASS' : 'FAIL'}\n`);
    
    // Test 4: Protected Route (we'll add this later)
    console.log('4. Testing Protected Route Access:');
    const protectedResponse = await fetch('http://localhost:3001/health', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log(`✅ Protected Access: ${protectedResponse.ok ? 'PASS' : 'FAIL'}\n`);
    
    // Test 5: Logout
    console.log('5. Testing Logout:');
    const logoutResponse = await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const logoutData: AuthResponse = await logoutResponse.json();
    console.log(`✅ Logout: ${logoutData.success ? 'PASS' : 'FAIL'}\n`);
    
    console.log('🎉 Authentication flow test complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Wait a moment for server to start, then run tests
setTimeout(testAuthenticationFlow, 2000);