import { USERS } from 'config/users';
import { useParams } from 'react-router';

const User = () => {
  // Получаем из URL id пользователя
  // (наименование — id, поскольку записали :id в path роута)
  const { id } = useParams();

  // Находим в конфиге пользователя с таким id
  const user = USERS.find((user) => user.id === id);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  // Выводим имя найденного пользователя
  return <div>{user.name}</div>;
};
export default User;
