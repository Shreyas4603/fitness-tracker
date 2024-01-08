import db 
import models

try:  
    dbs = db.cur.execute(models.users)  
except :  
    print(db.cur)
  


