import { USERS } from 'config/users';
import { Link } from 'react-router';

const Users = () => {
  return (
    <ul>
      {USERS.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Users;
