FROM mingc/android-build-box as builder
COPY . .
RUN bash dos2unix ./gradlew
RUN bash gradlew :app:assembleRelease