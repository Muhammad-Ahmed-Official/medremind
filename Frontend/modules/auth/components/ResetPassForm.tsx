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
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import Toast from "react-native-toast-message";

const ResetPassForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { changePassword, loading, error } = useAuth();
  const { email } = useLocalSearchParams();

  const emailValue = Array.isArray(email) ? email[0] : email;

  const [form, setForm] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async () => {
    if (!emailValue || !form.code || !form.newPassword || !form.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Change Password",
        text2: "Please fill all fields",
      });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      Toast.show({ type: "error", text1: "Password Mismatch", text2: "Passwords do not match" });
      return;
    }

    const result: any = await changePassword({
      email: emailValue,
      code: form.code,
      newPassword: form.newPassword,
    });

    if (result?.meta?.requestStatus === "fulfilled") {
      Toast.show({ type: "success", text1: "Password Changed", text2: "Password updated successfully" });

      setForm({
        code: "",
        newPassword: "",
        confirmPassword: "",
      });

      router.replace("/(auth)/sign-in");
    } else {
      Toast.show({
        type: "error",
        text1: "Change Password",
        text2: result?.payload,
      });
    }
  };
  return (
    <ScreenWrapper className="bg-white">
      <StatusBar style="dark" />

      <View className="flex-1 justify-center gap-10" style={{ paddingHorizontal: wp(6) }}>
        <BackButton />

        <View className="items-center">
          <MaterialCommunityIcons name="lock-reset" size={hp(8)} color={theme.colors.primary} />
        </View>

        <View className="gap-3">
          <Text style={{ fontSize: hp(4), color: theme.colors.text }} className="font-bold text-center" >
            Reset Password
          </Text>

          <Text className="text-gray-500 text-center" style={{ fontSize: hp(1.8) }} >
            Enter the verification code sent to your email and create a new password.
          </Text>
        </View>

        {/* Form */}
        <View className="gap-5">

            <Input
                icon={ <MaterialCommunityIcons name="shield-key-outline" size={22} color="black" /> }
                placeholder="Enter verification code"
                onChangeText={(value: string) => handleChange("code", value)}
            />

            <Input icon={ <MaterialCommunityIcons name="lock-outline" size={22} color="black" /> }
                placeholder="New password"
                secureTextEntry={!showPassword}
                rightIcon={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#555" />
                    </Pressable>
                }
                onChangeText={(value:string ) => handleChange("newPassword", value)}
            />

            <Input
                icon={ <MaterialCommunityIcons name="lock-check-outline" size={22} color="black" /> }
                placeholder="Confirm password"
                secureTextEntry={!showConfirmPassword}
                rightIcon={
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <MaterialCommunityIcons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#555" />
                    </Pressable>
            }
            onChangeText= { (value: string) => handleChange('confirmPassword', value)}
            />

          <Button title="Update Password" loading={loading} onPress={onSubmit} />
        </View>

      </View>
    </ScreenWrapper>
  );
};

export default ResetPassForm;