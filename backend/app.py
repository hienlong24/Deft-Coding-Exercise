from flask import Flask, escape, request
from flask_cors import CORS
import app_factory
import urllib.request
import global_config
import json
from constants import URLS, WEATHER_RESPONSE
from datetime import datetime

APP, DB = app_factory.create_app()
CORS(APP)
ACCU_WEATHER_API_KEY = global_config.get_weather_api_key()
URL = "http://dataservice.accuweather.com/locations/v1/cities/US/search?apikey=t7NohZ4gbjD2yyTGZGr5v2Hw491tOtrG&q=dayton"


@APP.route('/weather', methods=['POST'])
def getWeather():
    """Get 3 days forecast

    Returns:
        result: a dictionary contains 3 day forecast
    """

    data = request.data
    latlgn = json.loads(data.decode('utf-8'))
    latitude = latlgn['lat']
    longitude = latlgn['lng']
    source = ""

    location_key_url = URLS.LOCATION_KEY_URL.value + ACCU_WEATHER_API_KEY + \
        "&q=" + str(longitude) + "%2C" + str(latitude)
    try:
        source = urllib.request.urlopen(location_key_url).read()
        # converting JSON data to a dictionary
        list_of_data = json.loads(source)
        location_key = list_of_data['Key']
    except Exception as e:
        print(e)
        return WEATHER_RESPONSE

    forecast_url = URLS.FORECAST_URL.value + \
        location_key + "?apikey=" + ACCU_WEATHER_API_KEY
    try:
        forecast_info = urllib.request.urlopen(forecast_url).read()
    except Exception as e:
        print(e)
        return WEATHER_RESPONSE

    # converting JSON data to a dictionary
    forecast_data = json.loads(forecast_info)
    # Get daily forcast and create a dictionary with 3 day forecast
    day1 = get_daily_forecast(forecast_data['DailyForecasts'][0])
    day2 = get_daily_forecast(forecast_data['DailyForecasts'][1])
    day3 = get_daily_forecast(forecast_data['DailyForecasts'][2])
    result = {}
    result['day1'] = day1
    result['day2'] = day2
    result['day3'] = day3
    print(result)
    return result


def get_daily_forecast(data):
    date = data['Date']
    datetime_object = datetime.fromisoformat(date)
    formatted_date = datetime_object.strftime("%a %b %d")
    temperature = data['Temperature']
    min_temp = temperature['Minimum']
    min_temp_value = min_temp['Value']
    max_temp = temperature['Maximum']
    max_temp_value = max_temp['Value']
    unit = max_temp['Unit']
    condition = data['Day']['Icon']

    result = {'date': formatted_date, 'min_temp_value': min_temp_value,
              'max_temp_value': max_temp_value, 'unit': unit, 'condition': condition}
    return result
