import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useMedicine } from '@/modules/auth/hooks/useMedicine';

const getRandomColor = () => {
  const colors = [
    "#4CAF50", "#F44336", "#FF9800", "#2196F3",
    "#9C27B0", "#00BCD4", "#FF5722", "#795548"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Refills = () => {
  const router = useRouter();

  // ✅ Start empty — no dummy data
  const [medications, setMedications] = useState<any[]>([]);

  const { getRefillMedicine } = useMedicine();

  useEffect(() => {
    const fetchRefillMeds = async () => {
      const result = await getRefillMedicine();

      if (result?.meta?.requestStatus === "fulfilled") {
        // 🎯 Attach random color to each medicine
        const dataWithColors = result.payload.data.map((med:any) => ({
          ...med,
          id: med.medicineId, // normalize id
          color: getRandomColor()
        }));

        setMedications(dataWithColors);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result?.payload || "Failed to fetch"
        });
      }
    };

    fetchRefillMeds();
  }, []);

  const handleRefill = (data:any) => {
    console.log(data);
  };

  const getSupplyStatus = (medication:any) => {
    const percentage =
      (medication.currentSupply / medication.totalSupply) * 100;

    if (percentage <= medication.refillAt) {
      return {
        status: "Low",
        color: "#F44336",
        backgroundColor: "#FFEBEE",
      };
    } else if (percentage <= 50) {
      return {
        status: "Medium",
        color: "#FF9800",
        backgroundColor: "#FFF3E0",
      };
    } else {
      return {
        status: "Good",
        color: "#4CAF50",
        backgroundColor: "#E8F5E9",
      };
    }
  };

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      <LinearGradient
        colors={["#1a8e2d", "#146922"]}
        className="absolute top-0 left-0 right-0 h-[120px] ios:h-[140px]"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <View className="flex-1 pt-[30px] ios:pt-[50px]">
        {/* Header */}
        <View className="flex-row items-center px-5 pb-5 z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white justify-center items-center shadow"
          >
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white ml-4">
            Refill Tracker
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {medications.length === 0 ? (
            <View className="items-center p-8 bg-white rounded-2xl mt-5">
              <Ionicons name="medical-outline" size={48} color="#ccc" />
              <Text className="text-base text-gray-500 mt-3 mb-5">
                No medications to track
              </Text>
            </View>
          ) : (
            medications.map((medication) => {
              const supplyStatus = getSupplyStatus(medication);
              const supplyPercentage =
                (medication.currentSupply / medication.totalSupply) * 100;

              return (
                <View
                  key={medication.id}
                  className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm"
                >
                  {/* Top */}
                  <View className="flex-row items-center mb-4">
                    <View
                      className="w-3 h-10 rounded-md mr-4"
                      style={{ backgroundColor: medication.color }}
                    />

                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-800">
                        {medication.name}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {medication.dosage}
                      </Text>
                    </View>

                    <View
                      className="px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: supplyStatus.backgroundColor
                      }}
                    >
                      <Text
                        className="text-sm font-semibold"
                        style={{ color: supplyStatus.color }}
                      >
                        {supplyStatus.status}
                      </Text>
                    </View>
                  </View>

                  {/* Supply */}
                  <View className="mb-4">
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-sm text-gray-500">
                        Current Supply
                      </Text>
                      <Text className="text-sm font-semibold text-gray-800">
                        {medication.currentSupply} units
                      </Text>
                    </View>

                    {/* Progress bar */}
                    <View className="h-2 bg-gray-100 rounded overflow-hidden">
                      <View
                        className="h-full rounded"
                        style={{
                          width: `${supplyPercentage}%`,
                          backgroundColor: supplyStatus.color
                        }}
                      />
                    </View>

                    <Text className="text-xs text-gray-500 mt-1 text-right">
                      {Math.round(supplyPercentage)}%
                    </Text>

                    {/* Last refill */}
                    {medication.lastRefillDate && (
                      <Text className="text-xs text-gray-500 mt-2">
                        Last refill:{" "}
                        {new Date(
                          medication.lastRefillDate
                        ).toLocaleDateString()}
                      </Text>
                    )}
                  </View>

                  {/* Button */}
                  <TouchableOpacity
                    className="py-3 rounded-xl items-center"
                    style={{
                      backgroundColor:
                        supplyPercentage < 100
                          ? medication.color
                          : "#e0e0e0"
                    }}
                    onPress={() => handleRefill(medication)}
                    disabled={supplyPercentage >= 100}
                  >
                    <Text className="text-white font-semibold">
                      Record Refill
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Refills;