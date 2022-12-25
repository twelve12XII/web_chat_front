import React, {useState} from "react";
import Login from "./Login";
import {useNavigate} from "react-router-dom";
import {render} from "@testing-library/react";
import {Button, Input} from "antd";
import './SignUp.scss'
import {url} from "./constants";

function SignUp() {
    let navigate = useNavigate();
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    function signUp(){
        const fetchData = () => {
            fetch(url + '/sign_up',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Basic QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBOlBBU1NXT1JE'
                },
                body: JSON.stringify({
                    "userName": name,
                    "password": password
                })
            }).then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            console.log(res)
                            navigate(
                                '/chats',
                                { state: { name: res.userName, userId: res.id } }
                            );
                        }).catch(error => setError(true))
                    } else {
                        console.log("exception" + response.status);
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
                        {/*{error && (*/}
                        {/*    <span style={{ color: "red", fontSize: "0.75rem" }}>{error}</span>*/}
                        {/*)}*/}
                    </form>
                </div>
            </div>
        );

}
export default SignUp;