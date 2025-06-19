export const normalizeWeatherData = (weatherData: any): any => {
  if (!weatherData || !weatherData.main) {
    return {
      temperature: null,
      humidity: null,
      description: 'Datos no disponibles',
      windSpeed: null,
      location: 'Desconocido'
    };
  }
  
  return {
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    description: weatherData.weather?.[0]?.description || '',
    windSpeed: weatherData.wind?.speed,
    location: weatherData.name
  };
};

export const normalizeCharacterData = (character: any): any => {
  return {
    name: character.name,
    height: character.height === 'unknown' ? null : parseInt(character.height),
    mass: character.mass === 'unknown' ? null : parseInt(character.mass.replace(',', '')),
    homeworld: character.homeworld,
    birth_year: character.birth_year
  };
};