import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    profileHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        overflow: 'hidden',
        padding: 20
    },

    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rightContainer: {
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    nameAndTitleContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'flex-start'
    },
    followButton: {
        width: 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#0386D0'

    },
    followText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    profileHeaderTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileHeaderBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    followerBox: {
        flexDirection: 'column',
        borderRightWidth: 1,
        alignItems: 'center',
        width: '33%'
    },
    followerCountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF005C'

    },
    followerText: {
        fontSize: 16
    },
    followingBox: {
        flexDirection: 'column',
        borderRightWidth: 1,
        alignItems: 'center',
        width: '33%'
    },
    followingCountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF005C'

    },
    followingText: {
        fontSize: 16
    },
    postsBox: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '33%'
    },
    postsCountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF005C'

    },
    postsText: {
        fontSize: 16
    },
    editIcon: {
        width: 24,
        height: 24
    },
    editButton: {
        width: 34,
        alignItems: 'center',
        justifyContent: 'center',
        height: 34
    }
})
