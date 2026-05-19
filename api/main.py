from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Smart Yurt API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactMessage(BaseModel):
    name: str
    message: str


@app.get("/api/yurt-info")
def get_yurt_info():
    return {
        "title": "Умная Юрта",
        "goals": [
            "Сохранение традиций в современном мире",
            "Использование экологичных материалов",
            "Интеграция умных технологий (датчики температуры, солнечные панели)"
        ],
        "parts": [
            {
                "id": "shanyrak",
                "name": "Шанырак",
                "description": "Сердце юрты, окно в небо и символ домашнего очага."
            },
            {
                "id": "kerege",
                "name": "Кереге",
                "description": "Складные решетчатые стены, основа прочности юрты."
            },
            {
                "id": "uyk",
                "name": "Уык",
                "description": "Жерди, соединяющие кереге и шанырак."
            }
        ]
    }


@app.post("/api/contact")
def submit_contact(msg: ContactMessage):
    # Here you could save to a database or Firebase Admin SDK
    return {"status": "success", "message": f"Спасибо, {msg.name}! Ваше сообщение получено."}
