import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import WalkthroughScreen from '../screens/WalkthroughScreen';
import AmenitiesScreen from '../screens/AmenitiesScreen';
import GateScreen from '../screens/GateScreen';
import FinancialScreen from '../screens/FinancialScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Header Component with Logo on Right
function CustomHeaderRight() {
  return (
    <View style={headerStyles.container}>
      <Image 
        source={require('../icons/Cinco Logo.png')} 
        style={headerStyles.logo} 
        resizeMode="contain"
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 130,
  },
});

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#d8ad28',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#d8ad28',
          height: 80,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerRight: () => <CustomHeaderRight />,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../icons/wakthrough.png')} style={{ width: 20, height: 20, tintColor: color }} />,
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Documents" 
        component={DocumentsScreen}
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../icons/documents.png')} style={{ width: 20, height: 20, tintColor: color }} />,
        }}
      />
      <Tab.Screen 
        name="Amenities" 
        component={AmenitiesScreen}
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../icons/amenities.png')} style={{ width: 20, height: 20, tintColor: color }} />,
        }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../icons/community.png')} style={{ width: 20, height: 20, tintColor: color }} />,
        }}
      />
      <Tab.Screen 
        name="More" 
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../icons/maintenance.png')} style={{ width: 20, height: 20, tintColor: color }} />,
        }}
      />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Walkthrough" 
        component={WalkthroughScreen}
        options={{
          title: 'Property Walkthrough',
          headerStyle: { backgroundColor: '#d8ad28', height: 80 },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerRight: () => <CustomHeaderRight />,
        }}
      />
      <Stack.Screen 
        name="Gate" 
        component={GateScreen}
        options={{
          title: 'Gate Access',
          headerStyle: { backgroundColor: '#d8ad28', height: 80 },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerRight: () => <CustomHeaderRight />,
        }}
      />
      <Stack.Screen 
        name="Financial" 
        component={FinancialScreen}
        options={{
          title: 'Payments',
          headerStyle: { backgroundColor: '#d8ad28', height: 80 },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerRight: () => <CustomHeaderRight />,
        }}
      />
      <Stack.Screen 
        name="Maintenance" 
        component={MaintenanceScreen}
        options={{
          title: 'Maintenance',
          headerStyle: { backgroundColor: '#d8ad28', height: 80 },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerRight: () => <CustomHeaderRight />,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen 
            name="App" 
            component={MainStackNavigator} 
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
