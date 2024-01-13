import mysql.connector  
myconn = mysql.connector.connect(host = "localhost", user = "root",passwd = "rakstar69",database='fitness')
cur = myconn.cursor()

