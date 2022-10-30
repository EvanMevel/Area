FROM mingc/android-build-box as builder
COPY . .
RUN apt update
RUN apt install -y dos2unix
RUN dos2unix ./gradlew
RUN bash gradlew :app:assembleRelease