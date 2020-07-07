import React from "react"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton" 

const MyLoader = () => (
  <SkeletonTheme>
  <p>
    <Skeleton className="mb-3" count={5} height={50} />
  </p>
</SkeletonTheme>
)

export default MyLoader