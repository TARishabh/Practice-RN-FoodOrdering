import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import Button from '../components/Button'
import { useAuth } from '../provider/AuthProvider'
import { supabase } from '../lib/supabase'

export default function index() {
  const {loading,session,isAdmin} = useAuth();

  if (loading){
    return <ActivityIndicator/>
  }

  if (!session){
    return <Redirect href={'/(auth)/signin'}/>
  }

  if (!isAdmin){
    return <Redirect href={'/(user)'}/>
  }


  return (
    <View style={{flex:1,justifyContent:'center',padding:10}} >
        <Link href={'/(user)'} asChild>
            <Button text='User'/>
        </Link>
        <Link href={'/(admin)'} asChild>
            <Button text='Admin'/>
        </Link>
        <Link href={'/(auth)/signin'} asChild>
          <Button text='Sign In'/>
        </Link>
        <Button onPress={()=> supabase.auth.signOut()} text='Sign Out'/>
    </View>
  )
}