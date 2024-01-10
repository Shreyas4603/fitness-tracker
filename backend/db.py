import mysql.connector  
myconn = mysql.connector.connect(host = "localhost", user = "root",passwd = "password",database='fitness')  
cur = myconn.cursor()  
