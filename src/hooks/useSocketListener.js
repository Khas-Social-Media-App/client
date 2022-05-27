import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { socketAtom } from '../utils/atoms'

const useSocketListener = (channel, cb, options = {}) => {
    const socket = useAtomValue(socketAtom)

    React.useEffect(() => {
        socket.on(channel, cb)

        return () => {
            if (!options.doNotClose) {
                socket.off(channel)
            }
        }
    }, [])
}

export default useSocketListener
