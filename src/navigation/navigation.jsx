/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAtom, useAtomValue } from 'jotai'
import { Image } from 'react-native'
import Config from 'react-native-config'
import socketIo from 'socket.io-client'

import Header from '../components/Header'
import ChatScreen from '../screens/ChatScreen/ChatScreen'
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen'
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen'
import Edit from '../screens/Edit/Edit'
import Home from '../screens/Home/Home'
import Login from '../screens/Login/Login'
import Messages from '../screens/Messages/Messages'
import Profile from '../screens/Profile/Profile'
import SearchScreen from '../screens/SearchScreen/SearchScreen'
import SettingsPage from '../screens/SettingsPage/SettingsPage'
import UserProfileScreen from '../screens/UserProfileScreen/UserProfileScreen'
import { userAtom, socketAtom } from '../utils/atoms'
import navigationRef from '../utils/navigation-ref'
import Storage from '../utils/storage'

import ChatIcon from '../../assets/icons/ChatIcon.png'
import GearIcon from '../../assets/icons/GearIcon.png'
import HomeIcon from '../../assets/icons/HomeIcon.png'
import ProfileIcon from '../../assets/icons/ProfileIcon.png'
import SearchIcon from '../../assets/icons/SearchIcon.png'

const Tab = createMaterialTopTabNavigator()

const Stack = createNativeStackNavigator()

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={HomeIcon}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1DAEFF' : '#000'
                            }} />
                    ),
                    tabBarShowLabel: false
                }} />
            <Tab.Screen
                name='Messages'
                component={Messages}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ChatIcon}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1DAEFF' : '#000'
                            }} />
                    ),
                    tabBarShowLabel: false
                }} />
            <Tab.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={SearchIcon}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1DAEFF' : '#000'
                            }} />
                    ),
                    tabBarShowLabel: false
                }} />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ProfileIcon}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1DAEFF' : '#000'
                            }} />
                    ),
                    tabBarShowLabel: false
                }} />
            <Tab.Screen
                name='Settings'
                component={SettingsPage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={GearIcon}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1DAEFF' : '#000'
                            }} />
                    ),
                    tabBarShowLabel: false
                }} />
        </Tab.Navigator>
    )
}

const Navigation = () => {
    const routeNameRef = React.useRef()

    const onStateChange = async () => {
        // const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name

        routeNameRef.current = currentRouteName
    }

    const linking = {
        prefixes: [ 'https://khas-social-app.com', 'com.khas.social://' ]
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            // onReady={onReady}
            onStateChange={onStateChange}>
            <RootNavigator />
        </NavigationContainer>
    )
}

const RootNavigator = () => {
    const user = useAtomValue(userAtom)
    const [ socket, setSocket ] = useAtom(socketAtom)

    React.useEffect(() => {
        if (user) {
            Storage.getItem('accessToken').then((accessToken) => {
                const s = socketIo(Config.API, {
                    extraHeaders: {
                        authorization: accessToken
                    },
                    transports: [ 'websocket' ]
                })

                setSocket(s)
            })
        }
    }, [ user ])

    if (!socket && user) {
        return null
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false,
                title: null
            }}
            initialRouteName={`${user ? 'Main' : 'Login'}`}>
            {
                user ? (

                    <>
                        <Stack.Screen
                            name='Main'
                            component={MyTabs}
                            options={{
                                headerShown: false
                            }} />

                        <Stack.Screen
                            name='Chat'
                            component={ChatScreen}
                            options={{
                                headerShown: false
                            }} />
                        <Stack.Screen
                            name='UserProfileScreen'
                            component={UserProfileScreen}
                            options={{
                                header: () => <Header title='Profile' />
                            }} />
                        <Stack.Screen
                            name='CreatePostScreen'
                            component={CreatePostScreen}
                            options={{
                                header: () => <Header title='Create Post' />,
                                animation: 'slide_from_bottom'
                            }} />
                        <Stack.Screen
                            name='EditProfile'
                            component={Edit}
                            options={{
                                header: () => <Header title='Edit' />,
                                animation: 'slide_from_bottom'
                            }} />
                        <Stack.Screen
                            name='CommentsScreen'
                            component={CommentsScreen}
                            options={{
                                header: () => <Header title='Comments' />
                            }} />
                    </>
                ) : (
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false
                        }} />
                )
            }

        </Stack.Navigator>
    )
}

export default Navigation
