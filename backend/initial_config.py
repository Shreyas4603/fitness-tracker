import db 
import models

try:
    db.cur.execute(models.exercises)
    db.cur.execute(models.users)
    db.cur.execute(models.parameters)

except :  
    print(db.cur)
  



