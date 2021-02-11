const db = require('../config/db.js');
const Lesson = db.lessons;

exports.create = async function(lesson) {
    const lessonId = Lesson.create({
        name: lesson.name,
        description: lesson.description
    });
    return lessonId;
};

exports.findAll = async function() {
    const lessons = await Lesson.findAll();
    return lessons;
};

exports.findById = async function(lessonId) {
    const lesson = await Lesson.findByPk(lessonId);
    return lesson;
};