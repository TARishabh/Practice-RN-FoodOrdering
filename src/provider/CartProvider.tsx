import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem,  } from "../types";
import {randomUUID} from 'expo-crypto'
import { Tables } from "../database.types";
import { useInsertOrder } from "../api/orders";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order_items";

type CartType = {
    items:CartItem[],
    addItem:(product:Tables<'products'>, size:CartItem['size']) => void,
    updateQuantity:(itemId:string,amount:-1 | 1)=>void,
    total:number
    checkout: () => void
};

const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{},
    updateQuantity:()=>{},
    total:0,
    checkout: () =>{}
});

const CartProvider = ({ children }: PropsWithChildren) => {

    const [items,setItems] = useState<CartItem[]>([])
    const {mutate:insertOrder} = useInsertOrder();
    const {mutate:insertOrderItems} =  useInsertOrderItems();
    const router = useRouter();

    const total = items.reduce((sum,item)=>(sum +=(item.product.price * item.quantity)),0)
    
    const addItem = (product:Tables<'products'>, size:CartItem['size']) =>{
        const existingItems = items.find((item)=>item.product === product && item.size === size)
        if (existingItems){
            updateQuantity(existingItems.id, 1);
            return
        }
        const newCartItem: CartItem = {
            product,
            product_id:product.id,
            id:randomUUID(),
            size,
            quantity:1
        }
        setItems([newCartItem, ...items]);
    }

    const updateQuantity = (itemId:string,amount: -1 | 1) =>{
        const updateItems = items.map((item)=>item.id.toString() === itemId ? ({...item,quantity:item.quantity+amount}):(item)).filter((item) =>item.quantity > 0)
        setItems(updateItems);
    }

    const clearCart = () =>{
        setItems([])
    }

    const checkout = () =>{
        insertOrder({total},{
            onSuccess: saveOrderItems
        });

    }

    const saveOrderItems = (order: Tables<'orders'>) =>{
        const orderItems = items.map((cartItems)=>({
            order_id:order.id,
            product_id:cartItems.product_id,
            quantity: cartItems.quantity,
            size: cartItems.size
        }));
        insertOrderItems(orderItems,{
            onSuccess(){
                clearCart();
                router.push(`/(user)/orders/${order.id}`)
            }
        })

    }


    return (
        <CartContext.Provider value={{ checkout,items,addItem,updateQuantity,total}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);


export default CartProvider;