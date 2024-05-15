import {
  SubDaosTab as StatelessSubDaosTab,
  useCachedLoading,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { Feature } from '@dao-dao/types'

import { useMembership } from '../../../hooks'
import { subDaoCardInfosSelector } from '../../../recoil'
import { ButtonLink } from '../../ButtonLink'
import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const { chain_id: chainId } = useChain()
  const daoInfo = useDaoInfoContext()
  const { getDaoPath } = useDaoNavHelpers()

  const { isMember = false } = useMembership(daoInfo)

  const subDaos = useCachedLoading(
    daoInfo.supportedFeatures[Feature.SubDaos]
      ? subDaoCardInfosSelector({ chainId, coreAddress: daoInfo.coreAddress })
      : // Passing undefined here returns an infinite loading state, which is
        // fine because it's never used.
        undefined,
    []
  )

  return (
    <StatelessSubDaosTab
      ButtonLink={ButtonLink}
      DaoCard={DaoCard}
      createSubDaoHref={getDaoPath(daoInfo.coreAddress, 'create')}
      isMember={isMember}
      subDaos={subDaos}
    />
  )
}
