/**
 * FarmPal — Weather API Service (Open-Meteo, free, no API key)
 */
const WeatherAPI = {
    BASE_URL: 'https://api.open-meteo.com/v1',

    async getCurrentAndForecast(lat, lon) {
        const url = `${this.BASE_URL}/forecast?latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,weather_code` +
            `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max` +
            `&timezone=auto&forecast_days=7`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Weather fetch failed');
            const data = await res.json();
            return this._transformData(data);
        } catch (err) {
            console.warn('Weather API error, using cached/fallback:', err);
            return this._getFallback(lat, lon);
        }
    },

    async getHistorical(lat, lon, startDate, endDate) {
        const url = `${this.BASE_URL}/forecast?latitude=${lat}&longitude=${lon}` +
            `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum` +
            `&timezone=auto&start_date=${startDate}&end_date=${endDate}`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Historical fetch failed');
            const data = await res.json();
            return (data.daily?.time || []).map((d, i) => ({
                date: d,
                maxTemp: data.daily.temperature_2m_max[i],
                minTemp: data.daily.temperature_2m_min[i],
                rain: data.daily.precipitation_sum[i] || 0
            }));
        } catch { return []; }
    },

    _transformData(data) {
        const current = {
            temp: Math.round(data.current?.temperature_2m || 0),
            humidity: data.current?.relative_humidity_2m || 0,
            rain: data.current?.rain || 0,
            windSpeed: Math.round(data.current?.wind_speed_10m || 0),
            condition: this._weatherCodeToText(data.current?.weather_code),
            icon: this._weatherCodeToIcon(data.current?.weather_code)
        };
        const daily = (data.daily?.time || []).map((d, i) => ({
            date: d,
            dayName: new Date(d).toLocaleDateString('en', { weekday: 'short' }),
            maxTemp: Math.round(data.daily.temperature_2m_max[i]),
            minTemp: Math.round(data.daily.temperature_2m_min[i]),
            rain: data.daily.precipitation_sum[i] || 0,
            rainProb: data.daily.precipitation_probability_max?.[i] || 0,
            windMax: Math.round(data.daily.wind_speed_10m_max?.[i] || 0),
            condition: this._weatherCodeToText(data.daily.weather_code[i]),
            icon: this._weatherCodeToIcon(data.daily.weather_code[i])
        }));
        // Cache for offline
        try { localStorage.setItem('farmpal_weather_cache', JSON.stringify({ current, daily, cachedAt: Date.now() })); } catch { }
        return { current, daily };
    },

    _getFallback() {
        try {
            const cached = JSON.parse(localStorage.getItem('farmpal_weather_cache'));
            if (cached) return { current: cached.current, daily: cached.daily, cached: true };
        } catch { }
        return {
            current: { temp: 28, humidity: 65, rain: 0, windSpeed: 12, condition: 'Partly Cloudy', icon: '⛅' },
            daily: [], cached: true
        };
    },

    _weatherCodeToText(code) {
        const map = {
            0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
            45: 'Foggy', 48: 'Fog', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
            61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain', 71: 'Light Snow', 73: 'Snow',
            80: 'Rain Showers', 81: 'Rain Showers', 82: 'Heavy Showers',
            95: 'Thunderstorm', 96: 'Thunderstorm + Hail', 99: 'Severe Thunderstorm'
        };
        return map[code] || 'Clear';
    },

    _weatherCodeToIcon(code) {
        if (code === 0) return '☀️';
        if (code <= 2) return '⛅';
        if (code === 3) return '☁️';
        if (code <= 48) return '🌫️';
        if (code <= 55) return '🌦️';
        if (code <= 65) return '🌧️';
        if (code <= 77) return '❄️';
        if (code <= 82) return '🌧️';
        return '⛈️';
    }
};
