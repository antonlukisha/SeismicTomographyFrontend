import axios from 'axios';

export const loginUser = async (user) => {
    try {
      const dto = new URLSearchParams();
      dto.append('username', user.username);
      dto.append('password', user.password);

      const response = await axios.post('http://localhost:8000/api/users/token', dto, {
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
