from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Union  # Import necessary types
from datetime import datetime, date
import db
import uuid
cur = db.cur
router = APIRouter()

WORKOUT_URL = "/api/workout"

class Workout(BaseModel):
    userid: str
    workoutName: str
    reps: int
    weight: int
    date: str
    achievement: bool

class UpdateWorkout(BaseModel):
    workoutName: str
    reps: int
    weight: int
    date: str
    achievement: bool
    workoutId: str

class DeleteWorkoutRequest(BaseModel):
    workoutId: str


# Routes
@router.post(WORKOUT_URL + "/add", status_code=200)
def addWorkout(body: Workout):
    workoutId = str(uuid.uuid4())
    try:
        db.cur.execute(
            f'INSERT into workouts values ("{workoutId}","{body.userid}","{body.workoutName}",{body.reps},{body.weight},"{body.date}",{body.achievement}) ;'
        )
        db.myconn.commit()
        return {"data": workoutId}
    except Exception as E:
        print(E)
        raise HTTPException(status_code=400, detail=str(E))
    
@router.put(WORKOUT_URL + "/update", status_code=200)
def updateWorkout(body: UpdateWorkout):
    try:
        db.cur.execute(
            f'UPDATE workouts SET workoutName = "{body.workoutName}", reps = {body.reps}, weight = {body.weight}, date = "{body.date}", achievement = {body.achievement} WHERE workoutId = "{body.workoutId}";'
        )
        db.myconn.commit()
        return {"message": "Workout updated successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete(WORKOUT_URL + "/delete", status_code=200)
def deleteWorkout(body: DeleteWorkoutRequest):
    workoutId = body.workoutId
    try:
        db.cur.execute(f'DELETE FROM workouts WHERE workoutId = "{workoutId}";')
        db.myconn.commit()
        return {"message": "Workout deleted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))
@router.get(WORKOUT_URL + "/getall/{user_id}", response_model=List[Dict[str, Union[str, int, bool]]], status_code=200)
def getAllWorkouts(user_id: str):
    try:
        db.cur.execute(f'SELECT workoutId, workoutName, reps, weight, date, achievement FROM workouts WHERE userid = "{user_id}";')
        workouts = db.cur.fetchall()
        return [
            {
                "workoutId": str(workout[0]),
                "workoutName": workout[1],
                "reps": int(workout[2]),
                "weight": int(workout[3]),
                "date": workout[4].strftime("%Y-%m-%d") if isinstance(workout[4], date) else None,
                "achievement": bool(workout[5]),
            }
            for workout in workouts
        ]
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
