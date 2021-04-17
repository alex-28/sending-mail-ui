import os
import csv
from configparser import ConfigParser
from constants import BASE_PATH, SERVER, PASSWORD, USER


def get_data_from_config():
    config_path = os.path.join(BASE_PATH, './email.ini')
    config_parser = ConfigParser()
    config_parser.read(config_path)

    return {
        SERVER: config_parser.get('smtp', SERVER),
        USER: config_parser.get('smtp', USER),
        PASSWORD: config_parser.get('smtp', PASSWORD),
    }


def get_csv_data():
    csv_path = os.path.join(BASE_PATH, './data.csv')
    data = []
    with open(csv_path, 'r', encoding='UTF-8') as file_obj:
        reader = csv.DictReader(file_obj, delimiter=',')
        data = [line for line in reader]
    return data


def get_template(path, item):
    html_path = os.path.join(BASE_PATH, path)
    html = ''
    with open(html_path, 'r', encoding='UTF-8') as file_obj:
        html = file_obj.read()
    for key in item.keys():
        html = html.replace('{' + key + '}', str(item[key]))
    return html
