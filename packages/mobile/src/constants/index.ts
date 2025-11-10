// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  TIMEOUT: 10000,
};

// Event Type Colors (Research-based for ADHD/ASD users)
export const EVENT_TYPE_COLORS = {
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

// App Theme Colors
export const THEME_COLORS = {
  primary: '#4A90E2',
  secondary: '#1ABC9C',
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
  light: '#F8F9FA',
  dark: '#2C3E50',
};

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  THEME_PREFERENCE: 'themePreference',
};
