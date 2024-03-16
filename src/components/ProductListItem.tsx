import { StyleSheet, Image } from 'react-native';
import { Text, View, } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import {Product} from '../types';

type ProductListItemProps = {
    product:Product
}

export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
const ProductListItem = ({product}:ProductListItemProps) =>{
  return (
    <View style={styles.container}>
      <Image source={{uri:product.image || defaultImage}} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

export default ProductListItem;

// Margin is the space outside the container
// Padding is the space inside the container

const styles = StyleSheet.create({
    container:{
      backgroundColor:'white',
      borderRadius:10,
      padding:10,
  
    },
    image:{
      width:'100%',
      aspectRatio:1
    },
    title:{
      fontSize:20,
      fontWeight:'600'
    },
    price:{
      color:Colors.light.tint,
      fontSize:18,
      fontWeight:'600',
    }
  });