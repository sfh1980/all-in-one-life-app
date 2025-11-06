# Mobile Calendar Follow-Up Questions
## Phase 2D: Mobile-First Calendar Development

Based on your answers, I need clarification on mobile-specific implementation details:

### Mobile UI/UX Design

1. **Mobile Calendar Views**: For mobile screens, how should the day/week/month views be optimized?
   - Should week view be horizontal scrollable or vertical?
   - How should month view handle small text on mobile screens?
   - Should day view use a timeline format or list format?
   Initial thinking is that when the app opens, first thing they see is a full month calendar of the current month with options to switch to week or day views as well. 
   At this time I have not put more thought into the frontend.

2. **Touch Interactions**: What mobile gestures do you want?
   - Swipe left/right to navigate days/weeks/months?
   - Pull-to-refresh for syncing?
   - Long-press to create events?
   - Pinch-to-zoom for different view levels?
    Unsure yet. I have not begun designing frontend

3. **Mobile Navigation**: How should users navigate between views?
   - Bottom tab bar (Day/Week/Month)?
   - Top segmented control?
   - Hamburger menu with options?
   Hamburger menu

### Event Type Color Research Results

Based on mental health and accessibility research for young adults:

4. **Color Psychology for Event Types**: I recommend these colors based on research:
   - **APPOINTMENT**: Blue (#4A90E2) - calming, trustworthy
   - **BILL_DUE**: Red (#E74C3C) - urgent, attention-grabbing
   - **MEDICATION**: Green (#27AE60) - health, wellness
   - **MAINTENANCE_AUTO**: Orange (#F39C12) - caution, maintenance
   - **MAINTENANCE_HOME**: Brown (#8B4513) - stability, home
   - **WORK_SCHEDULE**: Purple (#9B59B6) - professional, structured
   - **PERSONAL**: Teal (#1ABC9C) - personal, refreshing
   
   Do you approve these color associations?
   I do approve as of right now

### Mobile Notifications & Smart Features

5. **Notification Intelligence**: For the "check current event" feature:
   - How far in advance should it check for current events? (5 min, 15 min buffer?)
   - Should it consider travel time between events?
   - What if events overlap - which takes priority for notification type?
   checks will be every hour, until its an hour away, then every 30, then at the 15 minute mark, then at 5 minutes, then at 1 minute.
   if events overlap, then the either the importance level that is set, or the immediate event takes precedence

6. **Smart Scheduling Learning**: For AI-powered scheduling suggestions:
   - Should it learn from user's most common event times?
   - Track patterns like "always schedules doctor appointments on Tuesdays"?
   - Suggest optimal times based on existing calendar density?
   yes. and also patterns of how user sets events, responds to notifications, and more. more specifics can be researched later

### Mobile Data & Sync Strategy

7. **Offline Data Storage**: For mobile offline functionality:
   - How many months of calendar data should be cached locally?
   - Should it prioritize recent data or upcoming events?
   - How should it handle sync conflicts when back online?
   cache should be 6 months, half before current date, half after.
   i would like you to research what is generally better, but my best guess would be priortize upcoming events.
   compare changes that need sync'd and ask for permission to sync.

8. **Device Calendar Integration**: Regarding your question about APIs:
   - **iOS**: Uses EventKit framework (built-in, no external API needed)
   - **Android**: Uses Calendar Provider (built-in, no external API needed)
   - **Google Calendar**: Requires Google Calendar API (free tier available)
   - **Outlook**: Requires Microsoft Graph API (free tier available)
   
   Which integrations are priority for MVP?
   i think android calendar for mvp for now, address others later

### Mobile Performance & Technical

9. **React Native Calendar Library**: For mobile-optimized calendars:
   - **react-native-calendars**: Most popular, good performance
   - **react-native-big-calendar**: More features, heavier
   - **Custom build**: Full control, more development time
   
   Which approach do you prefer?
   for now, react-native-calendar will do

10. **Mobile Date/Time Handling**: For mobile apps, I recommend:
    - **date-fns**: Lightweight, tree-shakeable, good for mobile
    - **dayjs**: Smallest bundle size, moment.js-like API
    
    Which do you prefer for mobile performance?
    dat-fns

### Accessibility for Neurodivergent Users

11. **ADHD-Friendly Features**: Research suggests:
    - High contrast mode toggle
    - Reduced animation options
    - Clear visual hierarchy
    - Consistent navigation patterns
    - Minimal cognitive load interfaces
    
    Which of these are most important for your target users?
    use a balance of all of these suggested options

12. **ASD-Friendly Features**: Research suggests:
    - Predictable layouts
    - Clear labeling
    - Customizable sensory settings (vibration intensity)
    - Visual indicators for routine vs. unexpected events
    
    How important are these features for MVP?
    very, use them

### Mobile App Architecture

13. **State Management**: For mobile calendar data:
    - Redux Toolkit (your current plan) - good for complex state
    - Zustand - lighter weight, simpler
    - React Query + local state - good for server sync
    
    Do you want to stick with Redux Toolkit?
    stick with redux

14. **Mobile Database**: For offline storage:
    - SQLite (react-native-sqlite-storage) - full SQL capabilities
    - AsyncStorage - simple key-value, limited storage
    - Realm - object database, good sync capabilities
    
    Which fits your offline requirements best?
    sqlite

### Event Templates & Metadata

15. **Common Event Templates**: Based on your target demographic:
    - "Doctor Appointment" (location, reminder 1 day + 1 hour before)
    - "Bill Due" (amount, auto-reminder 3 days before)
    - "Medication" (dosage, daily recurring)
    - "Work Shift" (location, weekly recurring)
    
    What other templates would be useful?
    templates for vehicle maintainence, templates for "work shift" i think might be duel purposed to work with class schedule as well, home maintainence templates for things like air filter replacement and other common home life upkeep tasks, travel planning templates, grocery list creating templates... please research other common tasks that young adults and ASD/ADHD and other individuals usually need assistance tracking

16. **Mobile-Optimized Metadata Entry**: For quick event creation:
    - Should location use GPS/map integration?
    - Voice-to-text for notes/descriptions?
    - Quick-select buttons for common durations (30min, 1hr, 2hr)?
    yes, integrate gps/map. voice to text will be added feature after creating MVP. common quick select buttons should be added throughout the app for ease of use. as we build the app out, we can ask about those at those future times.

### MVP Scope Definition

17. **Phase 2D MVP Features**: Which are essential for first release?
    - Basic CRUD operations for events ✓
    - Single calendar view (day/week/month) ✓
    - Event type color coding ✓
    - Basic notifications ✓
    - Offline functionality - Yes/No? No
    - Device calendar sync - Yes/No? No
    - Smart scheduling - Yes/No? No
    but in the proper areas of the app, just note XYZ feature coming soon

18. **Mobile Platform Priority**: Which should we build first?
    - iOS only
    - Android only  
    - Both simultaneously
    both, i think. how dificult is it to do both at once?

---

## Next Steps

Please answer these mobile-focused questions so I can create a detailed mobile calendar implementation plan that aligns with your vision for a mobile-first life management app.
