import { useState } from "react";

function Login() 
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    const handleSubmit = async (event) => 
    {
    event.preventDefault();

    try 
    {
        const response = await fetch("http://localhost:9000/login", 
        {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();
        setMessage(data.message);
        if (response.ok) 
        {
            setUser(data.user);
        }
        else 
        {
            setUser(null);
        }
    } 
    catch (error) 
    {
        setMessage("Not connected to the server.");
    }
};

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
            {user && (
                <div>
                    <p>First Name: {user.f_name}</p>
                    <p>Last Name: {user.l_name}</p>
                    <p>Username: {user.username}</p>
                </div>
            )}

        </div>
    );
}

export default Login;