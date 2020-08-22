import React from "react"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton" 

const Loader2 = () => (
  <SkeletonTheme>

    <Skeleton className="mb-1" count={3} height={25} />

</SkeletonTheme>
)

export default Loader2