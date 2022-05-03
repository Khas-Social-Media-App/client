import React from 'react'

import {
    Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'

import ThreeDotsIcon from '../../../assets/icons/ThreeDots.png'

const PostUserHeader = () => (
    <View style={styles.container}>
        <View style={styles.containerLeft}>
            <Image
                source={{
                    uri: 'https://avatars.githubusercontent.com/u/75138419?v=4'
                }}
                style={styles.avatar} />
            <View style={styles.nameAndTitleContainer}>
                <Text style={styles.name}>
                    Mertcan Karaman
                </Text>
                <Text style={styles.title}>
                    React Native Developer
                </Text>
            </View>
        </View>
        <TouchableOpacity style={styles.postOptionsButton}>
            <Image source={ThreeDotsIcon} style={styles.threeDots} />
        </TouchableOpacity>
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
        marginLeft: 10
    },
    threeDots: {
        width: 20,
        height: 20
    }
})
