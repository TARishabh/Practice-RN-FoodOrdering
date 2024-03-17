import { Redirect } from "expo-router";

import { View, Text } from 'react-native'

export default function TabIndex() {
  return (
    <Redirect href={'/menu/'}/>
  )
}