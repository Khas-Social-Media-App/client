import React from 'react'

import SettingsItem from '../../components/SettingsItem/SettingsItem'
import PageHoc from '../../layouts/PageHoc'

import LogoutIcon from '../../../assets/icons/LogoutIcon.png'

const SettingsPage = () => (
    <SettingsItem icon={LogoutIcon} text='Logout' />
)

export default PageHoc(SettingsPage)
