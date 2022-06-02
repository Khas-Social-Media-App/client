import React, { useState, useCallback, useEffect } from 'react'

import firestore from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { useAtomValue } from 'jotai'
import { StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

import Header from '../../components/Header'
import { userAtom } from '../../utils/atoms'

const ChatScreen = () => {
    const user = useAtomValue(userAtom)
    const route = useRoute()
    const { roomId, opponent } = route.params
    const [ msgs, setMessages ] = useState([])

    const getSingleChatMessages = () => {
        const unsub = firestore().collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('created_at', 'desc')

        unsub.onSnapshot((snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
                _id: doc.id,
                ...doc.data()
            }))

            setMessages(messages)
        })
    }

    useEffect(() => {
        getSingleChatMessages()
    }, [])

    const onSend = useCallback(async (messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        await firestore().collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                text: messages[0].text,
                created_at: firestore.Timestamp.now(),
                from: String(user.user._id),
                to: opponent,
                user: {
                    _id: user.user._id,
                    name: user.user.displayName,
                    avatar: user.user.photoURL
                }
            })
            .then(() => {
                console.log('success')
            })
    }, [])

    return (
        <>
            <Header title='Chat' />
            <GiftedChat
                messages={msgs}
                onSend={(messages) => onSend(messages)}
                messagesContainerStyle={styles.messagesContainerStyles}
                timeFormat='HH:mm'
                user={{
                    _id: user.user._id,
                    name: user.user.displayName,
                    avatar: user.user.photoURL
                }} />
        </>
    )
}

const styles = StyleSheet.create({
    messagesContainerStyles: {
        paddingVertical: 10,
        backgroundColor: '#fff'
    }
})

export default ChatScreen
