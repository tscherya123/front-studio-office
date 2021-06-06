import FetchUtil from './util/fetchUtil';

export const auth = ({username, password}) => {
  console.log('username', username);
  console.log('password', password);
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/auth/signin`,
    body: {
      username,
      password,
    },
  });
};

export const checkAdmin = () => {
  return FetchUtil.get({
    path: `http://localhost:8081/api/test/admin`,
    options: {
      mode: 'no-cors',
    },
  });
};

export const checkEngineer = () => {
  return FetchUtil.get({
    path: `http://localhost:8081/api/test/engineer`,
    options: {
      mode: 'no-cors',
    },
  });
};

export const checkUser = () => {
  return FetchUtil.get({
    path: `http://localhost:8081/api/test/user`,
    options: {
      mode: 'no-cors',
    },
  });
};