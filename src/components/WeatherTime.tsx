"use client";

import { useState, useEffect } from "react";
import { Clock, CloudSun, MapPin } from "lucide-react";

interface WeatherData {
  temp: number;
  description: string;
  city: string;
}

export default function WeatherTime() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
          );
          const data = await res.json();
          const code = data.current?.weather_code ?? 0;
          const temp = Math.round(data.current?.temperature_2m ?? 0);
          const desc = code <= 3 ? "Clear" : code <= 48 ? "Cloudy" : code <= 67 ? "Rain" : "Storm";

          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`
          );
          const geo = await geoRes.json();
          const city = geo.address?.city || geo.address?.town || geo.address?.state || "Unknown";

          setWeather({ temp, description: desc, city });
        } catch { /* silently fail */ }
      },
      () => { /* permission denied */ }
    );
  }, []);

  return (
    <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
      <span className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {time}
      </span>
      {weather && (
        <>
          <span className="flex items-center gap-1">
            <CloudSun className="w-3 h-3" />
            {weather.temp}°C · {weather.description}
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {weather.city}
          </span>
        </>
      )}
    </div>
  );
}
