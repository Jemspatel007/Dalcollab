# Use an official OpenJDK runtime as the base image
FROM openjdk:21-oracle

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file from your target directory into the container
COPY target/Term-0.0.1-SNAPSHOT.jar /app/app.jar

# Exposing the port on which banckend application will run
EXPOSE 8080

# Command to run your Spring Boot application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]