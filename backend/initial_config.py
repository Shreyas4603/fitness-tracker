import db 
import models

try:  
    params=db.cur.execute(models.parameters)
    dbs = db.cur.execute(models.users)
except :  
    print(db.cur)
  


