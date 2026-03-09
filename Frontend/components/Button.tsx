import { Pressable, Text, View, Platform } from 'react-native'
import React from 'react'
import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import Loading from './Loading';

interface ButtonProps {
    buttonStyle?: any, 
    textStyle?: any, 
    title: string, 
    onPress: () => void, 
    loading?: boolean, 
    hasShadow?: boolean
}

const Button = ({ buttonStyle, textStyle, title, onPress, loading = false, hasShadow = true }: ButtonProps) => {
    const isWeb = Platform.OS === 'web';
    const shadowStyle = hasShadow
        ? isWeb
            ? { boxShadow: '0px 10px 8px rgba(62, 62, 62, 0.2)' }
            : {
                shadowColor: theme.colors.dark,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
            }
        : {};

    if (loading) {
        return ( 
            <View className={`${buttonStyle} justify-center items-center rounded`} >
                <Loading  />
            </View>
        );
    }

    return (
        <Pressable
            onPress={onPress}
            disabled={loading}
            style={[{ backgroundColor: theme.colors.primary, height: hp(6.6), borderRadius: theme.radius.xl }, shadowStyle]}
            className={`${buttonStyle} justify-center items-center rounded`}
        >
            <Text style={[{ fontSize: hp(2.5) }, textStyle]} className='text-white font-bold'>{title}</Text>
        </Pressable>
    );
};

export default Button