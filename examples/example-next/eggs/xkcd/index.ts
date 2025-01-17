import type { Egg } from '@redux-eggs/core'

import { XkcdPublicAction } from '@/eggs/xkcd/action-creators'
import { XKCD_REDUCER_KEY, xkcdReducer } from '@/eggs/xkcd/reducer'
import { loadXkcdInfoWatcher } from '@/eggs/xkcd/saga'
import type { AppStore } from '@/store'

export const getXkcdEgg = (): Egg<AppStore> => {
  const egg: Egg<AppStore> = {
    id: 'xkcd',
    reducersMap: {
      [XKCD_REDUCER_KEY]: xkcdReducer,
    },
    sagas: [loadXkcdInfoWatcher],
  }

  if (typeof window === 'undefined') {
    egg.afterAdd = store => store.dispatch(XkcdPublicAction.loadInfo())
  }

  return egg
}
