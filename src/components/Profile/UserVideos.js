import React, {useEffect,useState} from 'react';
import { Query } from "react-apollo"
import gql from "graphql-tag"
import {useQuery} from '@apollo/client'
import Loading from "../Loading/Loading"
import Error from "../Error"
import Video from '../Video'
import ShowVideo from './ShowVideo'
import {Link} from 'react-router-dom'
import "../../styles/Profile.css"

const UserVideos = (props) => {
  
  let location = {
    pathname: '/showvideo',
    video: props.video
  }

  return (
      <div>
          <Link to={location}>
            <video
            src={`https://res.cloudinary.com/agregis/video/upload/e_boomerang/eo_1/c_scale,g_south_west,l_logo_transparent_wvrps0,w_144/${props.video.videoUrl}.mp4`}
            autoPlay={true}
            loop={true}
            muted
            className={props.className}
            />
          </Link>
      </div>
  )
}

export default UserVideos