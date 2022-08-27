import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateError from "./errorComp";
import CreateInput from "./inputComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { loginAccount, loginSuccess } from "../../redux/actions/login-act/logActions";
export default function Login() {
    const emailIcon = <FontAwesomeIcon icon={faEnvelope} />
    const passwordIcon = <FontAwesomeIcon icon={faKey} />
    const selector = useSelector(state => state.register)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState({});
    const [loginUser, setLoginUser] = useState({});
    const [isWrong, setIsWrong] = useState(false);
    const message_error = {
        email: "Incorrect email",
        password: "Password must has atleast 6 characters",
    }
    const regex = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^.{6,}$/
    }
    const conditon = loginError.email || loginError.password || !loginUser.email || !loginUser.password
    const handleChange = (e) => {
        let error = "";
        error = regex[e.target.name].test(e.target.value) ? "" : message_error[e.target.name];
        setLoginUser({
            ...loginUser, [e.target.name]: e.target.value
        })
        setLoginError({
            ...loginError, [e.target.name]: error
        })
    }
    const handleSubmit = () => {
        if (loginUser.email === 'hzathzat@gmail.com' && loginUser.password === '123456') {
            dispatch(loginSuccess(true));
            console.log(selector);
        }
        else {
            setIsWrong(true);
        }
    }
    useEffect(() => {
        if (selector.successLogin) {
            dispatch(loginAccount(loginUser));
            navigate('/menu');
        }
    }, [dispatch, loginUser, navigate, selector.successLogin])
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="form-box">
                        <div className="header">
                            <h1 className="caption mt-5 col-7">Login</h1>
                            <h4 className="brand col-5" >Quizzix</h4>
                            <p className="bellow-caption">Please fill the form</p>
                        </div>
                        <div>
                            <div className="input-container col-sm-8 col-md-6 col-xl-4">
                                <p className="label-form">{emailIcon} Email</p>
                                <CreateInput
                                    inpName='email'
                                    inpValue={loginUser.email || ''}
                                    inpChange={handleChange}
                                    inpError={loginError.email || ''}
                                />
                                <CreateError
                                    user={loginUser.email}
                                    error={loginError.email || ''}
                                />
                            </div>
                            <div className="input-container col-sm-8 col-md-6 col-xl-4">
                                <p className="label-form"> {passwordIcon} Password</p>
                                <CreateInput
                                    inpName='password'
                                    inpValue={loginUser.password || ''}
                                    inpChange={handleChange}
                                    inpError={loginError.password || ''}
                                    inpType='password'
                                />
                                <CreateError
                                    user={loginUser.password}
                                    error={loginError.password || ''}
                                />
                            </div>
                            <div>
                                <button type='submit' onClick={() => handleSubmit()} className={`btn btn-outline-primary`} disabled={conditon ? true : false}>{conditon? 'Locked': 'Login'}</button>
                            </div>
                            {isWrong ?
                                <div className="alert alert-danger mt-2">
                                    <p>Incorrect login information</p>
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}