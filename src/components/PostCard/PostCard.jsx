import React from 'react'

import { useAtomValue } from 'jotai'
import {
    Image, StyleSheet, Text, View
} from 'react-native'
import Lightbox from 'react-native-lightbox-v2'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'
import { useMutation } from 'react-query'

import { userAtom } from '../../utils/atoms'
import * as Queries from '../../utils/queries'
import PostUserHeader from '../PostUserHeader/PostUserHeader'
import PostActions from './PostActions'

const PostCard = ({ navigator, post }) => {
    const user = useAtomValue(userAtom)

    const isPostAlreadyLiked = post.likes.includes(user.user._id)

    const likePostMutation = useMutation(Queries.likePost, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Post liked successfully'
            })
        }
    })

    const unlikePostMutation = useMutation(Queries.unlikePost, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Post unliked successfully'
            })
        }
    })

    const handleLike = () => {
        likePostMutation.mutate(post._id)
    }

    const handleUnlike = () => {
        unlikePostMutation.mutate(post._id)
    }

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
                                style={{ height: widthPercentageToDP(80), width: widthPercentageToDP(80) }}
                                source={{ uri: post.image }}
                                resizeMode='contain' />
                        </Lightbox>
                    )
                }
            </View>
            <PostActions post={post} handleLike={handleLike} handleUnlike={handleUnlike} isPostAlreadyLiked={isPostAlreadyLiked} />
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
