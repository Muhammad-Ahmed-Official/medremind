import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, Platform, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Svg, { Circle } from "react-native-svg";
import { Link } from 'expo-router';
import { theme } from '@/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width } = Dimensions.get("window");
const QUICK_ACTIONS = [
  {
    icon: "add-circle-outline" as const,
    label: ["Add", "Medication"],
    route: "/medications" as const,
    color: "#2E7D32",
    gradient: ["#4CAF50", "#2E7D32"] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: ["Calendar", "View"],
    route: "/calendar" as const,
    color: "#1976D2",
    gradient: ["#2196F3", "#1976D2"] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: ["History","Log"],
    route: "/history" as const,
    color: "#C2185B",
    gradient: ["#E91E63", "#C2185B"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: ["Refill", "Tracker"],
    route: "/refills" as const,
    color: "#E64A19",
    gradient: ["#FF5722", "#E64A19"] as [string, string],
  },
]

const notifications = [
  {
    id: 1,
    title: "Paracetamol",
    message: "Take after meal",
    time: "10:00 AM"
  },
  {
    id: 2,
    title: "Vitamin D",
    message: "Daily dosage",
    time: "12:30 PM"
  },
  {
    id: 3,
    title: "Insulin",
    message: "Before lunch",
    time: "1:00 PM"
  }
];

interface CircularProgressProps {
  progress: number,
  totalDoses: number,
  completedDoses: number,
}

function CircularProgress({ progress, totalDoses, completedDoses }: CircularProgressProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = Math.max(size / 2 - strokeWidth / 2, 0);
  const circumference =  2 * Math.PI * radius;
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View className='items-center justify-center my-2.5 '>
      <View className='absolute z-[1] items-center justify-center'>
        <Text className='text-4xl text-white font-bold'>{Math.round((completedDoses / totalDoses) * 100)}%</Text>
        <Text className='text-[12px] text-white font-bold'>{completedDoses} of {totalDoses} doeses</Text>
      </View>
      <Svg width={size} height={size} className='-rotate-90' >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  )
} 

