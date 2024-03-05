from fastapi import FastAPI
from routers import userRouter, parameterRouter,exerciseRouter,workoutRouter,dietRouter,profileRouter,viewRouter
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
app.include_router(exerciseRouter.router)
app.include_router(workoutRouter.router)
app.include_router(dietRouter.router)
app.include_router(profileRouter.router)
app.include_router(viewRouter.router)

