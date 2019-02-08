import React from 'react'

const VideoLayout = ({
  videoSrc,
  button
}) => (
  <div className="chaos-main">
    <div className="main-thd-container">
      <div className="main-video-container">
        <video src={videoSrc} controls>
          Votre navigateur ne gère pas l'élément <code>video</code>.
        </video>
      </div>
      {button}
    </div>
  </div>
)

export default VideoLayout