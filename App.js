import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import InfoForm from "./components/InfoForm";
import { useInfos } from './hooks';


function InfoSign({ sign }) {
  return (
    <Text style={styles.sign}>{sign}</Text>
  );
}

export default function App() {
  //const [sign, setSign] = useState("")
  const { infos, addInfo } = useInfos();


  return (
    //<>
      <InfoForm onNewInfo={addInfo}
      />
      /*
      <FlatList style={styles.container}
        data={infos}
        renderItem={({ item }) => {
          return (
            <InfoSign
              key={item.id}
              sign={item.info}
            />
          )
        }}
      />
      */
      //</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  sign: {
    fontSize: 30,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "stretch",
    textAlign: "center"
  }
});