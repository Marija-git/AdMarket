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
import java.util.Map;
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

                // Imena korisnika koji će biti username i password
                List<String> usernames = List.of("marko", "ana", "jovana", "nikola", "milica",
                        "petar", "ivana", "dusan", "sofia", "luka");

                List<User> users = new ArrayList<>();

                for (String username : usernames) {
                    User user = User.builder()
                            .username(username)
                            .password(passwordEncoder.encode(username)) // password = username
                            .phone("0601234" + new Random().nextInt(1000))
                            .role("ROLE_USER")
                            .registrationDate(LocalDate.now().minusDays(new Random().nextInt(30)))
                            .build();
                    users.add(userRepository.save(user));
                }


                Map<Category, List<String>> sampleTitles = Map.of(
                        Category.CLOTHING, List.of("Leather Jacket", "Winter Coat", "Vintage Jeans"),
                        Category.TOOLS, List.of("Power Drill", "Tool Set", "Electric Saw"),
                        Category.SPORTS, List.of("Football Shoes", "Tennis Racket", "Mountain Bike"),
                        Category.ACCESSORIES, List.of("Sunglasses", "Leather Wallet", "Smartwatch"),
                        Category.FURNITURE, List.of("Wooden Table", "Sofa", "Bookshelf"),
                        Category.PETS, List.of("Dog Bed", "Cat Toys", "Bird Cage"),
                        Category.GAMES, List.of("PlayStation 5", "Board Game", "Gaming Mouse"),
                        Category.BOOKS, List.of("Crime Novel", "Cookbook", "Fantasy Trilogy"),
                        Category.TECHNOLOGY, List.of("Smartphone", "Laptop", "Bluetooth Speaker")
                );

                Map<Category, String> imageUrls = Map.of(
                        Category.CLOTHING, "https://picsum.photos/seed/clothing/400/300",
                        Category.TOOLS, "https://picsum.photos/seed/tools/400/300",
                        Category.SPORTS, "https://picsum.photos/seed/sports/400/300",
                        Category.ACCESSORIES, "https://picsum.photos/seed/accessories/400/300",
                        Category.FURNITURE, "https://picsum.photos/seed/furniture/400/300",
                        Category.PETS, "https://picsum.photos/seed/pets/400/300",
                        Category.GAMES, "https://picsum.photos/seed/games/400/300",
                        Category.BOOKS, "https://picsum.photos/seed/books/400/300",
                        Category.TECHNOLOGY, "https://picsum.photos/seed/technology/400/300"
                );


                List<Ad> ads = new ArrayList<>();
                Random random = new Random();

                for (int i = 0; i < 100; i++) {
                    Category category = Category.values()[random.nextInt(Category.values().length)];
                    List<String> titles = sampleTitles.get(category);
                    String title = titles.get(random.nextInt(titles.size()));
                    String imageUrl = imageUrls.get(category) + "?sig=" + i;


                    Ad ad = Ad.builder()
                            .title(title)
                            .description("Great deal on: " + title)
                            .imageUrl(imageUrl)
                            .price(BigDecimal.valueOf(10 + random.nextInt(490)))
                            .category(category)
                            .city("City" + (i % 5 + 1))
                            .datePosted(LocalDate.now().minusDays(random.nextInt(30)))
                            .user(users.get(random.nextInt(users.size())))
                            .build();

                    ads.add(ad);
                }

                adRepository.saveAll(ads);
                System.out.println("Seeded " + users.size() + " users and " + ads.size() + " ads.");
            }
        };
    }
}
