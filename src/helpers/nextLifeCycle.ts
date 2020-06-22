import Router from 'next/router';
import { ServerResponse } from 'http';

export const redirect = (url: string, res?: ServerResponse): void => {
  if (res) {
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } else {
    Router.push(url);
  }
};
