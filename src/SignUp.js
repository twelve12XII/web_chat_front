import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Input} from "antd";
import './SignUp.scss'
import {postRequest} from "./constants";
import {setAuthHeader} from "./Auth";

function SignUp() {
    let navigate = useNavigate();
    const [error, setError] = useState(false);
    const [erMessage, setErMessage] = useState(' Something went wrong')
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function signUp() {
        const fetchData = () => {
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
                            if(response.ok){
                                navigate(
                                    '/chats',
                                    {state: {name: res.userName, userId: res.id}}
                                );
                            }
                            else{
                                // console.log(res.message);
                                setErMessage(res.message);
                                setError(true);
                            }
                        }).catch(error => setError(true))
                    } catch (error) {
                    }
                })

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
                    <Button
                        onClick={() => {
                            signUp();
                        }}
                    >
                        Sign up
                    </Button>
                    {error && (
                        <p><span style={{ color: "red", fontSize: "0.75rem" }}>{erMessage}</span></p>
                    )}
                </form>
            </div>
        </div>
    );

}

export default SignUp;