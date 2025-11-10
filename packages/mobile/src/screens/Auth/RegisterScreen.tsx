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
import { registerUser, clearError } from '../../store/slices/authSlice';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAuth();

  const handleRegister = async () => {
    if (!email || !password) {
      return;
    }

    dispatch(clearError());
    dispatch(registerUser({ 
      email, 
      password, 
      firstName: firstName || undefined, 
      lastName: lastName || undefined 
    }));
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
              Create Account
            </Heading>
            <Text color="gray.500" textAlign="center">
              Join your life management journey
            </Text>

            {error && (
              <Alert status="error" w="100%">
                <Alert.Icon />
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>{error}</Alert.Description>
              </Alert>
            )}

            <VStack space={3} w="100%">
              <HStack space={2}>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  size="lg"
                  flex={1}
                  accessibilityLabel="First name input"
                  accessibilityHint="Enter your first name (optional)"
                />
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  size="lg"
                  flex={1}
                  accessibilityLabel="Last name input"
                  accessibilityHint="Enter your last name (optional)"
                />
              </HStack>

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
                accessibilityHint="Enter a secure password (minimum 12 characters)"
              />
            </VStack>

            <Button
              onPress={handleRegister}
              isLoading={isLoading}
              isDisabled={!email || !password}
              size="lg"
              w="100%"
              colorScheme="blue"
              accessibilityLabel="Register button"
              accessibilityHint="Tap to create your account"
            >
              Create Account
            </Button>

            <HStack space={2} alignItems="center">
              <Text color="gray.500">Already have an account?</Text>
              <Button
                variant="link"
                onPress={navigateToLogin}
                accessibilityLabel="Go to login"
                accessibilityHint="Tap to sign in to existing account"
              >
                Sign In
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
