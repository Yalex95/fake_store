

ARG NODE_VERSION=20.19.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app
#############################################################
FROM base as deps
# Copiamos package.json y package-lock.json
COPY package*.json ./
# Instalamos solo dependencias de producción
RUN npm ci 
###################################################
FROM deps as build


# COPY --from=deps /app/node_modules ./node_modules

# Copiamos todo el código fuente
COPY . .
# Copiamos explícitamente la carpeta prisma por si el contexto no la incluye
COPY prisma ./prisma
# Debug opcional (quítalo después de confirmar que existe el schema en el contenedor)
RUN ls -la /app && ls -la /app/prisma

RUN npx prisma generate 
# RUN npx prisma migrate deploy --schema=./prisma/schema.prisma
# Run the build script.
RUN npm run build
#######################################################################

# FROM base as final
FROM node:${NODE_VERSION}-alpine AS final

WORKDIR /app
ENV NODE_ENV=production

# Use production node environment by default.
# ENV NODE_ENV production
COPY --from=build /app/.output ./.output
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

# Permisos para el usuario node
RUN chown -R node:node /app
USER node
# Exponemos puerto
EXPOSE 3000
# CMD node index.js
# CMD ["sh", "-c", "npx prisma migrate deploy && node .output/server/index.mjs"]
CMD ["node", ".output/server/index.mjs"]