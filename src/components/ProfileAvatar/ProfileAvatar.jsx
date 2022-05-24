import React from 'react'

import {
    Image, StyleSheet
} from 'react-native'

const ProfileAvatar = ({ img }) => (
    <Image
        source={{
            uri: img
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
