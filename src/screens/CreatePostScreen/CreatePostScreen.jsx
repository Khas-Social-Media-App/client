import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'
import { useMutation } from 'react-query'

import MultilineInput from '../../components/Input/MultilineInput'
import PageHoc from '../../layouts/PageHoc'
import * as Queries from '../../utils/queries'
import { showRequestFailedMessage } from '../../utils/show-message'

const CreatePostScreen = () => {
    const navigation = useNavigation()
    const [ postContent, setContent ] = React.useState('')
    const [ image, setImage ] = React.useState(null)
    const [ imageURL, setImageURL ] = React.useState(null)

    const createPostMutation = useMutation(Queries.createPost, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Post created successfully'
            })

            navigation.goBack()
        },
        onError: showRequestFailedMessage
    })

    const onUploadImageMutation = useMutation(Queries.uploadImage, {
        onSuccess: (data) => {
            setImageURL(data.url)
        },
        onError: showRequestFailedMessage
    })

    const handleImagePick = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then((image) => {
            onUploadImageMutation.mutate(image.path)
            setImage(image.path)
        }).catch((error) => { })
    }

    const handleSubmit = () => {
        if (imageURL) {
            createPostMutation.mutate({
                content: postContent,
                image: imageURL
            })
        } else {
            createPostMutation.mutate({
                content: postContent
            })
        }
    }

    if (onUploadImageMutation.isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='#1DAEFF' />
            </View>
        )
    }

    return (
        <View style={styles.createPostContainer}>
            <MultilineInput
                value={postContent}
                setValue={setContent} />
            <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerContainer}>
                {
                    image ? (
                        <Image
                            source={{
                                uri: image
                            }}
                            style={styles.image} />
                    ) : (
                        <Text>
                            Select Image

                        </Text>
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                {
                    createPostMutation.isLoading ? (
                        <ActivityIndicator color='#1DAEFF' />
                    ) : (
                        <Text style={styles.buttonText}>Create</Text>

                    )
                }
            </TouchableOpacity>
        </View>
    )
}
export default PageHoc(CreatePostScreen, { scroll: true })

const styles = StyleSheet.create({
    createPostContainer: {
        padding: 30,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    image: {
        width: widthPercentageToDP(85),
        height: widthPercentageToDP(50),
        borderRadius: 10,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5
    },
    buttonContainer: {
        backgroundColor: '#1DAEFF',
        padding: 10,
        borderRadius: 15,
        marginTop: 20,
        width: '100%'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    },
    imagePickerContainer: {
        width: '100%',
        height: widthPercentageToDP(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        borderColor: '#1DAEFF',
        marginVertical: 20
    }
})
