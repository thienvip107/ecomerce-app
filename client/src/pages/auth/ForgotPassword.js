import { auth } from "../../firebase"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        if (user && user.token) history.push("/")
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail("")
                setLoading(false)
                toast.success("Check your email for password reset link")
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.message)
                console.log("Error ms in forget password", error);
            })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading? (
                <h4 className="text-danger">Loading</h4>
            ): (
                <h4> Forgot password</h4>
            )}
            <form onSubmit={handleSubmit}>
                <input 
                type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email" autoFocus></input>
                <br/>
                <button className="btn btn-raoised" disabled={!email}>
                    Submit
                </button>
            </form>
        </div>
    )

}

export default ForgotPassword