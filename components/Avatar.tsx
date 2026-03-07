import React from 'react'
import { hp } from '@/helpers/common'
import { Image } from 'expo-image'
import { theme } from '@/constants/theme'

const Avatar = ({ url, size=hp(4.5), style={}} : any) => {
  return (
   <Image source={url} transition={100} style={[{ height: size, width: size, borderColor: theme.colors.darkLight}, style, ]} className='font-bold border rounded' />
  )
}

export default Avatar