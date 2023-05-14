from fastapi import FastAPI
from controller.capture import capture_router

app = FastAPI()

app.include_router(capture_router)


