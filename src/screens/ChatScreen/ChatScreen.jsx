import React, { useState, useCallback, useEffect } from 'react'

import firestore from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { useAtomValue } from 'jotai'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

import Loading from '../../components/Loading'
import { userAtom } from '../../utils/atoms'

export function ChatScreen() {
    const user = useAtomValue(userAtom)
    const route = useRoute()
    const { roomId } = route.params
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
                createdAt: firestore.Timestamp.now(),
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

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#d3d3d3'
                    }
                }} />
        )
    }

    return (
        <GiftedChat
            messages={msgs}
            onSend={(messages) => onSend(messages)}
            timeTextStyle={{
                color: '#fff'
            }}

            messagesContainerStyle={{
                marginBottom: 10,
                backgroundColor: '#1DAEFF'
            }}
            renderBubble={<renderBubble />}
            timeFormat='HH:mm'
            user={{
                _id: user.user._id,
                name: user.user.displayName,
                avatar: user.user.photoURL
            }} />
    )
}
