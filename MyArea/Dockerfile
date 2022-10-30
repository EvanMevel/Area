FROM mingc/android-build-box as builder
COPY . /app/
WORKDIR /app
RUN apt update
RUN apt install -y dos2unix
RUN dos2unix ./gradlew
RUN bash gradlew :app:assembleRelease
RUN mv /app/app/build/outputs/apk/release/app-release.apk /result/mobile.apk