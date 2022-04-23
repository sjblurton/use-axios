import { rest } from 'msw';
import { mockUsers, urls } from './data';

export const handlers = [
  rest.get(urls.users, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUsers));
  }),
  rest.get(urls.error404, (_, res, ctx) => {
    return res(ctx.status(404));
  }),
  rest.get(urls.error500, (_, res, ctx) => {
    return res(ctx.status(500));
  }),
  rest.post(urls.users, (req, res, ctx) => {
    const resBody = {
      ...(req.body as object),
      updatedAt: '23/04/2022',
      createdAt: '23/04/2022',
    };
    return res(ctx.status(200), ctx.json(resBody));
  }),
  // rest.post(url200, (req, res, ctx) => {
  //   return res(
  //     ctx.status(201),
  //     ctx.json({ ...(req.body as {}), ...createdAt, url: req.url })
  //   );
  // }),
  // rest.put(urlPut, (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({ ...(req.body as {}), ...updatedAt, url: req.url })
  //   );
  // }),
  // rest.delete(urlPut, (req, res, ctx) => {
  //   return res(ctx.status(204));
  // }),
  // rest.post(url404, (req, res, ctx) => {
  //   return res(ctx.status(404));
  // }),
  // rest.post(url500, (req, res, ctx) => {
  //   return res(ctx.status(500));
  // }),
  // rest.put(urlPut, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(data));
  // }),
];
