import React from 'react'

import { Controller } from 'react-hook-form'
import {
    StyleSheet, TextInput
} from 'react-native'

const Input = ({
    control, name, placeholder, disable
}) => (
    <Controller
        control={control}
        render={({
            field: {
                ref, onChange, onBlur, value = ''
            }
        }) => (
            <TextInput
                ref={ref}
                style={styles.input}
                editable={!disable}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                value={value} />
        )}
        name={name} />
)

export default Input

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    }
})
