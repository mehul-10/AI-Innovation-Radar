from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_ai_summary(analysis):

    prompt = f"""
You are an AI Business Intelligence Analyst.

Analyze this dataset.

Dataset:
{analysis}

Return ONLY valid JSON.

Format:

{{
    "executive_summary":"...",
    "risks":[
        "...",
        "...",
        "..."
    ],
    "opportunities":[
        "...",
        "...",
        "..."
    ],
    "trends":[
        "...",
        "...",
        "..."
    ],
    "actions":[
        "...",
        "...",
        "..."
    ]
}}

Return JSON only.
Do not use markdown.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:

        print("Gemini Summary Error:", e)

        return {
            "executive_summary": "AI summary unavailable because Gemini API is currently unavailable or the quota has been exceeded.",
            "risks": [],
            "opportunities": [],
            "trends": [],
            "actions": [],
        }


def chat_with_ai(question, analysis):

    prompt = f"""
You are an AI Data Analyst.

Dataset Analysis:
{analysis}

Answer ONLY using the information available in the dataset analysis.

If the user asks anything unrelated to the uploaded dataset,
politely tell them you can only answer questions about the uploaded dataset.

User Question:
{question}

Keep the answer concise.
Maximum 150 words.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        return response.text.strip()

    except Exception as e:

        print("Gemini Chat Error:", e)

        return "Sorry, Gemini API is currently unavailable or your API quota has been exceeded. Please try again later."