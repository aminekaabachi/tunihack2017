# mongo.py

from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask_cache import Cache
from flask_cors import CORS
from werkzeug.contrib.cache import SimpleCache

CACHE_TIMEOUT = 3600

cache = SimpleCache()

class cached(object):

    def __init__(self, timeout=None):
        self.timeout = timeout or CACHE_TIMEOUT

    def __call__(self, f):
        def decorator(*args, **kwargs):
            response = cache.get(request.path)
            if response is None:
                response = f(*args, **kwargs)
                cache.set(request.path, response, self.timeout)
            return response
        return decorator

import numpy as np
import pymongo
import pandas as pd
from pymongo import MongoClient
import matplotlib.pyplot as plt
plt.style.use('seaborn')

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tunihack'

mongo = PyMongo(app)

@app.before_request
def return_cached():
    # if GET and POST not empty
    if not request.values:
        response = cache.get(request.path)
        if response:
            return response

@app.after_request
def cache_response(response):
    if not request.values:
        cache.set(request.path, response, CACHE_TIMEOUT)
    return response

@app.route('/crimes/<int:year>/days', methods=['GET'])
def get_all_crimes_d(year):
  collection = mongo.db.crimes
  crimes = pd.DataFrame(list(collection.find({"Year":year})))
  crimes.drop(['_id', 'Case Number', 'IUCR', 'X Coordinate', 'Y Coordinate','Updated On','Year', 'FBI Code', 'Beat','Ward','Community Area', 'Location', 'District'], inplace=True, axis=1)
  crimes.Date = pd.to_datetime(crimes.Date, format='%m/%d/%Y %I:%M:%S %p')
  crimes.index = pd.DatetimeIndex(crimes.Date)
  loc_to_change  = list(crimes['Location Description'].value_counts()[20:].index)
  desc_to_change = list(crimes['Description'].value_counts()[20:].index)
  crimes.loc[crimes['Location Description'].isin(loc_to_change) , crimes.columns=='Location Description'] = 'OTHER'
  crimes.loc[crimes['Description'].isin(desc_to_change) , crimes.columns=='Description'] = 'OTHER'
  crimes['Primary Type']         = pd.Categorical(crimes['Primary Type'])
  crimes['Location Description'] = pd.Categorical(crimes['Location Description'])
  crimes['Description']          = pd.Categorical(crimes['Description'])
  output = crimes.resample('D').size().rolling(1).sum().tolist()
  return jsonify({'result' : output})

@app.route('/crimes/<int:year>/months', methods=['GET'])
def get_all_crimes_m(year):
  collection = mongo.db.crimes
  crimes = pd.DataFrame(list(collection.find({"Year":year})))
  crimes.drop(['_id', 'Case Number', 'IUCR', 'X Coordinate', 'Y Coordinate','Updated On','Year', 'FBI Code', 'Beat','Ward','Community Area', 'Location', 'District'], inplace=True, axis=1)
  crimes.Date = pd.to_datetime(crimes.Date, format='%m/%d/%Y %I:%M:%S %p')
  crimes.index = pd.DatetimeIndex(crimes.Date)
  loc_to_change  = list(crimes['Location Description'].value_counts()[20:].index)
  desc_to_change = list(crimes['Description'].value_counts()[20:].index)
  crimes.loc[crimes['Location Description'].isin(loc_to_change) , crimes.columns=='Location Description'] = 'OTHER'
  crimes.loc[crimes['Description'].isin(desc_to_change) , crimes.columns=='Description'] = 'OTHER'
  crimes['Primary Type']         = pd.Categorical(crimes['Primary Type'])
  crimes['Location Description'] = pd.Categorical(crimes['Location Description'])
  crimes['Description']          = pd.Categorical(crimes['Description'])
  output = crimes.resample('M').size().tolist()
  return jsonify({'result' : output})

@app.route('/crimes/<int:year>/types', methods=['GET'])
def get_crimes_per_type(year):
  collection = mongo.db.crimes
  crimes = pd.DataFrame(list(collection.find({"Year":year})))
  crimes.drop(['_id', 'Case Number', 'IUCR', 'X Coordinate', 'Y Coordinate','Updated On','Year', 'FBI Code', 'Beat','Ward','Community Area', 'Location', 'District'], inplace=True, axis=1)
  crimes.Date = pd.to_datetime(crimes.Date, format='%m/%d/%Y %I:%M:%S %p')
  crimes.index = pd.DatetimeIndex(crimes.Date)
  loc_to_change  = list(crimes['Location Description'].value_counts()[20:].index)
  desc_to_change = list(crimes['Description'].value_counts()[20:].index)
  crimes.loc[crimes['Location Description'].isin(loc_to_change) , crimes.columns=='Location Description'] = 'OTHER'
  crimes.loc[crimes['Description'].isin(desc_to_change) , crimes.columns=='Description'] = 'OTHER'
  crimes['Primary Type']         = pd.Categorical(crimes['Primary Type'])
  crimes['Location Description'] = pd.Categorical(crimes['Location Description'])
  crimes['Description']          = pd.Categorical(crimes['Description'])
  #crimes_count_date = crimes.pivot_table('ID', aggfunc=np.size, columns='Primary Type', index=crimes.index.date, fill_value=0)
  output = crimes.groupby([crimes['Primary Type']]).size().sort_values(ascending=True).to_dict()
  return jsonify({'result' : output})

