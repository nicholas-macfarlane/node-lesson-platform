const PORT = process.env.HTTPS_PORT || 3000;
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), (req, res) => {
    userService.create({email:req.oidc.user.email});
    res.redirect(`https://localhost:${PORT}/lessons`)
})

module.exports = router;

    