import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Input} from "antd";
import './SignUp.scss'
import {postRequest} from "./constants";
import {setAuthHeader} from "./Auth";

function SignUp() {
    let navigate = useNavigate();
    const [erMessage, setErMessage] = useState('')
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function signUp() {
        const fetchData = () => {
            setErMessage("");
            if (name.length === 0 || password.length === 0) {
                setErMessage("All input fields must be filled.")
            } else {
                postRequest(
                    '/sign_up',
                    {
                        "userName": name,
                        "password": password
                    },
                    false
                ).then(
                    response => {
                        try {
                            setAuthHeader(name, password)
                            response.json().then(res => {
                                console.log(res)
                                if (response.ok) {
                                    navigate(
                                        '/chats',
                                        {state: {name: res.userName, userId: res.id}}
                                    );
                                } else {
                                    // console.log(res.message);
                                    setErMessage(res.message);
                                }
                            })
                        } catch (error) {
                        }
                    })
            }

        };

        fetchData()
    }

    return (
        <div className="sign-up">
            <div className="sign-up__form">
                <div className="sign-up__form__header">
                    <h2>Sign Up</h2>
                    <p>
                        Create an account
                    </p>
                </div>
                <form>
                    <Input
                        name="input"
                        value={name}
                        type="text"
                        placeholder="name"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        name="password"
                        type="text"
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {erMessage.length > 0 && (
                        <div style={{color: "red", fontSize: "0.75rem"}}>{erMessage}</div>
                    )}
                    <Button
                        onClick={() => {
                            signUp();
                        }}
                    >
                        Sign up
                    </Button>
                    <div className="login-account">
                        Or, <Link to="/">Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default SignUp;