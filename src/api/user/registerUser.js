import axios from 'axios';

export const registerUser = async (dto) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/register', dto, {
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
