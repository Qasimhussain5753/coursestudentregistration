import { HttpService, Injectable, Post } from '@nestjs/common';

import { User } from './user.modal';
import { doc } from 'prettier';
const qs = require('querystring');
import join = doc.builders.join;
export class AuthenticationError extends Error {}

@Injectable()
export class AuthenticationService {
  private readonly baseURL: string;
  private readonly realm;

  constructor(private httpService: HttpService) {
    this.baseURL = process.env.KEYCLOAK_BASE_URL;
    this.realm = process.env.KEYCLOAK_REALM;
  }
  /**
   * Call the OpenId Connect UserInfo endpoint on Keycloak: https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
   *
   * If it succeeds, the token is valid and we get the user infos in the response
   * If it fails, the token is invalid or expired
   */
  async authenticate(accessToken: string, body): Promise<any> {
    // const url = `${process.env.KEYCLOAK_BASE_URL}/realms/admin/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`;
    const url = `${process.env.KEYCLOAK_BASE_URL}/auth/admin/realms/${process.env.KEYCLOAK_REALM}/users`;
    try {
      const response = await this.httpService
        .get(url, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .toPromise();
      console.log('response dta ', response.data);
      return response.data;
    } catch (e) {
      // console.log('error services', e);
      throw new AuthenticationError(e.message);
    }
  }

  async registration(body): Promise<any> {
    console.log('registration called', body);
    const formBody = [];
    for (const property in body) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    const data = formBody.join('&');
    console.log('form body', formBody);
    console.log('form data', data);
    // http://localhost:9990/auth/realms/courseregister/protocol/openid-connect/token
    const url = `${process.env.KEYCLOAK_BASE_URL}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
    try {
      const response = await this.httpService
        .post(url, qs.stringify(body), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        })
        .toPromise();
      console.log('response data ', response.data);

      return response.data;
    } catch (err) {
      throw new AuthenticationError(err.message);
    }
  }
}
