FROM node:18-slim

# Installa Puppeteer e dipendenze necessarie
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libgbm-dev \
    libgtk-3-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutti i file della directory attuale
COPY . .

# Espone la porta 3000 per il server
EXPOSE 3000

# Comando per avviare il server
CMD ["node", "server.js"]