@app.route('/crimes/<int:year>/weekdays', methods=['GET'])
def get_crimes_w(year):
  collection = mongo.db.crimes
  crimes = pd.DataFrame(list(collection.find({"Year":year})))
  crimes.drop(['_id', 'Case Number', 'IUCR', 'X Coordinate', 'Y Coordinate','Updated On','Year', 'FBI Code', 'Beat','Ward','Community Area', 'Location', 'District'], inplace=True, axis=1)
  crimes.Date = pd.to_datetime(crimes.Date, format='%m/%d/%Y %I:%M:%S %p')
  crimes.index = pd.DatetimeIndex(crimes.Date)
  loc_to_change  = list(crimes['Location Description'].value_counts()[20:].index)
  desc_to_change = list(crimes['Description'].value_counts()[20:].index)
  crimes.loc[crimes['Location Description'].isin(loc_to_change) , crimes.columns=='Location Description'] = 'OTHER'
  crimes.loc[crimes['Description'].isin(desc_to_change) , crimes.columns=='Description'] = 'OTHER'
  crimes['Primary Type']         = pd.Categorical(crimes['Primary Type'])
  crimes['Location Description'] = pd.Categorical(crimes['Location Description'])
  crimes['Description']          = pd.Categorical(crimes['Description'])
  days = ['Monday','Tuesday','Wednesday',  'Thursday', 'Friday', 'Saturday', 'Sunday']
  output = crimes.groupby([crimes.index.dayofweek]).size().tolist()
  return jsonify({'result' : output})

@app.route('/crimes/<int:year>/location_description', methods=['GET'])
def get_crimes_location_desription(year):
  collection = mongo.db.crimes
  crimes = pd.DataFrame(list(collection.find({"Year":year})))
  crimes.drop(['_id', 'Case Number', 'IUCR', 'X Coordinate', 'Y Coordinate','Updated On','Year', 'FBI Code', 'Beat','Ward','Community Area', 'Location', 'District'], inplace=True, axis=1)
  crimes.Date = pd.to_datetime(crimes.Date, format='%m/%d/%Y %I:%M:%S %p')
  crimes.index = pd.DatetimeIndex(crimes.Date)
  loc_to_change  = list(crimes['Location Description'].value_counts()[20:].index)
  desc_to_change = list(crimes['Description'].value_counts()[20:].index)
  crimes.loc[crimes['Location Description'].isin(loc_to_change) , crimes.columns=='Location Description'] = 'OTHER'
  crimes.loc[crimes['Description'].isin(desc_to_change) , crimes.columns=='Description'] = 'OTHER'
  crimes['Primary Type']         = pd.Categorical(crimes['Primary Type'])
  crimes['Location Description'] = pd.Categorical(crimes['Location Description'])
  crimes['Description']          = pd.Categorical(crimes['Description'])
  output = crimes.groupby([crimes['Location Description']]).size().sort_values(ascending=True).to_dict()
  return jsonify({'result' : output})

@app.route('/crimes/<int:year>/district', methods=['GET'])
def get_crimes_location_dist(year):
  collection = mongo.db.crimes
  crimes = pd.DataFrame(list(collection.find({"Year":year})))
  crimes.drop(['_id', 'Case Number', 'IUCR', 'X Coordinate', 'Y Coordinate','Updated On','Year', 'FBI Code', 'Beat','Ward','Community Area', 'Location'], inplace=True, axis=1)
  crimes.Date = pd.to_datetime(crimes.Date, format='%m/%d/%Y %I:%M:%S %p')
  crimes.index = pd.DatetimeIndex(crimes.Date)
  loc_to_change  = list(crimes['Location Description'].value_counts()[20:].index)
  desc_to_change = list(crimes['Description'].value_counts()[20:].index)
  crimes.loc[crimes['Location Description'].isin(loc_to_change) , crimes.columns=='Location Description'] = 'OTHER'
  crimes.loc[crimes['Description'].isin(desc_to_change) , crimes.columns=='Description'] = 'OTHER'
  crimes['Primary Type']         = pd.Categorical(crimes['Primary Type'])
  crimes['Location Description'] = pd.Categorical(crimes['Location Description'])
  crimes['Description']          = pd.Categorical(crimes['Description'])
  crimes['District']          = pd.Categorical(crimes['District'])
  output = crimes.groupby([crimes['District']]).size().tolist()

  return jsonify({'result' : output})

"""
@app.route('/star/', methods=['GET'])
def get_one_star(name):
  star = mongo.db.stars
  s = star.find_one({'name' : name})
  if s:
    output = {'name' : s['name'], 'distance' : s['distance']}
  else:
    output = "No such name"
  return jsonify({'result' : output})

@app.route('/star', methods=['POST'])
def add_star():
  star = mongo.db.stars
  name = request.json['name']
  distance = request.json['distance']
  star_id = star.insert({'name': name, 'distance': distance})
  new_star = star.find_one({'_id': star_id })
  output = {'name' : new_star['name'], 'distance' : new_star['distance']}
  return jsonify({'result' : output})
"""

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
