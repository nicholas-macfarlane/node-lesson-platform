const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const userService  = require('../services/userService.js');
const { parseSequelizeResults, dropDomain } = require('../services/utility');



router.get('/', requiresAuth(), (req,res) => {
    loadLeaderBoard(req, res);
});

module.exports = router;

async function loadLeaderBoard(req,res){
    const username = await getUserName(req);
    const results = await userService.findAll();
    const leaderData = parseSequelizeResults(results);

    leaderData.sort((a,b) => b.lessons_completed.length - a.lessons_completed.length);
    const leaderBoard = leaderData.slice(0,10);
    res.render('leaderboard',{user:username,leaderBoard:leaderBoard})
};

async function getUser(req){
    return await userService.findByEmail(req.oidc.user.email);
}

async function getUserName(req){
    const user = await getUser(req);
    return dropDomain(user.email);
}
