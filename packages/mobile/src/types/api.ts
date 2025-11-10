// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// Event Types
export type EventType = 
  | 'APPOINTMENT'
  | 'BILL_DUE'
  | 'MEDICATION'
  | 'MAINTENANCE_AUTO'
  | 'MAINTENANCE_HOME'
  | 'WORK_SCHEDULE'
  | 'PERSONAL'
  | 'ACADEMIC'
  | 'HEALTH'
  | 'SOCIAL'
  | 'LIFE_SKILLS'
  | 'FINANCIAL'
  | 'SELF_CARE'
  | 'TRANSPORTATION';

export type ImportanceLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Event Interface
export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  eventType: EventType;
  importanceLevel: ImportanceLevel;
  metadata?: any;
  templateId?: string;
  gpsLocation?: GPSLocation;
  color: string;
  createdAt: string;
  updatedAt: string;
}

// Event Template Interface
export interface EventTemplate {
  id: string;
  name: string;
  eventType: EventType;
  defaultDuration?: number;
  defaultMetadata?: any;
  isActive: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

// GPS Location Interface
export interface GPSLocation {
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Authentication Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
