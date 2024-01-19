import mysql.connector  
myconn = mysql.connector.connect(host = "localhost", user = "root",passwd = "shreyas4603",database='fitness')  
cur = myconn.cursor()  
