import { Text, Button, View } from 'react-native'
import React from 'react'
import { useRouter, type Href } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper';
import Loading from '@/components/Loading';

const index = () => {
  const router = useRouter();
  return (
    <View className='flex-1 items-center justify-center'>
      <Loading />
    </View>
    // <ScreenWrapper>
    //   <Text className='text-black'>index</Text>
    //   <Button title='welcome' onPress={() => router.push("welcome" as Href)} />
    //   <Button title='welcome' onPress={() => router.push("/home" as Href)} />
    // </ScreenWrapper>
  )
}

export default index