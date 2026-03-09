import { Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'

const BackButton = () => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} className='self-start p-1.5 rounded '> 
        <Ionicons name="chevron-back-circle-sharp" size={30} color={theme.colors.text} />
    </Pressable>
  )
}

export default BackButton