import { PrismaClient, EventType } from '@prisma/client';

const prisma = new PrismaClient();

export const eventTemplates = [
  // Academic Templates
  {
    name: "Study Session",
    eventType: EventType.ACADEMIC,
    defaultDuration: 120, // 2 hours
    defaultMetadata: {
      subject: "",
      location: "Library",
      reminder_times: [60, 15], // 1 hour, 15 minutes before
      importance_level: "medium"
    }
  },
  {
    name: "Assignment Due",
    eventType: EventType.ACADEMIC,
    defaultDuration: 0, // All day event
    defaultMetadata: {
      course: "",
      assignment_type: "homework",
      reminder_times: [2880, 1440, 60], // 2 days, 1 day, 1 hour before
      importance_level: "high"
    }
  },
  {
    name: "Exam",
    eventType: EventType.ACADEMIC,
    defaultDuration: 180, // 3 hours
    defaultMetadata: {
      course: "",
      exam_type: "midterm",
      location: "",
      reminder_times: [10080, 2880, 1440, 60], // 1 week, 2 days, 1 day, 1 hour before
      importance_level: "critical"
    }
  },

  // Health Templates
  {
    name: "Doctor Appointment",
    eventType: EventType.APPOINTMENT,
    defaultDuration: 60,
    defaultMetadata: {
      doctor_type: "general",
      location: "",
      reminder_times: [1440, 60], // 1 day, 1 hour before
      importance_level: "high"
    }
  },
  {
    name: "Therapy Session",
    eventType: EventType.HEALTH,
    defaultDuration: 60,
    defaultMetadata: {
      therapist_name: "",
      session_type: "individual",
      location: "",
      reminder_times: [1440, 60],
      importance_level: "high"
    }
  },
  {
    name: "Medication Reminder",
    eventType: EventType.MEDICATION,
    defaultDuration: 5,
    defaultMetadata: {
      medication_name: "",
      dosage: "",
      with_food: false,
      reminder_times: [15, 5, 0], // 15 min, 5 min, at time
      importance_level: "critical"
    }
  },
  {
    name: "Exercise/Gym",
    eventType: EventType.HEALTH,
    defaultDuration: 90,
    defaultMetadata: {
      workout_type: "cardio",
      location: "Gym",
      reminder_times: [30, 10],
      importance_level: "medium"
    }
  },

  // Social Templates
  {
    name: "Social Event",
    eventType: EventType.SOCIAL,
    defaultDuration: 180,
    defaultMetadata: {
      event_type: "party",
      location: "",
      anxiety_prep_time: 30, // 30 minutes prep time
      reminder_times: [1440, 120, 30],
      importance_level: "medium"
    }
  },
  {
    name: "Family Time",
    eventType: EventType.SOCIAL,
    defaultDuration: 120,
    defaultMetadata: {
      activity: "dinner",
      location: "Home",
      reminder_times: [60, 15],
      importance_level: "medium"
    }
  },

  // Life Skills Templates
  {
    name: "Laundry Day",
    eventType: EventType.LIFE_SKILLS,
    defaultDuration: 180,
    defaultMetadata: {
      load_count: 2,
      detergent_needed: true,
      reminder_times: [60],
      importance_level: "low"
    }
  },
  {
    name: "Meal Prep",
    eventType: EventType.LIFE_SKILLS,
    defaultDuration: 120,
    defaultMetadata: {
      meals_count: 5,
      grocery_list_needed: true,
      reminder_times: [1440, 60],
      importance_level: "medium"
    }
  },
  {
    name: "Cleaning Schedule",
    eventType: EventType.LIFE_SKILLS,
    defaultDuration: 90,
    defaultMetadata: {
      room: "bedroom",
      deep_clean: false,
      reminder_times: [60],
      importance_level: "low"
    }
  },

  // Financial Templates
  {
    name: "Bill Due",
    eventType: EventType.BILL_DUE,
    defaultDuration: 0,
    defaultMetadata: {
      amount: 0,
      company: "",
      auto_pay: false,
      reminder_times: [4320, 1440, 60], // 3 days, 1 day, 1 hour before
      importance_level: "high"
    }
  },
  {
    name: "Payday",
    eventType: EventType.FINANCIAL,
    defaultDuration: 0,
    defaultMetadata: {
      amount: 0,
      employer: "",
      direct_deposit: true,
      reminder_times: [0],
      importance_level: "medium"
    }
  },

  // Work Templates
  {
    name: "Work Shift",
    eventType: EventType.WORK_SCHEDULE,
    defaultDuration: 480, // 8 hours
    defaultMetadata: {
      shift_type: "regular",
      location: "Office",
      break_times: ["12:00", "15:00"],
      reminder_times: [60, 15],
      importance_level: "high"
    }
  },

  // Vehicle Maintenance Templates
  {
    name: "Oil Change",
    eventType: EventType.MAINTENANCE_AUTO,
    defaultDuration: 60,
    defaultMetadata: {
      vehicle: "",
      mileage: 0,
      service_location: "",
      reminder_times: [1440, 60],
      importance_level: "medium"
    }
  },
  {
    name: "Car Registration",
    eventType: EventType.TRANSPORTATION,
    defaultDuration: 120,
    defaultMetadata: {
      vehicle: "",
      location: "DMV",
      documents_needed: ["insurance", "inspection"],
      reminder_times: [10080, 1440], // 1 week, 1 day before
      importance_level: "high"
    }
  },

  // Home Maintenance Templates
  {
    name: "Air Filter Replacement",
    eventType: EventType.MAINTENANCE_HOME,
    defaultDuration: 30,
    defaultMetadata: {
      filter_size: "",
      location: "HVAC unit",
      reminder_times: [1440],
      importance_level: "low"
    }
  },

  // Self-Care Templates
  {
    name: "Quiet Time",
    eventType: EventType.SELF_CARE,
    defaultDuration: 60,
    defaultMetadata: {
      activity: "meditation",
      location: "Bedroom",
      reminder_times: [15],
      importance_level: "medium"
    }
  },
  {
    name: "Digital Detox",
    eventType: EventType.SELF_CARE,
    defaultDuration: 240, // 4 hours
    defaultMetadata: {
      devices_off: ["phone", "computer"],
      alternative_activity: "reading",
      reminder_times: [30],
      importance_level: "low"
    }
  }
];

export async function seedEventTemplates() {
  console.log('🌱 Seeding event templates...');
  
  // Clear existing templates first
  await prisma.eventTemplate.deleteMany({});
  
  for (const template of eventTemplates) {
    await prisma.eventTemplate.create({
      data: template,
    });
  }
  
  console.log('✅ Event templates seeded successfully');
}
