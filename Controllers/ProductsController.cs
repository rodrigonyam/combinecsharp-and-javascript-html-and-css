using Microsoft.AspNetCore.Mvc;
using RetailWebsite.Models;

namespace RetailWebsite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static List<Product> products = new List<Product>
        {
            // Nursing 
            new Product { Id = 1, Name = "Disposable Syringes 10ml", Description = "Box of 100 sterile disposable syringes with safety needles", Price = 24.99m, ImageUrl = "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400", Category = "Nursing Supplies", Stock = 150, Rating = 4.7 },
            new Product { Id = 2, Name = "Blood Pressure Cuff", Description = "Professional aneroid sphygmomanometer with stethoscope kit", Price = 45.99m, ImageUrl = "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400", Category = "Nursing Supplies", Stock = 80, Rating = 4.6 },
            new Product { Id = 3, Name = "Gauze Pads Sterile 4x4", Description = "Box of 200 sterile gauze pads for wound care", Price = 18.99m, ImageUrl = "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400", Category = "Nursing Supplies", Stock = 200, Rating = 4.5 },
            new Product { Id = 4, Name = "IV Catheter Set", Description = "Pack of 50 sterile IV catheters, assorted sizes", Price = 89.99m, ImageUrl = "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400", Category = "Nursing Supplies", Stock = 100, Rating = 4.8 },
            
            // Lab 
            new Product { Id = 5, Name = "Test Tubes Pack", Description = "Set of 100 glass test tubes with caps, 15ml capacity", Price = 32.99m, ImageUrl = "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400", Category = "Lab Supplies", Stock = 120, Rating = 4.6 },
            new Product { Id = 6, Name = "Microscope Slides Box", Description = "Box of 72 pre-cleaned microscope slides with coverslips", Price = 15.99m, ImageUrl = "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400", Category = "Lab Supplies", Stock = 180, Rating = 4.4 },
            new Product { Id = 7, Name = "Pipettes Set", Description = "Precision laboratory pipettes, adjustable volume 10-100µl", Price = 125.99m, ImageUrl = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400", Category = "Lab Supplies", Stock = 45, Rating = 4.7 },
            new Product { Id = 8, Name = "Petri Dishes Sterile", Description = "Pack of 50 sterile polystyrene petri dishes, 100mm", Price = 28.99m, ImageUrl = "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400", Category = "Lab Supplies", Stock = 95, Rating = 4.5 },
            
            // Storage 
            new Product { Id = 9, Name = "Medical Storage Bins", Description = "Set of 6 stackable plastic storage containers with lids", Price = 39.99m, ImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", Category = "Storage Supplies", Stock = 75, Rating = 4.3 },
            new Product { Id = 10, Name = "Specimen Collection Bags", Description = "Box of 100 biohazard specimen transport bags", Price = 22.99m, ImageUrl = "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400", Category = "Storage Supplies", Stock = 150, Rating = 4.4 },
            new Product { Id = 11, Name = "Sharps Container 5qt", Description = "Red biohazard sharps disposal container, 5 quart capacity", Price = 12.99m, ImageUrl = "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400", Category = "Storage Supplies", Stock = 200, Rating = 4.6 },
            
            // Seals
            new Product { Id = 12, Name = "Tamper-Evident Seals", Description = "Roll of 500 security seals for medical containers", Price = 34.99m, ImageUrl = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", Category = "Seals", Stock = 100, Rating = 4.5 },
            new Product { Id = 13, Name = "Autoclave Tape", Description = "Roll of steam sterilization indicator tape, 60 yards", Price = 8.99m, ImageUrl = "https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400", Category = "Seals", Stock = 250, Rating = 4.3 },
            new Product { Id = 14, Name = "Vacuum Seal Bags Medical", Description = "Box of 100 vacuum seal pouches for sterilization", Price = 45.99m, ImageUrl = "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400", Category = "Seals", Stock = 80, Rating = 4.7 },
            
            // Temperature Monitors
            new Product { Id = 15, Name = "Digital Thermometer Medical", Description = "Fast-reading infrared forehead thermometer with LCD display", Price = 29.99m, ImageUrl = "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400", Category = "Temperature Monitors", Stock = 140, Rating = 4.6 },
            new Product { Id = 16, Name = "Refrigerator Thermometer", Description = "Digital min/max thermometer for vaccine storage monitoring", Price = 19.99m, ImageUrl = "https://images.unsplash.com/photo-1615486364200-4f4e7e1b5d70?w=400", Category = "Temperature Monitors", Stock = 90, Rating = 4.5 },
            new Product { Id = 17, Name = "Temperature Data Logger", Description = "WiFi-enabled temperature monitor with alert system", Price = 189.99m, ImageUrl = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", Category = "Temperature Monitors", Stock = 35, Rating = 4.8 },
            
            // Cabinets
            new Product { Id = 18, Name = "Medical Supply Cabinet", Description = "Lockable steel cabinet with 3 adjustable shelves, 36x18x72", Price = 349.99m, ImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", Category = "Cabinets", Stock = 25, Rating = 4.7 },
            new Product { Id = 19, Name = "Pharmacy Storage Cabinet", Description = "Double-door medication cabinet with key lock", Price = 279.99m, ImageUrl = "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400", Category = "Cabinets", Stock = 15, Rating = 4.6 },
            new Product { Id = 20, Name = "Instrument Cabinet Glass", Description = "Glass-front instrument storage cabinet, stainless steel", Price = 425.99m, ImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", Category = "Cabinets", Stock = 20, Rating = 4.8 },
            
            // Shelves and Room Accessories
            new Product { Id = 21, Name = "Wall-Mount Supply Shelf", Description = "Stainless steel wall shelf, 48 inches wide", Price = 89.99m, ImageUrl = "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400", Category = "Shelves and Room Accessories", Stock = 50, Rating = 4.5 },
            new Product { Id = 22, Name = "Medical Cart Rolling", Description = "3-tier rolling cart with locking wheels, 16x32 inches", Price = 149.99m, ImageUrl = "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400", Category = "Shelves and Room Accessories", Stock = 40, Rating = 4.6 },
            new Product { Id = 23, Name = "Privacy Curtain Track", Description = "Ceiling-mounted privacy curtain track system, 10 feet", Price = 67.99m, ImageUrl = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", Category = "Shelves and Room Accessories", Stock = 60, Rating = 4.4 },
            new Product { Id = 24, Name = "Hand Sanitizer Dispenser", Description = "Wall-mounted touchless sanitizer dispenser, 1200ml", Price = 54.99m, ImageUrl = "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400", Category = "Shelves and Room Accessories", Stock = 85, Rating = 4.5 },
            
            // Weight Loss 
            new Product { Id = 25, Name = "Digital Medical Scale", Description = "Professional BMI scale with body composition analysis", Price = 129.99m, ImageUrl = "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400", Category = "Weight Loss Supplies", Stock = 45, Rating = 4.7 },
            new Product { Id = 26, Name = "Meal Replacement Shakes", Description = "Box of 24 nutritional meal replacement shakes, assorted", Price = 39.99m, ImageUrl = "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400", Category = "Weight Loss Supplies", Stock = 120, Rating = 4.3 },
            new Product { Id = 27, Name = "Body Measuring Tape", Description = "Retractable measuring tape for body measurements, set of 10", Price = 14.99m, ImageUrl = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", Category = "Weight Loss Supplies", Stock = 150, Rating = 4.2 },
            
            // Pharmacy 
            new Product { Id = 28, Name = "Pill Counting Tray", Description = "Professional pill counting tray with spatula", Price = 24.99m, ImageUrl = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400", Category = "Pharmacy Supplies", Stock = 70, Rating = 4.6 },
            new Product { Id = 29, Name = "Prescription Vials 30-Dram", Description = "Pack of 100 amber pharmacy vials with child-resistant caps", Price = 18.99m, ImageUrl = "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400", Category = "Pharmacy Supplies", Stock = 200, Rating = 4.5 },
            new Product { Id = 30, Name = "Medication Labels Roll", Description = "Roll of 1000 self-adhesive prescription labels", Price = 12.99m, ImageUrl = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", Category = "Pharmacy Supplies", Stock = 180, Rating = 4.4 },
            new Product { Id = 31, Name = "Mortar and Pestle Set", Description = "Porcelain pharmacy mortar and pestle, 6 inch diameter", Price = 34.99m, ImageUrl = "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400", Category = "Pharmacy Supplies", Stock = 55, Rating = 4.7 },
            
            // Printing 
            new Product { Id = 32, Name = "Thermal Label Printer", Description = "Direct thermal label printer for prescriptions and labels", Price = 249.99m, ImageUrl = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400", Category = "Printing Supplies", Stock = 30, Rating = 4.8 },
            new Product { Id = 33, Name = "Prescription Paper Pads", Description = "Box of 10 prescription pads, 100 sheets each", Price = 29.99m, ImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", Category = "Printing Supplies", Stock = 95, Rating = 4.3 },
            new Product { Id = 34, Name = "Barcode Labels Medical", Description = "Roll of 2000 medical barcode labels, 1x2 inches", Price = 19.99m, ImageUrl = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400", Category = "Printing Supplies", Stock = 140, Rating = 4.5 },
            new Product { Id = 35, Name = "Ink Cartridge Set Medical", Description = "Compatible ink cartridge set for medical printers", Price = 54.99m, ImageUrl = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400", Category = "Printing Supplies", Stock = 75, Rating = 4.4 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts([FromQuery] string? category = null)
        {
            if (string.IsNullOrEmpty(category))
            {
                return Ok(products);
            }
            return Ok(products.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase)));
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Product>> SearchProducts([FromQuery] string query)
        {
            var results = products.Where(p => 
                p.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                p.Description.Contains(query, StringComparison.OrdinalIgnoreCase)
            );
            return Ok(results);
        }

        [HttpGet("categories")]
        public ActionResult<IEnumerable<string>> GetCategories()
        {
            var categories = products.Select(p => p.Category).Distinct().OrderBy(c => c);
            return Ok(categories);
        }
    }
}
