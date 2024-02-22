from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Union  # Import necessary types
from datetime import datetime, date
import db
import uuid
cur = db.cur
router = APIRouter()

PARAMETER_URL = "/api/parameter"


# body model
class paramter(BaseModel):
    weight: float
    height: float
    date: str
    userId: str


class UpdateParameter(BaseModel):
    weight: float
    height: float
    date: str
    parameterId: str


class DeleteParameterRequest(BaseModel):
    parameterId: str


@router.post(PARAMETER_URL + "/add", status_code=200)
def addParameter(body: paramter):
    paramterId = str(uuid.uuid4())
    try:
        cur.execute(
            f'INSERT into parameters values ("{paramterId}","{body.weight}","{body.height}","{body.date}","{body.userId}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ;'
        )
        db.myconn.commit()
        return {"data": paramterId}
    except Exception as E:
        print(E)
        raise HTTPException(status_code=400, detail=str(E))


@router.put(PARAMETER_URL + "/update", status_code=200)
def updateParameter(body: UpdateParameter):
    try:
        cur.execute(
            f'UPDATE parameters SET weight = "{body.weight}", height = "{body.height}", date = "{body.date}",updated_at=CURRENT_TIMESTAMP  WHERE parameterId = "{body.parameterId}";'
        )
        db.myconn.commit()
        return {"message": "Parameter updated successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))


@router.delete(PARAMETER_URL + "/delete", status_code=200)
def deleteParameter(body: DeleteParameterRequest):
    parameterId = body.parameterId
    try:
        cur.execute(f'DELETE FROM parameters WHERE parameterId = "{parameterId}";')
        db.myconn.commit()
        return {"message": "Parameter deleted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))



class GetParametersRequest(BaseModel):
    userId: str

@router.get(PARAMETER_URL + "/getall/{user_id}", response_model=List[Dict[str, Union[str, float]]], status_code=200)
def getAllParameters(user_id: str):
    try:
        cur.execute(f'SELECT parameterId, weight, height, date FROM parameters WHERE userId = "{user_id}";')
        parameters = cur.fetchall()
        return [
            {
                "parameterId": str(param[0]),
                "weight": float(param[1]),
                "height": float(param[2]),
                "date": param[3].strftime("%Y-%m-%d") if isinstance(param[3], date) else None,
            }
            for param in parameters
        ]
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.get(PARAMETER_URL + "/getlatest/{user_id}", response_model=Dict[str, Union[str, float]], status_code=200)
def getLatestParameter(user_id: str):
    try:
        cur.execute(f'SELECT parameterId, weight, height, date FROM parameters WHERE userId = "{user_id}" ORDER BY date DESC LIMIT 1;')
        latest_parameter = cur.fetchone()

        if latest_parameter:
            return {
                "parameterId": str(latest_parameter[0]),
                "weight": float(latest_parameter[1]),
                "height": float(latest_parameter[2]),
                "date": latest_parameter[3].strftime("%Y-%m-%d") if isinstance(latest_parameter[3], date) else None,
            }
        else:
            raise HTTPException(status_code=404, detail="No parameters found for the user.")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
