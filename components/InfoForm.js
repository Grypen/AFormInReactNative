import React, { useState, useRef } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function InfoForm({ onNewInfo = f => f }) {

    const [securityValue, setSecurityValue] = useState("");
    //const [phoneValue, setPhoneValue] = useState("");
    //const [emailValue, setEmailValue] = useState("");
    const input = useRef();

    return (
        <View style={styles.container}>

            <TextInput
                ref={input}
                style={styles.txtInput}
                placeholder='Social Security Number'
                value={securityValue}
                onChangeText={setSecurityValue}
                maxLength={12}
                keyboardType='number-pad' />
               
               { /*
            <TextInput
                ref={input}
                style={styles.txtInput}
                placeholder='Phone number'
                value={phoneValue}
                onChangeText={setPhoneValue}
                maxLength={12}
                keyboardType='number-pad' />



            <TextInput
                ref={input}
                style={styles.txtInput}
                placeholder='Email'
                //value={inputValue}
                //onChangeText={setValue}
                maxLength={12}
                keyboardType='number-pad' />
                */}
            <Button title='submit' onPress={() => {
                input.current.blur();
                onNewInfo(securityValue);
                setSecurityValue("");
            }}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flexDirection: 'column',
        alignItems: 'center'
    },
    container2: {
        marginTop: 40,
        flexDirection: 'column',
        alignItems: 'center'
    },
    txtInput: {
        borderWidth: 2,
        fontSize: 20,
        margin: 5,
        borderRadius: 5,
        padding: 15
    }
});