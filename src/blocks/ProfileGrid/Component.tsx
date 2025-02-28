/* eslint-disable @next/next/no-img-element */
import type { ProfileGridBlock as ProfileGridBlockProps } from '@/payload-types'

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
    <div className="w-full min-h-screen flex flex-col">
      <div className="page flex flex-col flex-grow w-full max-w-screen-lg mx-auto py-5 px-4">
        <h2>TESTING</h2>
        {heading && (
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">{heading}</h2>
          </div>
        )}

        {items?.map((item, idx) => {
          return (
            <div key={idx} className="mb-6 p-4 rounded bg-gray-800 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-yellow-200">{item.title}</h4>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className="font-semibold text-yellow-100">Slots Filled: </span>
                  <span className="text-gray-100">{item.slotsFilled}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-items-stretch">
                {item.volunteers?.map((vol, volIdx) => {
                  const imageSrc =
                    typeof vol.profilePicture === 'object' ? vol.profilePicture?.url : ''
                  return (
                    <div
                      key={volIdx}
                      className="p-4 bg-gray-700 rounded flex flex-col items-center"
                    >
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt={vol.name || ''}
                          width={250}
                          height={250}
                          className="rounded-full object-cover mb-2"
                        />
                      )}
                      <h5 className="font-semibold text-2xl text-yellow-100">{vol.name}</h5>
                      <p className="text-base font-extrabold italic text-gray-300">{vol.role}</p>
                      {vol.bio && (
                        <p className="text-sm mt-1 text-center text-gray-200">{vol.bio}</p>
                      )}
                      {vol.url && (
                        <a
                          href={vol.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-sm underline text-blue-200 hover:text-blue-300"
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
    </div>
  )
}
