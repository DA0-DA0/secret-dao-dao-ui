// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { pinnedDaoCardInfoSelector, usePinnedDaos } from '@dao-dao/state'
import { DaoCardInfo } from '@dao-dao/tstypes'
import { Home, ProfileDisconnectedCard } from '@dao-dao/ui'
import {
  FEATURED_DAOS_CACHE_SECONDS,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { DaoCard, ProfileHomeCard } from '@/components'
import { getFeaturedDaos } from '@/server'

interface HomePageProps {
  featuredDaos: DaoCardInfo[]
}

const HomePage: NextPage<HomePageProps> = ({ featuredDaos }) => {
  const { connected } = useWallet()
  const { isPinned: isDaoPinned, setPinned, setUnpinned } = usePinnedDaos()

  const pinnedDaosLoadable = useRecoilValueLoadable(
    pinnedDaoCardInfoSelector({ daoUrlPrefix: `/dao/` })
  )

  //! Loadable errors.
  useEffect(() => {
    if (pinnedDaosLoadable.state === 'hasError') {
      console.error(pinnedDaosLoadable.contents)
    }
  }, [pinnedDaosLoadable.contents, pinnedDaosLoadable.state])

  return (
    <Home
      featuredDaosProps={{
        featuredDaos,
        isDaoPinned,
        onPin: (coreAddress) =>
          isDaoPinned(coreAddress)
            ? setUnpinned(coreAddress)
            : setPinned(coreAddress),
      }}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
      {...(connected
        ? {
            connected,
            pinnedDaosProps: {
              pinnedDaos: loadableToLoadingData(pinnedDaosLoadable, []),
              DaoCard,
            },
          }
        : {
            connected,
          })}
    />
  )
}

export default HomePage

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
    featuredDaos: await getFeaturedDaos(),
    revalidate: FEATURED_DAOS_CACHE_SECONDS,
  },
})
