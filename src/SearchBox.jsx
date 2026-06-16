import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_WEATHER_API_KEY;
    const API_KEY = "9b61a2c5c40927b5e4cc38337868ae5e";

    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonRespnse = await response.json();

            let result = {
                city: city,
                temp: jsonRespnse.main.temp,
                tempMin: jsonRespnse.main.temp_min,
                tempMax: jsonRespnse.main.temp_max,
                humidity: jsonRespnse.main.humidity,
                feelsLike: jsonRespnse.main.feels_like,
                weather: jsonRespnse.weather[0].description
            };
            console.log(result);
            return result
        } catch(err){
            throw err;
        }
        
    }
    
    let handleChange = (evt) =>{
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) =>{
        try{
            evt.preventDefault();
            console.log(city); 
            setCity("");
            await getWeatherInfo();
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch(err){
            setError(true);
        }
    }

    return(
        <div className='SearchBox'>
            <form action="" onSubmit={handleSubmit}>
                 <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
                 <br /><br />
                 <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{color: "red"}}>No such place exits!</p>}
                
            </form>
        </div>
    );
}