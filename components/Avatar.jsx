import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'
import Image from 'next/image'

const Avatar = ({ id }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(id)),
    [id]
  )
  return (<Image 
            src={svgURI} 
            alt={'avatar'} 
            width={37} 
            height={37}
            saturation="60" 
            lightness="60"
            className='avatar cursor-pointer' 
            />)
}


export default Avatar