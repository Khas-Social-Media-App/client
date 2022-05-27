import React from 'react'

import '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { useAtomValue } from 'jotai'
import {
    FlatList, StyleSheet, Text, View
} from 'react-native'

import ChatUserBox from '../../components/ChatUserBox/ChatUserBox'
import PageHoc from '../../layouts/PageHoc'
import { userAtom } from '../../utils/atoms'

const Messages = () => {
    const [ chatUsers, setChatUsers ] = React.useState([])
    const myUser = useAtomValue(userAtom)
    const navigation = useNavigation()

    const getUsers = async () => {
        const unsub = firestore()
            .collection('rooms')
            .where('users', 'array-contains', myUser.user._id)

        unsub.onSnapshot((snapshot) => {
            const users = snapshot.docs.map((doc) => ({
                _id: doc.id,
                ...doc.data()
            }))

            setChatUsers(users)
        })
    }

    React.useEffect(() => {
        getUsers()
    }, [ myUser.user._id ])

    return (
        <FlatList
            data={chatUsers}
            renderItem={({ item }) => <ChatUserBox item={item} />}
            ListEmptyComponent={!chatUsers.length && (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>
                        You have no chats.
                    </Text>
                </View>
            )}
            keyExtractor={(item) => item._id} />
    )
}
export default PageHoc(Messages)

const styles = StyleSheet.create({

})
