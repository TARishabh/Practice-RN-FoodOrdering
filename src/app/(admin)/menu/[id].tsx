import { StyleSheet, Text, View,Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import Button from '@/src/components/Button';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const {id} = useLocalSearchParams();
  const idTest = parseFloat(typeof id === 'string' ? id : id[0])

  const {data:product,error,isLoading} = useProduct(idTest)

  if (isLoading){
    return <ActivityIndicator/>
  }

  if (error){
    return <Text>Failed to fetch products</Text>
  }
  return (
    <View>
        <Stack.Screen options={{title:`${product?.name}`,headerTitleAlign:'center',
              headerRight: () => (
                <Link href={`/(admin)/menu/CreateItem?id=${id}`} asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),}}/>
        <Image style={styles.image} source={{uri:product?.image}} />
      <Text style={{fontSize:20}}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width:'100%',
    aspectRatio:1,
    marginTop:10
  },
  price:{
    fontSize:20,
    fontWeight:'500',
    marginTop:0, 
  }
})