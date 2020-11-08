import { useState, useEffect } from "react";
import { generate } from "shortid";
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

export const useInfos = () => {
    const [infos, setInfos] = useState([]);

    const loadInfos = async () => {
        const infoData = await AsyncStorage.getItem("@InfoListStore:Infos");
        if (infoData) {
            const infos = JSON.parse(infoData);
            setInfos(infos);
        }
    }
    //Load Info
    
    useEffect(() => {
        if(infos.length) return;
        loadInfos();
    }, []);
    
    //Save Info
    
    useEffect(() => {
        AsyncStorage.setItem("@InfoListStore:Infos", JSON.stringify(infos))
    }, [infos]);
    
    

    const addInfo = info => {
        const newInfo = { id: generate(), info }
        setInfos([newInfo, ...infos]);
    };
    return { infos, addInfo };
};