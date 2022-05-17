import React from 'react'

import { StyleSheet, TextInput, View } from 'react-native'

import Label from './Label'

const MultilineInput = ({ setValue, value }) => (
    <>
        <Label label='Content' />

        <View style={styles.multilineInputContainer}>
            <TextInput
                style={[ styles.input, styles.multilineInput, styles.multiline ]}
                value={value}
                multiline
                numberOfLines={4}
                onChangeText={((text) => setValue(text))} />
        </View>
    </>
)
export default MultilineInput

const styles = StyleSheet.create({
    input: {
        borderColor: '#1DAEFF',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16
    },

    multilineInputContainer: {
        height: 10 * 30
    },
    multilineInput: {
        height: '100%'
    },
    multiline: {
        borderRadius: 16,
        padding: 10,
        flexDirection: 'row',
        textAlignVertical: 'top',
        alignItems: 'center'
    }
})
