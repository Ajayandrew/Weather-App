import React, { useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog
} from "react-icons/wi";
import toast, { Toaster } from "react-hot-toast";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [searchCount, setSearchCount] = useState(0);

  const API_KEY = "b11ed8eb18011a6f58a8bc260adb22fe"; // Replace with your OpenWeatherMap key

  const getWeather = async () => {
    if (!city) {
      toast.error("Please enter a city name!");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setSearchCount((prev) => prev + 1);
      toast.success(`Weather data loaded for ${response.data.name}`);
    } catch (err) {
      setWeatherData(null);
      toast.error("City not found. Try again!");
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={80} className="text-yellow-300 animate-bounce" />;
      case "Clouds":
        return <WiCloud size={80} className="text-gray-300 animate-pulse" />;
      case "Rain":
        return <WiRain size={80} className="text-blue-400 animate-ping" />;
      case "Snow":
        return <WiSnow size={80} className="text-white animate-spin" />;
      case "Thunderstorm":
        return <WiThunderstorm size={80} className="text-purple-400 animate-pulse" />;
      case "Fog":
      case "Mist":
        return <WiFog size={80} className="text-gray-400 animate-pulse" />;
      default:
        return <WiDaySunny size={80} className="text-yellow-300 animate-bounce" />;
    }
  };

  const getBackground = (condition) => {
    switch (condition) {
      case "Clear": return "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600";
      case "Rain": return "bg-gradient-to-r from-blue-700 via-blue-500 to-gray-600";
      case "Snow": return "bg-gradient-to-r from-blue-200 via-white to-gray-300";
      case "Clouds": return "bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800";
      default: return "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600";
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-white p-6 transition-all duration-500 ${getBackground(weatherData?.weather[0].main)}`}>
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-4xl font-bold mb-6 drop-shadow-lg flex items-center gap-3">
        🌍 Weather Report
        <span className="bg-yellow-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          {searchCount}
        </span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 hover:shadow-lg"
        />
        <button
          onClick={getWeather}
          className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
        >
          Search
        </button>
      </div>

      {weatherData && (
        <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-glow w-full max-w-md flex flex-col items-center">
          {getWeatherIcon(weatherData.weather[0].main)}
          <h3 className="text-2xl font-bold mb-2">
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <p className="text-lg">🌡 Temperature: {weatherData.main.temp} °C</p>
          <p className="text-lg">💨 Wind: {weatherData.wind.speed} m/s</p>
          <p className="text-lg">☁ Condition: {weatherData.weather[0].description}</p>

          {/* Temperature Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: `${Math.min(weatherData.main.temp, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;