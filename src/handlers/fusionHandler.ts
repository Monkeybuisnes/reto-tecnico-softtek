import { Request, Response } from 'express';
import { getCachedData, cacheData } from '../services/cache';
import { fetchSwapiPeople, fetchWeatherData } from '../services/api';
import { normalizeWeatherData, normalizeCharacterData } from '../utils/normalizer';
import { saveToHistory } from '../services/database';

export const getFusionados = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'fusionados';
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return res.json({
        source: 'cache',
        data: cachedData
      });
    }

    const characters = await fetchSwapiPeople();
    
    if (!characters || characters.length === 0) {
      return res.status(404).json({ error: 'No se encontraron personajes' });
    }

    // Obtener clima para cada planeta
    const weatherPromises = characters.map(char => 
      fetchWeatherData(char.homeworld).catch(() => null)
    );
    const weatherDataList = await Promise.all(weatherPromises);
    
    const mergedData = characters.map((char, index) => {
      const normalizedChar = normalizeCharacterData(char);
      return {
        ...normalizedChar,
        weather: normalizeWeatherData(weatherDataList[index])
      };
    });

    await cacheData(cacheKey, mergedData, 1800); // Cache por 30 min
    await saveToHistory(mergedData);

    res.json({
      source: 'api',
      data: mergedData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos fusionados' });
  }
};