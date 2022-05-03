import React from 'react'

import { View } from 'react-native'

import PostCard from '../../components/PostCard/PostCard'
import PageHoc from '../../layouts/PageHoc'
import { styles } from './HomeStyles'

const Home = () => (

    <View style={styles.container}>

        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />

    </View>

)

export default PageHoc(Home, { scroll: true })
