import db 
import models

try:
    db.cur.execute(models.users)
    db.cur.execute(models.diet)
    db.cur.execute(models.exercises)
    db.cur.execute(models.parameters)
    db.cur.execute(models.workouts)


except :  
    print(db.cur)
  



