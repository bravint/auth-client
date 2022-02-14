import { useState } from 'react';

import './App.css';

export default function App() {
    const formInitialState = {
        username: '',
        password: '',
    };

    const [form, setForm] = useState(formInitialState);
    const [currentUser, setCurrentUser] = useState(null);

    console.log(form);

    const fetchConfig = (reqBody) => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        };
    };

    const postLogin = async (form) => {
        const response = await fetch(`http://localhost:4000/register`, fetchConfig(form));
        const data = await response.json();
        setCurrentUser(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await postLogin(form);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [name]: value });
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="User Name" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            {currentUser && (
                <div>
                    <h3>Current User</h3>
                    <p>{currentUser.username}</p>
                </div>
            )}
        </div>
    );
}
