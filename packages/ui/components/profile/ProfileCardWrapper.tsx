import { Check, Close, Edit } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { ProfileCardWrapperProps } from '@dao-dao/tstypes/ui/ProfileCardWrapper'
import { formatDate, processError } from '@dao-dao/utils'

import { Button } from '../Button'
import { CornerGradient } from '../CornerGradient'
import { IconButton } from '../IconButton'
import { TextInput } from '../input'
import { Loader } from '../Loader'
import { ProfileImage } from './ProfileImage'

export * from '@dao-dao/tstypes/ui/ProfileCardWrapper'

export const ProfileCardWrapper = ({
  children,
  walletProfile,
  showUpdateProfileNft,
  updateProfileName,
  established,
  compact,
  underHeaderComponent,
  childContainerClassName,
}: ProfileCardWrapperProps) => {
  const { t } = useTranslation()

  const [averageImgColor, setAverageImgColor] = useState<string>()
  // Get average color of image URL.
  useEffect(() => {
    // Only need this in compact mode.
    if (!compact || walletProfile.loading) {
      return
    }

    const absoluteUrl = new URL(walletProfile.data.imageUrl, document.baseURI)
      .href
    fetch(`https://fac.withoutdoing.com/${absoluteUrl}`)
      .then((response) => response.text())
      // Only set color if appears to be valid color string.
      .then((value) => {
        const color = value.trim()
        if (!color.startsWith('#')) {
          return
        }

        setAverageImgColor(
          color +
            // If in #RRGGBB format, add ~20% opacity.
            (color.length === 7 ? '33' : '')
        )
      })
  }, [compact, walletProfile])

  const canEdit = !walletProfile.loading && walletProfile.data.nonce >= 0

  return (
    <div className="relative rounded-lg border border-border-primary">
      {/* Absolutely positioned, against relative outer-most div (without padding). */}
      {compact && !!averageImgColor && (
        <CornerGradient className="h-36 opacity-50" color={averageImgColor} />
      )}

      <div className="p-6">
        {compact ? (
          <div className="flex flex-row gap-3 items-stretch">
            <ProfileImage
              imageUrl={
                walletProfile.loading ? undefined : walletProfile.data.imageUrl
              }
              loading={walletProfile.loading}
              onEdit={canEdit ? showUpdateProfileNft : undefined}
              size="sm"
            />

            <div className="flex flex-col gap-1">
              <ProfileNameDisplayAndEditor
                canEdit={canEdit}
                compact={compact}
                updateProfileName={updateProfileName}
                walletProfile={walletProfile}
              />
              {underHeaderComponent}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-4">
            <ProfileImage
              className="mb-6"
              imageUrl={
                walletProfile.loading ? '' : walletProfile.data.imageUrl
              }
              loading={walletProfile.loading}
              onEdit={canEdit ? showUpdateProfileNft : undefined}
              size="lg"
            />
            <ProfileNameDisplayAndEditor
              canEdit={canEdit}
              className="mb-5"
              compact={compact}
              updateProfileName={updateProfileName}
              walletProfile={walletProfile}
            />
            {established && (
              <div className="-mt-3 mb-5 font-mono caption-text">
                {t('info.establishedAbbr')} {formatDate(established)}
              </div>
            )}
            {underHeaderComponent}
          </div>
        )}
      </div>

      <div
        className={clsx(
          'flex flex-col items-stretch p-6 border-t border-t-border-primary',
          childContainerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface ProfileNameDisplayAndEditorProps
  extends Pick<
    ProfileCardWrapperProps,
    'compact' | 'walletProfile' | 'updateProfileName'
  > {
  canEdit: boolean
  className?: string
}

const ProfileNameDisplayAndEditor = ({
  compact,
  walletProfile,
  updateProfileName,
  canEdit,
  className,
}: ProfileNameDisplayAndEditorProps) => {
  const { t } = useTranslation()

  // If set, will show edit input.
  const [editingName, setEditingName] = useState<string | undefined>()
  const [savingName, setSavingName] = useState(false)

  const doUpdateName = useCallback(async () => {
    if (editingName === undefined || !canEdit) {
      return
    }

    setSavingName(true)
    try {
      // Empty names unset.
      await updateProfileName(editingName.trim() || null)
      // Stop editing on success.
      setEditingName(undefined)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setSavingName(false)
    }
  }, [canEdit, editingName, updateProfileName])

  const noNameSet = !walletProfile.loading && walletProfile.data.name === null

  return (
    <div className={className}>
      {canEdit && editingName !== undefined ? (
        <div
          className={clsx(
            'relative mb-2 h-5',
            compact ? '' : 'flex flex-col items-center mx-16'
          )}
        >
          <TextInput
            autoFocus
            className={clsx(
              'pb-1 border-b border-border-primary !title-text',
              !compact && 'text-center'
            )}
            ghost
            onInput={(event) =>
              setEditingName((event.target as HTMLInputElement).value)
            }
            onKeyDown={(event) =>
              event.key === 'Escape'
                ? setEditingName(undefined)
                : event.key === 'Enter'
                ? doUpdateName()
                : undefined
            }
            value={editingName}
          />

          <div className="flex absolute top-0 -right-12 bottom-0 flex-row gap-1 items-center">
            {savingName ? (
              <Loader fill={false} size={16} />
            ) : (
              <IconButton
                Icon={Check}
                onClick={doUpdateName}
                size="xs"
                variant="ghost"
              />
            )}

            <IconButton
              Icon={Close}
              onClick={() => setEditingName(undefined)}
              size="xs"
              variant="ghost"
            />
          </div>
        </div>
      ) : (
        <Button
          className="group relative"
          disabled={!canEdit}
          onClick={() =>
            !walletProfile.loading &&
            setEditingName(walletProfile.data.name ?? '')
          }
          variant="none"
        >
          <p
            className={clsx(
              'title-text',
              walletProfile.loading && 'animate-pulse',
              noNameSet
                ? 'italic font-normal text-text-secondary'
                : 'text-text-body'
            )}
          >
            {walletProfile.loading
              ? '...'
              : noNameSet
              ? canEdit
                ? t('button.setDisplayName')
                : t('info.noDisplayName')
              : walletProfile.data.name}
          </p>

          {canEdit && (
            <Edit
              className={clsx(
                'absolute -right-6 pl-2 !w-6 !h-4 text-icon-secondary',
                !noNameSet &&
                  'opacity-0 group-hover:opacity-100 transition-opacity'
              )}
            />
          )}
        </Button>
      )}
    </div>
  )
}
