import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './store';
import { useAppDispatch, useAuth } from './store/hooks';
import { setUser } from './store/slices/authSlice';
import { STORAGE_KEYS } from './constants';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';

const Stack = createStackNavigator();

// Auth Navigator Component
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main Navigator Component
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* We'll add calendar screens here in the next steps */}
      <Stack.Screen name="Calendar" component={() => null} />
    </Stack.Navigator>
  );
};

// App Content Component (needs to be inside Redux Provider)
const AppContent = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check for stored user data on app start
    const checkStoredAuth = async () => {
      try {
        const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        
        if (userData && accessToken) {
          const user = JSON.parse(userData);
          dispatch(setUser(user));
        }
      } catch (error) {
        console.log('Error checking stored auth:', error);
      }
    };

    checkStoredAuth();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

// Main App Component
const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppContent />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
