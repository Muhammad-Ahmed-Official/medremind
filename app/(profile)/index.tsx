import { View, Text, TouchableOpacity, Alert, Platform, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useRouter } from 'expo-router'
import Header from '@/components/Header'
import { hp, wp } from '@/helpers/common'
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons'
import { theme } from '@/constants/theme'
import Avatar from '@/components/Avatar'
import { Image } from 'expo-image'

const index = () => {
  const router = useRouter();
  const onLogout = async() => {
  }

  const handleLogout = async () => {
     if(Platform.OS === "web"){
        window.alert("Please fill all fields");
      } else {
        Alert.alert('Confirm', "Are you sure you want to  log out?", [
          {
            text: "Cancel",
            onPress: () => console.log('model cancelled'),
            style: "cancel"
          },
          {
            text: "Logout",
            onPress: () => onLogout(),
            style: "destructive"
          }
        ])
      }
  }

  return (
    <ScreenWrapper bg='white'>
      <UserHeader user={""} router={router} handleLogout={handleLogout} />
    </ScreenWrapper>
  )
}

const UserHeader = ({ user, router, handleLogout}:any) => {

  return (
    <View className='flex-1 bg-white' style={{ paddingHorizontal: wp(4)}}>
      <View>
        <Header title="Profile" mb={30} />
        <TouchableOpacity className='absolute right-0 top-6 p-1 bg-[#fee2e2] rounded' onPress={handleLogout}>
          <AntDesign name="logout" size={22} color='red' style={{ transform: [{ rotate: '270deg' }] }} />
        </TouchableOpacity>
      </View>

      <View className='flex-1'>
        <View className='gap-4'>
          <View className='self-center' style={{height: hp(12), width: hp(12)}}>
            {/* <Avatar url="https://upload.wikimedia.org/wikipedia/commons/b/b3/Heilman_round.png" size={hp(5)} rounded={6.4} /> */}
            <Image source={'https://upload.wikimedia.org/wikipedia/commons/b/b3/Heilman_round.png'} style={{ borderColor: theme.colors.darkLight }} className='w-full h-full border rounded-full' />
            <Pressable onPress={() => router.push('editProfile')} className='absolute bottom-0 -right-1 p-2 rounded-full bg-white' style={Platform.OS === 'web' ? { boxShadow: '0 4px 5px rgba(0,0,0,0.15)', elevation: 7 } : { shadowColor: theme.colors.textLight, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 5, elevation: 7 }}>
              <SimpleLineIcons name="pencil" size={16} color="black" />
            </Pressable>
          </View>

          <View className='items-center gap-1'>
            <Text style={{ fontSize: hp(3), color: theme.colors.textDark }} className='font-semibold'>Ahmed</Text>
            <Text style={{ fontSize: hp(1.6), color: theme.colors.textLight }} className='items-center'>Pakistan</Text>
          </View>

          <View className='gap-2.5'>
            <View style={{ }} className='flex-row items-center gap-2.5'>
              <Feather name="mail" size={24} color="black" />
              <Text style={{ fontSize: hp(1.6), color: theme.colors.textLight }} className='items-center'>ahmed@gmail.com</Text>
            </View>
          </View>

        </View>
      </View>

    </View>
  )
}

export default index