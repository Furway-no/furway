import type { ProfileGridBlock as ProfileGridBlockProps } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

export const ProfileGridBlock: React.FC<ProfileGridBlockProps> = ({ heading, items }) => {
  const getUsernameFromUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname === 't.me' && urlObj.pathname) {
        return urlObj.pathname.replace('/', '')
      }
      return null
    } catch {
      return null
    }
  }

  return (
    <div className="container">
      {heading && <h2 className="text-3xl font-semibold mb-8">{heading}</h2>}
      {(items || []).map((item, idx) => {
        return (
          <div
            key={idx}
            className="bg-card border border-border rounded p-4 mb-8 flex flex-col gap-4"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-sm">{item.description}</p>
              </div>
              <div>
                <span className="font-semibold">Slots Filled: </span>
                <span>{item.slotsFilled}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
              {(item.volunteers || []).map((vol, volIdx) => {
                const imageSrc =
                  typeof vol.profilePicture === 'object' ? vol.profilePicture?.url : ''
                return (
                  <div
                    key={volIdx}
                    className="bg-surface border border-border rounded p-4 flex flex-col items-center"
                  >
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={vol.name || ''}
                        width={250}
                        height={250}
                        className="rounded-full object-cover mb-2"
                      />
                    )}
                    <h5 className="font-semibold text-2xl">{vol.name}</h5>
                    <p className="text-base font-extrabold italic">{vol.role}</p>
                    {vol.bio && <p className="text-sm mt-1 text-center">{vol.bio}</p>}
                    {vol.url && (
                      <a
                        href={vol.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-sm underline hover:no-underline"
                      >
                        @{getUsernameFromUrl(vol.url) || 'Contact'}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
