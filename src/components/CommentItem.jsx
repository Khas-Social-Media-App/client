import React from 'react'

import {
    View, Text, StyleSheet, Image
} from 'react-native'

const CommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
        <View style={styles.commentOwner}>
            <Image
                source={{
                    uri: item?.owner.photoURL
                }}
                style={styles.avatarStyle} />
            <Text style={styles.commentOwnerName}>{item?.owner.username}</Text>
        </View>
        <Text style={styles.commentContent}>{item?.comment}</Text>
    </View>
)

const styles = StyleSheet.create({
    commentContainer: {
        alignSelf: 'stretch',
        padding: 20,
        marginTop: 20,
        minHeight: 100,
        backgroundColor: '#E5E5E5'
    },
    commentOwner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarStyle: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    commentOwnerName: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    commentContent: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    }
})

export default CommentItem
