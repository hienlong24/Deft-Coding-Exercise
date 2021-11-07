import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { WiDayCloudy, WiDaySunny, WiDayRainWind } from 'weather-icons-react';
import img1 from './images/01.png'

function App() {
  const FLASK_SERVER = Object.freeze({
    WEBSOCKET: 'http://127.0.0.1:3000'
  })
  const [address, setAddress] = React.useState("");
  const [data, getData] = React.useState("")
  const [weather, setWeather] = React.useState("")
  const [coordinates, setCoordinates] = React.useState("");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng)
    setAddress(value);
    setCoordinates(latLng);
    console.log(coordinates)
    const requestOptions = {
      method: 'POST',
      Headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latLng)
    };
    fetch('http://localhost:5000/weather', requestOptions)
      .then(response => response.json())
      .then(data => setWeather(data));

  };

  return (
    <div className="App" style={{ background: "#282c34" }}>

      {/* <header className="App-header"  style={{margin:"0px 600px 450px 0px"}}>
        <p style={{margin:"0px 0px 500px 0px"}}>
          Deft Weather Forecast
        </p>
      </header> */}

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>

            <input style={{ height: "50px", width: "400px", justifyContent: 'flex-start', background: '#61556f', color: 'white', fontSize: '12pt', marginTop: "10px" }} {...getInputProps({ placeholder: "Search location" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  color: suggestion.active ? "#d9dbda" : "white",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {weather ?
        <div style={{ background: '#61556f', height: '500px', width: '300px', margin: '100px 0px 0px 10px' }}>
          <p>{weather['day1']['date']}</p>
          <p>{weather['day1']['min_temp_value'] + weather['day1']['unit']}</p>
          <p>{weather['day1']['max_temp_value'] + weather['day1']['unit']}</p>
          {weather['day1']['condition']['cloudy'] ?
            <img className="image" src={img1}/>
            :
            weather['day1']['condition']['mostly_cloudy'] ?
              <img className="image" src={img1} /> : <img className="image" src={img1} />}
        </div>
        :
        null}

      <div style={{ background: '#61556f', height: '500px', width: '300px', margin: '100px 0px 0px 0px' }}>

      </div>
      <div style={{ background: '#61556f', height: '500px', width: '300px', margin: '100px 0px 0px 10px' }}>

      </div>

    </div>
  );
}

export default App;
