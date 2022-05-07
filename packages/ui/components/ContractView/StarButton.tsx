import { FC } from 'react'

import { StarIcon as StarOutline } from '@heroicons/react/outline'
import { StarIcon as StarSolid } from '@heroicons/react/solid'

import { useThemeContext } from '../../theme'

export interface StarButtonProps {
  pinned: boolean
  onPin: () => void
}

export const StarButton: FC<StarButtonProps> = ({ pinned, onPin }) => {
  const { accentColor } = useThemeContext()

  return (
    <button
      className="flex flex-row items-center w-20 text-left text-brand link-text"
      onClick={(_e) => onPin()}
      style={accentColor ? { color: accentColor } : {}}
    >
      {pinned ? (
        <StarSolid
          className="inline mr-1 w-[20px] text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
      ) : (
        <StarOutline className="inline mr-1 w-[20px]" />
      )}
      {pinned ? 'Starred' : 'Star'}
    </button>
  )
}