import logo from './logo.svg';
import './App.css';
import Header from "./components/nav/Header"
import { Switch, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete'
import { useDispatch } from 'react-redux';
import { auth } from 'firebase';
import {useEffect} from 'react'
const App =() => {
  const dispath = useDispatch()

  useEffect(() => {
   const unsubcribe = auth.onAuthStateChanges(async (user) => {
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
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete}/>
        </Switch>
    </>
  );
}

export default App;
