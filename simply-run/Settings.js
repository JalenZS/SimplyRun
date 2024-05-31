import {View, TouchableOpacity, Text, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    return(
        <View style={styles.mainContainer} >
            <StatusBar translucent={false} />
            <Text style={styles.titleText}>
                Settings
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.subtitleText}>
                    Clear all data
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.subtitleText}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText:{
        fontSize: 48,
        color: '#00e600',
        padding: '5%',
        fontWeight: '600'
    },
    subtitleText:{
        fontSize: 28,
        padding: '5%',
        color: '#00e600',
        fontWeight: '200',
        margin: 'auto'
    },
    mainContainer:{
        justifyContent: 'flex-start', 
        flex: 1,  
        alignItems: 'center',
        backgroundColor: '#000',
        padding: '3%',
    },
    button:{
        borderStyle: 'solid',
        borderColor: '#00e600',
        borderRadius: 5,
        borderWidth: 2,
        margin: '3%'
    }
});