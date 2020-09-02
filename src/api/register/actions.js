import axios from 'axios';

const api = 'http://gruz.sport-market.kz/api/users';

export const POST_BEGIN_REGISTER = 'POST_BEGIN_REGISTER';
export const POST_SUCCESS_REGISTER = 'POST_SUCCESS_REGISTER';
export const POST_ERROR_REGISTER = 'POST_ERROR_REGISTER';

export const post_begin_register = () => ({
  type: POST_BEGIN_REGISTER,
});
export const post_success_register = data => ({
  type: POST_BEGIN_REGISTER,
  payload: {data},
});
export const post_error_register = error => ({
  type: POST_BEGIN_REGISTER,
  payload: {error},
});

export function postRegister(user) {
  return dispatch => {
    dispatch(post_begin_register());
    const request = axios({
      method: 'POST',
      headers: [],
      data: {
        phone: user.phone,
        password: user.password,
        name: user.name,
      },
      // params: {
      //   phone: user.phone,
      //   password: user.password,
      //   name: user.name,
      // },
      url: api,
    });
    return request
      .then(function(response) {
        console.log(response.data);
        dispatch(post_success_register(response.data));
      })
      .catch(function(error) {
        dispatch(post_error_register(error));
      });
  };
}
