import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import { Meta } from '@/shared/utils/meta';
import { apiUrls } from '@/config/apiUrls';
import type { User } from '@/shared/entity/user';
import { clearAuthData, getAuthData, setAuthData } from '@/shared/utils/auth';

type PrivateFields = '_user' | '_token' | '_meta' | '_errorMsg';

class UserStore {
  private _user: User | null = null;
  private _token: string | null = null;
  private _meta: Meta = Meta.initial as Meta;
  private _errorMsg: string | null = null;

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _user: observable,
      _token: observable,
      _meta: observable,
      _errorMsg: observable,

      user: computed,
      token: computed,
      meta: computed,
      isAuth: computed,

      login: action,
      register: action,
      logout: action,
    });

    const authData = getAuthData();
    if (authData) {
      runInAction(() => {
        this._token = authData.token;
        this._user = authData.user;
        this._meta = Meta.success as Meta;
      });
    }
  }

  get user() {
    return this._user;
  }
  get token() {
    return this._token;
  }
  get meta() {
    return this._meta;
  }
  get errorMsg() {
    return this._errorMsg;
  }
  get isAuth() {
    return !!this._token && !!this._user;
  }

  async login(email: string, password: string) {
    this._meta = Meta.loading as Meta;

    try {
      const response = await axios.post(apiUrls.auth.login, {
        identifier: email,
        password,
      });

      runInAction(() => {
        const { jwt, user } = response.data;
        this._token = jwt;
        this._user = user;
        this._meta = Meta.success as Meta;
        setAuthData(jwt, user);
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error as Meta;
      });

      if (axios.isAxiosError(error) && error.response) {
        this._errorMsg = error.response.data.error.message;
      }
    }
  }

  async register(username: string, email: string, password: string) {
    this._meta = Meta.loading as Meta;

    try {
      const response = await axios.post(apiUrls.auth.register, {
        username,
        email,
        password,
      });
      runInAction(() => {
        const { jwt, user } = response.data;
        this._token = jwt;
        this._user = user;
        this._meta = Meta.success as Meta;
        setAuthData(jwt, user);
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error as Meta;
      });

      if (axios.isAxiosError(error) && error.response) {
        this._errorMsg = error.response.data.error.message;
      }
    }
  }

  async logout() {
    runInAction(() => {
      this._user = null;
      this._token = null;
      this._meta = Meta.initial as Meta;
      clearAuthData();
    });
  }
}

export default UserStore;
