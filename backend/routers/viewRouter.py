from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Union  # Import necessary types
from datetime import datetime, date
import db
import uuid

cur = db.cur
router = APIRouter()

@router.get("/api/view/get", status_code=200)
def get_view():
    try:
        # Execute the query to fetch data from the database
        cur.execute("SELECT * FROM DietDetails;")
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
