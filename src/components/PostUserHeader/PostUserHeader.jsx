import React from 'react'

import {
    Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'

import ThreeDotsIcon from '../../../assets/icons/ThreeDots.png'

const PostUserHeader = ({ owner, isAdmin, onPress }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.containerLeft}>
            <Image
                source={{
                    uri: owner.photoURL
                }}
                style={styles.avatar} />
            <View style={styles.nameAndTitleContainer}>
                <Text style={styles.name}>
                    {owner.displayName ? owner.displayName : owner.username}
                </Text>
                <Text style={styles.title}>
                    {owner?.title}
                </Text>
            </View>
        </TouchableOpacity>
        {
            isAdmin && (
                <TouchableOpacity style={styles.postOptionsButton}>
                    <Image source={ThreeDotsIcon} style={styles.threeDots} />
                </TouchableOpacity>
            )
        }
    </View>
)

export default PostUserHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    containerLeft: {
        flexDirection: 'row'
    },
    nameAndTitleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    threeDots: {
        width: 20,
        height: 20
    }
})
