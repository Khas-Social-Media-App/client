import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Image,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native'

import GoBackIcon from '../../assets/icons/GoBackIcon.png'

const Header = ({ title }) => {
    const navigation = useNavigation()

    const onGoBackPress = () => {
        navigation.goBack()
    }

    return (
        <View style={[ styles.headerContainer ]}>
            <TouchableOpacity style={styles.goBackButton} onPress={onGoBackPress}>
                <Image source={GoBackIcon} style={styles.iconStyle} />
            </TouchableOpacity>
            <View style={styles.center}>
                <Text style={styles.titleStyle}>
                    {title}
                </Text>
            </View>
            <View style={styles.emptyContainer} />
        </View>
    )
}
export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1DAEFF'
    },
    goBackButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 50,
        flex: 0.3,
        padding: 5
    },
    center: {
        height: 50,
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    iconStyle: {
        width: 25,
        height: 25,
        tintColor: '#fff',
        resizeMode: 'contain'
    },
    emptyContainer: {
        height: 50,
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
