import React from "react"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton" 

const Loader = () => (
  <SkeletonTheme>
  <p>
    <Skeleton className="mb-3" count={5} height={50} />
  </p>
</SkeletonTheme>
)

export default Loader