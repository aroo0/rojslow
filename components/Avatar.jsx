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
            width={32} 
            height={32}
            saturation="60" 
            lightness="70"
            className='avatar cursor-pointer' 
            />)
}


export default Avatar