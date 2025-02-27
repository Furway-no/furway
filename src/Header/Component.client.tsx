'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const mediaObject: Media | undefined =
    typeof data.media === 'object' && data.media !== null ? data.media : undefined

  const hasContent = Boolean(mediaObject || data.title)

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        {hasContent ? (
          <div className="flex items-center gap-4">
            <Logo media={mediaObject!} maxHeight={data.maxHeight || 64} />
            {data.title && <h1 className="text-xl font-bold">{data.title}</h1>}
          </div>
        ) : (
          <div className="w-[193px] h-[34px]" /> // Empty block for alignment
        )}
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
