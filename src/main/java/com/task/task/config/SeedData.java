package com.task.task.config;
import com.task.task.entities.Ad;
import com.task.task.entities.User;
import com.task.task.enums.Category;
import com.task.task.repositories.Interfaces.IAdRepository;
import com.task.task.repositories.Interfaces.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
@RequiredArgsConstructor
public class SeedData {

    private final IUserRepository userRepository;
    private final IAdRepository adRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedDatabase() {
        return args -> {
            if (userRepository.count() == 0 && adRepository.count() == 0) {
                List<User> users = new ArrayList<>();

                for (int i = 1; i <= 10; i++) {
                    User user = User.builder()
                            .username("user" + i)
                            .password(passwordEncoder.encode("password" + i))
                            .phone("06012345" + i)
                            .role("ROLE_USER")
                            .registrationDate(LocalDate.now().minusDays(i))
                            .build();
                    users.add(userRepository.save(user));
                }

                Random random = new Random();
                List<Ad> ads = new ArrayList<>();

                for (int i = 1; i <= 100; i++) {
                    User randomUser = users.get(random.nextInt(users.size()));

                    Ad ad = Ad.builder()
                            .title("Ad Title " + i)
                            .description("Ad description " + i)
                            .imageUrl("https://picsum.photos/200?random=" + i)
                            .price(BigDecimal.valueOf(random.nextInt(500) + 10))
                            .category(Category.values()[random.nextInt(Category.values().length)])
                            .city("City" + (i % 5 + 1))
                            .datePosted(LocalDate.now().minusDays(random.nextInt(30)))
                            .user(randomUser)
                            .build();

                    ads.add(ad);
                }

                adRepository.saveAll(ads);
                System.out.println("Seeded 10 users and 100 ads.");
            }
        };
    }
}
