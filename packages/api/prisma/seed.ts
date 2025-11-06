import { PrismaClient } from '@prisma/client';
import { seedEventTemplates } from './templates-seed.ts';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed event templates first
  await seedEventTemplates();

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // 'password123'
      firstName: 'Test',
      lastName: 'User',
    },
  });

  console.log('👤 Created test user:', testUser.email);

  // Create a default calendar for the test user
  const defaultCalendar = await prisma.calendar.upsert({
    where: { id: 'default-calendar-id' },
    update: {},
    create: {
      id: 'default-calendar-id',
      name: 'My Calendar',
      description: 'Default calendar for life management',
      color: '#4A90E2',
      isDefault: true,
      userId: testUser.id,
    },
  });

  console.log('📅 Created default calendar:', defaultCalendar.name);

  // Get some templates for sample events
  const doctorTemplate = await prisma.eventTemplate.findFirst({
    where: { name: 'Doctor Appointment' }
  });
  const billTemplate = await prisma.eventTemplate.findFirst({
    where: { name: 'Bill Due' }
  });
  const medicationTemplate = await prisma.eventTemplate.findFirst({
    where: { name: 'Medication Reminder' }
  });

  // Create some sample events
  const sampleEvents = [
    {
      title: 'Doctor Appointment',
      description: 'Annual checkup with Dr. Smith',
      startTime: new Date('2024-11-15T10:00:00Z'),
      endTime: new Date('2024-11-15T11:00:00Z'),
      eventType: 'APPOINTMENT' as const,
      importanceLevel: 'HIGH' as const,
      templateId: doctorTemplate?.id,
      metadata: {
        location: '123 Medical Center Dr',
        doctor: 'Dr. Smith',
        reminder_times: [1440, 60]
      },
      gpsLocation: {
        address: '123 Medical Center Dr',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      calendarId: defaultCalendar.id,
    },
    {
      title: 'Electric Bill Due',
      description: 'Monthly electric bill payment',
      startTime: new Date('2024-11-20T23:59:00Z'),
      endTime: new Date('2024-11-20T23:59:00Z'),
      allDay: true,
      eventType: 'BILL_DUE' as const,
      importanceLevel: 'HIGH' as const,
      templateId: billTemplate?.id,
      metadata: {
        amount: 125.50,
        company: 'City Electric',
        auto_pay: false,
        reminder_times: [4320, 1440, 60]
      },
      calendarId: defaultCalendar.id,
    },
    {
      title: 'Take Vitamin D',
      description: 'Daily vitamin D supplement',
      startTime: new Date('2024-11-10T08:00:00Z'),
      endTime: new Date('2024-11-10T08:05:00Z'),
      eventType: 'MEDICATION' as const,
      importanceLevel: 'CRITICAL' as const,
      templateId: medicationTemplate?.id,
      metadata: {
        medication_name: 'Vitamin D',
        dosage: '1000 IU',
        with_food: true,
        reminder_times: [15, 5, 0]
      },
      calendarId: defaultCalendar.id,
    },
  ];

  for (const eventData of sampleEvents) {
    const event = await prisma.event.upsert({
      where: { id: `sample-${eventData.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `sample-${eventData.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...eventData,
      },
    });
    console.log('📝 Created sample event:', event.title);
  }

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
