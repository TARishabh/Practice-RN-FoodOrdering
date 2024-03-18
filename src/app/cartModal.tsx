import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useCart } from '../provider/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';
export default function cartModal() {
    const {items,total} = useCart();
  return (
        <View style={{padding:10}}>
        <FlatList data={items}
        renderItem={({item})=>(
            <CartListItem cartItem={item}/>
        )}
        contentContainerStyle={{padding:10,gap:10}}/>
        <Text style={{marginTop:20, fontWeight:'600',fontSize:20}} >Total: ${total}</Text>
        {items.length > 0 && <Button text='Checkout'></Button>}
    </View>
    )
}