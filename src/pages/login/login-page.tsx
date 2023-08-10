import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions.ts';
import { AppRoute, CityMap, RequestStatus } from '../../const.ts';
import { setCity } from '../../store/app-process/app-process.ts';
import { getAuthCheckedStatus, getLoginLoadingStatus } from '../../store/auth-process/selectors.ts';
import { TAuthData } from '../../types/auth-data.ts';
import { validateEmail, validatePassword } from '../../utils.ts';
import { toast } from 'react-toastify';
import { TAppDispatch } from '../../types/state.ts';
const formSubmitHandler = (evt: FormEvent<HTMLFormElement>, dispatch: TAppDispatch) => {
  evt.preventDefault();
  const form = evt.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData) as TAuthData;
  const { email, password } = data;
  if (!validateEmail(email)) {
    return toast.warning('Email no valid');
  }
  if (!validatePassword(password)) {
    return toast.warning('Password not valid, should contain at least one digit and one character');
  }
  dispatch(loginAction(data));
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const loginStatus = useAppSelector(getLoginLoadingStatus);
  const isPending = loginStatus === RequestStatus.Pending;
  if (isAuthChecked) {
    return <Navigate to={ AppRoute.Main }/>;
  }
  return (
    <>
      <Helmet>
        <title>Six cities. Login</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            method="post"
            onSubmit={ (evt) => formSubmitHandler(evt, dispatch) }
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password"
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={ isPending }
            >
              { isPending ? 'Entering...' : 'Sign in' }
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <button
              type="button"
              className="locations__item-link"
              onClick={ () => {
                dispatch(setCity(CityMap.Amsterdam));
                navigate(AppRoute.Main);
              }}
            >
              <span>Amsterdam</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
