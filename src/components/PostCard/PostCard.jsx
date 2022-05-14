import React from 'react'

import {
    Image, StyleSheet, Text, View
} from 'react-native'
import Lightbox from 'react-native-lightbox-v2'
import { widthPercentageToDP } from 'react-native-responsive-screen'

import PostUserHeader from '../PostUserHeader/PostUserHeader'
import PostActions from './PostActions'

const PostCard = ({ navigator, post }) => {
    console.log(post)

    return (
        <View style={styles.cardView}>
            <PostUserHeader owner={post.owner} />
            <View style={styles.cardContent}>
                <Text>
                    {post.content}
                </Text>
                {
                    post.image && (
                        <Lightbox navigator={navigator} underlayColor='white'>
                            <Image
                                style={{ height: widthPercentageToDP(50) }}
                                source={{ uri: post.image }}
                                resizeMode='contain' />
                        </Lightbox>
                    )
                }
            </View>
            <PostActions post={post} />
        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    cardView: {
        padding: 20,
        backgroundColor: '#E5E5E5',
        alignSelf: 'stretch',
        borderRadius: 10,
        marginTop: 10,
        minHeight: 100
    },
    cardContent: {
        marginTop: 10
    }
})
