import db 
import models

try:
    dbs = db.cur.execute(models.users)
    params= db.cur.execute(models.parameters)

except :  
    print(db.cur)
  



