import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    ActivityIndicator, FlatList, Text, View
} from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import { useMutation } from 'react-query'

import PostCard from '../../components/PostCard/PostCard'
import useSocketListener from '../../hooks/useSocketListener'
import PageHoc from '../../layouts/PageHoc'
import * as Queries from '../../utils/queries'
import { styles } from './HomeStyles'

import PlusIcon from '../../../assets/icons/PlusIcon.png'

const Home = () => {
    const navigation = useNavigation()

    const [ feedPosts, setFeedPosts ] = React.useState([])

    const getFeedPostsMutation = useMutation(Queries.getFeedPosts, {
        onSuccess: (data) => {
            setFeedPosts(data)
        }
    })

    useSocketListener('POST', ({ post }) => {
        console.log('socket post', post)
        setFeedPosts((prevPost) => [ post, ...prevPost ])
    })

    const actions = [
        {
            text: 'Add Post',
            icon: PlusIcon,
            name: '1',
            position: 1
        }
    ]

    const onFloatingActionPress = (name) => {
        if (name === '1') {
            navigation.navigate('CreatePostScreen', { getFeed: getFeedPostsMutation.mutate })
        }
    }

    React.useEffect(() => {
        getFeedPostsMutation.mutate()
    }, [])

    if (getFeedPostsMutation.isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='#1DAEFF' />
            </View>
        )
    }

    return (
        <>

            <FlatList
                data={feedPosts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <PostCard post={item} setFeedPosts={setFeedPosts} />}
                refreshing={getFeedPostsMutation.isLoading}
                ListEmptyComponent={() => (
                    <View style={styles.container}>
                        <Text>No posts yet</Text>
                    </View>
                )}
                onRefresh={getFeedPostsMutation.mutate}
                style={styles.feedList} />

            <View style={styles.floatingButtonStyle}>
                <FloatingAction
                    shadowBackground={false}
                    showBackground={false}
                    floatingIcon={PlusIcon}
                    elevation={0}
                    color='#1DAEFF'
                    iconColor='#1DAEFF'
                    buttonSize={65}
                    iconWidth={36}
                    iconHeight={36}
                    onPressItem={onFloatingActionPress}
                    actions={actions} />
            </View>
        </>

    )
}

export default PageHoc(Home)
