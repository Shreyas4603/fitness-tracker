from fastapi import FastAPI
from routers import userRouter, parameterRouter
import initial_config

app = FastAPI()

app.include_router(userRouter.router)
app.include_router(parameterRouter.router)
