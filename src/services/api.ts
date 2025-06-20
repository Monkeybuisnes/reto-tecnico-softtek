import axios from 'axios';

// Mejorar manejo de variables de entorno con validación
const SWAPI_URL = process.env.SWAPI_URL || 'https://swapi.dev/api';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface Character {
  name: string;
  height: string;
  mass: string;
  homeworld: string;
  birth_year: string;
}

export const fetchSwapiPeople = async (): Promise<Character[]> => {
  try {
    const response = await axios.get(`${SWAPI_URL}/people`);
    return response.data.results.map((person: any) => ({
      name: person.name,
      height: person.height,
      mass: person.mass,
      homeworld: person.homeworld,
      birth_year: person.birth_year
    }));
  } catch (error) {
    console.error('Error fetching SWAPI data:', error);
    throw new Error('Failed to fetch Star Wars data');
  }
};

export const fetchWeatherData = async (location: string): Promise<any> => {
  // Validar que la API key existe y no es un valor placeholder antes de hacer la llamada
  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_API_KEY' || WEATHER_API_KEY === 'default_weather_key') {
    console.warn('Weather API key not configured properly, returning mock data');
    return null;
  }

  try {
    const response = await axios.get(OPEN_WEATHER_URL, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: 'metric'
      },
      timeout: 5000 // Timeout de 5 segundos para evitar bloqueos
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather for ${location}:`, error);
    return null;
  }
};