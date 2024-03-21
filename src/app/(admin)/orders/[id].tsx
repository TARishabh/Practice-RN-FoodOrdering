import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/src/components/OrderListItem';
import orders from '@/assets/data/orders';
import { Stack } from 'expo-router';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { OrderStatusList } from '@/src/types';
import Colors from '@/src/constants/Colors';
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
        ListFooterComponent={()=>(
            <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => console.warn('Update status')}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

        )}
      />

      {/* if you want scrollable flatlist where the top part also scrolls with the flatlist you can do:
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item}  />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={()=><OrderListItem order={order}/>}
      />
       */}
    </View>
  )
}