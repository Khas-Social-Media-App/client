import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'

const SearchUser = ({ item }) => {
    const navigation = useNavigation()
    const onSearchUserPress = () => {
        navigation.navigate('UserProfileScreen', { user: item._id })
    }

    return (
        <TouchableOpacity
            onPress={onSearchUserPress}
            style={styles.searchUserButton}>
            <Image
                source={{
                    uri: item.photoURL
                }}
                style={styles.userImage} />
            <View style={styles.nameAndUsername}>
                {
                    Boolean(item.displayName) && (
                        <Text style={styles.displayNameStyle}>
                            {item.displayName}
                        </Text>
                    )
                }
                {
                    Boolean(item.username) && (
                        <Text>{item.username}</Text>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

export default SearchUser

const styles = StyleSheet.create({
    searchUserButton: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginBottom: 30
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    nameAndUsername: {
        flexDirection: 'column',
        marginLeft: 20
    },
    displayNameStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    }
})
