import { Endpoints, SignerOptions } from '@cosmos-kit/core'
import { wallets as keplrWallets } from '@cosmos-kit/keplr'
import { wallets as keplrExtensionWallets } from '@cosmos-kit/keplr-extension'
import { ChainProvider } from '@cosmos-kit/react-lite'
import { assets, chains } from 'chain-registry'
import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { usePrevious } from 'react-use'
import { useRecoilState, useRecoilValue } from 'recoil'

import { isInIframe } from '@dao-dao/cosmiframe'
import {
  isKeplrMobileWebAtom,
  mountedInBrowserAtom,
} from '@dao-dao/state/recoil'
import {
  CHAIN_ENDPOINTS,
  SITE_TITLE,
  SITE_URL,
  getChainForChainId,
  getKeplrFromWindow,
  getSignerOptions,
} from '@dao-dao/utils'

import { useSyncWalletSigner, useWallet } from '../../hooks'
import { WalletUi } from './WalletUi'

const ALLOWED_IFRAME_PARENT_ORIGINS = [
  'https://daodao.zone',
  'https://dao.daodao.zone',
  'https://app.osmosis.zone',
]
// Support localhost dev env and vercel preview links.
if (!ALLOWED_IFRAME_PARENT_ORIGINS.includes(SITE_URL)) {
  ALLOWED_IFRAME_PARENT_ORIGINS.push(SITE_URL)
}

export type WalletProviderProps = {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const { t } = useTranslation()

  const signerOptions: SignerOptions = {
    // cosmos-kit has an older version of the package. This is a workaround.
    signingStargate: getSignerOptions as any,
    // cosmos-kit has an older version of the package. This is a workaround.
    signingCosmwasm: getSignerOptions as any,
  }

  // Auto-connect to Keplr mobile web if in that context.
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [isKeplrMobileWeb, setIsKeplrMobileWeb] =
    useRecoilState(isKeplrMobileWebAtom)
  useEffect(() => {
    if (!mountedInBrowser) {
      return
    }

    ;(async () => {
      setIsKeplrMobileWeb((await getKeplrFromWindow())?.mode === 'mobile-web')
    })()
  }, [mountedInBrowser, setIsKeplrMobileWeb])

  // If in iframe, show no wallets, which will make it only show the iframe
  // wallet since that's installed by default.
  const allWallets = isInIframe() ? [] : [...keplrWallets]

  return (
    <ChainProvider
      allowedIframeParentOrigins={ALLOWED_IFRAME_PARENT_ORIGINS}
      assetLists={
        // Temp fix for mismatched package types.
        assets as any[]
      }
      chains={chains}
      endpointOptions={{
        // Load all custom chain endpoints into wallet provider.
        endpoints: Object.entries(CHAIN_ENDPOINTS).reduce(
          (acc, [chainId, { rpc, rest }]) => ({
            ...acc,
            [getChainForChainId(chainId).chain_name]: {
              rpc: [rpc],
              rest: [rest],
              isLazy: true,
            },
          }),
          {} as Record<string, Endpoints>
        ),
      }}
      signerOptions={signerOptions}
      walletConnectOptions={{
        signClient: {
          // https://cloud.walletconnect.com
          projectId: '2021db728d55be8401efaf25f4e534cd',
          relayUrl: 'wss://relay.walletconnect.org',
          metadata: {
            name: SITE_TITLE,
            description: t('meta.description'),
            url: SITE_URL,
            icons: ['https://daodao.zone/daodao.png'],
          },
        },
      }}
      walletModal={WalletUi}
      wallets={
        // If Keplr Mobile in-app browser, only allow Keplr Extension. Keplr
        // Mobile wallet works via WalletConnect from a desktop, but not in-app.
        isKeplrMobileWeb ? keplrExtensionWallets : allWallets
      }
    >
      <InnerWalletProvider>{children}</InnerWalletProvider>
    </ChainProvider>
  )
}

const InnerWalletProvider = ({ children }: PropsWithChildren<{}>) => {
  useSyncWalletSigner()

  const { isWalletConnected, isWalletDisconnected, walletRepo, wallet, chain } =
    useWallet()

  // Auto-connect to current chain if switched chains and no longer connected.
  const previousChain = usePrevious(chain.chain_name)
  const previousConnected = usePrevious(isWalletConnected)
  const previousWalletName = usePrevious(wallet?.name)
  const walletRepoRef = useRef(walletRepo)
  walletRepoRef.current = walletRepo
  const reconnectingRef = useRef(false)
  useEffect(() => {
    if (
      previousConnected &&
      previousWalletName &&
      !isWalletConnected &&
      previousChain !== chain.chain_name &&
      !reconnectingRef.current
    ) {
      reconnectingRef.current = true
      walletRepoRef.current
        .connect(previousWalletName, false)
        .catch(console.error)
        .finally(() => {
          reconnectingRef.current = false
        })
    }
  }, [
    previousConnected,
    isWalletConnected,
    previousChain,
    chain.chain_name,
    previousWalletName,
  ])

  // Refresh connection on wallet change.
  useEffect(() => {
    if (typeof window === 'undefined' || !isWalletConnected || !wallet) {
      return
    }

    const refresh = async () => {
      // Ensure connection still alive, and disconnect on failure.
      try {
        await walletRepo.connect(wallet.name, false)
      } catch {
        await walletRepo.disconnect(wallet.name, true).catch(console.error)
      }
    }

    wallet.connectEventNamesOnWindow?.forEach((eventName) => {
      window.addEventListener(eventName, refresh)
    })

    // Clean up on unmount.
    return () => {
      wallet.connectEventNamesOnWindow?.forEach((eventName) => {
        window.removeEventListener(eventName, refresh)
      })
    }
  }, [isWalletConnected, wallet, walletRepo])

  // Auto-connect to Keplr mobile web if in that context.
  const isKeplrMobileWeb = useRecoilValue(isKeplrMobileWebAtom)
  useEffect(() => {
    if (!isKeplrMobileWeb || !isWalletDisconnected) {
      return
    }

    walletRepo.connect(keplrExtensionWallets[0].walletName, false)
  }, [isKeplrMobileWeb, isWalletDisconnected, walletRepo])

  return <>{children}</>
}
