import React from 'react'

import '@react-native-firebase/app'
import { ErrorBoundary } from 'react-error-boundary'
import {
    StyleSheet, Text, StatusBar
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary
} from 'react-query'

import Navigation from './src/navigation/navigation'

import './src/utils/axios'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true
        }
    }
})

// use https://www.npmjs.com/package/react-native-global-props if need more default props
Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

const QueryProvider = () => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    const errorFallbackRender = () => <></>

    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary onReset={reset} fallbackRender={errorFallbackRender}>
                        <React.Suspense fallback={<></>}>
                            <App />
                        </React.Suspense>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    )
}

const App = () => (
    <SafeAreaProvider style={styles.safeArea}>
        <StatusBar barStyle='dark-content' backgroundColor='#ffffff' />
        <Navigation />
        <Toast />
    </SafeAreaProvider>
)

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff'
    }
})

export default QueryProvider
