import { View, Text, ScrollView, Pressable, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '@/helpers/common'
import Header from '@/components/Header'
import { Image } from 'expo-image'
import { theme } from '@/constants/theme'
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons'
import Input from '@/components/Input'
import Button from '@/components/Button'

const editProfile = () => {
    const onPickImage = async() => {
    }

    const [user, setUser] = useState({
        name: "",
        image: null,
    })

    useEffect(() => {
    }, [])

    const [loading, setLoading] = useState(false);
    const onSubmit = () => {

    }

  return (
    <ScreenWrapper bg='white'>
        <View className='flex-1' style={{ paddingHorizontal: wp(4) }}>
            <ScrollView className='flex-1'>
                <Header title='Edit Profile' />
                <View className='gap-4 mt-5'>
                    <View style={{ height: hp(14), width: hp(14) }} className='self-center'>
                        <Image source={'https://upload.wikimedia.org/wikipedia/commons/b/b3/Heilman_round.png'} style={{ borderColor: theme.colors.darkLight }} className='w-full h-full border rounded-full' />
                        <Pressable onPress={onPickImage} style={Platform.OS === 'web' ? { boxShadow: '0 4px 5px rgba(0,0,0,0.15)', elevation: 7 } : { shadowOpacity: 0.4, shadowColor: theme.colors.textLight, shadowOffset: { width: 0, height: 4 }, shadowRadius: 5, elevation: 7 }} className='absolute bottom-0 -right-1.5 p-2 bg-white rounded-full'>
                            <SimpleLineIcons name="camera" size={16} color="black" />
                        </Pressable>
                    </View>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>Please fill your profile details</Text>
                    <Input icon={<FontAwesome name="user-o" size={24} color="black" />} placeholder='Enter your name' value={null} onChnage={(value:string) => setUser({...user, name: value})} />
                    <Input icon={<FontAwesome name="user-o" size={24} color="black" />} placeholder='Enter your address' value={null} onChnage={(value:string) => setUser({...user, name: value})} />
                    <Button title='Update' loading={loading} onPress={onSubmit}  />
                </View>
            </ScrollView>
        </View>
    </ScreenWrapper>
  )
}

export default editProfile