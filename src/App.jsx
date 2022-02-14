import { useState } from 'react';

import './App.css';

export default function App() {
    const formInitialState = {
        username: '',
        password: '',
    };

    const [form, setForm] = useState(formInitialState);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);

    console.log(`states`, {
        form,
        currentUser,
    });

    const fetchConfig = (reqBody) => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        };
    };

    const postLogin = async (form, endpoint) => {
        try{
            const response = await fetch(`http://localhost:4000/${endpoint}`, fetchConfig(form));

            return await response.json();
        } catch(error) {
            console.log(error)
        }

    };

    const handleSubmitRegister = async (event) => {
        event.preventDefault();

        const data = await postLogin(form, 'register');

        setCurrentUser(data);
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();

        const data = await postLogin(form, 'login');

        localStorage.setItem('userToken', data)

        setToken(data);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [name]: value });
    };

    const handleClickLogOut = () => {
        setCurrentUser(null);
    };

    return (
        <div className="App">
            {!currentUser && (
                <>
                    <h1>Register</h1>
                    <form id="register" onSubmit={handleSubmitRegister}>
                        <input type="text" name="username" placeholder="User Name" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <button type="submit">Login</button>
                    </form>
                    <br></br>
                    <h1>Login</h1>
                    <form id="login" onSubmit={handleSubmitLogin}>
                        <input type="text" name="username" placeholder="User Name" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <button type="submit">Login</button>
                    </form>
                </>
            )}
            {currentUser && (
                <>
                    <div>
                        <h3>Current User</h3>
                        <p>{currentUser.username}</p>
                    </div>
                    <button onClick={handleClickLogOut}>Log-out</button>
                </>
            )}
            {token && (
                <>
                    <div>
                        <h3>JWT</h3>
                        <p>{token}</p>
                    </div>
                    <button onClick={handleClickLogOut}>Log-out</button>
                </>
            )}
        </div>
    );
}
