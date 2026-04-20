import api from "@/constants/api";

export const addMedicine = async (data: {
    userId: string,
    name: string,
    dosage: string,
    frequency: string,
    duration: string,
    startDate: Date,
    times: string[],
    notes: string,
    reminderEnabled: boolean,
    refillReminder: boolean,
    currentSupply?: number,
    refillAt?: number,
}) => {
  try {
    const response = await api.post("medicine/createMedicine", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "CreateMedicine failed");
  }
};


export const getTodaysMedicine = async (userId: string) => {
  try {
    const response = await api.get("medicine", { params: { userId } });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Get today's Medicine data failed");
  }
};


export const getHistory = async (userId: string) => {
  try {
    const response = await api.get("medicine/history", { params: { userId } });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Get Medicine history data failed");
  }
};


export const getRefill = async (userId: string) => {
  try {
    const response = await api.get("medicine/refillMedicine", { params: { userId } });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Get Medicine history data failed");
  }
};



export const TodaysMedicineTaken = async (data: { logId: string, time: string }) => {
  try {
    const response = await api.patch("medicine/markTaken", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Get today's Medicine taken failed");
  }
};


export const deleteMedicine = async (data: { _id: string, userId: string }) => {
  try {
    const response = await api.delete("medicine/deleteMedicine", { params: data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Delete Medicine failed");
  }
};