import logo from './logo.svg';
import './App.css';
import Header from "./components/nav/Header"
import { Switch, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete'
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import {useEffect} from 'react'
import {ToastContainer} from 'react-toastify'
import ForgotPassword from './pages/auth/ForgotPassword'
const App =() => {
  const dispath = useDispatch()

  useEffect(() => {
   const unsubcribe = auth.onAuthStateChanged(async (user) => {
     if(user) {
       const idTokenResult = await user.getIdTokenResult()
       console.log("user" , user);
       dispath({
         type: "LOGGED_IN_USER",
         payload: {
           email: user.email,
           token: idTokenResult.token
         }
       })
     }
   })
   return () => unsubcribe();
  }, [])
  return (
    <>
      <Header/>
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete}/>
        <Route exact path="/forgot/password" component={ForgotPassword}/>
        </Switch>
    </>
  );
}

export default App;
