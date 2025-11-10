import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Input,
  Button,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';
import { Platform } from 'react-native';
import { useAppDispatch, useAuth } from '../../store/hooks';
import { loginUser, clearError } from '../../store/slices/authSlice';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    dispatch(clearError());
    dispatch(loginUser({ email, password }));
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box flex={1} bg="white" alignItems="center" justifyContent="center" p={4}>
          <VStack space={4} alignItems="center" w="100%" maxW="300px">
            <Heading size="lg" color="primary.600">
              Welcome Back
            </Heading>
            <Text color="gray.500" textAlign="center">
              Sign in to your life management app
            </Text>

            {error && (
              <Alert status="error" w="100%">
                <Alert.Icon />
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>{error}</Alert.Description>
              </Alert>
            )}

            <VStack space={3} w="100%">
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                size="lg"
                accessibilityLabel="Email input"
                accessibilityHint="Enter your email address"
              />
              
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                type="password"
                size="lg"
                accessibilityLabel="Password input"
                accessibilityHint="Enter your password"
              />
            </VStack>

            <Button
              onPress={handleLogin}
              isLoading={isLoading}
              isDisabled={!email || !password}
              size="lg"
              w="100%"
              colorScheme="blue"
              accessibilityLabel="Login button"
              accessibilityHint="Tap to sign in to your account"
            >
              Sign In
            </Button>

            <HStack space={2} alignItems="center">
              <Text color="gray.500">Don't have an account?</Text>
              <Button
                variant="link"
                onPress={navigateToRegister}
                accessibilityLabel="Go to register"
                accessibilityHint="Tap to create a new account"
              >
                Sign Up
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
