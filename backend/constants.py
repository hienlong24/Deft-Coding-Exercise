from enum import Enum


class FILE_NAMES(Enum):
    CONFIG_FILE = "config.ini"


class URLS(Enum):
    LOCATION_KEY_URL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey="
    FORECAST_URL = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"


WEATHER_RESPONSE = {'day1': {'date': "", 'min_temp_value': "", 'max_temp_value': "", 'unit': "", 'condition': "no"},
                    'day2': {'date': "", 'min_temp_value': "", 'max_temp_value': "", 'unit': "", 'condition': "no"},
                    'day3': {'date': "", 'min_temp_value': "", 'max_temp_value': "", 'unit': "", 'condition': "no"}}
