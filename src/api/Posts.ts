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

export class Posts<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Post
   * @name PostsList
   * @summary Get all posts
   * @request GET:/posts/posts
   * @secure
   */
  postsList = (params: RequestParams = {}) =>
    this.http.request<void, void>({
      path: `/posts/posts`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Post
   * @name PostsDetail
   * @summary Get a post by ID
   * @request GET:/posts/posts/${id}
   * @secure
   */
  postsDetail = (id: string, params: RequestParams = {}) =>
    this.http.request<void, void>({
      path: `/posts/posts/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Post
   * @name PostsUpdate
   * @summary Update a post by ID
   * @request PUT:/posts/posts/${id}
   * @secure
   */
  postsUpdate = (
    id: string,
    data: {
      question?: string;
      plantType?: string;
      environment?: string;
      /** @format binary */
      image?: File;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<any, any>({
      path: `/posts/posts/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Post
   * @name PostsDelete
   * @summary Delete a post by ID
   * @request DELETE:/posts/posts/${id}
   * @secure
   */
  postsDelete = (id: string, params: RequestParams = {}) =>
    this.http.request<void, void>({
      path: `/posts/posts/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Post
   * @name PostCreate
   * @summary Create a new post
   * @request POST:/posts/post
   * @secure
   */
  postCreate = (
    data: {
      question?: string;
      plantType?: string;
      environment?: string;
      /** @format binary */
      image?: File;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<any, any>({
      path: `/posts/post`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Post
   * @name SearchCreate
   * @summary Search for a post
   * @request POST:/posts/search
   * @secure
   */
  searchCreate = (
    data: {
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/posts/search`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
