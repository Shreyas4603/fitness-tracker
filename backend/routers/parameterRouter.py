from fastapi import APIRouter, Path, Request, HTTPException
from pydantic import BaseModel
import uuid

import db


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


@router.post(PARAMETER_URL + "/add", status_code=200)
def addParameter(body: paramter):
    paramterId = str(uuid.uuid4())
    try:
        cur.execute(
            f'INSERT into parameters values ("{paramterId}","{body.weight}","{body.height}","{body.date}","{body.userId}") ;'
        )
        db.myconn.commit()
        return {"data": paramterId}
    except Exception as E:
        print(E)
        raise HTTPException(status_code=400, detail=str(E))

from fastapi import HTTPException

@router.put(PARAMETER_URL + "/update", status_code=200)
def updateParameter(body: UpdateParameter):
    try:
        cur.execute(
            f'UPDATE parameters SET weight = "{body.weight}", height = "{body.height}", date = "{body.date}" WHERE parameterId = "{body.parameterId}";'
        )
        db.myconn.commit()
        return {"message": "Parameter updated successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

