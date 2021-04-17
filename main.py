import os
import csv
import eel
from utils import get_csv_data, get_data_from_config
from constants import BASE_PATH
from mail import send_mail
from configparser import ConfigParser

config_path = os.path.join(BASE_PATH, './email.ini')
config_parser = ConfigParser()
config_parser.read(config_path)

eel.init('web')


@eel.expose
def send(params):
    data = get_csv_data()
    for user in data:
        user_id = str(user['id'])
        params_id = str(params['id'])
        if user_id == params_id:
            for key in user.keys():
                user[key] = params[key]
            break
    keys = data[0].keys()
    with open('./data.csv', 'w', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, keys)
        writer.writeheader()
        writer.writerows(data)
    send_mail(params)


@eel.expose
def get_users():
    return get_csv_data()


@eel.expose
def get_config():
    return get_data_from_config()


@eel.expose
def get_templates():
    templates_path = os.path.join(BASE_PATH, './web/templates')
    data = []
    for file in os.listdir(templates_path):
        data.append({
            'path': f'./templates/{file}',
            'name': file
        })

    return data


@eel.expose
def edit_config(data):
    for key in data.keys():
        config_parser.set('smtp', key, data[key])
    with open(config_path, 'w') as config_file:
        config_parser.write(config_file)


def edit_csv_data(data):
    for key in data.keys():
        config_parser.set('smtp', key, data[key])
    with open(config_path, 'w') as config_file:
        config_parser.write(config_file)


eel.start('index.html')
