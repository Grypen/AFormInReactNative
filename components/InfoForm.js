import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View, Text, SafeAreaView, FlatList } from 'react-native';

export default function InfoForm({ onNewInfo = f => f }) {

    const [securityValue, setSecurityValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [show, setShow] = useState(1);
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

    const Entry = () => {
        switch (show) {
            case 1:
                return (
                    <View style={styles.container}>

                        <TextInput
                            ref={input}
                            style={styles.txtInput}
                            placeholder='Enter Social Security Number'
                            value={securityValue}
                            onChangeText={setSecurityValue}
                            keyboardType='number-pad' />

                        <Button title='confirm' onPress={() => {
                            input.current.blur();
                            //setSecurityValue("")
                            onNewInfo(securityValue);
                            setShow(show + 1);
                        }}
                        />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.container}>
                        <TextInput
                            ref={input}
                            style={styles.txtInput}
                            placeholder='Enter Phone number'
                            value={phoneValue}
                            onChangeText={setPhoneValue}
                            keyboardType='number-pad' />

                        <Button title='confirm' onPress={() => {
                            input.current.blur();
                            //setPhoneValue("")
                            onNewInfo(phoneValue);
                            setShow(show + 1);
                        }}
                        />
                    </View>

                );

            case 3:
                return (
                    <View style={styles.container}>
                        <TextInput
                            ref={input}
                            style={styles.txtInput}
                            placeholder='Email'
                            value={emailValue}
                            onChangeText={setEmailValue}
                        />
                        <Button title='confirm' onPress={() => {
                            input.current.blur();
                            //setEmailValue("")
                            onNewInfo(emailValue);
                            setShow(show + 1);
                        }}
                        />
                    </View>

                );
            case 4:
                return (
                    <View style={styles.container}>
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
                           {'\n'}
                            {selectedCountryValue}
                        </Text>
                        <Button title='confirm' onPress={() => {
                            onNewInfo(selectedCountryValue);
                            setShow(show + 1);
                        }}
                        />
                    </View>
                );
            case 5:
                return (
                    <View style={styles.container}>
                        <Button title='Submit' onPress={() => {
                            console.log(securityValue, phoneValue, emailValue, selectedCountryValue)
                            // insert validation

                        }}
                        />
                    </View>
                );
            default:
                break;
        }
    }
    return (
        <Entry />
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