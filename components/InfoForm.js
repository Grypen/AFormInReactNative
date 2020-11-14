import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View, Text, SafeAreaView, FlatList, Alert, ScrollView} from 'react-native';
import { useInfos } from '../hooks';

export default function InfoForm({ onNewInfo = f => f }) {

    const [securityValue, setSecurityValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [countryValue, setCountryValue] = useState("");
    const [selectedCountryValue, setSelectedCountryValue] = useState("");

    const input = useRef();

    const loadCountry = async () => {
        const res = await fetch("https://restcountries.eu/rest/v2/all")
        const data = await res.json();
        setCountryValue(data);
    }

    useEffect(() => {
        loadCountry();
    }, []);

    //checks if the inputs are empty/filled
    function isRequired(security, phone, email, country) {
        return security.length > 0 && phone.length > 0 && email.length > 0 && country.length > 0
            ? isSecurity(securityValue) : Alert.alert('All fields have to be filled');
    }

    //checks if the social security number is valid using regular expressions
    function isSecurity(security) {
        const validPatterns = [
            /^([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))\d{4}$/,
        ]
        return validPatterns.some((pattern) => pattern.test(security)) ? isPhone(phoneValue) : Alert.alert('Social Security Number is not valid')
    }

    //checks if the phone number is valid using regular expressions
    function isPhone(phone) {
        const validPatterns = [
            /^0\d{9}$/,
            /^0\d{8}$/,
            /^0\d{7}$/,
        ]
        return validPatterns.some((pattern) => pattern.test(phone)) ? isEmail(emailValue) : Alert.alert('Phonenumber is not valid')
    }

    //checks if the email is valid, on a basic level.
    //If we needed to actually check if a email adress was valid
    //you would have to send a confirmation email
    function isEmail(val) {
        const ai = val.indexOf("@");
        const gdi = val.split("").reduce((acc, char, i) => char === "." ? i : acc, 0);
        return ai > -1 && gdi > ai ? console.log('Success') : Alert.alert('Email is not valid');
    }

    return (
        <View style={styles.container}>
            <Text>Social Security Number</Text>
            <TextInput
                ref={input}
                style={styles.txtInput}
                placeholder='YYYYMMDDXXXX'
                value={securityValue}
                maxLength={12}
                onChangeText={setSecurityValue}
                keyboardType='number-pad' />
            <Text>Phone Number</Text>
            <TextInput
                ref={input}
                style={styles.txtInput}
                placeholder='example 0756667775'
                value={phoneValue}
                onChangeText={setPhoneValue}
                keyboardType='number-pad' />
            <Text>Email</Text>
            <TextInput
                ref={input}
                autoCapitalize='none'
                style={styles.txtInput}
                placeholder='example johnDoe@gmail.com'
                value={emailValue}
                onChangeText={setEmailValue}
            />
            <Text style={styles.txt2}>Select a Country:</Text>
            <SafeAreaView style={styles.flatView}>
                <FlatList
                    data={countryValue}
                    contentContainerStyle={styles.container}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Button title={item.name} onPress={() =>
                            setSelectedCountryValue(item.name)} />
                    )}
                />
            </SafeAreaView>
            <Text style={styles.selectTxt}>
                Selected Country:
                </Text>
            <Text style={styles.selectTxt2}>{selectedCountryValue}</Text>

            <Button title='submit' onPress={() => {
                input.current.blur();
                onNewInfo(phoneValue);
                console.log(securityValue, phoneValue, emailValue, selectedCountryValue);
                isRequired(securityValue, phoneValue, emailValue, selectedCountryValue);
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
    },
    flatView: {
        height: 150,
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center"
    },
    selectTxt: {
        alignSelf: "center",
        fontSize: 30,
        marginTop: 20
    },
    selectTxt2: {
        alignSelf: "center",
        fontSize: 30,
    },
    txt: {
        fontSize: 25,
        marginTop: 40,
        alignSelf: 'center'

    },
    txt2: {
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 20,
    },
    btn: {
        marginTop: 40,
    },
});