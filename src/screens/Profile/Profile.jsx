import React from 'react'

import { useAtomValue } from 'jotai'
import {
    ActivityIndicator,
    FlatList,
    Text,
    View
} from 'react-native'
import { useMutation } from 'react-query'

import PostCard from '../../components/PostCard/PostCard'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import PageHoc from '../../layouts/PageHoc'
import { userAtom } from '../../utils/atoms'
import * as Queries from '../../utils/queries'
import { styles } from './ProfileStyles'

const Profile = () => {
    const user = useAtomValue(userAtom)
    const [ myUserPosts, setMyUserPosts ] = React.useState([])
    const getMyUserPostsMutation = useMutation(Queries.getMyUserPosts, {
        onSuccess: (data) => {
            setMyUserPosts(data)
        }
    })

    React.useEffect(() => {
        getMyUserPostsMutation.mutate()
    }, [])

    if (getMyUserPostsMutation.isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='#1DAEFF' />
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <FlatList
                ListHeaderComponent={<ProfileHeader isAdmin user={user.user} postsLength={myUserPosts.length} />}
                data={myUserPosts}
                keyExtractor={(item) => item._id}
                refreshing={getMyUserPostsMutation.isLoading}
                onRefresh={getMyUserPostsMutation.mutate}
                renderItem={({ item }) => <PostCard post={item} />} />

        </View>
    )
}

export default PageHoc(Profile)
