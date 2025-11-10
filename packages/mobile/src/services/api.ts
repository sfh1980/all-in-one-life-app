import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, STORAGE_KEYS } from '../constants';
import { 
  ApiResponse, 
  Event, 
  EventTemplate, 
  LoginRequest, 
  RegisterRequest, 
  AuthTokens, 
  User 
} from '../types/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add JWT token to requests automatically
    this.client.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Authentication Methods
  async login(credentials: LoginRequest): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    const response = await this.client.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthTokens>> {
    const response = await this.client.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.client.post('/auth/logout');
    return response.data;
  }

  // Calendar Methods
  async getEvents(startDate?: string, endDate?: string): Promise<ApiResponse<Event[]>> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await this.client.get(`/calendar/events?${params.toString()}`);
    return response.data;
  }

  async createEvent(eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    const response = await this.client.post('/calendar/events', eventData);
    return response.data;
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    const response = await this.client.put(`/calendar/events/${id}`, eventData);
    return response.data;
  }

  async deleteEvent(id: string): Promise<ApiResponse> {
    const response = await this.client.delete(`/calendar/events/${id}`);
    return response.data;
  }

  async getTemplates(): Promise<ApiResponse<EventTemplate[]>> {
    const response = await this.client.get('/calendar/templates');
    return response.data;
  }

  async getEventTypes(): Promise<ApiResponse> {
    const response = await this.client.get('/calendar/event-types');
    return response.data;
  }
}

export const apiService = new ApiService();
