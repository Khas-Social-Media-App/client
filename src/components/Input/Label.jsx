import React from 'react'

import { StyleSheet, Text } from 'react-native'

const Label = ({ label }) => (
    <Text style={styles.label}>
        {label}
    </Text>
)

export default Label

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 15
    }
})
