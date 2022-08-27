import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { quizRadio, getScore } from "../../redux/actions/quiz-act/quizAction";
export default function DoQuiz() {
    const [questionData, setQuestionData] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [expired, setExpired] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [done, setDone] = useState(false);
    const loading = <div className="divLoader loading">
        <svg className="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
            <path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
        </svg>
    </div>
    const selector = useSelector(state => state.quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams('');
    const handleChange = (id, correcAns, ansOpt) => {
        dispatch(quizRadio(id, correcAns, ansOpt));
    }
    const handleSubmit = () => {
        dispatch(getScore(minutes || 0, seconds || 0));
        navigate(`/score/${params.quizId}`);
    }
    useEffect(() => {
        if (selector.answer && questionList) {
            if (selector.answer.length === questionList.length && selector.answer.length !== 0) {
                setDone(true);
            }
        }
        if (expired) {
            dispatch(getScore());
            navigate(`/score/${params.quizId}`);
        }
        if (!minutes) {
            setMinutes(questionData.time)
        }
        axios.get(`http://localhost:9001/api/quiz-list/${params.quizId}`)
            .then((res) => {
                setQuestionData(res.data)
            })
            .then(() => {
                setQuestionList(questionData.quiz);
            })
            .catch((err) => {
                throw err
            })
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                    setExpired(true);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [selector.answer, minutes, seconds, questionData.time])
    const renderQuiz = () => {
        return (
            questionList.map((question, index) => {
                return (
                    <div key={question.id} className={`question-box m-3 `}>
                        <p ><b className="order-box">{index + 1}</b> {question.title}</p>
                        <hr />
                        {question.answerOptions.map((answerOption, index) => {
                            return (
                                <div key={index + 1}>
                                    <input required type="radio" name={`question-${question.id}`} value={answerOption.isCorrect} onChange={() => handleChange(question.id, answerOption.isCorrect, answerOption.answerOption)} />
                                    <label className="answer-text"> {answerOption.answerText}</label>
                                </div>
                            )
                        })}
                    </div>
                )
            })
        )
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg nav-bg">
                <div className="container-fluid ">
                    <h4 className="navbar-brand" >Quizzix</h4>
                    <div className="sticky">
                        {minutes === 0 && seconds === 0
                            ? null
                            : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                        }
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <h1 className="text-center"> Đề thi số {params.quizId}</h1>
            <div className="container">
                <form>
                    <div className="m-3">
                        {questionList ? renderQuiz() : null}
                        {minutes ? null : <div>
                            {loading}
                        </div>}
                        <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary" disabled={done ? false : true}>{done ? "Submit" : "Locked until you answer all question"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

