import React, {useState} from 'react'
import './Login.scss'
import {Button, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {setAuthHeader} from "./Auth";
import {postRequest} from "./constants";

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState({userName: 'TEST2'})
    const [userId, setUserId] = useState({userId: -2})
    const handleSetName = (event) => {
        setUserName(event);
    };
    const handleSetId = (event) => {
        setUserId(event);
    };
    function getMessage()
    {
        const fetchData = () => {
            setAuthHeader(name, password);
            postRequest('/user_data').then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            navigate(
                                '/chats',
                                { state: { name: res.userName, userId:res.id } }
                            );
                        })
                    } else {
                        console.log("exception" + response.status);
                    }
                })

        };
        fetchData();
    }
    let navigate = useNavigate();
    return (
        <div className="sign-in">
            <div className="sign-in__form">
                <div className="sign-in__form__header">
                    <h2>Welcome!</h2>
                    <p>Enter your name!</p>
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
                            getMessage();
                        }}
                    >
                        Sign in
                    </Button>
                    <div className="create-account">
                        Or, <Link to="/registration">Create a new account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;