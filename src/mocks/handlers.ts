import { rest } from 'msw';
import { mockUsers } from './data';

export const handlers = [
  rest.get('/users', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUsers));
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
