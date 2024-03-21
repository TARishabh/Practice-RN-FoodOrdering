import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import Button from '@/src/components/Button';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const {id} = useLocalSearchParams();
  const {addItem} = useCart();
  const addToCart = () =>{
    if (!product){
      return
    }
    addItem(product,selectedSize);
    router.push('/cartModal')
  }
  const sizes:PizzaSize[] = ['S','M','L','XL']
  const product = products.find((p)=>p.id.toString() === id.toString())
  const [selectedSize,setSelectedSize] = useState<PizzaSize>('M');
  return (
    <View>
        <Stack.Screen options={{title:`${product?.name}`,headerTitleAlign:'center'}}/>
        <Image style={styles.image} source={{uri:product?.image}} />
        <Text style={{fontSize:16,marginLeft:20}}>Select Size:</Text>
        <View style={styles.sizes}>
          {sizes.map((size)=>(
            <Pressable key={size} onPress={()=>setSelectedSize(size)} style={[styles.size,{backgroundColor: selectedSize === size ? 'gainsboro':'white'}]}>
              <Text style={[styles.sizeText,{color:selectedSize === size ? 'black':'grey'}]}>{size}</Text>
            </Pressable>
          ))}
        </View>
      <Text style={styles.price}>${product?.price}</Text>
      <Button onPress={addToCart} text='Add to Cart'/>
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width:'100%',
    aspectRatio:1,
    marginTop:10
  },
  sizeText:{
    fontSize:18,
    fontWeight:'400'
  },
  sizes:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20
  },
  size:{
    backgroundColor:'gainsboro',
    borderRadius:50,
    width:50,
    alignItems:'center',
    aspectRatio: 1,
    justifyContent:'center'
  },
  price:{
    fontSize:20,
    fontWeight:'500',
    marginTop:30, 
  }
})