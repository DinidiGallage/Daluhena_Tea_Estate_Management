const router = require("express").Router();
const axios = require('axios');
const HarvestInventory = require("../models/Weatherforcast");

async function fetchAndStoreWeatherData() {
    try {
        // Get the current date
        const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
        // Make request to OpenWeatherMap API to fetch weather data for the current date
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Kalutara,lk&dt=${currentDate}&appid=0ae3683ea9566bf8bf094430233fde86`);
        
        // Extract weather data from the response
        const weatherData = response.data;

        // Save weather data to MongoDB
        const savedWeather = await HarvestInventory.create(weatherData);

        console.log(`Weather data for ${currentDate} saved successfully.`);
    } catch (error) {
        console.error('Error fetching and storing weather data:', error);
    }
}

// Call the function to fetch and store weather data
fetchAndStoreWeatherData();

// API endpoint to fetch and store weather data
router.get('/fetch-weather', async (req, res) => {
    try {
        // Make request to OpenWeatherMap API
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Kalutara,lk&APPID=0ae3683ea9566bf8bf094430233fde86');
        
        // Log the response data
        console.log('Response from OpenWeatherMap API:', response.data);
        
        // Extract weather data from the response
        const weatherData = response.data;

        // Save weather data to MongoDB
        const savedWeather = await HarvestInventory.create(weatherData);

        // Send response with saved data
        res.json(savedWeather);
    } catch (error) {
        // Log the error
        console.error('Error fetching and storing weather data:', error);
        
        // Send error response
        res.status(500).json({ error: 'Failed to fetch and store weather data' });
    }
});

// API endpoint to fetch and store weather data
router.get('/fetch-onlypart-of-weather', async (req, res) => {
    try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Kalutara,lk&APPID=0ae3683ea9566bf8bf094430233fde86');
        
        const { main, weather, sys, dt } = response.data;
        const weatherData = {
            date: new Date(dt * 1000).toLocaleDateString(),
            main: weather[0].main,
            description: weather[0].description,
            temp: main.temp,
            temp_min: main.temp_min,
            temp_max: main.temp_max,
            pressure: main.pressure,
            humidity: main.humidity,
            sunrise: sys.sunrise,
            sunset: sys.sunset
        };

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching specific parts of weather data:', error);
        res.status(500).json({ error: 'Failed to fetch specific parts of weather data' });
    }
});
// API endpoint to fetch weather data for a specific date
// API endpoint to fetch weather data for a specific date
router.get('/fetch-weather/:date', async (req, res) => {
    const { date } = req.params; // Date format: YYYY-MM-DD

    try {
        // Retrieve weather data for the specified date from MongoDB
        const weatherData = await HarvestInventory.findOne({ date }, { 
            date: 1,
            'weather.main': 1,
            'weather.description': 1,
            'main.temp': 1,
            'main.temp_min': 1,
            'main.temp_max': 1,
            'main.pressure': 1,
            'main.humidity': 1,
            'sys.sunrise': 1,
            'sys.sunset': 1,
            _id: 0 // Exclude _id field from the result
        });
        
        // If data for the specified date is not found in the database
        if (!weatherData) {
            // Send error response indicating that historical data is not available
            res.status(404).json({ error: 'Historical weather data not available' });
            return;
        }

        // Send response with weather data for the specified date
        res.json(weatherData);
    } catch (error) {
        // Log the error
        console.error('Error fetching weather data:', error);
        
        // Send error response
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});



module.exports = router;