import React from 'react'
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function _layout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#3C93E5",
      tabBarInactiveTintColor: "#000",
    }}>
        <Tabs.Screen name="calendar" 
        options={{
          tabBarShowLabel: false,
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon:({color})=><View>
            <AntDesign name="calendar" size={24} color={color} />
          </View>
          }}/>
        <Tabs.Screen name="event" 
        options={{
          unmountOnBlur: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon:({color})=><View>
          <MaterialIcons name="event" size={24} color={color} />
          </View>
          }}/>
        <Tabs.Screen name="amount" 
        options={{
          unmountOnBlur: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon:({color})=><View>
          <Ionicons name="wallet-outline" size={24} color={color} />
          </View>
          }}/>
          <Tabs.Screen name = "expenses/[id]"
          options={{
            unmountOnBlur: true,
            href: null,
            tabBarShowLabel: false,
            headerShown: false,
          }}/>
          <Tabs.Screen name = "history/[id]"
          options={{
            unmountOnBlur: true,
            href: null,
            tabBarShowLabel: false,
            headerShown: false,
          }}/>
    </Tabs>
  )
}