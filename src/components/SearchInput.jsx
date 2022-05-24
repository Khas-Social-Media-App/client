import React from 'react'

import {
    Image, StyleSheet, TextInput, View
} from 'react-native'

import SearchIcon from '../../assets/icons/SearchIcon.png'

const SearchInput = ({ value, setValue }) => (
    <View style={styles.searchBar}>

        <Image
            source={SearchIcon}
            style={styles.searchIcon} />
        <TextInput
            style={styles.searchInput}
            autoFocus
            onChangeText={setValue}
            placeholder='Search'
            value={value} />
    </View>
)

export default SearchInput

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
    }
})
