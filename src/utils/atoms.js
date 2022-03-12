import { atomWithStorage, createJSONStorage } from 'jotai/utils'

import Storage from './storage'

export const userAtom = atomWithStorage('user', null, createJSONStorage(() => Storage))
