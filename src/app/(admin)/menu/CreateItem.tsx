import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import { defaultImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useSegments } from 'expo-router'
export default function CreateItem() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState('')
    const [image, setImage] = useState<string | null>(null);
    const { id } = useLocalSearchParams();
    const isUpdating = !!id;

    const onsubmit = () => {
        if (isUpdating) {
            onUpdate()
            return
        } else {
            onCreate();
            return
        }
    }
    const onUpdate = () => {
        console.warn("Updating Product")
        if (!validateInput()) {
            return;
        }
        // Save in databse
        resetFields();
    }
    const onCreate = () => {
        console.warn("Creating Product")
        if (!validateInput()) {
            return;
        }
        // Save in databse
        resetFields();
    }
    const resetFields = () => {
        setName('')
        setPrice('')
    }

    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors('Name is required');
            return false
        }
        if (!price) {
            setErrors('Price is required');
            return false
        }
        if (isNaN(parseFloat(price))) {
            setErrors('it should be a number');
            return false
        }
        return true
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const onDelete = () =>{
        console.warn("DELETE !!!!")
    }
    const confirmDelete = () =>{
        Alert.alert('Confirm','Are you sure you want to delete this product',[
            {
                'text':'Cancel',
            },
            {
                text:'Delete',
                style:'destructive',
                onPress:onDelete
            }
        ])

    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: image || defaultImage }} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} onChangeText={setName} value={name} placeholder='Name' />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder='$9.99' keyboardType='numeric' />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button style={{ marginTop: 1 }} text={isUpdating ? "Update" : "Create"} onPress={onsubmit} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'gainsboro',
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
        color: Colors.light.tint
    },
    label: {
        marginTop: 15,
        marginBottom: 10,
        fontSize: 17,
        color: 'grey'
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    }
})

// alignitems center -> align the items vertically
// justifycontent center -> align the items horizontally