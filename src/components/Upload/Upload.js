import React, { useState } from "react"
import gql from "graphql-tag"
import {Redirect} from "react-router-dom"
import {Mutation} from "react-apollo"
import "../../styles/Upload.css"

const Upload = (props) => {
	const [description, setDescription] = useState("")
	const [file, setFile] = useState(null)
	const [uploaded, setUploaded] = useState(false)
	const userId = props.userId

	const uploadMutation = gql`
      mutation($description: String!, $file: Upload!, $userId: ID!) {
          createVideo(description: $description, file: $file, userId: $userId)
      }
	`

	const uploadData = { description, file, userId }

	const changeFile = ({
		target: {
			validity,
			files: [file],
		},
	}) => {
		if (validity.valid) setFile(file)
	}

	let handleSubmit = (e) => {
		e.preventDefault()
	}

	let confirm = async (result) => {
		if (result) {
			setUploaded(true)
		}
	}

	if (uploaded) return <Redirect to="/profile"/>

	return (
		<div className="upload-component">
			<h2>Upload your content here</h2>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<input type="text" name="description" value={description} onChange={(e) => {setDescription(e.target.value)}} />
				<input type="file" accept="video/mp4,video/x-m4v,video/*" name="uphoriaVideo" onChange={changeFile}/>
				<Mutation
					mutation={uploadMutation}
					variables={uploadData}
					onCompleted={result => confirm(result)}
				>
					{mutation => {
						const checkFile = () => {
							if (file) {
								mutation()
							}
						}
						return (
							<button type="submit" className="btn float-right" onClick={checkFile}>Submit</button>)
					}}
				</Mutation>
			</form>
		</div>
	)
}


export default Upload

