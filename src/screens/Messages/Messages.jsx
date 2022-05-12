import React from 'react'

import '@react-native-firebase/app'
import { StyleSheet } from 'react-native'

import ChatUserBox from '../../components/ChatUserBox/ChatUserBox'

const Messages = () => (
    <>
        <ChatUserBox />
        <ChatUserBox />
        <ChatUserBox />
        <ChatUserBox />
    </>
)

export default Messages

const styles = StyleSheet.create({})
