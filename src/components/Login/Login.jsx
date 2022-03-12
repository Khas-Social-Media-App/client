import React from 'react'

import { View, Text , StyleSheet} from 'react-native'

import PageHoc from '../../layouts/PageHoc'

const Login = () => (
    <Text
        style={styles.mainTextStyle}>
        Khas Socail Media Project
    </Text>
)

const styles = StyleSheet.create({
    mainTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#f2f'
    }
})

export default PageHoc(Login, { scroll: true })
