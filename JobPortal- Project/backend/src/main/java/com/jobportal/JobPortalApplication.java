package com.jobportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.persistence.*;
import java.util.List;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@SpringBootApplication
public class JobPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPortalApplication.class, args);
        System.out.println("Spring Boot Application Started.");
        
        System.out.println("--- Running Raw JDBC Demonstration ---");
        String url = "jdbc:mysql://localhost:3306/jobportal";
        String user = "root";
        String password = "1234";

        try (Connection connection = DriverManager.getConnection(url, user, password);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT id, title, company, location FROM jobs")) {

            System.out.println("JDBC Connection successful!");
            System.out.println("\n--- Job Listings in Database (via JDBC) ---");
            while (resultSet.next()) {
                System.out.printf("ID: %d | Title: %s | Company: %s | Location: %s%n", 
                                  resultSet.getInt("id"), resultSet.getString("title"), 
                                  resultSet.getString("company"), resultSet.getString("location"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }
}

@Repository
interface JobRepository extends JpaRepository<Job, Long> {
}

@Entity
@Table(name = "jobs")
class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String location;
    private String type;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Job() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
