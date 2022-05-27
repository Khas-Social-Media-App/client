import Toast from 'react-native-toast-message'

export const showRequestFailedMessage = (e) => {
    if (e) {
        const errorMessage = e.response.data.message

        Toast.show({
            type: 'error',
            position: 'top',
            text1: errorMessage
        })
    } else {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Something went wrong'
        })
    }
}
