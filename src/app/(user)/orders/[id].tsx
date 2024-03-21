import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/src/components/OrderListItem';
import orders from '@/assets/data/orders';
import { Stack } from 'expo-router';
import OrderItemListItem from '@/src/components/OrderItemListItem';
export default function OrdersDetailsScreen() {
    const {id} = useLocalSearchParams();
    const order = orders.find((order_id)=>(
        order_id.id.toString() === id.toString() 
    ))
    if (!order) {
        return <Text>Order Id not Found</Text>
    }
    if (!order.order_items) {
        return <Text>Order Id not Found</Text>
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