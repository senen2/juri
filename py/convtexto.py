# -*- coding: latin-1 -*-
'''
Created on 04/05/2020

@author: botpi
'''

import PyPDF2

def pdf(filename):
	file = open(filename, 'rb')
	reader = PyPDF2.PdfFileReader(file)
	page = reader.getPage(2)
	texto = page.extractText()
	return texto
