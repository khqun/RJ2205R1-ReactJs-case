import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function HistoryScore() {
    const params = useParams();
    const [rightAnswer, setRightAnswer] = useState([]);
    const [yourAnswer, setYourAnswer] = useState([]);
    const [score, setScore] = useState();
    const [time, setTime] = useState({});
    const [examTime, setExamTime] = useState();
    const selector = useSelector(state => state.quiz);
    useEffect(() => {
        axios.get(`http://localhost:9001/api/quiz-list/${Number(params.quizId)}`)
            .then((res) => {
                setRightAnswer(res.data.quiz);
                setExamTime(res.data.time)
            })
        const ansData = selector.historyExam.find((exam) => exam.historyId === Number(params.historyId));
        if (ansData) {
            if (ansData.answerForExam) {
                setYourAnswer(ansData.answerForExam);
            }
            if (ansData.examScore) {
                setScore(ansData.examScore)
            }
            if (ansData.examMinutes && ansData.examSeconds) {
                setTime({
                    minutes: ansData.examMinutes,
                    seconds: ansData.examSeconds
                })
            }
        }

    }, [params.quizId, params.historyId, selector.historyExam])
    const renderYourAnswer = () => {
        return (
            yourAnswer.map((answer, index) => {
                return (
                    <tr key={index + 1}>
                        <td className="history-text">
                            {answer.id}.<span className={`${answer.answerValue ? 'right-ans' : 'error-ans'}`}>{answer.answerOption}</span>
                        </td>
                    </tr>

                )
            })
        )
    }
    const renderCorrecAns = () => {
        return (
            rightAnswer.map((ans, index) => {
                return (
                    <tr key={index + 1}>
                        <td className="history-text">{ans.rightAnswer}</td>
                    </tr>
                )
            })
        )
    }
    const renderQuest = () => {
        return (
            rightAnswer.map((ans, index) => {
                return (
                    <tr key={index + 1}>
                        <td className="history-text">Question {ans.id}: {ans.title}</td>
                    </tr>
                )
            })
        )
    }
    const renderTime = () => {
        const minuteCheck = examTime - 1 - time.minutes;
        const secCheck = 60 - time.seconds;
        return (
            <div className="col-6">
                <h3>Your time: {(minuteCheck) < 10 ? `0${minuteCheck}` : (minuteCheck)}:{(secCheck) < 10 ? `0${secCheck}` : (secCheck)}</h3>
            </div>
        )
    }
    return (
        <div>
            <div className="col-md-6">
                <h4 className="brand col-6" >Quizzix</h4>
            </div>
            <div className="row ">
                <div className="col-6">
                    <h3>Your score: {score || 0} / {rightAnswer.length}</h3>
                </div>
                <div className="col-6">
                    {renderTime()}
                </div>
                <table className="table table-quest">
                    <thead>
                        <tr>
                            <th>Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderQuest()}
                    </tbody>
                </table>
                <table className="table table-quest">
                    <thead>
                        <tr>
                            <th>Your Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderYourAnswer()}
                    </tbody>
                </table>
                <table className="table table-quest">
                    <thead>
                        <tr>
                            <th>Correct Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCorrecAns()}
                    </tbody>
                </table>
            </div>

        </div>
    )
}