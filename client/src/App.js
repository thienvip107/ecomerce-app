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
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import ForgotPassword from './pages/auth/ForgotPassword'
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import Password from './pages/user/Password';
import History from './pages/user/History';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
const App = () => {
  const dispath = useDispatch()

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log("user", user);
        currentUser().then(res => {
          dispath({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }
          })
        })
      }
    })
    return () => unsubcribe();
  }, [])
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History}></UserRoute>
        <UserRoute exact path="/user/password" component={Password}/>
        <UserRoute exact path='/user/wishlist' component={Wishlist}/>
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard}/>
      </Switch>
    </>
  );
}

export default App;
