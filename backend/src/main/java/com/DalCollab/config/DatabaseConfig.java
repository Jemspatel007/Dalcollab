package com.DalCollab.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.sql.DataSource;
import java.util.Map;

@Configuration
public class DatabaseConfig {

    @Value("${aws.access.key}")
    private String accessKeyId;

    @Value("${aws.secret.key}")
    private String secretKey;

    @Value("${aws.session.token}}")
    private String accessToken;

    @Value("${aws.secret.manager.name}")
    private String secretName;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Bean
    public DataSource dataSource() {

        Map<String, String> dbDetails = getSecret();
        String dbUrl = dbDetails.get("host");
        String dbUser = dbDetails.get("username");
        String dbPassword = dbDetails.get("password");

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        // dataSource.setUrl("jdbc:mysql://" + dbUrl + ":3306/dalcollab");
        dataSource.setUrl("jdbc:mysql://" + dbUrl + ":3306/Dalcollab");
        dataSource.setUsername(dbUser);
        dataSource.setPassword(dbPassword);

        return dataSource;
    }

    private Map<String, String> getSecret() {
        Region region = Region.US_EAST_1;
        SecretsManagerClient client = SecretsManagerClient.builder()
                .region(region)
                .credentialsProvider(StaticCredentialsProvider.create(AwsSessionCredentials.create(accessKeyId, secretKey, accessToken)))
                .build();

        GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                .secretId(secretName)
                .build();

        GetSecretValueResponse getSecretValueResponse = client.getSecretValue(getSecretValueRequest);

        String secret = getSecretValueResponse.secretString();

        try {
            return objectMapper.readValue(secret, new TypeReference<Map<String, String>>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing secret JSON", e);
        }
    }
}