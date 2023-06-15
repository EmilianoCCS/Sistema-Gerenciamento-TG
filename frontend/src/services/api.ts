import axios from 'axios';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { parseCookies } from 'nookies';

import constants from '@/constants';

export function setupAPIClient(ctx: GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData> | undefined = undefined
) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies[constants.USER_TOKEN]}`
    }
  });

  return api;
}
