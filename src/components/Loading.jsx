import React from 'react'

import {
    ActivityIndicator, StyleSheet, View
} from 'react-native'

const Loading = () => (
    <View style={styles.emptyContainer}>
        <ActivityIndicator color='#1DAEFF' />
    </View>
)

export default Loading

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
