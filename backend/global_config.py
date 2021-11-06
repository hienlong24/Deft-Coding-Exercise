
from flask import json
from constants import FILE_NAMES

def get_app_config():
    """Get app config values

    Returns:
        config: config values in json format
    """
    config = {}
    with open(FILE_NAMES.CONFIG_FILE.value, 'r') as app_config:
        config = json.loads(app_config.read())
        return config

def get_weather_api_key():
    """Get api key for AccuWeather app

    Returns:
        weather_api_key: api key used to access AccuWeather's APIs
    """
    config = get_app_config()
    return config['weather_api_key']

def get_google_api_key():
    """Get api key for Google address autocomplete

    Returns:
        google_api_key: api key used to access Google's APIs
    """
    config = get_app_config()
    return config['google_api_key']
