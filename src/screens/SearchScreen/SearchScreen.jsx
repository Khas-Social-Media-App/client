import React from 'react'

import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { useMutation } from 'react-query'

import SearchInput from '../../components/SearchInput'
import SearchUser from '../../components/SearchUser'
import PageHoc from '../../layouts/PageHoc'
import * as Queries from '../../utils/queries'

let filter = {
    page: 0,
    text: ''
}

const SearchScreen = () => {
    const [ searchText, setSearchText ] = React.useState('')
    const [ searchUsers, setSearchUsers ] = React.useState([])

    const searchUserMutation = useMutation(Queries.searchUser, {
        onSuccess: (data, variables) => {
            setSearchUsers(data)
        }
    })

    const onChangeText = (text) => {
        setSearchText(text)
        if (!text.trim()) {
            setSearchUsers([])
            filter = {
                text: '',
                page: 0
            }
        } else {
            filter = {
                text: text.trim().replace(/\W/ig, ''),
                page: 0
            }
            searchUserMutation.mutate({ text: filter.text, page: filter.page })
        }
    }

    const onScroll = (e) => {
        if (e.nativeEvent.contentOffset.y > (searchUsers.length / 2) * 80) {
            onEndReached()
        }
    }

    const keyExtractor = (item) => `search:${item._id}`

    const onEndReached = () => {
        if (searchUserMutation.data?.length >= 15) {
            filter = {
                page: filter.page + 1,
                text: filter.text
            }

            searchUserMutation.mutate({ text: filter.text, page: filter.page })
        }
    }

    return (
        <>
            <SearchInput value={searchText} setValue={onChangeText} />
            {
                !searchUserMutation.variables?.page > 0 && searchUserMutation.isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='#1DAEFF' />
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator
                        data={searchUsers}
                        style={styles.list}
                        keyExtractor={keyExtractor}
                        onScroll={onScroll}
                        keyboardShouldPersistTaps='handled'
                        ListFooterComponent={
                            (searchUserMutation.variables?.page > 0 && searchUserMutation.isLoading) && (
                                <ActivityIndicator size={48} />
                            )
                        }
                        ListEmptyComponent={Array.isArray(searchUserMutation.data) && !searchUserMutation.data.length ? (
                            <View style={styles.footer}>
                                <Text>No users found</Text>
                            </View>
                        ) : (
                            <View style={styles.footer}>
                                <Text>Explore Devflow Users</Text>
                            </View>
                        )}
                        renderItem={(({ item }) => <SearchUser item={item} />)} />
                )
            }
        </>
    )
}
export default PageHoc(SearchScreen)

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        height: 46,
        alignSelf: 'stretch',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 17,
        flexDirection: 'row',
        marginTop: 20
    },
    searchInput: {
        flex: 1,
        height: 46,
        marginLeft: 10,
        fontSize: 16,
        color: 'black'
    },
    searchIcon: {
        width: 30,
        height: 30
    },
    list: {
        marginTop: 20,
        marginHorizontal: 20,
        paddingBottom: 100
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
