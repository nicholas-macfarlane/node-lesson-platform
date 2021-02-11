const PORT = process.env.HTTPS_PORT || 3000;
const express = require('express');
const router = express.Router();

router.get('*', (req,res) => {
if(req.oidc.isAuthenticated()) {
      res.redirect(`https://localhost:${PORT}/lessons`);
  } else {
      res.redirect(`https://localhost:${PORT}/login`);
  }
});

module.exports = router;

    