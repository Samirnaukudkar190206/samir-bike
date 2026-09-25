# Stage 1: Build & Dependencies
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install all dependencies (including devDependencies needed for vite build)
RUN npm ci

# Copy application source code
COPY . .

# Build the client bundle with Vite
RUN npm run build

# Stage 2: Production Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled frontend from builder
COPY --from=builder /app/dist ./dist

# Copy backend server code and data
COPY server.ts ./
COPY server ./server
COPY data ./data

EXPOSE 3000

# Start server using tsx
CMD ["npm", "start"]
