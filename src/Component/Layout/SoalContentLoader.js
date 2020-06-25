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
    <rect x="2" y="2" rx="0" ry="0" width="911" height="208" /> 
    <rect x="954" y="3" rx="0" ry="0" width="146" height="41" /> 
    <rect x="4" y="230" rx="0" ry="0" width="911" height="208" />
  </ContentLoader>
)

export default MyLoader