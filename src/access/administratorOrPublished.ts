import type { Access } from 'payload'

export const administratorOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin') return true
    if (user.role === 'developer') return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
