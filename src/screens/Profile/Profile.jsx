import React from 'react'

import {
    View
} from 'react-native'

import PostCard from '../../components/PostCard/PostCard'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import PageHoc from '../../layouts/PageHoc'
import { styles } from './ProfileStyles'

const Profile = () => (
    <View style={styles.container}>
        <ProfileHeader isAdmin />

        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />

    </View>
)

export default PageHoc(Profile, { scroll: true })
