from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Union  # Import necessary types
from datetime import datetime, date
import db
import uuid

cur = db.cur
router = APIRouter()

EXERCISE_URL = "/api/exercise"


class Exercise(BaseModel):
    userId: str
    exerciseName: str
    duration: float
    distance: float
    calories: float
    achievement: bool


class UpdateExcercise(BaseModel):
    exerciseName: str
    duration: float
    distance: float
    calories: float
    achievement: bool
    exerciseId: str


class DeleteExerciseRequest(BaseModel):
    exerciseId: str


@router.post(EXERCISE_URL + "/add", status_code=200)
def addExercise(exercise: Exercise):
    exerciseId = str(uuid.uuid4())
    try:
        cur.execute(
            f"INSERT INTO exercises (exerciseId, userId, exerciseName, duration, distance, calories, achievement, created_at, updated_at) "
            f'VALUES ("{exerciseId}", "{exercise.userId}", "{exercise.exerciseName}", {exercise.duration}, '
            f'{exercise.distance}, {exercise.calories}, {int(exercise.achievement)}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);'
        )
        db.myconn.commit()
        return {"data": exerciseId}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))


@router.put(EXERCISE_URL + "/update", status_code=200)
def updateExercise(body: UpdateExcercise):
    print(int(body.achievement))
    try:
        cur.execute(
            f'UPDATE exercises SET exerciseName = "{body.exerciseName}", duration = {body.duration}, distance = {body.distance},calories="{body.calories}", achievement="{int(body.achievement)}" ,updated_at=CURRENT_TIMESTAMP  WHERE exerciseId = "{body.exerciseId}";'
        )
        db.myconn.commit()
        return {"message": "Excercise updated successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))


@router.get(
    EXERCISE_URL + "/getall/{user_id}",
    response_model=List[Dict[str, Union[str, float, bool]]],
    status_code=200,
)
def getAllExercises(user_id: str):
    try:
        cur.execute(
            f"SELECT exerciseId, userId, exerciseName, duration, distance, calories, achievement "
            f'FROM exercises WHERE userId = "{user_id}";'
        )
        exercises = cur.fetchall()
        return [
            {
                "exerciseId": str(exercise[0]),
                "userId": exercise[1],
                "exerciseName": exercise[2],
                "duration": exercise[3],
                "distance": exercise[4],
                "calories": float(exercise[5]),
                "achievement": bool(exercise[6]),
            }
            for exercise in exercises
        ]
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.delete(EXERCISE_URL + "/delete", status_code=200)
def deleteParameter(body: DeleteExerciseRequest):
    exerciseId = body.exerciseId
    try:
        cur.execute(f'DELETE FROM exercises WHERE exerciseId = "{exerciseId}";')
        db.myconn.commit()
        return {"message": "Exercise deleted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))
