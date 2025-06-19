import { getFusionados } from '../../src/handlers/fusionados';
import { Request, Response } from 'express';
import * as api from '../../src/services/api';
import * as cache from '../../src/services/cache';
import * as db from '../../src/services/database';

jest.mock('../../src/services/api');
jest.mock('../../src/services/cache');
jest.mock('../../src/services/database');

describe('GET /fusionados', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: sendMock });
    
    req = {};
    res = {
      status: statusMock,
      json: sendMock
    };
  });

  it('debe devolver datos desde caché', async () => {
    const cachedData = [{ name: 'Luke', weather: { temp: 25 } }];
    (cache.getCachedData as jest.Mock).mockResolvedValue(cachedData);
    
    await getFusionados(req as Request, res as Response);
    
    expect(res.json).toHaveBeenCalledWith({
      source: 'cache',
      data: cachedData
    });
  });

  it('debe devolver datos desde API cuando no hay caché', async () => {
    (cache.getCachedData as jest.Mock).mockResolvedValue(null);
    const characters = [{ name: 'Luke', homeworld: 'Tatooine' }];
    (api.fetchSwapiPeople as jest.Mock).mockResolvedValue(characters);
    (api.fetchWeatherData as jest.Mock).mockResolvedValue({ main: { temp: 25 } });
    
    await getFusionados(req as Request, res as Response);
    
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      source: 'api'
    }));
  });
});