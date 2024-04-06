import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/src/components/OrderListItem';
import orders from '@/assets/data/orders';
import { Stack } from 'expo-router';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { useOrder } from '@/src/api/orders';
export default function OrdersDetailsScreen() {
  const {id:idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const {data:order,error,isLoading} = useOrder(id);


  if (isLoading){
    return <ActivityIndicator/>
  }

  if (error || !order){
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View style={{ padding: 10, gap: 20 }}>
        <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order}/>
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  )
}