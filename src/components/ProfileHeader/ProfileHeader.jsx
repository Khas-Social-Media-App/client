import React from 'react'

import {
    Image, Text, TouchableOpacity, View
} from 'react-native'

import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import { styles } from './ProfileHeaderStyles'

import EditIcon from '../../../assets/icons/EditIcon.png'

const ProfileHeader = ({ isAdmin }) => (
    <View style={styles.profileHeader}>
        <View style={styles.profileHeaderTop}>
            <View style={styles.leftContainer}>
                <ProfileAvatar />
                <View style={styles.nameAndTitleContainer}>
                    <Text style={styles.name}>
                        Mertcan Karaman
                    </Text>
                    <Text>React Native Developer</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                {
                    isAdmin ? (
                        <TouchableOpacity style={styles.editButton}>
                            <Image
                                source={EditIcon}
                                style={styles.editIcon} />
                        </TouchableOpacity>

                    ) : (
                        <TouchableOpacity style={styles.followButton}>

                            <Text style={styles.followText}>
                                Follow
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
        <View style={styles.profileHeaderBottom}>
            <View style={styles.followerBox}>
                <Text style={styles.followerCountText}>
                    1.2M
                </Text>
                <Text style={styles.followerText}>
                    Follower
                </Text>
            </View>
            <View
                style={styles.followingBox}>
                <Text style={styles.followingCountText}>
                    16
                </Text>
                <Text style={styles.followingText}>
                    Following
                </Text>
            </View>
            <View
                style={styles.postsBox}>
                <Text style={styles.postsCountText}>
                    10
                </Text>
                <Text style={styles.postsText}>
                    Posts
                </Text>
            </View>
        </View>
    </View>
)

export default ProfileHeader
