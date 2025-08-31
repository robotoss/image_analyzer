Got it ✅ — here’s a clean **English README** with PostgreSQL mentioned, and a section explaining how to configure `.env`.

````markdown
# 🖼️ AI Help Us

A service for analyzing game launch screenshots using **Node.js**, **PostgreSQL**, and **Ollama (LLaVA model)**.
Runs entirely in Docker.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/kkabanova/ai_help_us.git
cd ai_help_us
````

### 2. Configure environment variables

Copy the example `.env` file located in `server/.env` and adjust values if needed:

```env
# ===============================
# Database connection settings
# ===============================
DB_HOST=postgres        # must match service name in docker-compose
DB_USER=myuser          # must match POSTGRES_USER in postgres service
DB_PASSWORD=mypassword  # must match POSTGRES_PASSWORD in postgres service
DB_NAME=mydb            # must match POSTGRES_DB in postgres service

# ===============================
# Ollama AI service settings
# ===============================
OLLAMA_HOST=http://ollama:11434

# ===============================
# Server settings
# ===============================
PORT=3002

# ===============================
# Model settings
# ===============================
OLLAMA_MODEL=llava
```

### 3. Start all services

```bash
docker compose up --build
```

### 4. Install the LLaVA model in Ollama

```bash
docker exec -it ollama ollama pull llava
```

---

## ⚙️ API Reference

### Endpoint

`POST /analyze`

### Example request

```bash
curl --location 'http://localhost:3002/analyze' \
--header 'session-id: test-session-124' \
--header 'Content-Type: application/json' \
--data '{
  "gameAlias": "game1",
  "image": "<BASE64_STRING>",
  "countryCode": "CY",
  "ip": "127.0.0.1",
  "mode": "real",
  "brandDomain": "example.com",
  "device": "iPhone 16 Pro Max",
  "os": "iOS 18.2"
}'
```

### Example response

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

---

## 📦 Tech Stack

* **Node.js** — server logic
* **PostgreSQL** — session storage
* **Ollama (LLaVA)** — image analysis
* **Docker Compose** — container orchestration

---

## 🛠 Requirements

* Docker & Docker Compose installed
* \~4 GB memory available for the **LLaVA model**

---

## ▶️ Usage

Once started with `docker compose up --build`,
the server will be available at:
👉 [http://localhost:3002](http://localhost:3002)

```

Do you want me to also add a **diagram (Markdown + Mermaid)** showing the flow:
`Client → Node.js Server → PostgreSQL & Ollama`?
```
