const apiKey = '5b3ca325a72ebf3c91162b4d01531d8a';
const locButton = document.querySelector('.loc-button');
const todayInfo = document.querySelector('.today-info');
const todayWeatherIcon = document.querySelector('.today-weather i');
const todayTemp = document.querySelector('.weather-temp');
const daysList = document.querySelector('.days-list');

// Mapeamento do código da condição meteorológica com os nomes das classes de ícones (dependendo da responta da API do Openweather)
const weatherIconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water'
};

function fetchWeatherData(location) {
    // Controe a URL da API com o local e a "key" da API
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    // Buscar dados meteorológicos da API
    fetch(apiUrl).then(response => response.json()).then(data => {
        // Atualizar informações de hoje
        const todayWeather = getText(data.list[0].weather[0].description).toUpperCase();
        const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
        const todayWeatherIconCode = data.list[0].weather[0].icon;

        console.log(data.list[0]);

        todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('pt-br', { weekday: 'long' }).toUpperCase();
        todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('pt-br', { day: 'numeric', month: 'long', year: 'numeric' });
        todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconCode]}`;
        todayTemp.textContent = todayTemperature;

        // Atualiza descrição de local e descrição na sessão "left-info"
        const locationElement = document.querySelector('.today-info > div > span');
        locationElement.textContent = `${data.city.name}, ${data.city.country}`;

        const weatherDescriptionElement = document.querySelector('.today-weather > h3');
        weatherDescriptionElement.textContent = todayWeather;

        // Atualiza informações do dia na sessão "day-info"
        const todayPrecipitation = `${data.list[0].pop}%`;
        const todayHumidity = `${data.list[0].main.humidity}%`;
        const todayWindSpeed = `${data.list[0].wind.speed}KM/H`;

        const dayInfoContainer = document.querySelector('.day-info');
        dayInfoContainer.innerHTML = `

            <div>
                <span class="title">PRECIPITAÇÃO</span>
                <span class="value">${todayPrecipitation}</span>
            </div>
            <div>
                <span class="title">HUMIDADE</span>
                <span class="value">${todayHumidity}</span>
            </div>
            <div>
                <span class="title">VENTO</span>
                <span class="value">${todayWindSpeed}</span>
            </div>
        
        `;

        // Atualiza o clima dos próximos 4 dias
        const today = new Date();
        const nextDaysData = data.list.slice(1);
        //console.log(nextDaysData);

        const uniqueDays = new Set();
        let count = 0;
        daysList.innerHTML = '';
        for (const dayData of nextDaysData) {
            const forecastDate = new Date(dayData.dt_txt);
            const dayAbbreviation = forecastDate.toLocaleDateString('pt-br', { weekday: 'short' });
            const dayTemp = `${Math.round(dayData.main.temp)}°C`;
            const iconCode = dayData.weather[0].icon;

            // Evitar a duplição os dias
            if (!uniqueDays.has(dayAbbreviation) && forecastDate.getDate() !== today.getDate() && forecastDate.getHours() === 15) {
                //console.log(forecastDate.getHours());
                uniqueDays.add(dayAbbreviation);
                daysList.innerHTML += `
                
                    <li>
                        <i class='bx bx-${weatherIconMap[iconCode]}'></i>
                        <span>${dayAbbreviation}</span>
                        <span class="day-temp">${dayTemp}</span>
                    </li>

                `;
                count++;
            }

            // Sair do loop após pegar informações dos próximos 4 dias
            if (count === 4) break;
        }
    }).catch(error => {
        alert(`Error fetching weather data: ${error} (Api Error)`);
    });
}

// Buscar dados meteorológicos para localização padrão (Brazil)
document.addEventListener('DOMContentLoaded', () => {
    const defaultLocation = 'Presidente Prudente';
    fetchWeatherData(defaultLocation);
});

locButton.addEventListener('click', () => {
    const location = prompt('Insira um local: ');
    if (!location) return;

    fetchWeatherData(location);
});

var LOCALE = {
    "clear sky": "Céu limpo",
    "few clouds": "Poucas nuvens",
    "scattered clouds": "Nuvens dispersas",
    "broken clouds": "Nuvens quebradas",
    "overcast clouds": "Nublado",
    "shower rain": "Chuva de banho",
    "rain": "Chuva",
    "thunderstorm": "Tempestade de raios",
    "snow": "Neve",
    "mist": "Névoa",
    "thunderstorm with light rain": "Tempestade de raios com chuva leve",
    "thunderstorm with rain": "Tempestade de raios com chuva",
    "thunderstorm with heavy rain": "Tempestade de raios com chuva pesada",
    "light thunderstorm": "Tempestade de raios leve",
    "heavy thunderstorm": "Tempestade de raios pesada",
    "ragged thunderstorm": "Tempestade de raios irregular",
    "thunderstorm with light drizzle": "Tempestade de raios com garoa leve",
    "thunderstorm with drizzle": "Tempestade de raios com garoa",
    "thunderstorm with heavy drizzle": "Tempestade de raios com garoa pesada",
    "light intensity drizzle": "Garoa leve",
    "drizzle": "Garoa",
    "heavy intensity drizzle": "Garoa pesada",
    "light intensity drizzle rain": "Chuva leve",
    "drizzle rain": "Chuvisco",
    "heavy intensity drizzle rain": "Chuva forte",
    "shower rain and drizzle": "Chuva e garoa",
    "heavy shower rain and drizzle": "Chuva forte e garoa",
    "shower drizzle": "Garoa",
    "light rain": "Chuva leve",
    "moderate rain": "Chuva moderada",
    "heavy intensity rain": "Chuva pesada",
    "very heavy rain": "Chuva muito pesada",
    "extreme rain": "Chuva extrema",
    "freezing rain": "Chuva congelante",
    "light intensity shower rain": "Chuva leve",
    "heavy intensity shower rain": "Chuva forte",
    "ragged shower rain": "Chuva irregular",
    "light snow": "Pouca neve",
    "heavy snow": "Neve pesada",
    "sleet": "Granizo",
    "light shower sleet": "Chuva de granizo leve",
    "shower sleet": "Chuva de granizo",
    "light rain and snow": "Chuva leve e neve",
    "rain and snow": "Chuva e neve",
    "light shower snow": "Chuva de neve leve",
    "shower snow": "Chuva de neve",
    "heavy shower snow": "Chuva de neve pesada",
    "smoke": "Fumaça",
    "haze": "Neblina",
    "sand/dust whirls": "Redemoinhos de areia/poeira",
    "fog": "Névoa",
    "sand": "Areia",
    "dust": "Poeira",
    "volcanic ash": "Cinza Vuncanica",
    "squalls": "Borrasca",
    "tornado": "Tornado"
};

function getText(string) {
    return LOCALE[string] ? LOCALE[string] : string;
}