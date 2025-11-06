import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.ts';

const router = Router();
const prisma = new PrismaClient();

// Event type colors mapping
const EVENT_TYPE_COLORS = {
  APPOINTMENT: '#4A90E2',      // Blue - calming, trustworthy
  BILL_DUE: '#E74C3C',         // Red - urgent, attention-grabbing
  MEDICATION: '#27AE60',       // Green - health, wellness
  MAINTENANCE_AUTO: '#F39C12', // Orange - caution, maintenance
  MAINTENANCE_HOME: '#8B4513', // Brown - stability, home
  WORK_SCHEDULE: '#9B59B6',    // Purple - professional, structured
  PERSONAL: '#1ABC9C',         // Teal - personal, refreshing
  ACADEMIC: '#3498DB',         // Light Blue - learning, focus
  HEALTH: '#2ECC71',           // Light Green - wellness, vitality
  SOCIAL: '#E67E22',           // Orange - social, energetic
  LIFE_SKILLS: '#95A5A6',      // Gray - practical, neutral
  FINANCIAL: '#F1C40F',        // Yellow - money, attention
  SELF_CARE: '#E91E63',        // Pink - self-love, care
  TRANSPORTATION: '#34495E'    // Dark Gray - travel, movement
};

/**
 * GET /api/calendar/events
 * Get events by date range
 */
router.get('/events', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, eventType } = req.query;
    const userId = (req as any).user.userId;

    // Get user's default calendar
    const calendar = await prisma.calendar.findFirst({
      where: { userId, isDefault: true }
    });

    if (!calendar) {
      res.status(404).json({
        success: false,
        error: 'No calendar found for user'
      });
      return;
    }

    // Build where clause
    const whereClause: any = {
      calendarId: calendar.id
    };

    // Add date range filter if provided
    if (startDate && endDate) {
      whereClause.startTime = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      };
    }

    // Add event type filter if provided
    if (eventType) {
      whereClause.eventType = eventType;
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      include: {
        template: true
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    // Add color information to events
    const eventsWithColors = events.map(event => ({
      ...event,
      color: EVENT_TYPE_COLORS[event.eventType]
    }));

    res.json({
      success: true,
      data: eventsWithColors,
      count: events.length
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events'
    });
  }
});

/**
 * POST /api/calendar/events
 * Create a new event
 */
router.post('/events', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const {
      title,
      description,
      startTime,
      endTime,
      allDay = false,
      eventType,
      importanceLevel = 'MEDIUM',
      metadata,
      templateId,
      gpsLocation
    } = req.body;

    // Get user's default calendar
    const calendar = await prisma.calendar.findFirst({
      where: { userId, isDefault: true }
    });

    if (!calendar) {
      res.status(404).json({
        success: false,
        error: 'No calendar found for user'
      });
      return;
    }

    // Validate required fields
    if (!title || !startTime || !endTime || !eventType) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: title, startTime, endTime, eventType'
      });
      return;
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        allDay,
        eventType,
        importanceLevel,
        metadata,
        templateId,
        gpsLocation,
        calendarId: calendar.id
      },
      include: {
        template: true
      }
    });

    res.status(201).json({
      success: true,
      data: {
        ...event,
        color: EVENT_TYPE_COLORS[event.eventType]
      },
      message: 'Event created successfully'
    });

  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create event'
    });
  }
});

/**
 * PUT /api/calendar/events/:id
 * Update an existing event
 */
router.put('/events/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    const updateData = req.body;

    // Verify the event belongs to the user
    const existingEvent = await prisma.event.findFirst({
      where: {
        id,
        calendar: {
          userId
        }
      }
    });

    if (!existingEvent) {
      res.status(404).json({
        success: false,
        error: 'Event not found or access denied'
      });
      return;
    }

    // Update the event
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...updateData,
        startTime: updateData.startTime ? new Date(updateData.startTime) : undefined,
        endTime: updateData.endTime ? new Date(updateData.endTime) : undefined,
        updatedAt: new Date()
      },
      include: {
        template: true
      }
    });

    res.json({
      success: true,
      data: {
        ...updatedEvent,
        color: EVENT_TYPE_COLORS[updatedEvent.eventType]
      },
      message: 'Event updated successfully'
    });

  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update event'
    });
  }
});

/**
 * DELETE /api/calendar/events/:id
 * Delete an event
 */
router.delete('/events/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    // Verify the event belongs to the user
    const existingEvent = await prisma.event.findFirst({
      where: {
        id,
        calendar: {
          userId
        }
      }
    });

    if (!existingEvent) {
      res.status(404).json({
        success: false,
        error: 'Event not found or access denied'
      });
      return;
    }

    // Delete the event
    await prisma.event.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete event'
    });
  }
});

/**
 * GET /api/calendar/templates
 * Get all event templates
 */
router.get('/templates', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await prisma.eventTemplate.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });

    // Add color information to templates
    const templatesWithColors = templates.map(template => ({
      ...template,
      color: EVENT_TYPE_COLORS[template.eventType]
    }));

    res.json({
      success: true,
      data: templatesWithColors,
      count: templates.length
    });

  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates'
    });
  }
});

/**
 * GET /api/calendar/event-types
 * Get all event types with colors
 */
router.get('/event-types', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const eventTypes = Object.entries(EVENT_TYPE_COLORS).map(([type, color]) => ({
      type,
      color,
      displayName: type.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    }));

    res.json({
      success: true,
      data: eventTypes
    });

  } catch (error) {
    console.error('Error fetching event types:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event types'
    });
  }
});

export default router;
