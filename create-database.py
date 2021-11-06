import sqlite3


conn = sqlite3.connect('weather-forecast.db')
c = conn.cursor()

c.execute(""" CREATE TABLE forecast ()""")