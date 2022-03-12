import React from 'react'

import { View, Text} from 'react-native'
import styles from './LoginStyles'

import PageHoc from '../../layouts/PageHoc'

const Login = () => (
    <View style={styles.container}>
        <Text
            style={styles.mainTextStyle}>
            Khas Social Media Project
        </Text>
    </View>
)


export default PageHoc(Login, { scroll: true })