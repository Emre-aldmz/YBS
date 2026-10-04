# ---------- Build Stage ----------
FROM python:3.12-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --target=/app/deps -r requirements.txt

# ---------- Runtime Stage ----------
FROM python:3.12-slim

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /app/deps /app/deps
ENV PYTHONPATH="/app/deps:${PYTHONPATH}"

# Copy application code
COPY app/ ./app/

# Cloud Run uses PORT environment variable (default 8080)
ENV PORT=8080

EXPOSE ${PORT}

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
