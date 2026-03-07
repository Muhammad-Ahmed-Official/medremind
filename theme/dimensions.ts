import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const spacing = {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25
} as const

export const fontSize = {
    xs: RFValue(10),
    sm: RFValue(12),
    md: RFValue(14),
    lg: RFValue(16),
    xl: RFValue(18),
    xxl: RFValue(22),
    xxxl: RFValue(32) 
} as const