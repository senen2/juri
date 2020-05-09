# -*- coding: utf-8 -*-
'''
Created on 04/05/2020

@author: botpi
'''

# import PyPDF2
import tika
from tika import parser

def pdf(filename):
	tika.initVM()
	file = parser.from_file(filename)
	texto = file['content']
	texto = texto.replace('\n\n', '¬').replace('\n', '').replace('¬', '\n\n')
	return texto

def pdf0(filename):
	file = open(filename, 'rb')
	reader = PyPDF2.PdfFileReader(file)
	page = reader.getPage(2)
	texto = page.extractText()
	return texto

def pdf1(filename):
	file = open(filename, 'rb')
	reader = PyPDF2.PdfFileReader(file)
	count = reader.numPages
	texto = ''
	for i in range(count):
	    page = reader.getPage(i)
	    texto += page.extractText()	
	return texto
