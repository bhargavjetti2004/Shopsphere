package com.shopsphere.config;

import com.shopsphere.model.*;
import com.shopsphere.repository.CategoryRepository;
import com.shopsphere.repository.ProductRepository;
import com.shopsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        int attempts = 0;
        int maxAttempts = 3;
        while (attempts < maxAttempts) {
            try {
                attempts++;
                seedUsers();
                seedCategories();
                seedProducts();
                return; // success
            } catch (Exception e) {
                System.err.println(">>> DataInitializer attempt " + attempts + " failed: " + e.getMessage());
                if (attempts < maxAttempts) {
                    try {
                        System.out.println(">>> Retrying seed in 5 seconds...");
                        Thread.sleep(5000);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        return;
                    }
                } else {
                    System.err.println(">>> DataInitializer gave up after " + maxAttempts + " attempts. App will start without seed data.");
                }
            }
        }
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // Seed 1 Admin
            User admin = User.builder()
                    .name("ShopSphere Admin")
                    .email("admin@shopsphere.com")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("+1 800 555 0199")
                    .role(ERole.ROLE_ADMIN)
                    .enabled(true)
                    .createdAt(LocalDateTime.now())
                    .build();
            userRepository.save(admin);

            // Seed 5 Customers
            for (int i = 1; i <= 5; i++) {
                User customer = User.builder()
                        .name("Customer User " + i)
                        .email("customer" + i + "@shopsphere.com")
                        .password(passwordEncoder.encode("password123"))
                        .phone("+1 800 555 010" + i)
                        .role(ERole.ROLE_CUSTOMER)
                        .enabled(true)
                        .createdAt(LocalDateTime.now())
                        .build();
                userRepository.save(customer);
            }
            System.out.println(">>> Sample Users Seeded Successfully: 1 Admin & 5 Customers.");
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                    Category.builder().name("Electronics").description("Gadgets, audio, smartphones, and smart devices").imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop").build(),
                    Category.builder().name("Fashion").description("Trendy clothing, luxury footwear, and accessories").imageUrl("https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop").build(),
                    Category.builder().name("Home & Kitchen").description("Furniture, kitchenware, decor, and smart appliances").imageUrl("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop").build(),
                    Category.builder().name("Books").description("Best-sellers, fiction, self-help, and technical literature").imageUrl("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop").build(),
                    Category.builder().name("Sports").description("Fitness gear, athletic apparel, and outdoor equipment").imageUrl("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop").build(),
                    Category.builder().name("Beauty").description("Skincare, cosmetics, perfumes, and self-care essentials").imageUrl("https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop").build()
            );
            categoryRepository.saveAll(categories);
            System.out.println(">>> Sample Categories Seeded: 6 Categories.");
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = Arrays.asList(
                    // Electronics
                    Product.builder().name("boAt Rockerz 550 Over-Ear Wireless Headphones").description("50mm dynamic drivers, 20 hours playback, physical noise isolation, and signature boAt deep bass.").price(1999.0).discount(50.0).brand("boAt").category("Electronics").stock(45).imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop").rating(4.8).reviewCount(1280).build(),
                    Product.builder().name("Noise ColorFit Pulse 3 Bluetooth Calling Smart Watch").description("1.96-inch TFT display, 550 nits brightness, 100+ sports modes, 24x7 heart rate & SpO2 monitoring.").price(1499.0).discount(65.0).brand("Noise").category("Electronics").stock(60).imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop").rating(4.6).reviewCount(940).build(),
                    Product.builder().name("boAt Stone 1200 14W Portable Bluetooth Speaker").description("360-degree stereo sound with RGB LEDs, IPX7 water resistance, and 9 hours playtime for outdoor parties.").price(3499.0).discount(45.0).brand("boAt").category("Electronics").stock(35).imageUrl("https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop").rating(4.7).reviewCount(420).build(),
                    Product.builder().name("Zebronics Zeb-Nitro Mechanical Gaming Keyboard").description("Outemu tactile blue switches, per-key RGB lighting, anti-ghosting keys, and heavy-duty metal top plate.").price(2199.0).discount(40.0).brand("Zebronics").category("Electronics").stock(25).imageUrl("https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop").rating(4.5).reviewCount(315).build(),
                    Product.builder().name("OnePlus Nord CE 3 Lite 5G (8GB RAM, 128GB)").description("108MP primary camera, 67W SUPERVOOC fast charging, 120Hz smooth display, and Snapdragon 695 5G.").price(17499.0).discount(12.0).brand("OnePlus").category("Electronics").stock(18).imageUrl("https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop").rating(4.9).reviewCount(2100).build(),
                    Product.builder().name("Mi 43-inch 4K Ultra HD Smart Google TV").description("Dolby Vision, 30W Dolby Audio stereo speakers, PatchWall with Google TV, and bezel-less metallic design.").price(24999.0).discount(24.0).brand("Xiaomi").category("Electronics").stock(15).imageUrl("https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop").rating(4.7).reviewCount(850).build(),

                    // Fashion
                    Product.builder().name("FabIndia Handcrafted Pure Cotton Long Kurta").description("Breathable handspun cotton kurta featuring Mandarin collar, side slits, and traditional artisanal tailoring.").price(1890.0).discount(20.0).brand("FabIndia").category("Fashion").stock(40).imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop").rating(4.8).reviewCount(420).build(),
                    Product.builder().name("Manyavar Royal Embroidered Wedding Sherwani Set").description("Exquisite zari and thread embroidery on raw silk with matching churidar and brocade stole for wedding occasions.").price(8999.0).discount(30.0).brand("Manyavar").category("Fashion").stock(12).imageUrl("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop").rating(4.9).reviewCount(180).build(),
                    Product.builder().name("Allen Solly Men's Slim Fit Cotton Casual Shirt").description("100% premium combed cotton with button-down collar, contrast inner cuffs, and iconic embroidered stag logo.").price(1249.0).discount(40.0).brand("Allen Solly").category("Fashion").stock(50).imageUrl("https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop").rating(4.6).reviewCount(610).build(),
                    Product.builder().name("Titan Neo Casual Analog Black Dial Men's Watch").description("Classic mineral glass dial with mineral indices, stainless steel mesh strap, and 50m water resistance.").price(4495.0).discount(25.0).brand("Titan").category("Fashion").stock(25).imageUrl("https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop").rating(4.8).reviewCount(730).build(),
                    Product.builder().name("Woodland Men's Camel High-Ankle Nubuck Leather Boots").description("Genuine nubuck leather with shock-absorbing grooved rubber lug sole built for rugged Indian terrain.").price(4295.0).discount(20.0).brand("Woodland").category("Fashion").stock(20).imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop").rating(4.7).reviewCount(512).build(),
                    Product.builder().name("W for Woman Festive Foil Print A-Line Kurti").description("Flared festive rayon kurti with metallic gold foil detailing, round neck, and three-quarter sleeves.").price(1499.0).discount(35.0).brand("W for Woman").category("Fashion").stock(35).imageUrl("https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop").rating(4.6).reviewCount(290).build(),

                    // Home & Kitchen
                    Product.builder().name("Prestige Iris 750W Mixer Grinder (3 Stainless Jars)").description("Heavy duty 750-watt motor, overload protection, 3 stainless steel multi-utility grinding jars + transparent juicer jar.").price(3199.0).discount(45.0).brand("Prestige").category("Home & Kitchen").stock(30).imageUrl("https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&auto=format&fit=crop").rating(4.8).reviewCount(1420).build(),
                    Product.builder().name("Hawkins Futura 5L Hard Anodised Pressure Cooker").description("6.35mm thick base heats quickly and evenly, non-reactive hard anodized surface, pressure locked safety lid.").price(2650.0).discount(15.0).brand("Hawkins").category("Home & Kitchen").stock(40).imageUrl("https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop").rating(4.9).reviewCount(980).build(),
                    Product.builder().name("Milton Thermosteel Duo Deluxe 1000ml Stainless Flask").description("Double walled vacuum insulated flask keeps tea or water piping hot for 24 hours or ice cold all day.").price(999.0).discount(20.0).brand("Milton").category("Home & Kitchen").stock(55).imageUrl("https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop").rating(4.8).reviewCount(870).build(),
                    Product.builder().name("Philips Digital Air Fryer HD9200 Rapid Air Tech").description("Rapid Air technology with up to 90% less oil cooking, 4.1-litre pan capacity, and temperature control preset.").price(6499.0).discount(35.0).brand("Philips").category("Home & Kitchen").stock(18).imageUrl("https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop").rating(4.7).reviewCount(630).build(),
                    Product.builder().name("Pigeon by Stovekraft 3-Burner Glass Top Gas Stove").description("Toughened black glass top, high-efficiency tri-pin brass burners, and spill-proof pan support trays.").price(2899.0).discount(45.0).brand("Pigeon").category("Home & Kitchen").stock(22).imageUrl("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop").rating(4.5).reviewCount(540).build(),
                    Product.builder().name("Usha Striker 1200mm High Speed Decorative Ceiling Fan").description("380 RPM high air delivery with aerodynamic blades, V2 grade copper motor, and gloss powder coat finish.").price(2399.0).discount(25.0).brand("Usha").category("Home & Kitchen").stock(25).imageUrl("https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop").rating(4.6).reviewCount(380).build(),

                    // Books & Stationery
                    Product.builder().name("Wings of Fire: Autobiography of Dr. APJ Abdul Kalam").description("Inspirational autobiography detailing Dr. Kalam's early life, hardships, and leadership of India's space program.").price(295.0).discount(30.0).brand("Universities Press").category("Books").stock(100).imageUrl("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop").rating(4.9).reviewCount(3200).build(),
                    Product.builder().name("Classmate Pulse 6-Subject Spiral Notebook (Pack of 3)").description("300 single-ruled pages with ozone treated chlorine-free paper, movable subject divider pockets.").price(399.0).discount(15.0).brand("ITC Classmate").category("Books").stock(80).imageUrl("https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop").rating(4.8).reviewCount(1150).build(),
                    Product.builder().name("Cello Gripper Ballpoint Pens (Blue, Jar of 25)").description("0.7mm tip for feather-light smooth writing with comfortable elastomeric rubber grip.").price(250.0).discount(15.0).brand("Cello").category("Books").stock(120).imageUrl("https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop").rating(4.8).reviewCount(920).build(),
                    Product.builder().name("Quantitative Aptitude for Competitive Exams - R.S. Aggarwal").description("Comprehensive reference text covering arithmetic, algebra, geometry with 5500+ solved practice questions.").price(549.0).discount(25.0).brand("S. Chand").category("Books").stock(60).imageUrl("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop").rating(4.9).reviewCount(2450).build(),
                    Product.builder().name("The Immortals of Meluha (Shiva Trilogy 1) - Amish Tripathi").description("The national mythological bestseller depicting Shiva's transformation from a Tibetan tribal leader into Mahadev.").price(320.0).discount(25.0).brand("Westland").category("Books").stock(70).imageUrl("https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop").rating(4.8).reviewCount(1850).build(),

                    // Sports & Fitness
                    Product.builder().name("SG Phoenix Kashmir Willow Full Size Cricket Bat").description("Handcrafted selected Kashmir willow with thick edges, curved blade, and Singapore cane handle for power hitting.").price(2499.0).discount(30.0).brand("SG").category("Sports").stock(25).imageUrl("https://images.unsplash.com/photo-1531415074868-036b1c5d53ec?w=800&auto=format&fit=crop").rating(4.8).reviewCount(650).build(),
                    Product.builder().name("Nivia Storm Football Size 5 Rubber Molded").description("32-panel rubber molded outer casing with reinforced latex bladder suited for Indian hard ground and turf play.").price(499.0).discount(30.0).brand("Nivia").category("Sports").stock(50).imageUrl("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop").rating(4.6).reviewCount(820).build(),
                    Product.builder().name("Boldfit TPE 6mm Anti-Skid Yoga Mat with Carry Strap").description("Eco-friendly dual-layer textured non-slip surface, joint cushioning padding, and sweat-resistant waterproof design.").price(899.0).discount(50.0).brand("Boldfit").category("Sports").stock(45).imageUrl("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop").rating(4.7).reviewCount(940).build(),
                    Product.builder().name("Cosco Light Cricket Tennis Ball (Pack of 6)").description("High durable felt cover with consistent bounce and velocity, ideal for colony and box cricket tournaments.").price(420.0).discount(15.0).brand("Cosco").category("Sports").stock(90).imageUrl("https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop").rating(4.7).reviewCount(1100).build(),
                    Product.builder().name("Yonex Muscle Power 29 Lite Badminton Racket").description("Isometric head shape with high modulus graphite shaft, evenly balanced 85g frame for smashes and rapid defense.").price(2290.0).discount(30.0).brand("Yonex").category("Sports").stock(30).imageUrl("https://images.unsplash.com/photo-1617083934555-ac7d4fed8814?w=800&auto=format&fit=crop").rating(4.8).reviewCount(730).build(),
                    Product.builder().name("Kobo Cast Iron Hex Dumbbell Pair (5kg x 2)").description("Solid cast iron encased in tough virgin rubber with ergonomic contoured knurled chrome handle.").price(1799.0).discount(35.0).brand("Kobo").category("Sports").stock(25).imageUrl("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop").rating(4.7).reviewCount(460).build(),

                    // Beauty & Personal Care
                    Product.builder().name("Himalaya Purifying Neem Face Wash 400ml Pump").description("Soap-free herbal formulation with active neem and turmeric cleanses excess oil and prevents acne outbreaks.").price(340.0).discount(20.0).brand("Himalaya").category("Beauty").stock(80).imageUrl("https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop").rating(4.8).reviewCount(2400).build(),
                    Product.builder().name("Mamaearth Onion Hair Oil with Redensyl 250ml").description("Enriched with red onion seed oil and bhringraj to strengthen hair follicles, nourish scalp, and reduce hair thinning.").price(479.0).discount(20.0).brand("Mamaearth").category("Beauty").stock(65).imageUrl("https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop").rating(4.6).reviewCount(1650).build(),
                    Product.builder().name("Forest Essentials Delicate Facial Cleanser Kashmiri Saffron").description("Handcrafted Ayurvedic face cleanser infused with organic neem, kewda, and pure Kashmiri saffron for radiant skin.").price(1550.0).discount(10.0).brand("Forest Essentials").category("Beauty").stock(25).imageUrl("https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop").rating(4.9).reviewCount(380).build(),
                    Product.builder().name("Biotique Morning Nectar Flawless Skin Moisturizer 200ml").description("Nourishing honey and seaweed nectar lotion revitalizes and hydrates skin cells for all-day luminous radiance.").price(210.0).discount(30.0).brand("Biotique").category("Beauty").stock(70).imageUrl("https://images.unsplash.com/photo-1608248597261-833244675b16?w=800&auto=format&fit=crop").rating(4.5).reviewCount(890).build(),
                    Product.builder().name("Lakmé Eyeconic 24Hr Waterproof Smudge-Proof Kajal").description("Deep black dermatologically tested intense eye pencil with 24-hour long stay and smudge-proof formula.").price(199.0).discount(25.0).brand("Lakmé").category("Beauty").stock(90).imageUrl("https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop").rating(4.7).reviewCount(1420).build()
            );

            productRepository.saveAll(products);
            System.out.println(">>> Sample Indian Products Seeded: 35 Authentic Products across 6 categories in INR.");
        }
    }
}
