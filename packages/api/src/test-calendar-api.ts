import 'dotenv/config';

const API_BASE = 'http://localhost:3001/api';

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

async function testCalendarAPI() {
  console.log('🧪 Testing Calendar API...\n');
  
  try {
    // Step 1: Login to get access token
    console.log('1. Logging in to get access token:');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData: ApiResponse = await loginResponse.json();
    if (!loginData.success) {
      console.log('❌ Login failed:', loginData.error);
      return;
    }
    
    const accessToken = loginData.data.tokens.accessToken;
    console.log('✅ Login successful');
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Step 2: Get Event Templates
    console.log('\n2. Fetching event templates:');
    const templatesResponse = await fetch(`${API_BASE}/calendar/templates`, {
      headers
    });
    
    const templatesData: ApiResponse = await templatesResponse.json();
    console.log(`✅ Templates: ${templatesData.success ? 'PASS' : 'FAIL'}`);
    if (templatesData.success) {
      console.log(`   Found ${templatesData.data.length} templates`);
      console.log(`   Sample: ${templatesData.data[0]?.name} (${templatesData.data[0]?.eventType})`);
    }

    // Step 3: Get Event Types
    console.log('\n3. Fetching event types:');
    const eventTypesResponse = await fetch(`${API_BASE}/calendar/event-types`, {
      headers
    });
    
    const eventTypesData: ApiResponse = await eventTypesResponse.json();
    console.log(`✅ Event Types: ${eventTypesData.success ? 'PASS' : 'FAIL'}`);
    if (eventTypesData.success) {
      console.log(`   Found ${eventTypesData.data.length} event types`);
    }

    // Step 4: Get Existing Events
    console.log('\n4. Fetching existing events:');
    const eventsResponse = await fetch(`${API_BASE}/calendar/events`, {
      headers
    });
    
    const eventsData: ApiResponse = await eventsResponse.json();
    console.log(`✅ Get Events: ${eventsData.success ? 'PASS' : 'FAIL'}`);
    if (eventsData.success) {
      console.log(`   Found ${eventsData.data.length} existing events`);
    }

    // Step 5: Create New Event
    console.log('\n5. Creating new event:');
    const newEvent = {
      title: 'Test Gym Session',
      description: 'Testing calendar API with a workout',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // +90 minutes
      eventType: 'HEALTH',
      importanceLevel: 'MEDIUM',
      metadata: {
        workout_type: 'strength training',
        location: 'Local Gym',
        reminder_times: [60, 15]
      },
      gpsLocation: {
        address: '123 Fitness St',
        coordinates: { lat: 40.7589, lng: -73.9851 }
      }
    };

    const createResponse = await fetch(`${API_BASE}/calendar/events`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newEvent)
    });
    
    const createData: ApiResponse = await createResponse.json();
    console.log(`✅ Create Event: ${createData.success ? 'PASS' : 'FAIL'}`);
    if (createData.success) {
      console.log(`   Created: ${createData.data.title}`);
      console.log(`   Color: ${createData.data.color}`);
      console.log(`   ID: ${createData.data.id}`);
    }

    // Step 6: Update Event (if creation was successful)
    if (createData.success) {
      console.log('\n6. Updating event:');
      const eventId = createData.data.id;
      const updateData = {
        title: 'Updated Gym Session',
        description: 'Updated description for testing',
        importanceLevel: 'HIGH'
      };

      const updateResponse = await fetch(`${API_BASE}/calendar/events/${eventId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      });
      
      const updateResult: ApiResponse = await updateResponse.json();
      console.log(`✅ Update Event: ${updateResult.success ? 'PASS' : 'FAIL'}`);
      if (updateResult.success) {
        console.log(`   Updated title: ${updateResult.data.title}`);
        console.log(`   Importance: ${updateResult.data.importanceLevel}`);
      }

      // Step 7: Delete Event
      console.log('\n7. Deleting test event:');
      const deleteResponse = await fetch(`${API_BASE}/calendar/events/${eventId}`, {
        method: 'DELETE',
        headers
      });
      
      const deleteResult: ApiResponse = await deleteResponse.json();
      console.log(`✅ Delete Event: ${deleteResult.success ? 'PASS' : 'FAIL'}`);
    }

    // Step 8: Test Date Range Query
    console.log('\n8. Testing date range query:');
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Next 30 days
    
    const rangeResponse = await fetch(
      `${API_BASE}/calendar/events?startDate=${startDate}&endDate=${endDate}`,
      { headers }
    );
    
    const rangeData: ApiResponse = await rangeResponse.json();
    console.log(`✅ Date Range Query: ${rangeData.success ? 'PASS' : 'FAIL'}`);
    if (rangeData.success) {
      console.log(`   Events in next 30 days: ${rangeData.data.length}`);
    }

    console.log('\n🎉 Calendar API testing completed!');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test
testCalendarAPI();
