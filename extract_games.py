#!/usr/bin/env python3

from bs4 import BeautifulSoup
import json

quina_games = []

with open("sena2.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')
    for quina in soup.select('div.mega-sena'):
        current_game = []
        for numeros in quina.select('.numeros-volante'):
            for n in numeros.select('span'):
                current_game.append(n.text)
        quina_games.append(current_game)

with open('mega-sena.json', 'w') as outfile:
    json.dump({"sena" : quina_games }, outfile)