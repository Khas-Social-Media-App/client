import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import Lightbox from 'react-native-lightbox-v2'
import { widthPercentageToDP } from 'react-native-responsive-screen'

import PostUserHeader from '../PostUserHeader/PostUserHeader'
import PostActions from './PostActions'

const mockImage = 'https://i.stack.imgur.com/MQWRw.png'

const PostCard = ({ navigator }) => (
    <View style={styles.cardView}>
        <PostUserHeader />
        <View style={styles.cardContent}>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti vero laboriosam, in eveniet deleniti vitae assumenda consequatur harum, natus voluptatibus facilis vel impedit unde? Fugit eius vitae quidem consectetur sint?
            </Text>
            {
                mockImage && (
                    <Lightbox navigator={navigator} underlayColor='white'>
                        <Image
                            style={{ height: widthPercentageToDP(50) }}
                            source={{ uri: mockImage }}
                            resizeMode='contain' />
                    </Lightbox>
                )
            }
        </View>
        <PostActions />
    </View>
)

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
