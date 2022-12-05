import { createSearchParams, useNavigate } from 'react-router-dom';
import UserName from '../Components/UserName/UserName';

function User() {
  const navigate = useNavigate();
  function nameSaveHandler(userName) {
    navigate({
      pathname: '/',
      search: createSearchParams({
        userName: userName,
      }).toString(),
    });
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <UserName onNameSave={nameSaveHandler} />
    </div>
  );
}

export default User;
