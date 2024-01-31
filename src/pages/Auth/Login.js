import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        const data = {
            "username": username,
            "password": password,
        }

        const response = await axios.post("http://localhost:8081/auth/login",data);
        
        if(response.status === 200) {

            localStorage.setItem("token",response.data);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

            navigate("/");

        } else {
            console.log("Login error");
        }
    }

    return (
        <div className="login-box">
            <div className="text-center mb-5">
                <h1>User Login</h1>
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required />
                </div>

                <div className="form-group mb-3">
                    <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;