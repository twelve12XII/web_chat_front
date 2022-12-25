import React, {useState} from 'react'
import './Login.scss'
import {Button} from "antd";
import MyRoute from "./Chat/interfaces/MyRoute";
import {Link, Route, useNavigate} from "react-router-dom";

function Login() {
    const [name, setName] = useState('');
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
            fetch('http://olegbigdick:12975/new_user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                // mode: 'no-cors',
                // body: JSON.stringify({
                //     "userName": name
                // })
            }).then(
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
                    <input
                        name="input"
                        value={name}
                        type="text"
                        onChange={(event) => setName(event.target.value)}/>
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
        // <div className="user-name-form">
        //     <div className="sign-in-form-header">
        //     <div className="label-user-name">
        //         <label>Username</label>
        //     </div>
        //     <div className="input-user-name">
        //         <input name="input" value={name} type="text" onChange={(event) => setName(event.target.value)}/>
        //     </div>
        //     <div className="button-user-name">
        //         <button onClick={() => {
        //             getMessage();
        //             window.location.assign('http://localhost:3000/chats/')
        //         }
        //         }>OK</button>
        //     </div>
        //     </div>
        // </div>
    );
}
export default Login;