const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const userService  = require('../services/userService.js');
const lessonService = require('../services/lessonService.js');
const { parseSequelizeResults, parseSequelizeResult, dropDomain } = require('../services/utility');

router.get('/', requiresAuth(), (req,res) => {
    loadIndex(req, res);
});

router.get('/:lessonId', requiresAuth(), (req, res) => {
    loadLesson(req, res);
})

module.exports = router;

async function loadIndex(req,res){
    const results = await lessonService.findAll();
    const lessonData = parseSequelizeResults(results);
    const username = await getUserName(req);
    res.render('index',{user:username,lessons:lessonData})
};

async function loadLesson(req, res) {
    const result = await lessonService.findById(req.params.lessonId);
    const lesson = parseSequelizeResult(result);
    const username = await getUserName(req);
    res.render('lesson',{user:username,lesson:lesson})
}

async function getUser(req){
    return await userService.findByEmail(req.oidc.user.email);
}

async function getUserName(req){
    const user = await getUser(req);
    return dropDomain(user.email);
}


