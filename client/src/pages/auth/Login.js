import { GoogleOutlined, MailOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { auth, googleAuthProvider } from "../../firebase"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
const Login = ({ history }) => {
    const [email, setEmail] = useState("thien09062000@gmail.com")
    const [password, setPassword] = useState("thien107")
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => ({...state}))
    useEffect(()=> {
        if(user&&user.token) history.push("/")
    }, [user])

    let dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)

            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setLoading(false)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                ></input>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"></input>
            </div>
            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
            >
                Login with Email/Password
            </Button>
        </form>
    )

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    }
                })
                history.push("/")
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)
            })
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                </div>
                <Button
                onClick={googleLogin}
                type="danger"
                className="mb-3"
                block
                shape="round"
                icon={<GoogleOutlined/>}
                size="large"
                >
                    Login with Google
                </Button>
                <Link to="/forgot/password" className="float-right text-danger"> Forgot Password</Link>
            </div>
        </div>
    )
}

export default Login