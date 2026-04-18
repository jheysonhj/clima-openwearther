// 1. Declaraciones (SOLO UNA VEZ CADA UNA)
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');

// 2. Clave de API
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// 3. Función para obtener el clima
const getWeather = async (city) => {
    if (!city) return;
    try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await resp.json();

        if (data.cod === "404") {
            alert("Ciudad no encontrada");
            return;
        }
        renderWeather(data);
    } catch (error) {
        console.error("Error:", error);
    }
};

// 4. Función para renderizar (Asegúrate de que no se repita abajo)
const renderWeather = (data) => {
    const { name, main, weather } = data;
    weatherContainer.innerHTML = `
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Temperatura: ${main.temp}°C</p>
                <p class="card-text">Clima: ${weather[0].description}</p>
            </div>
        </div>
    `;
};

// 5. Eventos (Revisa que no tengas otros searchBtn.addEventListener más abajo)
searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(cityInput.value);
    }
});