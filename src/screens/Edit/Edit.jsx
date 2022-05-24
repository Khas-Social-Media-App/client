import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import {
    ActivityIndicator,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useMutation } from 'react-query'

import Input from '../../components/Input'
import Label from '../../components/Input/Label'
import PageHoc from '../../layouts/PageHoc'
import { userAtom } from '../../utils/atoms'
import * as Queries from '../../utils/queries'

const Edit = () => {
    const [ user, setUser ] = useAtom(userAtom)
    const navigation = useNavigation()
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            username: user.user.username,
            displayName: user.user.displayName,
            title: user.user.title,
            email: user.user.email
        }
    })

    const onUpdateUserMutation = useMutation(Queries.updateUser, {
        onSuccess: (data) => {
            setUser((prevData) => ({
                ...prevData,
                user: data
            }))
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Successfully updated your profile'
            })

            navigation.goBack()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const onSubmit = (data) => {
        onUpdateUserMutation.mutate(data)
    }

    const onFormValid = () => {
        handleSubmit(onSubmit)()
    }

    return (
        <View style={styles.container}>
            <Label label='Full Name' key='fullName' />
            <Input control={control} name='displayName' placeholder='Full Name' />

            <Label label='Username' key='username' />
            <Input control={control} name='username' placeholder='username' disable />

            <Label label='Job Title' key='jobTitle' />
            <Input control={control} name='title' placeholder='Job Title' />

            <Label label='Email' key='email' />
            <Input control={control} name='email' placeholder='Email' />

            <TouchableOpacity
                onPress={onFormValid}
                style={styles.saveButton}>
                {
                    onUpdateUserMutation.isLoading ? (
                        <View style={styles.loadingButton}>
                            <ActivityIndicator color='#fff' />
                        </View>
                    ) : (
                        <Text style={styles.saveButtonText}>
                            Save
                        </Text>
                    )
                }
            </TouchableOpacity>

        </View>
    )
}
export default PageHoc(Edit)

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    saveButton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1DAEFF',
        height: 50,
        marginTop: 20,
        borderRadius: 10
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    loadingButton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
