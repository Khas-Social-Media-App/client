import React from 'react'

import {
    Image, Text, TouchableOpacity
} from 'react-native'

import PageHoc from '../../layouts/PageHoc'
import { styles } from './SettingsItemStyles'

const SettingsItem = ({ icon, text }) => (
    <TouchableOpacity style={styles.itemContainer}>
        <Image
            source={icon}
            style={styles.iconStyle} />
        <Text style={styles.itemText}>
            {text}
        </Text>
    </TouchableOpacity>
)

export default PageHoc(SettingsItem)
