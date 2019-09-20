from scipy import stats
import redis
import json
import time

client = redis.StrictRedis(host='localhost', port=6379, password='4e81415c6c5c961f6ac62a9a4cf8df3e8c54375ed1cf6e09595c06e7e076fe5b3084301b82eb8319ce17068b1fac1db41c95804886d9980d084ac9e36dcfa438')
while(True):
    dataString = client.get('BUFFER')
    data = json.loads(dataString)
    data['0'] = stats.zscore(data['0']).tolist()
    data['1'] = stats.zscore(data['1']).tolist()
    data['2'] = stats.zscore(data['2']).tolist()
    data['3'] = stats.zscore(data['3']).tolist()
    data['4'] = stats.zscore(data['4']).tolist()
    data['5'] = stats.zscore(data['5']).tolist()
    client.set('DAQDETREND', json.dumps(data))
    time.sleep(0.5)
    