const home = () => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  return (
    <ScrollView className='flex-1 bg-[#f8f9fa]' showsVerticalScrollIndicator={false}>
      <LinearGradient className='py-6 rounded-bl-3xl rounded-br-3xl' colors={['#10b981', '#059669']}>
        <View className='items-center px-5'>
          <View className='flex-row items-center w-full mb-5'>
            <View className='flex-1'>
              <Text className='text-lg opacity-90 font-bold text-white'>Daily Progress</Text>
            </View>
            <TouchableOpacity onPress={() => setShowNotifications(!showNotifications)} className='relative p-2 bg-[rgba(255,255,255,0.15)] rounded-lg ml-2 '>
              <Ionicons name='notifications-outline' size={24} color='white' />
              {/* {todaysMedications.length > 0 && ( */}
                <View className='absolute -top-1 -right-1 bg-[#ff5252] rounded-lg h-5 px-1 justify-center items-center min-w-5'>
                  <Text className='text-[12px] text-white font-bold'>4</Text>
                </View>
              {/* )} */}
            </TouchableOpacity>
          </View>
          <CircularProgress progress={(5 / 10) * 100}  totalDoses={10} completedDoses={5} />
        </View>
      </LinearGradient>
      
      <View className='flex-1 pt-5'>
        <View className='px-5 mb-6 '>
          <Text className='text-xl font-bold text-[#1a1a1a] mb-1.5'>Quick Actions</Text>
          <View className='flex-row flex-wrap gap-2.5 mt-3'>
            {QUICK_ACTIONS.map((actions) => (
              <Link href={actions.route} key={actions.label[0]} asChild>
                <TouchableOpacity className='h-28 rounded-2xl overflow-hidden w-[48%]' style={{ width: (width -52) / 2 }}>
                  <LinearGradient className='flex-1 p-3.5' colors={actions.gradient}>
                      <View className='flex-1 justify-between'>
                       <Ionicons name={actions.icon} size={24} color='white' />
                      <Text className='text-[14px] text-white font-semibold mt-2'>{actions.label[0]}{"\n"}{actions.label[1]}</Text>
                    </View>
                  </LinearGradient> 
                </TouchableOpacity>
              </Link> 
            ))}
          </View>
        </View>
      </View>

      <View className='px-5'>
        <View className='flex-row justify-between items-center mb-2.5'>
          <Text className='text-xl font-bold text-[#1a1a1a] mb-1.5'>Today's Schedule</Text>

          <Link href={'/calendar'}>
            <TouchableOpacity>
              <Text className='text-[#2e7d32] font-semibold'>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {
          true ? (
            <View className='p-5 bg-white rounded-2xl mt-2.5 items-center'>
              <Ionicons name='medical-outline' size={48} color='#ccc' />
              <Text className='text-lg text-[#666] mt-2.5 mb-5 text-center'>No Medications Scheduled for today</Text>
              <Link href={'/medications'} asChild>
                <TouchableOpacity className='bg-[#1a8e2d] px-5 py-2.5 rounded-2xl'>
                  <Text className='text-white font-semibold'>Add Medication</Text>
                </TouchableOpacity>
              </Link>
            </View>
          ) : (
            [].map((medications, index) => {
              return (
                <View key={index}
                  style={
                    Platform.OS === 'web'
                      ? { boxShadow: "0 2px 8px rgba(0,0,0,0.05)", elevation: 3 }
                      : {
                          shadowOpacity: 0.05,
                          shadowColor: theme.colors.textLight,
                          shadowOffset: { width: 0, height: 2 },
                          shadowRadius: 8,
                          elevation: 3
                        }
                  }
                  className='flex-row items-center bg-white rounded-2xl p-4 mb-2.5'>

                  <View className='w-12 h-12 rounded-3xl items-center justify-center mr-3.5'
                    // style={{ backgroundColor: medications.color}}
                  >
                    <Ionicons name='medical' size={24} />
                  </View>

                  <View className='flex-1 justify-between'>
                    <View>
                      <Text className='text-lg font-semibold text-[#333] mb-1'>name</Text>
                      <Text className='text-[14px] text-[#666] mb-1'>dosage</Text>
                    </View>

                    <View className='flex-row items-center'>
                      <Ionicons name='time-outline' size={16} color='#ccc' />
                      <Text className='ml-1 text-[#666] text-[14px]'>time</Text>
                    </View>
                  </View>

                  {
                    true ? (
                      <View className='flex-row items-center bg-[#E8F5E9] px-3 py-1.5 rounded-xl ml-2.5'>
                        <Ionicons name='checkmark-outline' size={24} />
                        <Text className='text-[#4CAF50] font-semibold text-[14px] ml-1'>Taken</Text>
                      </View>
                    ) : (
                      <TouchableOpacity className='py-2 px-3.5 rounded-xl ml-2.5'
                      // style={{ backgroundColor: medication.color }}
                      >
                        <Text className='text-white font-semibold text-[14px]'>Take</Text>
                      </TouchableOpacity>
                    )
                  }
                </View>
              )
            })
          )
        }
      </View>

      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
      <View className="flex-1 bg-[rgba(0,0,0,0.5)] justify-end">
        <View className="bg-white rounded-t-[20px] p-5 max-h-[80%]">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-semibold text-[#333]">Notifications</Text>

            <TouchableOpacity onPress={() => setShowNotifications(!showNotifications)} className="p-1">
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {notifications.map((medication) => (
            <View key={medication.id} className="flex-row p-3.5 rounded-xl bg-[#f5f5f5] mb-2.5">
              <View className="w-10 h-10 rounded-3xl bg-[#E8F5E9] items-center justify-center mr-3.5">
                <Ionicons name="medical" size={24} color="#2e7d32" />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-[#333] mb-1">{medication.title}</Text>
                <Text className="text-[14px] text-[#333] mb-1">{medication.message}</Text>
                <Text className="text-[12px] text-[#999]">{medication.time}</Text>
              </View>
            </View>
            ))}
          </View>
          </View>
      </Modal>

    </ScrollView>
  )
}

export default home