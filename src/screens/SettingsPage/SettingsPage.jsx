import React from 'react'

import { useSetAtom } from 'jotai'

import SettingsItem from '../../components/SettingsItem/SettingsItem'
import PageHoc from '../../layouts/PageHoc'
import { userAtom } from '../../utils/atoms'

import LogoutIcon from '../../../assets/icons/LogoutIcon.png'

const SettingsPage = () => {
    const setUser = useSetAtom(userAtom)

    const logoutUser = () => {
        setUser(null)
    }

    return (
        <SettingsItem icon={LogoutIcon} text='Logout' onPress={logoutUser} />
    )
}

export default PageHoc(SettingsPage)
