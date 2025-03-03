import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://84.237.52.214:4020";

export const loginUser = async (user) => {
    try {
      const dto = new URLSearchParams();
      dto.append('username', user.username);
      dto.append('password', user.password);

      const response = await axios.post(`${API_BASE_URL}/api/users/token`, dto, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status == 200) {
        return response.data;
      } else {
        throw new Error("Не удалось выполнить авторизацию");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Не удалось выполнить авторизацию');
    }
};
