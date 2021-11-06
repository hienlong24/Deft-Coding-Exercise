from enum import Enum

class FILE_NAMES(Enum):
    CONFIG_FILE = "config.ini"

class URLS(Enum):
    LOCATION_KEY_URL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey="
    FORECAST_URL = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"