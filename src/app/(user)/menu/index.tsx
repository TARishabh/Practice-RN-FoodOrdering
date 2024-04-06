import { Text, View, } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductListItem';
import { ActivityIndicator, FlatList } from 'react-native';
import { supabase } from '@/src/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useProductList } from '@/src/api/products';

export default function MenuScreen() {

  const {data:products,error,isLoading} = useProductList();

  if (isLoading){
    return <ActivityIndicator/>
  }

  if (error){
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View>
      <FlatList data={products}
      renderItem={({item})=> <ProductListItem product={item}/>}
      numColumns={2}
      contentContainerStyle={{gap:10, padding:10}} 
      columnWrapperStyle={{gap:10}} />
    </View>
  );
}

// Margin is the space outside the container
// Padding is the space inside the container

