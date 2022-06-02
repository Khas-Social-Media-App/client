import React from 'react'

import { useRoute } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { useMutation } from 'react-query'

import CommentItem from '../../components/CommentItem'
import Input from '../../components/Input'
import PageHoc from '../../layouts/PageHoc'
import * as Queries from '../../utils/queries'
import { showRequestFailedMessage } from '../../utils/show-message'

const CommentsScreen = () => {
    const route = useRoute()
    const { control, handleSubmit } = useForm()
    const [ comments, setComments ] = React.useState([])
    const getCommentsMutation = useMutation(Queries.getComments, {
        onSuccess: (data) => {
            setComments(data)
        },
        onError: (error) => {
            showRequestFailedMessage(error)
        }
    })

    const addCommentMutation = useMutation(Queries.addComment, {
        onSuccess: (data) => {
            setComments((prevData) => [ ...data.comments ])
        }
    })

    const onSubmit = (data) => {
        addCommentMutation.mutate({
            postId: route.params.id,
            comment: data.comment
        })
    }

    const onFormValid = () => {
        handleSubmit(onSubmit)()
    }

    React.useEffect(() => {
        getCommentsMutation.mutate(route?.params.id)
    }, [ route?.params.id ])

    return (
        <>
            <FlatList
                data={comments}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No comments yet</Text>
                    </View>
                )}

                renderItem={({ item }) => (<CommentItem item={item} />)} />
            <View style={{
                marginTop: 10,
                paddingHorizontal: 10,
                alignSelf: 'stretch',
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 0.8
                }}>
                    <Input control={control} name='comment' placeholder='Add Comment' key='comment' />

                </View>
                <TouchableOpacity
                    onPress={onFormValid}
                    style={{
                        flex: 0.2,
                        borderRadius: 10,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#1DAEFF'
                    }}>
                    <Text style={styles.buttonText} onPress={onFormValid}>Send</Text>
                </TouchableOpacity>
            </View>

        </>
    )
}

export default PageHoc(CommentsScreen)

const styles = StyleSheet.create({
})
