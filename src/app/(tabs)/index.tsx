import { View, } from '@/src/components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';


export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[1]}/>
      <ProductListItem product={products[2]}/>
    </View>
  );
}

// Margin is the space outside the container
// Padding is the space inside the container

