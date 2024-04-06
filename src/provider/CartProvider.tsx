import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem,  } from "../types";
import {randomUUID} from 'expo-crypto'
import { Tables } from "../database.types";

type CartType = {
    items:CartItem[],
    addItem:(product:Tables<'products'>, size:CartItem['size']) => void,
    updateQuantity:(itemId:string,amount:-1 | 1)=>void,
    total:number
};

const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{},
    updateQuantity:()=>{},
    total:0
});

const CartProvider = ({ children }: PropsWithChildren) => {

    const [items,setItems] = useState<CartItem[]>([])

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


    return (
        <CartContext.Provider value={{ items,addItem,updateQuantity,total}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);


export default CartProvider;