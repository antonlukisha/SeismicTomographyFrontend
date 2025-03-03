import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://84.237.52.214:4020";

export const registerUser = async (dto) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/register`, dto, {
      headers: {
        'Content-Type': 'application/json',
     },
   });

   if (response.status == 201) {
     return response.data;
   } else {
     throw new Error("Не удалось выполнить регистрацию");
   }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("Имя пользователя уже существует. Пожалуйста, повторите попытку под другим именем.");
    } else {
      throw new Error(error.response?.data?.message || 'Не удалось выполнить регистрацию');
    }
  }
};
