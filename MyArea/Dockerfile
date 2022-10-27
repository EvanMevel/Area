FROM mingc/android-build-box as builder
COPY . .
RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix gradle/wrapper/*.jar
RUN bash gradlew :app:assembleRelease
#RUN bash ./gradlew :app:assembleRelease
