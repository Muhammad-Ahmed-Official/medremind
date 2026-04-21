import { Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '@/constants/theme'
import { StatusBar } from 'expo-status-bar'
import BackButton from '@/components/BackButton'
import { hp, wp } from '@/helpers/common'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { router } from 'expo-router'
import { useAuth } from '../hooks/useAuth'
import Toast from 'react-native-toast-message'

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field:string, value:string) => {
    setForm(prev => ({
      ...prev, 
      [field]: value,
    }));
  };

  const onSubmit = async() => {
    if(!form.email || !form.password){
      Toast.show({ type: 'error', text1: 'Login', text2: 'Please fill all fields'});
      return;
    };
      
    const result: any = await login(form);

    if (result?.meta?.requestStatus === "fulfilled") {
      Toast.show({ type: 'success', text1: 'Login', text2: 'Login successful' });
      setForm({
        email: "",
        password: ""
      });
      router.replace("/(main)/home");
    } else {
      Toast.show({ type: 'error', text1: 'Login', text2: result && result.payload });
    }
  }

  return (
    <ScreenWrapper className='bg-white'>
      <StatusBar style='dark' />
      <View className='flex-1 gap-11' style={{ paddingHorizontal: wp(5)}}> 
          <BackButton /> 
          <View>
            <Text style={{ fontSize: hp(4), color: theme.colors.text }} className='font-bold'>Hey,</Text>
            <Text style={{ fontSize: hp(4), color: theme.colors.text }} className='font-bold'>Welcome Back</Text>
          </View>
          <View className='gap-5'>
            <Text className='font-semibold' style={{ fontSize: hp(1.7), color: theme.colors.text }}>Please login to continue</Text>
            <Input 
              icon={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
              placeholder='Enter your email'
              type='email'
              value={form.email}
              onChangeText={(value:string) => handleChange("email", value)} 
              />
              <Input 
                icon={<MaterialCommunityIcons name="lock-outline" size={24} color="black" />}
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(value:string )=> handleChange("password", value)} 
                secureTextEntry={!showPassword}
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#555" />
                  </Pressable>
                }
              />
            <Pressable onPress={() => router.push('/(auth)/forgot-pass')}>
              <Text className='text-right font-semibold' style={{ color: theme.colors.text}}>Forgot Password?</Text>
            </Pressable>
            <Button title={'Login'} loading={loading} onPress={onSubmit} />
        </View>
        <View className='flex-row justify-center gap-1 items-center'>
          <Text className='text-center' style={{ color: theme.colors.text, fontSize: hp(1.6)}}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/(auth)/sign-up")}>
            <Text className='text-center font-semibold' style={{ color: theme.colors.primaryDark, fontSize: hp(1.6)}}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default SigninForm