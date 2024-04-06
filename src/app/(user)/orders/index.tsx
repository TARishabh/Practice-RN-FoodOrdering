import { Text, View, } from '@/src/components/Themed';
import { ActivityIndicator, FlatList } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { useMyOrderList } from '@/src/api/orders';


export default function OrderScreen() {
  const {data:orders,error,isLoading} = useMyOrderList();
  if (isLoading){
    return <ActivityIndicator/>
  }

  if (error){
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View style={{flex:1,backgroundColor:'rgb(211, 211, 211)',width:'100%'}}>
      <FlatList data={orders}
      renderItem={({item})=> <OrderListItem order={item}/>}
      contentContainerStyle={{gap:10, padding:10,margin:10,}} 
      />
    </View>
  );
}

// Margin is the space outside the container
// Padding is the space inside the container

