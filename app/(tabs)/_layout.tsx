import React from 'react'
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen name="calendar" 
        options={{
          headerShown: false,
          tabBarIcon:({focused})=><View>
            <AntDesign name="calendar" size={24} color="black" />
          </View>
          }}/>
        <Tabs.Screen name="event" 
        options={{
          headerShown: false,
          tabBarIcon:({focused})=><View>
          <MaterialIcons name="event" size={24} color="black" />
          </View>
          }}/>
        <Tabs.Screen name="amount" 
        options={{
          headerShown: false,
          tabBarIcon:({focused})=><View>
          <Ionicons name="wallet-outline" size={24} color="black" />
          </View>
          }}/>
    </Tabs>
  )
}