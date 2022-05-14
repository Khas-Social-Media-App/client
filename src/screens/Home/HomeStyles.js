import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center'
    },
    floatingButtonStyle: {
        position: 'absolute',
        right: -20,
        zIndex: 99,
        bottom: -10
    },
    feedList: {
        paddingTop: 20
    }
})
