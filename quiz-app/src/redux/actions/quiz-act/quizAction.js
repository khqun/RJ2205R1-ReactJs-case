export const quizRadio = (questionId, answerCorrect, answerOption) => {
    return {
        type: 'ANSWER_RADIO',
        payload: {
            id: questionId,
            answerCorrect: answerCorrect,
            answerOption: answerOption
        }
    }
}
export const getScore = (minute,second) => {
    return {
        type: 'GET_SCORE_TIMES',
        payload:{
            minutes: minute,
            seconds: second
        }
    }
}
export const getAnswerId = (examId) => {
    return {
        type: 'GET_ANSWER_ID',
        payload: {
            examId: examId
        }
    }
}