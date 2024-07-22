/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags User
   * @name RegisterCreate
   * @summary Register a new user
   * @request POST:/users/register
   * @secure
   */
  registerCreate = (
    data: {
      username: string;
      password: string;
      email: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/users/register`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name LoginCreate
   * @summary Login a user
   * @request POST:/users/login
   * @secure
   */
  loginCreate = (
    data: {
      email?: string;
      password: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/users/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name ForgetPasswordCreate
   * @summary Forget password
   * @request POST:/users/forget-password
   * @secure
   */
  forgetPasswordCreate = (
    data: {
      email: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/users/forget-password`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name ResetPasswordUpdate
   * @summary Reset password
   * @request PUT:/users/reset-password
   * @secure
   */
  resetPasswordUpdate = (
    data: {
      email: string;
      password: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/users/reset-password`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name LogoutCreate
   * @summary Logout a user
   * @request POST:/users/logout
   * @secure
   */
  logoutCreate = (params: RequestParams = {}) =>
    this.http.request<void, void>({
      path: `/users/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
}
