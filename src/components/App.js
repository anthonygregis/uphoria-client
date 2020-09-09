import React, {useState, useEffect} from "react"
import {
	Switch,
  Route,
  Redirect
} from "react-router-dom"
import "../styles/App.css"
import BottomNav from "./BottomNav"
import jwt_decode from "jwt-decode"
import {AUTH_TOKEN} from "../auth/constant"
import Video from "./Video"
import Profile from "./Profile/Profile"
import Auth from "./Auth/Auth"
import Upload from "./Upload/Upload"
import Loading from "./Loading/Loading"
import Error from "./Error/Error"
import NotFound from "./Error/NotFound"

const App = () => {
	let [currentUser, setCurrentUser] = useState("")

	useEffect(() => {
		let token
		if (!localStorage.getItem(AUTH_TOKEN)) {
			//Do something later
		} else {
			token = jwt_decode(localStorage.getItem(AUTH_TOKEN))
			console.log("DECODING PROCESS:", token)
			setCurrentUser(token)
		}
	}, [])

	const nowCurrentUser = (userData) => {
		console.log("New Current User Set:", userData)
		setCurrentUser(userData)
	}

	const handleLogout = () => {
		if (localStorage.getItem(AUTH_TOKEN)) {
			localStorage.removeItem(AUTH_TOKEN)
			setCurrentUser(null)
    }
    return <Redirect to="/auth"/>
	}


	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Video}/>
				<Route exact path="/auth" render={(props) => <Auth {...props} nowCurrentUser={nowCurrentUser}
				                                            user={currentUser}/>}/>
				<Route exact path="/profile" render={(props) => <Profile {...props} user={currentUser}  handleLogout={handleLogout} />}/>
				<Route exact path="/create" render={() => <Upload userId={currentUser._id}/> } />
				<Route path="*" component={NotFound} />
				<Route path="/error" component={Error} />
			</Switch>
			<BottomNav/>
		</div>
	)
}

export default App
