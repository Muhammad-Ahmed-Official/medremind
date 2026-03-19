import { Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg='white'>
        <StatusBar style='dark' />
        <View style={{ padding: wp(4)}} className='flex-1 items-center justify-center gap-4 bg-white'>
            <Image style={{ height: hp(30), width: wp(100)}} className='self-center' resizeMode='contain' source={require('../assets/images/logo.png')} />
            <View className='gap-4'>
                <Text style={{ color: theme.colors.text, fontSize: hp(4) }} className='text-center font-extrabold'>MedRemid</Text>
                <Text style={{ paddingHorizontal: wp(10), fontSize: hp(1.9), color: theme.colors.text  }} className='text-center'>Your trusted companion for medication reminders and health management</Text>
            </View>

            <View className='gap-5 w-full'>
                <Button title='Getting Started' buttonStyle={{ marginHorizontal: wp(3)}} onPress={() => {router.push("/(auth)/sign-up")}}  />
                <View className='flex-row justify-center items-center gap-1'>
                    <Text className='text-center' style={{ color: theme.colors.text, fontSize: hp(1.9)}}> Already have an account! </Text>
                    <Pressable onPress={() => {router.push("/(auth)/sign-in")}}>
                        <Text className='text-center font-semibold' style={{ color: theme.colors.primaryDark, fontSize: hp(1.9)}}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default Welcome