FROM  reactnativecommunity/react-native-android as base
WORKDIR /app

FROM base AS development
COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci
COPY . .

FROM development as jest
#RUN npm lint
CMD ["npm","test"]

FROM development AS gradle
RUN cd android && chmod +x gradlew
CMD ["./gradlew","assembleDebug"]


