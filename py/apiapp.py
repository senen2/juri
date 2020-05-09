# -*- coding: utf-8 -*-
'''
Created on 12/04/2020

@author: Botpi
'''
from apiDB import DB
from subapp import *
from comun import *
from convtexto import *

# import pandas as pd

def Login(email, clave):
    bd = DB(nombrebd="textos")
    usuario = login(email, clave, bd)
    if usuario:
        bd.cierra()
        return usuario
    
    bd.cierra()
    return None

def SubeArchivo(datos):
    bd = DB(nombrebd="textos")
    texto1 = pdf(datos['filename'])
    capitulo = "capitulo 1"
    texto = texto1.replace("'", "''")
    bd.Ejecuta("insert into docs (titulo, num) values('%s', %s)"%(capitulo, datos['num']))
    iddoc = bd.UltimoID()

    text = texto.split('\n')    
    bd.Ejecuta("truncate table parrafos")
    for p in text:
        if p.strip():
            bd.Ejecuta("insert into parrafos (iddoc, texto) values(%s, '%s')"%(iddoc, p))
    bd.cierra()
    return texto

def LeeUltTextoJ(num):
    bd = DB(nombrebd="textos")
    # rows = bd.Ejecuta("select * from docs where num=%s"%num)
    rows = bd.Ejecuta("select parrafos.* from parrafos inner join docs on docs.id=parrafos.iddoc where num=%s"%num)
    bd.cierra()
    return rows

def LeeDocsJ():
    bd = DB(nombrebd="textos")
    rows = bd.Ejecuta("select id as ID, titulo as nombre from docs order by titulo")
    bd.cierra()
    return rows

def LeeDocJ(iddoc):
    bd = DB(nombrebd="textos")
    rows = bd.Ejecuta("select texto from parrafos where iddoc=%s"%iddoc)
    resp = '\n\n'.join([x['texto'] for x in rows])
    bd.cierra()
    return resp



def DespacharP(email, clave, idtextosdo):
    bd = DB(nombrebd="textos")
    usuario = login(email, clave, bd)
    if usuario:
        bd.Ejecuta("update pedicab set pendiente=0 where id=%s"%idpedido)
        usuario["pendientes"] = bd.Ejecuta("""
            select *, telefono, direccion, pedicab.id as ID, 'X' as despachar 
            from pedicab inner join cli on cli.id=pedicab.idcli
            where idprov=%s and pendiente=1
            """%usuario['id'])
        bd.cierra()
        return usuario
    bd.cierra()
    return None

def LeeProvPendP(email, clave):
    bd = DB(nombrebd="textos")
    usuario = login(email, clave, bd)
    if usuario:
        usuario["pendientes"] = bd.Ejecuta("""
            select *, telefono, direccion, pedicab.id as ID, 'X' as despachar 
            from pedicab inner join cli on cli.id=pedicab.idcli
            where idprov=%s and pendiente=1
            """%usuario['id'])
        bd.cierra()
        return usuario
    bd.cierra()
    return None

# def LeePedidoP(email, clave, idpedido):
    bd = DB(nombrebd="textos")
    usuario = login(email, clave, bd)
    if usuario:
        tabla = "prod%s"%usuario['id']
        rows = bd.Ejecuta("""
            select prod.*, cantidad, pedidet.id as idpedidet 
            from pedidet inner join %s as prod on prod.id=pedidet.idproducto
            where pedidet.idpedicab=%s
            """%(tabla, idpedido))
        bd.cierra()
        return rows
    bd.cierra()
    return None

def numero(val):
    val = val.str.replace('.', '').str.replace(',', '.')
    return pd.to_numeric(val, downcast="float") # val.astype(float)

def CambiaCampoP(email, clave, datos):
    # print("llega SubeArchivoP", datos['texto'])
    bd = DB(nombrebd="textos")
    if datos['tabla'] == 'prov':
        usuario = login(email, clave, bd)
        if usuario:
            bd.Ejecuta("update prov set %s='%s' where id=%s"%(datos['nombre'], datos['val'], usuario['id']))
    elif datos['tabla'] == 'cli':
        bd.Ejecuta("update cli set %s='%s' where telefono='%s'"%(datos['nombre'], datos['val'], datos['telefono']))

    bd.cierra()

# cli --------------------------------

def LeeCliP(telefono):
    bd = DB(nombrebd="textos")

    rows = bd.Ejecuta("select * from cli where telefono='%s'"%telefono)
    if not rows:
        bd.Ejecuta("insert into cli (telefono) values ('%s')"%telefono)
        bd.commit()
        rows = bd.Ejecuta("select * from cli where telefono='%s'"%telefono)
    
    if rows:
        response = {}
        response['cli'] = rows[0]
        response['prov'] = bd.Ejecuta("select *, id as ID from prov where activo=1 order by nombre")
        return response

    bd.cierra()

def ReadLikesP(idprov, values):
    bd = DB(nombrebd="textos")
    tabla = "prod%s"%idprov
    v = values.strip()
    if v:
        v = v.split()
        s = "like '%" + v[0] + "%'"
        s = s + ''.join([" and nombre like '%" + x + "%'" for x in v[1:]])
        print("select ID, nombrefrom %s where nombre %s limit 8" % (tabla, s))
        response = bd.Ejecuta("select ID, nombre from %s where nombre %s limit 8" % (tabla, s))
    else:
        response = bd.Ejecuta("select ID, nombre from %s where 1=2"%tabla)
    bd.cierra()
    return response

def LeeProductoP(idprov, idproducto):
    bd = DB(nombrebd="textos")
    tabla = "prod%s"%idprov
    rows = bd.Ejecuta("select * from %s where id='%s'"%(tabla, idproducto))
    if rows:
        return rows[0]

    bd.cierra()

def EnviarPedP(datos):
    bd = DB(nombrebd="textos")
    tabla = "prod%s"%datos['idprov']
    bd.Ejecuta("insert into juricab (idprov, idcli, fecha) values(%s, %s, now())"%(datos['idprov'], datos['idcli']))
    idped = bd.UltimoID()
    s = 0
    for row in datos['ped']:
        bd.Ejecuta("insert into pedidet (idpedicab, idproducto, cantidad, precio) values(%s, %s, %s, %s)"%(idped, row['id'], row['cantidad'], row['precio']))
        s += float(row['cantidad']) * float(row['precio'])
    bd.Ejecuta("update pedicab set valor=%s where id=%s"%(s, idped))

    bd.cierra()    