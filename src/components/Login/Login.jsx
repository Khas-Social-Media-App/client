import React from 'react'

import { View, Text, TouchableOpacity, Image} from 'react-native'
import styles from './LoginStyles'

import PageHoc from '../../layouts/PageHoc'

const Login = () => (

    <View style={styles.container}>
        <Image style={styles.pc}
            source={require('../images/pc.png')}>
        </Image>

    <View style={styles.bottomContainer}>
        <Image style={styles.logo}
            source={require('../images/devflow.png')}>
        </Image>

        <Text style={styles.text}>Hi, by signing in you are agreeing our</Text>
        <Text style={styles.blueText}>Term and privacy pollicy.</Text>

        <TouchableOpacity
        style={styles.button}
        onPress={null}>
            <Image style={styles.githubImage}
            source={require('../images/github.png')}>
            </Image>

            <Text  style={styles.buttonText}>Sign in with GitHub</Text>

        </TouchableOpacity>

        </View>
    </View>    
)

export default PageHoc(Login, { scroll: true })