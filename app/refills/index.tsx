import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Refills = () => {
  const router = useRouter();
  const [medications, setMedications] = useState([]);

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
        <View className="flex-row items-center px-5 pb-5 z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white justify-center items-center shadow"
          >
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white ml-4">Refill Tracker</Text>
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {medications.length === 0 ? (
            <View className="items-center p-8 bg-white rounded-2xl mt-5">
              <Ionicons name="medical-outline" size={48} color="#ccc" />
              <Text className="text-base text-gray-500 mt-3 mb-5">No medications to track</Text>
              <TouchableOpacity
                className="bg-[#1a8e2d] px-5 py-2 rounded-full"
                onPress={() => router.push("/medications")}
              >
                <Text className="text-white font-semibold">Add Medication</Text>
              </TouchableOpacity>
            </View>
          ) : (
            medications.map((medication) => {
              const supplyStatus = getSupplyStatus(medication);
              // const supplyPercentage =
              //   (medication.currentSupply / medication.totalSupply) * 100;

              return (
                // key={medication.id}
                <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
                  <View className="flex-row items-center mb-4">
                    <View
                      className="w-3 h-10 rounded-md mr-4"
                      // style={[
                      //   { backgroundColor: medication.color },
                      // ]}
                    />
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-800">
                        {/* {medication.name} */}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {/* {medication.dosage} */}
                      </Text>
                    </View>
                    <View
                      className="px-3 py-1 rounded-full bg-gray-100"
                      // style={[
                      //   { backgroundColor: supplyStatus.backgroundColor },
                      // ]}
                    >
                      <Text
                        className="text-sm font-semibold text-gray-600"
                        // style={[
                        //   { color: supplyStatus.color },
                        // ]}
                      >
                        {/* {supplyStatus.status} */}
                      </Text>
                    </View>
                  </View>

                  <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm text-gray-500">Current Supply</Text>
                      <Text className="text-sm font-semibold text-gray-800">
                        {/* {medication.currentSupply} units */}
                      </Text>
                    </View>
                    <View className="mb-2">
                      <View className="h-2 bg-gray-100 rounded overflow-hidden">
                        <View
                          className="h-full rounded"
                          // style={[
                          //   {
                          //     width: `${supplyPercentage}%`,
                          //     backgroundColor: supplyStatus.color,
                          //   },
                          // ]}
                        />
                      </View>
                      <Text className="text-xs text-gray-500 mt-1 text-right">
                        {/* {Math.round(supplyPercentage)}% */}
                      </Text>
                    </View>
                    <View className="mt-2">
                      <Text className="text-xs text-gray-500">
                        {/* Refill at: {medication.refillAt}% */}
                      </Text>
                      {/* {medication.lastRefillDate && (
                        <Text className=''>
                          Last refill:{" "}
                          {new Date(
                            medication.lastRefillDate
                          ).toLocaleDateString()}
                        </Text>
                      )} */}
                    </View>
                  </View>

                  <TouchableOpacity
                    className="py-3 rounded-xl items-center bg-green-600"
                    // style={[
                    //   {
                    //     backgroundColor:
                    //       supplyPercentage < 100 ? medication.color : "#e0e0e0",
                    //   },
                    // ]}
                    // onPress={() => handleRefill(medication)}
                    // disabled={supplyPercentage >= 100}
                  >
                    <Text className="text-white text-base font-semibold">Record Refill</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default Refills