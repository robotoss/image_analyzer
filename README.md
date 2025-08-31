# AI Help Us 🚀

Service for analyzing images (Node.js + PostgreSQL + Ollama).

## Setup

```bash
git clone https://github.com/kkabanova/ai_help_us.git
cd ai_help_us
docker compose up --build

## API Reference

```http
  POST http://localhost:3002/analyze
```

curl --location 'http://localhost:3002/analyze' \
--header 'session-id: test-session-124' \
--header 'Content-Type: application/json' \
--data '{
  "gameAlias": "test_game_alias",
  "model": "llava",
  "image": "", 
  "countryCode": "CY",
  "ip": "127.0.0.1",
  "mode": "real",
  "brandDomain": "example.com",
  "device": "iPhone 16",
  "os": "iOS 18.2"
}
'

```json
{
    "success": true,
    "sessionId": "test-session-124",
    "gameAlias": "test_game",
    "result": "true",
    "reason": "Game is clearly visible and playable",
    "model": "llava"
}
```