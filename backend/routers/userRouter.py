from fastapi import APIRouter,Path,Request,HTTPException
from pydantic import BaseModel
import uuid
import re
import db
import bcrypt

cur=db.cur
router=APIRouter()


USER_URL="/api/user"

#For body
class loginCreds(BaseModel):
    email:str
    password:str

class registerCreds(BaseModel):
    email:str
    password:str
    name:str
    gender:str



#util functions
def generatePassword(password):
    bytes = password.encode('utf-8') 
    salt = bcrypt.gensalt() 
    hash = bcrypt.hashpw(bytes, salt)

    return hash


@router.post(USER_URL+"/login",status_code=200  )
def userLogin(body:loginCreds):
    cur.execute(f'SELECT password FROM users where  email="{body.email}" ; ' )
    data = cur.fetchone()
    if(data):
        password=data[0]
        userBytes = body.password.encode('utf-8') 
        result = bcrypt.checkpw(userBytes, password.encode('utf-8')) 
        if(result):
            cur.execute(f'SELECT userId,username,email FROM users where  email="{body.email}" ; ' )
            data = cur.fetchone()
            pid,username,email=data
            return ({"data":{
                'pid':pid,
                'username':username,
                'email':email
            }})
 
        else:
            raise HTTPException(status_code=401, detail="Incorrect password")

            
    else:
        raise HTTPException(status_code=401, detail="Check email and password")

        
    

@router.post(USER_URL+"/register",status_code=200)
def userRegister(body:registerCreds):
    user_uuid = str(uuid.uuid4())  

    email_pattern = re.compile(r"[^\s@]+@[^\s@]+\.[^\s@]+")

    cur.execute(f'SELECT userId FROM users where userName="{body.name}" or email="{body.email}" ; ' )
    data = cur.fetchone()
     
    if data:
        raise HTTPException(status_code=400, detail="Username already exists")

        
    
    if not email_pattern.match(body.email):
        raise HTTPException(status_code=400, detail="Invalid Email")

    
    if(body.gender !="male" and body.gender!="female"):
        raise HTTPException(status_code=400, detail="Invalid gender")

        


    else:
        cur.execute(f'INSERT into users (userId, userName, email, password, gender, created_at, updated_at) values ("{user_uuid}","{body.name}","{body.email}","{generatePassword(body.password).decode("utf-8")}","{body.gender}", NOW(), NOW()) ;' )
        db.myconn.commit()
        return({"data": user_uuid})
    
