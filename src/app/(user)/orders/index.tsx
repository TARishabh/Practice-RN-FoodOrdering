import { View, } from '@/src/components/Themed';
import orders from '@/assets/data/orders';
import ProductListItem from '@/src/components/ProductListItem';
import { FlatList } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';


export default function OrderScreen() {
  console.log(orders.length);
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

