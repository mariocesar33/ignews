import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {id: 1, name: 'Mário César'},
    {id: 2, name: 'Ailton Fortes'},
    {id: 3, name: 'Irka Carvalho'},
  ];

  return response.json(users);
}