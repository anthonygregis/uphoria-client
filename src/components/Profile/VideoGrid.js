import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import {Link} from 'react-router-dom'
import UserVideos from './UserVideos'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "5vh",
    border: "1px solid #736f72",
  },
  row: {
    // flexDirection: "column",
  },
  item: {
    paddingBottom: "0px",
    border: "1px solid #736f72",
  },
  video: {
    paddingTop: "5px",
    paddingBottom: "0px",
    height: "208px",
    textAlign: "center",
    width: "100%",
    position: "relative",
  },
}))

const VideoGrid = (props) => {
  console.log(props.user)
  const classes = useStyles()
  let videos = []
  let newVideos = []

  const FormRow = () => {
    while (videos < props.user.videos.length) {
      props.user.videos.forEach((video) => {
        videos.push(video)
      })
    }
    let i
    for (i = 0; i < videos.length; i++) {
      newVideos.push(
          <Grid key={videos[i].id} className={classes.item} item xs={4} p={0} m={0}>
            <UserVideos video={videos[i]} className={classes.video} user={props.user} />
          </Grid>
      )
    }
    return newVideos
  }

  return (
    <div className={classes.root}>
      <Grid container item s={12} p={0} m={0}>
        <Grid container>
          <FormRow className={classes.row} />
        </Grid>
      </Grid>
    </div>
  )
}

export default VideoGrid
