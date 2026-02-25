import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import DatasetScreen from '../screens/DatasetScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

const CustomCameraButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.cameraBtnContainer}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <View style={styles.cameraBtn}>{children}</View>
  </TouchableOpacity>
);

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="time" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={HomeScreen}
        options={{
          tabBarButton: props => (
            <CustomCameraButton {...props}>
              <Icon name="camera" size={30} color="white" />
            </CustomCameraButton>
          ),
        }}
      />
      <Tab.Screen
        name="Data"
        component={DatasetScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="layers" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 20,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cameraBtnContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
    elevation: 5,
  },
});
