

import os
from signal import SIGTERM
import argparse
from os import path, kill
import sys
import string
from json import loads, decoder
from time import sleep


R = '\033[31m'  # red
G = '\033[32m'  # green
C = '\033[36m'  # cyan
W = '\033[0m'   # white
Y = '\033[33m'  # yellow

SERVER = ''
path_to_script = path.dirname(path.realpath(__file__))

nameCustomCamelCase = ""
nameCustomLowerCase = ""


def convertToSingular():
    global argName
    findS = argName[-1]
    if (findS == 's' or findS == 'S'):
        print(f'{R}[-] {R}O nome precisa estar no singular!{W}')
        sys.exit()


def main():
    stopIfExists = True
    seletectedAutomatic = False
    optionID = 0

    print(f'{Y}[!] Select a option :{W}\n')
    TEMPLATES_JSON = f'{path_to_script}/script_template.json'
    with open(TEMPLATES_JSON, 'r') as templ:
        templ_info = templ.read()

    templ_json = loads(templ_info)
    for item in templ_json['templates']:
        optionName = item['type']
        print(f'{G}[{templ_json["templates"].index(item)}] {C}{optionName}{W} - {G}[{templ_json["templates"].index(item)}]')

    try:
        selected = int(input(f'{G}[>] {W}'))
        print(f"\n{Y}[!] What's object name?{W}")
        name = str(input(f'{G}[>] {W}'))

        argName = name
        titleName = argName.title()
        lowerName = argName.lower()

        if (selected == 10):
            createAllObjects(templ_json, titleName, lowerName)
        else:
            createObject(templ_json, selected, titleName,
                         lowerName, stopIfExists, seletectedAutomatic, optionID)
    except ValueError:
        print()
        print(f'{R}[-] {C}Invalid Input!{W}')
        sys.exit()


def createObject(templ_json, selected, titleName, lowerName, stopIfExists, seletectedAutomatic, optionID):
    optionSelectedTitle = "Create"
    optionSelectedLower = "create"
    pathIsFile = templ_json['templates'][selected]['pathIsFile']
    optionType = templ_json['templates'][selected]['type']
    options = templ_json['templates'][selected]['options']
    global nameCustomCamelCase
    global nameCustomLowerCase

    if (len(options) > 0):
        if (seletectedAutomatic != True):
            print(f'\n{Y}[!] Choose a option:{W}')
            for item in options:
                optionName = item['name']

                print(
                    f'{G}[{options.index(item)}] {C}{optionName}{W} - {G}[{options.index(item)}]')

            typeSelected = int(input(f'{G}[>] {W}'))
            optionSelectedTitle = options[typeSelected]['name']
            optionSelectedLower = options[typeSelected]['value']
        print("\n")

        if (seletectedAutomatic == True):
            typeSelected = optionID
            if (optionID == 5):
                optionSelectedTitle = nameCustomCamelCase
                optionSelectedLower = nameCustomLowerCase
            else:
                optionSelectedTitle = options[typeSelected]['name']
                optionSelectedLower = options[typeSelected]['value']

        if (typeSelected == 5 and seletectedAutomatic == False):
            print(
                f'\n{Y}[?] Name in CamelCase{C} (Ex: "UserDetails" or "Details" only)')
            optionSelectedTitle = str(input(f'{G}[>] {W}'))
            print(
                f'\n{Y}[?] Name in LowerCase{C} (Ex: "userDetails" or "details" only)')
            optionSelectedLower = str(input(f'{G}[>] {W}'))

    body = templ_json['templates'][selected]['body'].replace(
        "{lowerName}", lowerName).replace("{titleName}", titleName).replace("{type_chosen_title}", optionSelectedTitle).replace("{type_chosen_lower}", optionSelectedLower)

    path = f"{path_to_script}" + \
        templ_json['templates'][selected]['path'].replace(
            "{lowerName}", lowerName).replace("{titleName}", titleName).replace("{type_chosen_title}", optionSelectedTitle).replace("{type_chosen_lower}", optionSelectedLower)

    pathDir = f"{path_to_script}" + \
        templ_json['templates'][selected]['pathDir'].replace(
            "{lowerName}", lowerName).replace("{titleName}", titleName).replace("{type_chosen_title}", optionSelectedTitle).replace("{type_chosen_lower}", optionSelectedLower)

    if (pathIsFile == True):
        if os.path.isfile(path):
            print(f'{C}[-] {C}{optionType} já existe!{W}')
            if (stopIfExists == True):
                print(f'{G}[-] {R}{optionType} já existe!{W}')
                sys.exit()
        else:
            with open(path, 'w+') as file:
                file.write('{}\n'.format(
                    body
                ))
                print(
                    f'{G}[-] {G}{optionType} criado(a) com sucesso!{W}')
    else:
        if os.path.isdir(pathDir):
            print(f'{Y}[-] {Y}Examinando o diretório...{W}')
        else:
            os.mkdir(pathDir)

        if os.path.isfile(path):
            print(f'{C}[-] {C}{optionType} já existe!{W}')
            if (stopIfExists == True):
                print(f'{R}[-] {R}{optionType} já existe!{W}')
                sys.exit()
        else:
            with open(path, 'w+') as file:
                file.write('{}\n'.format(
                    body
                ))
                print(
                    f'{G}[-] {G}{optionType} criado(a) com sucesso!{W}')


def createAllObjects(templ_json, titleName, lowerName):
    stopIfExists = False
    seletectedAutomatic = True
    optionID = 0
    global nameCustomCamelCase
    global nameCustomLowerCase

    optionsLength = [{"value": "Create"}, {"value": "FindAll"}, {"value": "FindBy"}, {
        "value": "Update"}, {"value": "Delete"}, {"value": "Custom"}]
    print(f'\n{Y}[!] Choose a option:{W}')
    for item in optionsLength:
        optionName = item['value']
        print(
            f'{G}[{optionsLength.index(item)}] {C}{optionName}{W} - {G}[{optionsLength.index(item)}]')

    optionID = int(input(f'{G}[>] {W}'))

    if (optionID == 5):
        print(
            f'\n{Y}[?] Name in CamelCase{C} (Ex: "UserDetails" or "User" only)')
        nameCustomCamelCase = str(input(f'{G}[>] {W}'))
        print(
            f'\n{Y}[?] Name in LowerCase{C} (Ex: "userDetails" or "user" only)')
        nameCustomLowerCase = str(input(f'{G}[>] {W}'))

    for item in templ_json['templates']:
        sleep(2)
        selected = templ_json["templates"].index(item)

        if (templ_json['templates'][selected]['isObject'] == True):
            createObject(templ_json, selected, titleName,
                         lowerName, stopIfExists, seletectedAutomatic, optionID)


try:
    main()
except KeyboardInterrupt:
    print(f'{R}[-] {C}Keyboard Interrupt.{W}')
