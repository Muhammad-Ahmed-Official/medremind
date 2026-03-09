import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const History = () => {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "taken" | "missed">("all");

return (
  <View className="flex-1 bg-gray-100">
    {/* Header Gradient */}
    <LinearGradient
      colors={["#1a8e2d", "#146922"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="absolute top-0 left-0 right-0 h-[120px] ios:h-[140px]"
    />

    <View className="flex-1 pt-[30px] ios:pt-[50px]">
      {/* Header */}
      <View className="flex-row items-center px-5 pb-5 z-10">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center shadow-md ios:shadow-md" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
        </TouchableOpacity>
        <Text className="text-2xl font-extrabold text-white ml-4">History Log</Text>
      </View>

      {/* Filters */}
      <View className="px-5 pt-2 mb-5 bg-gray-100">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pr-5">
          <TouchableOpacity
            className={`px-5 py-2 rounded-full mr-2 border ${selectedFilter === "all" ? "bg-green-800 border-green-800" : "bg-white border-gray-300"}`}
            onPress={() => setSelectedFilter("all")}
          >
            <Text className={`text-sm font-semibold ${selectedFilter === "all" ? "text-white" : "text-gray-600"}`}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-5 py-2 rounded-full mr-2 border ${selectedFilter === "taken" ? "bg-green-800 border-green-800" : "bg-white border-gray-300"}`}
            onPress={() => setSelectedFilter("taken")}
          >
            <Text className={`text-sm font-semibold ${selectedFilter === "taken" ? "text-white" : "text-gray-600"}`}>Taken</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-5 py-2 rounded-full mr-2 border ${selectedFilter === "missed" ? "bg-green-800 border-green-800" : "bg-white border-gray-300"}`}
            onPress={() => setSelectedFilter("missed")}
          >
            <Text className={`text-sm font-semibold ${selectedFilter === "missed" ? "text-white" : "text-gray-600"}`}>Missed</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* History List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        {[].map(([date, doses]: any) => (
          <View key={date} className="mb-6">
            <Text className="text-gray-600 font-semibold mb-3 text-base">
              {new Date(date).toLocaleDateString("default", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>

            {doses.map((dose: any) => (
              <View key={dose.id} className="flex-row items-center bg-white rounded-xl p-4 mb-3 border border-gray-300 shadow-md">
                {/* Medication color bar */}
                <View className="w-3 h-10 rounded-lg mr-4" style={{ backgroundColor: dose.medication?.color || "#ccc" }} />

                {/* Medication Info */}
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold text-base mb-1">
                    {dose.medication?.name || "Unknown Medication"}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-1">
                    {dose.medication?.dosage}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {new Date(dose.timestamp).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                </View>

                {/* Status Badge */}
                <View className="flex-row items-center">
                  {dose.taken ? (
                    <View className="flex-row items-center px-3 py-1 rounded-full bg-green-100">
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                      <Text className="text-green-600 font-semibold ml-1 text-sm">Taken</Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center px-3 py-1 rounded-full bg-red-100">
                      <Ionicons name="close-circle" size={16} color="#F44336" />
                      <Text className="text-red-600 font-semibold ml-1 text-sm">Missed</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Clear All Data */}
        <View className="items-center mt-5 mb-10">
          <TouchableOpacity className="flex-row items-center bg-red-100 px-5 py-3 rounded-lg border border-red-200">
            <Ionicons name="trash-outline" size={20} color="#FF5252" />
            <Text className="text-red-500 font-semibold ml-2 text-base">Clear All Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  </View>
);
}

export default History