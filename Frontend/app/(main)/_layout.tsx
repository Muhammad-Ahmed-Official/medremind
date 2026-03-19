import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const MainLayout = () => {
  const router = useRouter()
  const { user, isHydrated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace('/welcome')
    }
  }, [user, isHydrated])

  if (!isHydrated || !user) return null

  return (
    <Stack screenOptions={{ headerShown: false }} />
  )
}

export default MainLayout
