import React from 'react'

import { useUpdateAtom } from 'jotai/utils'
import {
    View, Text, TouchableOpacity, Image
} from 'react-native'
import { authorize } from 'react-native-app-auth'
import { useMutation } from 'react-query'

import PageHoc from '../../layouts/PageHoc'
import { userAtom } from '../../utils/atoms'
import * as Queries from '../../utils/queries'
import Storage from '../../utils/storage'
import styles from './LoginStyles'

import devflowImage from '../../../assets/images/devflow.png'
import githubImage from '../../../assets/images/github.png'
import pcImage from '../../../assets/images/pc.png'

const Login = () => {
    const setUser = useUpdateAtom(userAtom)
    const config = {
        redirectUrl: 'com.khas.social.auth://auth',
        clientId: 'dbc486df35ecd1be2a69',
        clientSecret: 'ad82d0077257c32ca96276fbadbe9f8dead507ce',
        scopes: [ 'identity', 'user', 'repo' ],
        additionalHeaders: { Accept: 'application/json' },
        serviceConfiguration: {
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            tokenEndpoint: 'https://github.com/login/oauth/access_token',
            revocationEndpoint:
            'https://github.com/settings/connections/applications/dbc486df35ecd1be2a69'
        }
    }

    const loginMutation = useMutation(Queries.login, {
        onSuccess: async (data) => {
            await Storage.setItem('accessToken', data.accessToken)
            setUser(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const signInWithGithub = async () => {
        // Log in to get an authentication token
        const authState = await authorize(config)

        const { accessToken } = authState

        const response = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`
            }
        })

        const gitUser = await response.json()

        if (gitUser) {
            loginMutation.mutate({
                email: gitUser.email,
                username: gitUser.login,
                displayName: gitUser.name,
                githubId: gitUser.id,
                photoURL: gitUser.avatar_url
            })
        }
    }

    return (

        <View style={styles.container}>
            <Image
                style={styles.pc}
                source={pcImage} />

            <View style={styles.bottomContainer}>
                <Image
                    style={styles.logo}
                    source={devflowImage}
                    resizeMode='contain' />
                <Text style={styles.text}>Hi, by signing in you are agreeing our</Text>
                <Text style={styles.blueText}>Term and privacy pollicy.</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={signInWithGithub}>
                    <Image
                        style={styles.githubImage}
                        source={githubImage} />

                    <Text style={styles.buttonText}>Sign in with GitHub</Text>

                </TouchableOpacity>

            </View>
        </View>
    )
}

export default PageHoc(Login, { scroll: true })
