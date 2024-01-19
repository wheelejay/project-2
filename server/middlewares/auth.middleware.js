// Custom route middleware function that checks if the user is logged in.
import

function loginRequired(req, res, next) {
    if (!req.session.userId) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      next();
    }
  }

  export default loginRequired;