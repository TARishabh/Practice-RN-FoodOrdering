import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/provider/AuthProvider'

export default function profile() {
  async function signout () {
    const test = await supabase.auth.signOut()
  }
  return (
    <View>
      <Text>profile</Text>
      <Button title={'Sign Out'} onPress={signout}/>
    </View>
  )
}

// QBUAYjwA5~iy!pQ