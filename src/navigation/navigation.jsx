import * as React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAtomValue } from 'jotai'
import { Image } from 'react-native'

import Header from '../components/Header'
import { ChatScreen } from '../screens/ChatScreen/ChatScreen'
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen'
import Home from '../screens/Home/Home'
import Login from '../screens/Login/Login'
import Messages from '../screens/Messages/Messages'
import Profile from '../screens/Profile/Profile'
import SettingsPage from '../screens/SettingsPage/SettingsPage'
import { userAtom } from '../utils/atoms'
import navigationRef from '../utils/navigation-ref'

import ChatIcon from '../../assets/icons/ChatIcon.png'
import GearIcon from '../../assets/icons/GearIcon.png'
import HomeIcon from '../../assets/icons/HomeIcon.png'
import ProfileIcon from '../../assets/icons/ProfileIcon.png'

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
                            name='CreatePostScreen'
                            component={CreatePostScreen}
                            options={{
                                header: () => <Header title='Create Post' />,
                                animation: 'slide_from_bottom'
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
