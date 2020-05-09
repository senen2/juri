# -*- coding: utf-8 -*-
'''
Created on 04/05/2020

@author: botpi
'''

import tika
from tika import parser

def pdf(filename):
	tika.initVM()
	file = parser.from_file(filename)
	texto = file['content']
	texto = texto.replace('\n\n', '¬').replace('\n', '').replace('¬', '\n\n')
	return texto
