/* eslint-disable no-underscore-dangle */
import React from 'react'

import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { useAtomValue } from 'jotai'
import {
    Image, Text, TouchableOpacity, View
} from 'react-native'

import { userAtom } from '../../utils/atoms'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import { styles } from './ProfileHeaderStyles'

import EditIcon from '../../../assets/icons/EditIcon.png'

const ProfileHeader = ({
    isAdmin, user, postsLength, isSingle, onFollow, onUnfollow
}) => {
    const navigation = useNavigation()
    const myUser = useAtomValue(userAtom)

    const onEditPress = () => {
        navigation.navigate('EditProfile')
    }
    const onCreateChat = async () => {
        const unsub = await firestore()
            .collection('rooms')
            .where('users', 'array-contains', myUser.user._id)

        if (unsub._queryName === undefined) {
            const response = await firestore().collection('rooms').add({
                created_at: firestore.Timestamp.now(),
                users: [ myUser?.user._id, user._id ],
                photos: [
                    {
                        id: myUser?.user._id,
                        url: myUser?.user.photoURL,
                        name: myUser?.user.displayName ? myUser?.user.displayName : myUser?.user.username
                    },
                    {
                        id: user?._id,
                        url: user?.photoURL,
                        name: user?.displayName ? user.displayName : user.username
                    }
                ]
            })

            navigation.navigate('Chat', {
                roomId: response.id
            })
        } else {
            unsub.onSnapshot((snapshot) => {
                snapshot.docs.map(async (doc) => {
                    const { users } = doc.data()
                    if (users.includes(myUser.user._id) && users.includes(user._id)) {
                        navigation.navigate('Chat', {
                            roomId: doc.id
                        })
                    }
                })
            })
        }
    }

    return (
        <View style={styles.profileHeader}>
            <View style={styles.profileHeaderTop}>
                <View style={styles.leftContainer}>
                    <ProfileAvatar img={user?.photoURL} />
                    <View style={styles.nameAndTitleContainer}>
                        {
                            Boolean(user?.displayName) && (
                                <Text style={styles.name}>
                                    {user?.displayName}
                                </Text>
                            )
                        }
                        {
                            user?.title ? (
                                <Text>{user?.title}</Text>
                            ) : (
                                <Text>{user?.username}</Text>

                            )
                        }
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    {
                        // eslint-disable-next-line no-nested-ternary
                        isAdmin ? (
                            <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
                                <Image
                                    source={EditIcon}
                                    style={styles.editIcon} />
                            </TouchableOpacity>

                        ) : myUser?.user?.following?.includes(user?._id) ? (
                            <TouchableOpacity onPress={onUnfollow} style={styles.followButton}>
                                <Text style={styles.followText}>
                                    Unfollow
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={onFollow} style={styles.followButton}>
                                <Text style={styles.followText}>
                                    Follow
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            {
                isSingle && !isAdmin && (
                    <TouchableOpacity onPress={onCreateChat} style={styles.messageButton}>

                        <Text style={styles.messageButtonText}>
                            Message
                        </Text>

                    </TouchableOpacity>
                )
            }
            <View style={styles.profileHeaderBottom}>
                <View style={styles.followerBox}>
                    <Text style={styles.followerCountText}>
                        {user?.followers?.length}
                    </Text>
                    <Text style={styles.followerText}>
                        Follower
                    </Text>
                </View>
                <View
                    style={styles.followingBox}>
                    <Text style={styles.followingCountText}>
                        {user?.following?.length}

                    </Text>
                    <Text style={styles.followingText}>
                        Following
                    </Text>
                </View>
                <View
                    style={styles.postsBox}>
                    <Text style={styles.postsCountText}>
                        {postsLength}
                    </Text>
                    <Text style={styles.postsText}>
                        Posts
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader
