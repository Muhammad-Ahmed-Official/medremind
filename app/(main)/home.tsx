import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'

const home = () => {
    const router = useRouter();
    const onLogout = async() => {
    }

  return (
    <ScreenWrapper bg="white">
      <View className='flex-1'>
        <View className='flex-row items-center justify-between mb-2.5' style={{ marginHorizontal: wp(4) }}>
            <Text className='font-bold' style={{color: theme.colors.text, fontSize: hp(3.2) }}>MidRemind</Text>
            <View className='flex-row justify-center items-center gap-4'>
                <Pressable onPress={() => router.push("/(notification)")}>
                    <SimpleLineIcons name="heart" size={24} color={theme.colors.text} />
                </Pressable>
                {/* <Pressable onPress={() => router.push("/(profile)/index")}>
                    <FontAwesome name="plus-square-o" size={24} color={theme.colors.text} />
                </Pressable> */}
                <Pressable onPress={() => router.push("/(profile)")}>
                    <Avatar url="https://upload.wikimedia.org/wikipedia/commons/b/b3/Heilman_round.png" size={hp(4.3)} style={{ borderWidth: 2 }} />
                    {/* <FontAwesome name="user-o" size={24} color={theme.colors.text} /> */}
                </Pressable>
            </View>
        </View>
      </View>
      <Button title='logout' onPress={onLogout} />
    </ScreenWrapper>
  )
}

export default home