import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexGrow: 1,
        height: '100%',
        alignItems: 'center'
    },
    floatingButtonStyle: {
        position: 'absolute',
        right: -20,
        zIndex: 99,
        bottom: -10
    },
    feedList: {
        height: '100%',
        paddingHorizontal: 10,
        paddingTop: 20
    },
    emptyListContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
