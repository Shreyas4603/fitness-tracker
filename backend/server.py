from fastapi import FastAPI
from routers import userRouter, parameterRouter
import initial_config
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3000/register",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(userRouter.router)
app.include_router(parameterRouter.router)
