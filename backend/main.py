from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import traceback
import pandas as pd

from sentiment_analyzer import analyse_sentiment
from analyzer import analyze_data
from recommender import generate_recommendations
from gemini_ai import generate_ai_summary, chat_with_ai

app = FastAPI(
    title="AI Innovation Radar Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class ChatRequest(BaseModel):
    question: str
    analysis: Optional[dict] = None


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Innovation Radar Backend"
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        if file.filename.endswith(".csv"):
            df = pd.read_csv(file_path)

        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file_path)

        else:
            raise HTTPException(
                status_code=400,
                detail="Only CSV and Excel files are supported."
            )

        analysis = analyze_data(df)

        sentiment = analyse_sentiment(df)

        ai_output = generate_recommendations(df)

        ai_summary = generate_ai_summary(analysis)

        return {
            "status": "success",
            "filename": file.filename,
            "analysis": analysis,
            "summary": ai_output["summary"],
            "recommendations": ai_output["recommendations"],
            "ai_summary": ai_summary,
            "sentiment": sentiment,
        }

    except HTTPException:
        raise

    except Exception as e:
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/chat")
def chat(request: ChatRequest):
    try:

        if request.analysis is None:
            return {
                "answer": "Please upload a dataset first before asking questions."
            }

        answer = chat_with_ai(
            request.question,
            request.analysis
        )

        return {
            "answer": answer
        }

    except Exception as e:
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )   