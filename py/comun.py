'''
Created on 16/03/2015

@author: BOTPI
'''
import datetime

def day(fecha):
    fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
    desde = str(fechad).split(' ')[0]
    hasta = str((fechad + datetime.timedelta(days=1))).split(' ')[0]
    return desde, hasta

def month(fecha):
    fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
    desde = datetime.datetime(fechad.year, fechad.month, 1)
    hasta = str(datetime.datetime(desde.year + int(desde.month / 12), ((desde.month % 12) + 1), 1)).split(' ')[0]
    desde = str(desde).split(' ')[0]
    return desde, hasta
    
def year(fecha):
    fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
    desde = str(fechad.replace(month=1).replace(day=1)).split(' ')[0]
    hasta = str(fechad.replace(month=1).replace(day=1).replace(year=fechad.year+1)).split(' ')[0]
    return desde, hasta

     
def convert(obj):
    """Default JSON serializer."""

    try:
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
    except:
        pass
    
    try:
        if isinstance(obj,  datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
    except:
        pass

    try:
        if isinstance(obj, datetime.date):
            return obj.strftime("%Y-%m-%d")
    except:
        pass
    
    try:
        if isinstance(obj, decimal.Decimal):
            return float(obj)
    except:
        pass

    return

