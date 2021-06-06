import FetchUtil from './util/fetchUtil';

export const signup = ({firstName, lastName, username, email, phone, password}) => {
  console.log('username', firstName);
  console.log('password', lastName);
  console.log('password', username);
  console.log('password', email);
  console.log('password', phone);
  console.log('password', password);

  return FetchUtil.postJson({
    path: `http://localhost:8081/api/auth/signup`,
    body: {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
    },
  });
};

export const checkCredentialExist = ({credential, type}) => {
  console.log('credential', credential);
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/auth/signup/checkCredential`,
    body: {
      credential,
      type,
    },
  });
};