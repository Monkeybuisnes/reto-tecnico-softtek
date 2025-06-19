export interface Character {
  name: string;
  height: number | null;
  mass: number | null;
  homeworld: string;
  birth_year: string;
  weather?: WeatherData;
}

export interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  description: string;
  windSpeed: number | null;
  location: string;
}