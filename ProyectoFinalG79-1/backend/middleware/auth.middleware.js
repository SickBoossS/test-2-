import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
     console.log('Token recibido:', token)  // << Debug para las pruebas.
    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    console.error('ERROR_JWT =>', error)

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' })
    }
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

