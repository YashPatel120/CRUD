// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decodedToken.userId;
    next();
  });
}

module.exports = authenticate;
