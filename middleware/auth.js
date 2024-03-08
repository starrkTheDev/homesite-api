const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log('Auth Header:', authHeader);
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  // console.log('Token:', token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecret');
    // console.log('Decoded Token:', decodedToken);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
  console.log('Authenticated');
};