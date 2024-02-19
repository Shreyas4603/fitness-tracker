from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Union  # Import necessary types
from datetime import datetime, date
import db
import uuid
cur = db.cur
router = APIRouter()

PROFILE_URL = "/api/profile"

@router.get(PROFILE_URL + "/get/{user_id}", status_code=200)
def getProfile(user_id: str):
    try:
        db.cur.execute(f'SELECT  name, email, latest_height, latest_weight, total_achievements FROM profile WHERE userid = "{user_id}";')
        profile = db.cur.fetchone()
        name, email, latest_height, latest_weight, total_achievements=profile
        return {"data":{
            'name':name, 
            'email':email, 
            'latest_height':latest_height, 
            'latest_weight':latest_weight, 
            'total_achievements':total_achievements
        }}
           
            
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
