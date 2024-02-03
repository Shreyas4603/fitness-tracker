from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Union
from datetime import date
import db
import uuid

cur = db.cur
router = APIRouter()

DIET_URL = "/api/diet"

class Diet(BaseModel):
    userid: str
    mealType: str
    protein: float
    calories: float
    date: str

class UpdateDiet(BaseModel):
    mealType: str
    protein: float
    calories: float
    date: str
    dietId: str

class DeleteDietRequest(BaseModel):
    dietId: str

# Routes
@router.post(DIET_URL + "/add", status_code=200)
def addDiet(body: Diet):
    dietId = str(uuid.uuid4())
    try:
        db.cur.execute(
            f'INSERT into diet values ("{dietId}","{body.userid}","{body.mealType}",{body.protein},{body.calories},"{body.date}");'
        )
        db.myconn.commit()
        return {"data": dietId}
    except Exception as E:
        print(E)
        raise HTTPException(status_code=400, detail=str(E))

@router.put(DIET_URL + "/update", status_code=200)
def updateDiet(body: UpdateDiet):
    try:
        db.cur.execute(
            f'UPDATE diet SET mealType = "{body.mealType}", protein = {body.protein}, calories = {body.calories}, date = "{body.date}" WHERE dietId = "{body.dietId}";'
        )
        db.myconn.commit()
        return {"message": "Diet updated successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@router.delete(DIET_URL + "/delete", status_code=200)
def deleteDiet(body: DeleteDietRequest):
    dietId = body.dietId
    try:
        db.cur.execute(f'DELETE FROM diet WHERE dietId = "{dietId}";')
        db.myconn.commit()
        return {"message": "Diet deleted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@router.get(DIET_URL + "/getall/{user_id}", response_model=List[Dict[str, Union[str, float]]], status_code=200)
def getAllDiets(user_id: str):
    try:
        db.cur.execute(f'SELECT dietId, mealType, protein, calories, date FROM diet WHERE userid = "{user_id}";')
        diets = db.cur.fetchall()
        return [
            {
                "dietId": str(diet[0]),
                "mealType": diet[1],
                "protein": float(diet[2]),
                "calories": float(diet[3]),
                "date": diet[4].strftime("%Y-%m-%d") if isinstance(diet[4], date) else None,
            }
            for diet in diets
        ]
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
