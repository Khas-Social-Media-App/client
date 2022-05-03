import React from 'react'

import {
    Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'

import CommentIcon from '../../../assets/icons/CommentIcon.png'
import LikeIcon from '../../../assets/icons/LikeIcon.png'

const PostActions = () => (
    <View style={styles.actions}>
        <View style={styles.actionButtonStyle}>
            <TouchableOpacity>
                <Image
                    source={LikeIcon}
                    resizeMode='contain'
                    style={styles.actionIcon} />
            </TouchableOpacity>
            <Text style={styles.actionLikeCountText}>
                62
            </Text>
        </View>
        <View style={styles.actionButtonStyle}>
            <TouchableOpacity>
                <Image
                    source={CommentIcon}
                    resizeMode='contain'
                    style={styles.actionIcon} />
            </TouchableOpacity>
            <Text style={styles.actionLikeCountText}>
                62
            </Text>
        </View>
    </View>
)

export default PostActions

const styles = StyleSheet.create({

    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        paddingHorizontal: 20
    },
    actionIcon: {
        width: 25,
        height: 25
    },
    actionButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20
    },
    actionLikeCountText: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16
    }
})
