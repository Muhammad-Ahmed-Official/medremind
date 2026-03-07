import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import BackButton from './BackButton';
import { hp } from '@/helpers/common';
import { theme } from '@/constants/theme';

const Header = ({ title, showBackButton = true, mb=10 }:any) => {
    const router = useRouter();

  return (
    <View className='flex-row justify-center items-center mt-1 gap-2' style={{ marginBlock: mb, }}>
        { 
            showBackButton && ( <View style={{  }} className='absolute left-0 '> <BackButton router={router}  /> </View> )
        }
        <Text className='font-semibold' style={{fontSize: hp(2.7), color: theme.colors.textDark }}>{title}</Text>
    </View>
  )
}

export default Header