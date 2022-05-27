import React from 'react'

import { useRoute } from '@react-navigation/native'
import { useAtom } from 'jotai'
import {
    ActivityIndicator,
    FlatList,
    Text,
    View
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useMutation } from 'react-query'

import PostCard from '../../components/PostCard/PostCard'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import PageHoc from '../../layouts/PageHoc'
import { userAtom } from '../../utils/atoms'
import * as Queries from '../../utils/queries'
import { styles } from './UserProfileStyles'

const UserProfileScreen = () => {
    const [ myUser, setMyUser ] = useAtom(userAtom)
    const route = useRoute()
    const { user } = route.params
    const isAdmin = myUser.user._id === user
    const [ myUserPosts, setMyUserPosts ] = React.useState([])
    const [ singleUser, setSingleUser ] = React.useState()

    const getSingleUser = useMutation(Queries.getSingleUser, {
        onSuccess: (data) => {
            setMyUserPosts(data.posts)
            setSingleUser(data.userInfo)
        }
    })

    const onFollowMutation = useMutation(Queries.followUser, {
        onSuccess: (data) => {
            setMyUser((prevData) => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    following: [ ...prevData.user.following, user ]
                }
            }))

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'User followed'
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Unable to follow user'
            })
        }
    })

    const onUnFollowMutation = useMutation(Queries.unfollowUser, {
        onSuccess: (data) => {
            setMyUser((prevData) => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    following: prevData.user.following.filter((id) => id !== user)
                }
            }))

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'User unfollowed'
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Unable to unfollow user'
            })
        }
    })

    const onFollowPress = () => {
        onFollowMutation.mutate({ followedPersonId: user })
    }

    const onUnFollowPress = () => {
        onUnFollowMutation.mutate({ followedPersonId: user })
    }

    React.useEffect(() => {
        getSingleUser.mutate(user)
    }, [])

    if (getSingleUser.isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='#1DAEFF' />
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <FlatList
                ListHeaderComponent={<ProfileHeader isAdmin={isAdmin} user={singleUser} isSingle postsLength={myUserPosts?.length} onFollow={onFollowPress} onUnfollow={onUnFollowPress} />}
                data={myUserPosts}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={(
                    <View style={styles.emptyPage}>
                        <Text>Post Yok</Text>
                    </View>
                )}
                refreshing={getSingleUser.isLoading}
                onRefresh={getSingleUser.mutate}
                renderItem={({ item }) => <PostCard post={item} setMyUserPosts={setMyUserPosts} />} />

        </View>
    )
}

export default PageHoc(UserProfileScreen)
