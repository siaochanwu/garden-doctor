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

export class Replies<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Reply
   * @name RepliesDetail
   * @summary Get all replies for a post
   * @request GET:/replies/replies/${postId}
   * @secure
   */
  repliesDetail = (postId: string, params: RequestParams = {}) =>
    this.http.request<void, void>({
      path: `/replies/replies/${postId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reply
   * @name ReplyCreate
   * @summary Create a new reply
   * @request POST:/replies/reply
   * @secure
   */
  replyCreate = (
    data: {
      postId: string;
      text: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/replies/reply`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reply
   * @name ReplyUpdate
   * @summary Update a reply by ID
   * @request PUT:/replies/reply/${id}
   * @secure
   */
  replyUpdate = (
    id: string,
    data: {
      text: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/replies/reply/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reply
   * @name ReplyDelete
   * @summary Delete a reply by ID
   * @request DELETE:/replies/reply/${id}
   * @secure
   */
  replyDelete = (id: string, params: RequestParams = {}) =>
    this.http.request<void, void>({
      path: `/replies/reply/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reply
   * @name ReplySearchCreate
   * @summary Search for a reply
   * @request POST:/replies/reply/search
   * @secure
   */
  replySearchCreate = (
    data: {
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, void>({
      path: `/replies/reply/search`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
