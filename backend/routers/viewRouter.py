from fastapi import APIRouter, HTTPException,Request
from pydantic import BaseModel
from typing import Dict, List, Union  # Import necessary types
from datetime import datetime, date
import db
import uuid

cur = db.cur
router = APIRouter()
class ViewRequest(BaseModel):
    view_name: str


@router.get("/api/view/getAll", status_code=200)
def get_all():
    try:
        cur.execute("SHOW FULL TABLES IN fitness WHERE TABLE_TYPE LIKE 'VIEW';")
        data = cur.fetchall()
        # Extract view names from the fetched data
        view_names = [row[0] for row in data]
        # Return the view names as JSON response
        return {"data": view_names}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/api/view/get", status_code=200)
def get_view(request: Request, view_req: ViewRequest):
    try:
        view_name = view_req.view_name
        # Execute the query to fetch data from the specified view
        cur.execute(f"SELECT * FROM {view_name};")
        # Fetch all the rows from the result
        rows = cur.fetchall()
        # Create a list to store the formatted data
        data = []
        # Fetch column names from the cursor description
        column_names = [desc[0] for desc in cur.description]
        # Loop through each row
        for row in rows:
            # Create a dictionary to store the dynamic data
            dynamic_data = {}
            # Loop through each column and map it to the corresponding column name
            for column_name, value in zip(column_names, row):
                # Append the extracted information as a key-value pair to the dynamic_data dictionary
                dynamic_data[column_name] = value
            # Append the dynamic_data dictionary to the data list
            data.append(dynamic_data)
        # Return the formatted data
        return {"data": data}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")