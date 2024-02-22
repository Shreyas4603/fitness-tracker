import db 
import models
import triggers

try:

    db.cur.execute(models.users)
    db.cur.execute(models.diet)
    db.cur.execute(models.exercises)
    db.cur.execute(models.parameters)
    db.cur.execute(models.workouts)
    db.cur.execute(models.profile)
except :  
    print(db.cur)
  



