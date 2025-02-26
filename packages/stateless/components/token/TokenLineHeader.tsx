import { useTranslation } from 'react-i18next'

import { TooltipInfoIcon } from '../tooltip/TooltipInfoIcon'

export const TokenLineHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="secondary-text mb-3 grid grid-cols-2 items-center gap-4 px-4 sm:grid-cols-[2fr_1fr_1fr]">
      <p>{t('title.token')}</p>

      <p className="text-right">{t('title.total')}</p>

      <div className="hidden flex-row items-center justify-end gap-1 sm:flex">
        <p className="text-right">{t('title.estUsdValue')}</p>
        <TooltipInfoIcon size="xs" title={t('info.estimatedUsdValueTooltip')} />
      </div>
    </div>
  )
}
