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
      id: req.params.id,
    };
    return res(ctx.status(200), ctx.json(resBody));
  }),
  rest.put(urls.editUser, (req, res, ctx) => {
    const resBody = {
      ...(req.body as object),
      updatedAt: '23/04/2022',
      createdAt: '12/12/2012',
      id: 4,
    };
    return res(ctx.status(200), ctx.json(resBody));
  }),
  rest.delete(urls.editUser, (_, res, ctx) => {
    return res(ctx.status(204));
  }),
];
