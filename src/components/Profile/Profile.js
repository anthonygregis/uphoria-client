import React from "react"
import VideoGrid from "./VideoGrid"
import UserInfo from "./UserInfo"
import { Redirect } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import "../../styles/Profile.css"
import Loading from "../Loading/Loading"
import jwt_decode from "jwt-decode"
import { AUTH_TOKEN } from "../../auth/constant"
import Error from "../Error"
import Logout from "../Logout/Logout"

const Profile = (props) => {
  let userId = ""
  let queryUserInfo

  if (!props.user) return <Redirect to="/auth" />

  if (!props.location.userId) {
    let token = jwt_decode(localStorage.getItem(AUTH_TOKEN))
    userId = token._id
    queryUserInfo = gql`
      query User($id: ID!) {
        user(id: $id, privilegedSecret: "antiTikTok") {
          username
          id
          email
          birthday
          name
          profile {
            bio
            instagramUrl
            personalUrl
          }
          videos {
            id
            videoUrl
          }
        }
      }
    `
  } else {
    userId = props.location.userId
    queryUserInfo = gql`
      query User($id: ID!) {
        user(id: $id) {
          username
          profile {
            bio
            instagramUrl
            personalUrl
          }
          videos {
            id
            videoUrl
          }
        }
      }
    `
  }

  return (
    <div className="profile-display">
      <Query query={queryUserInfo} variables={{ id: userId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) {
            console.log(error.message)
            return <Error errorMessage={"Sorry, there's been an error."} />
          }
          return (
            <>
              <Logout handleLogout={props.handleLogout} />
              <UserInfo user={{ ...data.user }} />
              {console.log(data.user)}
              <VideoGrid user={data.user}/>
            </>
          )
        }}
      </Query>
    </div>
  )
}

export default Profile
