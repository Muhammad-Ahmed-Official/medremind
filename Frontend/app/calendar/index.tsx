import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { JSX, useState } from 'react'
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medications, setMedications] = useState([]);
  const [doseHistory, setDoseHistory] = useState([]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };
  
  const { days, firstDay } = getDaysInMonth(selectedDate);
  
  const renderCalendar = () => {
    const calendar: JSX.Element[] = [];
    let week: JSX.Element[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      week.push(<View key={`empty-${i}`} className='flex-1 justify-center items-center rounded-none aspect-square' />);
    }

      // Add days of the month
    for (let day = 1; day <= days; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const isToday = new Date().toDateString() === date.toDateString();
      const hasDoses = doseHistory.some(
        (dose) =>
          new Date(dose.timestamp).toDateString() === date.toDateString()
      );

      week.push(
        <TouchableOpacity
            key={day}
            className={`flex-1 justify-center items-center h-10 ${isToday && "text-[#1a8e2d] font-semibold" } 
            ${hasDoses && "relative"} `}
            onPress={() => setSelectedDate(date)}
          >
            <Text className={`text-[16px] text-[#333] ${isToday && "text-[#1a8e2d] font-semibold" }`} >
              {day}
            </Text>
            {hasDoses && <View className='w-1 h-1 rounded bg-[#1a8e2d] absolute bottom-1' />}
          </TouchableOpacity>
        );

        if ((firstDay + day) % 7 === 0 || day === days) {
            calendar.push(
              <View key={day} className='flex-row'>
                {week}
              </View>
            );
            week = [];
          }
        }

        return calendar;
  };

  const renderMedicationsForDate = () => {
    const dateStr = selectedDate.toDateString();
    const dayDoses = doseHistory.filter(
      (dose) => new Date(dose.timestamp).toDateString() === dateStr
    );

    return medications.map((medication) => {
      const taken = dayDoses.some(
        (dose) => dose.medicationId === medication.id && dose.taken
      );

      return (
        <View  className='flex-row items-center bg-white rounded-2xl p-3.5 mb-3 border border-[#e0e0e0]'
          style={Platform.OS === 'web' ? { boxShadow: '0 2px 8px rgba(0,0,0,0.15)' } : { shadowOpacity: 0.05, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }} 
        >
          <View
            className='w-3 h-10 rounded-md mr-3.5'
            // style={{ backgroundColor: medication.color }}
          />
          {/* <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>{medication.name}</Text>
            <Text style={styles.medicationDosage}>{medication.dosage}</Text>
            <Text style={styles.medicationTime}>{medication.times[0]}</Text>
          </View> */}
          {taken ? (
            <View className='flex-row items-center bg-[#E8F5E9] px-3 py-1.5 rounded-xl'>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text className='text-white font-semibold text-[14px]'>Taken</Text>
            </View>
          ) : (
            <TouchableOpacity
            className='text-white font-semibold text-[14px]'
              // style={{ backgroundColor: medication.color }}
              // onPress={async () => {
              //   await recordDose(medication.id, true, new Date().toISOString());
              //   loadData();
              // }}
            >
              <Text className='text-white font-semibold text-[14px]'>Take</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <LinearGradient colors={["#1a8e2d", "#146922"]} className="absolute top-0 left-0 right-0 h-[120px] ios:h-[140px]" start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
      <View className="flex-1 pt-[30px] ios:pt-[50px]">
        <View className="flex-row items-center px-5 pb-5 z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white justify-center items-center shadow-md"
          >
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white ml-4">Calendar</Text>
        </View>

        <View className="bg-white rounded-2xl mx-5 p-4 shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity
              onPress={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() - 1,
                    1
                  )
                )
              }
            >
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-800">
              {selectedDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() + 1,
                    1
                  )
                )
              }
            >
              <Ionicons name="chevron-forward" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View className="flex-row mb-2">
            {WEEKDAYS.map((day) => (
              <Text key={day} className="flex-1 text-center text-gray-500 font-medium">
                {day}
              </Text>
            ))}
          </View>

          {renderCalendar()}
        </View>

        <View className="flex-1 bg-white mt-4 rounded-t-3xl p-5 shadow-md">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            {selectedDate.toLocaleDateString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderMedicationsForDate()}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default Calendar