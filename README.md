# AI Help Us 🚀

Service for analyzing images (Node.js + PostgreSQL + Ollama).

## Setup

```bash
git clone https://github.com/kkabanova/ai_help_us.git
cd ai_help_us
docker compose up --build

## API Reference

Request:
```bash
curl --location 'http://localhost:3002/analyze' \
--header 'session-id: test-session-124' \
--header 'Content-Type: application/json' \
--data '{
  "gameAlias": "game1",
  "model": "llava",
  "image": "", // base64 string
  "countryCode": "CY",
  "ip": "127.0.0.1",
  "mode": "real",
  "brandDomain": "example.com",
  "device": "iPhone 16 Pro Max",
  "os": "iOS 18.2"
}
'

Response:
```json
{
    "success": true,
    "sessionId": "test-session-124",
    "gameAlias": "game1",
    "result": "true",
    "reason": "Game screen is clearly visible and playable",
    "model": "llava"
}
```