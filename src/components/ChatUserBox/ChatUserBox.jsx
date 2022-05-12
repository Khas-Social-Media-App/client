import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'

const ChatUserBox = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.chatBoxContainer}>
            <ProfileAvatar />
            <View style={styles.userNameAndTitle}>
                <Text style={styles.fullName}>Mertcan Karaman</Text>
                <Text style={styles.lastMessage}>Last Message</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatUserBox

const styles = StyleSheet.create({
    chatBoxContainer: {
        padding: 20,
        flexDirection: 'row',
        marginHorizontal: 20,
        width: widthPercentageToDP(90),
        height: 100,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10
    },
    userNameAndTitle: {
        flexDirection: 'column',
        marginLeft: 20
    },
    fullName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    lastMessage: {
        fontSize: 14,
        color: '#8e8e8e'

    }
})
