import React from 'react'

import {
    Image, StyleSheet
} from 'react-native'

const ProfileAvatar = () => (
    <Image
        source={{
            uri: 'https://avatars.githubusercontent.com/u/75138419?v=4'
        }}
        style={styles.avatar} />
)

export default ProfileAvatar

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})
