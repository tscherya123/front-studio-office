import Cookie from 'js-cookie';

const get = ({path}) => {
  let response = {};
  const token = Cookie.get('token') ? Cookie.get('token') : null;
  const type = Cookie.get('type') ? Cookie.get('type') : null;

  const headers = {
    'Authorization': `${type} ${token}`,
  };

  const requestOptions = {
    headers,
  };

  return fetch(path, requestOptions).then(
      (resp) => {
        response = resp;
        switch (response.headers.get('Content-Type')) {
          case 'application/json;charset=UTF-8':
          case 'application/json':
            return response.json();
          case 'file':
          case 'application/octet-stream;charset=UTF-8':
            return response.blob();
          default:
            return response.text();
        }
      },
  ).then(
      data => {
        if (response.ok) {
          return Promise.resolve(data);
        } else {
          response.responseJSON = data;
          return Promise.reject(data);
        }
      });
};

const postJson = (params) => {
  return execute(params, 'POST');
};

const putJson = (params) => {
  return execute(params, 'PUT');
};

const execute = ({path, body, options}, method) => {
  const token = Cookie.get('token') ? Cookie.get('token') : null;
  const type = Cookie.get('type') ? Cookie.get('type') : null;

  options = {
    ...options,
  };
  const headers = {
    Accept: 'application/json;charset=UTF-8',
    "Content-Type": 'application/json;charset=UTF-8',
    Authorization: `${type} ${token}`,
    ...options.headers,
  };
  const requestOptions = {
    method,
    body: JSON.stringify(body ? body : {}),
    ...options,
    headers,
  };

  let response = {};
  console.log("requestOptions", requestOptions);
  return fetch(path, requestOptions).then(
      (resp) => {
        response = resp;
        switch (response.headers.get('Content-Type')) {
          case 'application/json;charset=UTF-8':
          case 'application/json':
            return response.json();
          case 'file':
          case 'application/octet-stream;charset=UTF-8':
            return response.blob();
          default:
            return response.text();
        }
      },
  ).then(
      data => {
        if (response.ok) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(data);
        }
      });
};

const postFormData = ({path, bodyParams, options = {credentials: 'same-origin'}}) => {
  const token = Cookie.get('token') ? Cookie.get('token') : null;
  const type = Cookie.get('type') ? Cookie.get('type') : null;
  const body = new FormData();
  console.log("bodyParams", bodyParams);
  Object.keys(bodyParams).forEach((key) => {
    const param = bodyParams[key];
    body.append(key, param);
    // if (Array.isArray(param)) {
    //   param.forEach(file => body.append(key, file));
    // } else {
    //   body.append(key, param);
    // }
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json;charset=UTF-8',
      Authorization: `${type} ${token}`,
      // 'Content-Type': 'multipart/form-data',
    },
    body,
    ...options,
  };
  let response = {};
  return fetch(path, requestOptions).then(
      (resp) => {
        response = resp || {};
        switch (response.headers.get('Content-Type')) {
          case 'application/json;charset=UTF-8':
          case 'application/json':
            return response.json();
          case 'file':
            return response.blob();
          default:
            return response.text();
        }

      },
  ).then(data => {
    if (response.ok) {
      return Promise.resolve(data);
    } else {
      response.responseJSON = data;
      return Promise.reject(response);
    }
  });
};

export default {
  get, postJson, execute, postFormData, putJson,
};
  