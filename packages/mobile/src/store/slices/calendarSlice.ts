import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import { Event, EventTemplate } from '../../types/api';

interface CalendarState {
  events: Event[];
  templates: EventTemplate[];
  selectedDate: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  events: [],
  templates: [],
  selectedDate: new Date().toISOString().split('T')[0], // Today's date
  isLoading: false,
  error: null,
};

// Async thunks for API calls
export const fetchEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.getEvents(startDate, endDate);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch events');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Network error');
    }
  }
);

export const fetchTemplates = createAsyncThunk(
  'calendar/fetchTemplates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getTemplates();
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch templates');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Network error');
    }
  }
);

export const createEvent = createAsyncThunk(
  'calendar/createEvent',
  async (eventData: Partial<Event>, { rejectWithValue }) => {
    try {
      const response = await apiService.createEvent(eventData);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to create event');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Network error');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'calendar/updateEvent',
  async ({ id, eventData }: { id: string; eventData: Partial<Event> }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateEvent(id, eventData);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to update event');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Network error');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'calendar/deleteEvent',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.deleteEvent(id);
      if (response.success) {
        return id;
      } else {
        return rejectWithValue(response.error || 'Failed to delete event');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Network error');
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch events cases
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch templates cases
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.templates = action.payload;
      })
      // Create event cases
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      // Update event cases
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      // Delete event cases
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event.id !== action.payload);
      });
  },
});

export const { setSelectedDate, clearError } = calendarSlice.actions;
export default calendarSlice.reducer;
