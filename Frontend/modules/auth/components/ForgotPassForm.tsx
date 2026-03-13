import { Alert, Platform, Pressable, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import BackButton from "@/components/BackButton";
import { hp, wp } from "@/helpers/common";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { router, useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import Toast from "react-native-toast-message";

const ForgotPassForm = () => {
  const { forgotPassword, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSubmit = async() => {
    if(!email){
      Toast.show({ type: 'error', text1: 'Login', text2: 'Please fill all fields'});
      return;
    };
    
    const result: any = await forgotPassword({ email });

    if (result?.meta?.requestStatus === "fulfilled") {
      Toast.show({ type: 'success', text1: 'Forgot Password', text2: result && result.payload?.message });
      setEmail("");
      router.push({
        pathname: "/(auth)/reset-pass/[email]",
        params: { email },
      });
    } else {
      Toast.show({ type: 'error', text1: 'Login', text2: result && result.payload });
    }
  }

  return (
    <ScreenWrapper className="bg-white">
      <StatusBar style="dark" />

      <View className="flex-1 justify-center gap-10" style={{ paddingHorizontal: wp(6) }}>
        <BackButton />

        <View className="gap-3">
          <Text style={{ fontSize: hp(4), color: theme.colors.text }} className="font-bold" >
            Forgot Password
          </Text>

          <Text className="text-gray-500" style={{ fontSize: hp(1.8) }}>
            Enter your email address and we will send you a link to reset your password.
          </Text>
        </View>

        <View className="gap-6">
          <Input
            icon={ <MaterialCommunityIcons name="email-outline" size={24} color="black" /> }
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <Button title="Send Code" loading={loading} onPress={onSubmit} />
        </View>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500">Remember your password? </Text>

          <Pressable onPress={() => router.push("/(auth)/sign-in")}>
            <Text style={{ color: theme.colors.primary }} className="font-semibold"> Login </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassForm;