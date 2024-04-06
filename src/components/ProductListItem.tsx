import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View, } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
import { Tables } from '../database.types';

type ProductListItemProps = {
    product: Tables<'products'>
}

export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();
    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image source={{ uri: product.image || defaultImage }} 
                style={styles.image} 
                resizeMode='contain'/>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </Pressable>
            </Link>
    );
}

export default ProductListItem;

// Margin is the space outside the container
// Padding is the space inside the container

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        flex: 1,
        maxWidth:'50%'
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    price: {
        color: Colors.light.tint,
        fontSize: 18,
        fontWeight: '600',
    }
});