from fastapi import FastAPI
from routers import userRouter
import initial_config
app=FastAPI()

app.include_router(userRouter.router)