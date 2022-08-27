const initalState = {
    answer: [],
    score: 0,
    historyExam: [],
    historyCount: 1,
    minutes: 0,
    seconds: 0
}
const quizReducers = (state = initalState, action) => {
    switch (action.type) {
        case 'ANSWER_RADIO':
            const isExistAnswer = state.answer.find(quest => quest.id === action.payload.id);
            return {
                ...state, answer: isExistAnswer ?
                    state.answer.map((question) => question.id === action.payload.id ? {
                        ...question, answerValue: action.payload.answerCorrect, answerOption: action.payload.answerOption
                    } : question) : [
                        ...state.answer, { ...isExistAnswer, id: action.payload.id, answerValue: action.payload.answerCorrect, answerOption: action.payload.answerOption }
                    ]
            }
        case 'GET_SCORE_TIMES':
            let newScore = 0;
            state.answer.map((question) => {
                if (question.answerValue) {
                    newScore += 1;
                }
                return newScore
            })
            return {
                ...state, score: newScore, minutes: action.payload.minutes, seconds: action.payload.seconds
            }
        case 'GET_ANSWER_ID':
            return {
                ...state, historyExam: [...state.historyExam, { examId: action.payload.examId, answerForExam: state.answer, examScore: state.score, historyId: state.historyCount, examMinutes: state.minutes, examSeconds: state.seconds }],
                answer: [], score: 0, historyCount: state.historyCount + 1
            }
        default: return state
    }
}
export default quizReducers