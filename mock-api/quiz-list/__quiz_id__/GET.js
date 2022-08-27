module.exports = function (request, response) {
    let quiz = require("../GET.json");

    let data = quiz.find(quiz => quiz.id == request.params.quiz_id);

    response.json({
        quiz : data.question,
        time: data.time
    });
};