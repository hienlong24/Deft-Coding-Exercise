import './App.css';
import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

function App() {
  const FLASK_SERVER = Object.freeze({
    WEBSOCKET: 'http://127.0.0.1:3000'
  })
  const [address, setAddress] = React.useState("");
  const [weather, setWeather] = React.useState("")
  const [coordinates, setCoordinates] = React.useState("");
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng)
    setAddress(value);
    setCoordinates(latLng);
    console.log(value)
    console.log(coordinates)
    const requestOptions = {
      method: 'POST',
      Headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latLng)
    };
    fetch('http://localhost:5000/weather', requestOptions)
      .then(response => response.json())
      .then(data => {
        setWeather(data)
      });

  };

  return (
    <div className="App" style={{ background: "#282c34" }}>

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
        <div style={{ margin: '0px 0px 0px 200px' }}>
          <div style={{ background: '#61556f', height: '500px', width: '300px', margin: '100px 0px 0px 10px' }}>

            <p>{weather['day1']['date']}</p>
            <p>{weather['day1']['min_temp_value'] + "\u00b0" + weather['day1']['unit']}</p>
            <p>{weather['day1']['max_temp_value'] + "\u00b0" + weather['day1']['unit']}</p>
            <img className="image" src={require(`./images/${weather['day1']['condition']}.png`).default} />

          </div>
          <div style={{ background: '#61556f', height: '500px', width: '300px', margin: '-517px 0px 0px 400px' }}>

            <p>{weather['day2']['date']}</p>
            <p>{weather['day2']['min_temp_value'] + "\u00b0" + weather['day2']['unit']}</p>
            <p>{weather['day2']['max_temp_value'] + "\u00b0" + weather['day2']['unit']}</p>
            <img className="image" src={require(`./images/${weather['day2']['condition']}.png`).default} />

          </div>
          <div style={{ background: '#61556f', height: '500px', width: '300px', margin: '-517px 0px 0px 800px' }}>

            <p>{weather['day3']['date']}</p>
            <p>{weather['day3']['min_temp_value'] + "\u00b0" + weather['day3']['unit']}</p>
            <p>{weather['day3']['max_temp_value'] + "\u00b0" + weather['day3']['unit']}</p>
            <img className="image" src={require(`./images/${weather['day3']['condition']}.png`).default} />

          </div>
        </div>
        : null
      }

    </div>
  );
}

export default App;
