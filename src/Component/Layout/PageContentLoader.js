import React from "react"
import ContentLoader from "react-content-loader" 

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={460}
    viewBox="0 0 1200 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="4" y="30" rx="0" ry="0" width="510" height="54" /> 
    <rect x="3" y="105" rx="0" ry="0" width="911" height="135" /> 
    <rect x="2" y="256" rx="0" ry="0" width="911" height="135" />
  </ContentLoader>
)

export default MyLoader