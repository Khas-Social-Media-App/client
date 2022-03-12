import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../components/Login/Login'
import navigationRef from '../utils/navigation-ref'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const routeNameRef = React.useRef()

    const onStateChange = async () => {
        // const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name

        routeNameRef.current = currentRouteName
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            // onReady={onReady}
            onStateChange={onStateChange}>
            <RootNavigator />
        </NavigationContainer>
    )
}

const RootNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShadowVisible: false,
            title: null
        }}
        initialRouteName='Login'>
        <Stack.Screen
            name='Login'
            component={Login}
            options={{
                headerShown: false
            }} />
    </Stack.Navigator>
)

export default Navigation
