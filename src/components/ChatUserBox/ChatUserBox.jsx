import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { useAtomValue } from 'jotai'
import {
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

import { userAtom } from '../../utils/atoms'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'

const ChatUserBox = ({ item }) => {
    const myUser = useAtomValue(userAtom)
    const chatOpponent = item.photos.filter((user) => user.id !== myUser?.user._id)
    const navigation = useNavigation()

    const onChatPress = () => {
        navigation.navigate('Chat', {
            roomId: item._id
        })
    }

    return (
        <TouchableOpacity onPress={onChatPress} style={styles.chatBoxContainer}>
            <ProfileAvatar img={chatOpponent[0].url} />
            <View style={styles.userNameAndTitle}>
                <Text style={styles.fullName}>{chatOpponent[0].name ? chatOpponent[0].name : null}</Text>
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
