import React from 'react';

const ShowVideo = (props) => {
    let video = props.location.video
    console.log(props.location)
    return (
        <div>
            <video
                src={`https://res.cloudinary.com/agregis/video/upload/c_scale,g_south_west,l_logo_transparent_wvrps0,w_144/${video.videoUrl}.mp4`}
                autoPlay={true}
                loop={true}
                className="videoPlayer"
            />
        </div>
    )
}

export default ShowVideo