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
        "description": "Инновационный проект, объединяющий многовековые традиции кочевников Великой Степи с передовыми технологиями интернета вещей и умного дома.",
        "goals": [
            {
                "title": "Сохранение традиций",
                "description": "Объединение древних архитектурных принципов юрты с современными технологиями для создания умного жилища будущего."
            },
            {
                "title": "Экологичность",
                "description": "Использование экологически чистых материалов, солнечных панелей и энергоэффективных систем управления."
            },
            {
                "title": "Автономность и контроль",
                "description": "Интеграция IoT-устройств (датчики, Arduino, ESP) с управлением через Telegram-бота для полного контроля всех систем."
            }
        ],
        "technologies": [
            "Arduino + ESP8266/ESP32",
            "Датчик температуры и влажности DHT22",
            "RFID-сканер (RC522)",
            "RGB LED + светодиодная лента WS2812",
            "Пассивный бузер",
            "Telegram Bot API",
            "Python FastAPI",
            "React 19 + Three.js для 3D визуализации"
        ],
        "parts": [
            {
                "id": "shanyrak",
                "name": "Шанырак",
                "description": "Архитектурный элемент — окно в небо и символ домашнего очага. Предназначен как верхний купол юрты.",
                "features": [
                    "Архитектурный каркас",
                    "Естественная вентиляция",
                    "Символический элемент традиционной юрты"
                ]
            },
            {
                "id": "kerege",
                "name": "Кереге",
                "description": "Складные решетчатые стены из картона с централизованной архитектурой. Содержит основные компоненты системы умного дома.",
                "features": [
                    "Датчик температуры и влажности (DHT22) — управление через Telegram бота",
                    "RFID-сканер (RC522) — открытие при правильной карточке, зелёный LED + звуковой сигнал при успехе",
                    "Красный LED + альтернативная мелодия при неправильном коде",
                    "RGB светодиод (WS2812) — управление цветом через Telegram",
                    "Светодиодная лента для общей подсветки",
                    "Интегрированная система мониторинга и контроля"
                ]
            },
            {
                "id": "uyk",
                "name": "Уык",
                "description": "Основание юрты, под которым расположена вся централизованная техника и коммутация. Скрывает провода и контроллеры.",
                "features": [
                    "Arduino-контроллер для управления датчиками",
                    "ESP8266/ESP32 для WiFi-подключения",
                    "Распределение проводки и питания",
                    "Бузер для звуковых сигналов",
                    "Централизованное управление всеми компонентами",
                    "Интеграция с Telegram Bot API"
                ]
            }
        ]
    }


@app.post("/api/contact")
def submit_contact(msg: ContactMessage):
    # Here you could save to a database or Firebase Admin SDK
    return {"status": "success", "message": f"Спасибо, {msg.name}! Ваше сообщение получено."}
