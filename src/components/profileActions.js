import FetchUtil from './util/fetchUtil';

export const getInfoForProfile = ({ userId }) => {
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/profile/user`,
    body: {
      userId,
    },
  });
};

export const getUserImg = ({ userId }) => {
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/profile/userImg`,
    body: {
      userId,
    },
  });
};

export const userCheckPassword = ({ userId, password }) => {
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/profile/userCheckPassword`,
    body: {
      userId, password
    },
  });
};

export const userUpdatePassword = ({ userId, oldPassword, newPassword }) => {
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/profile/userUpdatePassword`,
    body: {
      userId, oldPassword, newPassword
    },
  });
};

export const updateBirthday = ({ userId, date }) => {
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/profile/updateBirthday`,
    body: {
      userId, date
    },
  });
};

export const updateAvatar = ({ avatarImg, id }) => {
  console.log(avatarImg);
  console.log(id);
  return FetchUtil.postFormData({
    path: `http://localhost:8081/api/profile/updateProfileImg`,
    bodyParams: {
      avatarImg, id
    },
  });
};

export const updateUserInfo = ({ userId, firstName, lastName, email, phone, }) => {
  return FetchUtil.postJson({
    path: `http://localhost:8081/api/profile/updateUserInfo`,
    body: {
      userId, firstName, lastName, email, phone,
    },
  });
};

