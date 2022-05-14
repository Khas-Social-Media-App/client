import React from 'react'

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
import * as Queries from '../../utils/queries'
import { styles } from './ProfileStyles'

const Profile = () => {
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
            <ProfileHeader isAdmin />

            {
                myUserPosts.length === 0 ? (
                    <View style={styles.container}>
                        <Text>No posts yet</Text>
                    </View>
                ) : (
                    <FlatList
                        data={myUserPosts}
                        renderItem={({ item }) => <PostCard post={item} />} />
                )
            }

        </View>
    )
}

export default PageHoc(Profile, { scroll: true })
