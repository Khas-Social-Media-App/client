import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { useMutation } from 'react-query'

import MultilineInput from '../../components/Input/MultilineInput'
import PageHoc from '../../layouts/PageHoc'
import * as Queries from '../../utils/queries'

const CreatePostScreen = () => {
    const navigation = useNavigation()
    const [ content, setContent ] = React.useState('')
    const [ image, setImage ] = React.useState(null)

    const createPostMutation = useMutation(Queries.createPost, {
        onSuccess: (data) => {
            console.log('create post ', data)
            navigation.goBack()
        }
    })

    const handleImagePick = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then((image) => {
            console.log(image)
            setImage(image.path)
        }).catch((error) => { })
    }

    const handleSubmit = () => {
        createPostMutation.mutate({
            content,
            image
        })
    }

    return (
        <View style={styles.createPostContainer}>
            <MultilineInput
                value={content}
                setValue={setContent} />
            <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerContainer}>
                {
                    image ? (
                        <Image
                            source={{
                                uri: image
                            }}
                            style={{
                                width: widthPercentageToDP(85),
                                height: widthPercentageToDP(50),
                                borderRadius: 10,
                                resizeMode: 'cover'
                            }} />
                    ) : (
                        <Text>
                            Select Image

                        </Text>
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create</Text>
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
