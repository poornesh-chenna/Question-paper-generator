import jwt from 'jsonwebtoken'

export const signJwtToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    'secret',
    { expiresIn: '2 days' }
  )
}

export const verifyTokenAndGetUserId = (token) => {
  const payload = jwt.verify(token, 'secret')
  return payload.userId
}
