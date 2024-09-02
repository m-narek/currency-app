import axios from "@/axios"

export const getCurrencies = async () => {
  try {
    const response = await axios.get('/currency');
    return response.data;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
};
