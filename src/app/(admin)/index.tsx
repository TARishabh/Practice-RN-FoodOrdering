import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect } from "expo-router";

import { View, Text } from 'react-native'

export default function TabIndex() {
  const {session} = useAuth()

  if (!session){
    return <Redirect href={'/'}/>
  }
  return (
    <Redirect href={'/(admin)/menu/'}/>
  )
}