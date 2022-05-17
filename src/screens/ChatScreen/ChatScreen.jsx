import React, { useState, useCallback, useEffect } from 'react'

import firestore from '@react-native-firebase/firestore'
import { useAtomValue } from 'jotai'
import { GiftedChat } from 'react-native-gifted-chat'

import { userAtom } from '../../utils/atoms'

export function ChatScreen() {
    const user = useAtomValue(userAtom)
    const [ msgs, setMessages ] = useState([])

    const getSingleChatMessages = () => {
        const unsub = firestore().collection('rooms')
            .doc('625dc13e69752156f9e0ac0c-627242e325661858906a659c')
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
            .doc('625dc13e69752156f9e0ac0c-627242e325661858906a659c')
            .collection('messages')
            .add({
                text: messages[0].text,
                created_at: firestore.Timestamp.now(),
                from: String(user.user._id),
                to: '627242e325661858906a659c',
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
        <GiftedChat
            messages={msgs}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: user.user._id,
                name: user.user.displayName,
                avatar: user.user.photoURL
            }} />
    )
}
