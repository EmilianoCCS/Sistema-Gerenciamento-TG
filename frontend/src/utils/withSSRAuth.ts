import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import nookies from 'nookies';

import constants from "@/constants";

export function withSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = nookies.get(ctx);
    const token = cookies[constants.USER_TOKEN];
    
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }
}
