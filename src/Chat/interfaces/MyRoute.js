import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../../Login";
import Chats from "../Chats";
import SignUp from "../../SignUp"

// let name = 'TEST'
//
// export function GetName(Name){
//     name = Name
// }
export default function MyRoute(){
    // const [state, setState] = useState([
    //     {
    //         id: '',
    //         userName: ''
    //     }
    // ])
    // const handleSetState = (state) => {
    //     setState(state)
    // }
    //     useEffect(() => {
    //         fetch('http://25.62.253.8:12975/new_user', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json;charset=utf-8'
    //             },
    //             body: JSON.stringify({
    //                 "userName": name
    //             })
    //         }).then(
    //             response => {
    //                 if (response.ok) {
    //                     response.json().then(res => {
    //                         handleSetState(res)
    //                     })
    //                 } else {
    //                     console.log("exception" + response.status);
    //                 }
    //             })
    //     }, []);
    return(
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/chats" element={<Chats/>}/>
                    <Route path="/registration" element={<SignUp/>}/>
                    <Route path="*" element=
                        {
                            <div>
                                <h2>404. Page not found.</h2>
                            </div>
                        } />
                </Routes>
            </div>
        </Router>
    );
}