import { Alert } from "react-native";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { supabase } from "./supabase";

const fetchPaymentSheetParams = async (amount:number) =>{
    const {data,error} =  await supabase.functions.invoke('payment-sheet',{body: {amount}})
    if (data){
        console.log(data)
        return data;
    }
    console.log(error)
    Alert.alert('Error fetching payment sheet')
    return {}
}


export const initializePaymentSheet = async (amount:number) =>{
    console.log('initializePaymentSheet for', amount)
    const {paymentIntent,publishablekey} = await fetchPaymentSheetParams(amount)
    if (!paymentIntent || !publishablekey) return

    await initPaymentSheet({
        merchantDisplayName:'RishabhKid',
        paymentIntentClientSecret:paymentIntent,
        defaultBillingDetails:{
            name:'Jane Doe',
        }
    })
}

export const openPaymentSheet = async() =>{
    const {error} = await presentPaymentSheet();
    if (error){
        Alert.alert(error.message)
        console.log(error)
        return false
    }
    return true
}