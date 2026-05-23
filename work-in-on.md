```
                    ┌────────────────────┐
                    │ React Frontend     │
                    │ Dashboard/UI       │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ FastAPI Backend    │
                    │ API Gateway        │
                    └─────────┬──────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼

 ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
 │ Threat Engine  │  │ AI Pipeline    │  │ Storage Layer  │
 └────────────────┘  └────────────────┘  └────────────────┘

 Threat Engine:      AI Pipeline:         Storage:
 - URL analyzer      - Ollama             - PostgreSQL
 - Scam detector     - Gemini fallback    - ChromaDB
 - Extension scan    - OCR                - Redis cache
 - Risk scoring      - Embeddings
```
