import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'hashed_password_here', // In real app, this would be bcrypt hash
      firstName: 'Test',
      lastName: 'User',
    },
  })

  console.log('Created user:', user)

  // Create a default calendar for the user
  const calendar = await prisma.calendar.create({
    data: {
      name: 'Personal Calendar',
      description: 'My personal events and appointments',
      color: '#3B82F6', // Blue color
      isDefault: true,
      userId: user.id,
    },
  })

  console.log('Created calendar:', calendar)

  // Create a test event
  const event = await prisma.event.create({
    data: {
      title: 'Doctor Appointment',
      description: 'Annual checkup',
      startTime: new Date('2024-11-01T10:00:00Z'),
      endTime: new Date('2024-11-01T11:00:00Z'),
      eventType: 'APPOINTMENT',
      calendarId: calendar.id,
    },
  })

  console.log('Created event:', event)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })