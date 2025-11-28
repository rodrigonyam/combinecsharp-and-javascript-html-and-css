# Medical Equipment Retail Website - C#, JavaScript, HTML & CSS

A full-stack e-commerce website for medical equipment and healthcare supplies built with ASP.NET Core backend and vanilla JavaScript frontend.

## Technologies Used

### Backend (C#)
- **ASP.NET Core 8.0** - Web API framework
- **RESTful APIs** - Product and Order management
- **Swagger** - API documentation

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox/grid, animations
- **JavaScript (ES6+)** - Dynamic functionality and API integration

## Features

✅ **Medical Equipment Catalog**
- Browse medical devices, diagnostic tools, and healthcare supplies
- Filter by category (Diagnostic, Instruments, Mobility, Safety, Respiratory, Therapeutic)
- Search functionality
- Responsive product grid with detailed information

✅ **Shopping Cart**
- Add/remove medical equipment
- Update quantities
- Persistent cart (localStorage)
- Real-time total calculation

✅ **Checkout System**
- Customer/facility information form
- Order summary
- Order confirmation with order ID

✅ **Professional Design**
- Clean, medical-industry appropriate styling
- Mobile-friendly layout
- Touch-optimized controls

## Product Categories

- **Nursing Supplies** - Syringes, blood pressure cuffs, gauze pads, IV catheters
- **Lab Supplies** - Test tubes, microscope slides, pipettes, petri dishes
- **Storage Supplies** - Medical bins, specimen bags, sharps containers
- **Seals** - Tamper-evident seals, autoclave tape, vacuum seal bags
- **Temperature Monitors** - Digital thermometers, refrigerator monitors, data loggers
- **Cabinets** - Medical supply cabinets, pharmacy storage, instrument cabinets
- **Shelves and Room Accessories** - Wall shelves, rolling carts, privacy curtains, sanitizer dispensers
- **Weight Loss Supplies** - Medical scales, meal replacements, measuring tapes
- **Pharmacy Supplies** - Pill counting trays, prescription vials, medication labels, mortar & pestle
- **Printing Supplies** - Label printers, prescription pads, barcode labels, ink cartridges

## Project Structure

```
├── Controllers/
│   ├── ProductsController.cs    # Product API endpoints
│   └── OrdersController.cs       # Order processing
├── Models/
│   ├── Product.cs                # Product data model
│   ├── CartItem.cs               # Cart item model
│   └── Order.cs                  # Order model
├── wwwroot/
│   ├── index.html                # Main HTML page
│   ├── styles.css                # CSS styling
│   └── app.js                    # JavaScript logic
├── Program.cs                    # ASP.NET Core configuration
├── RetailWebsite.csproj          # Project file
└── appsettings.json              # Configuration
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products?category={category}` - Filter by category
- `GET /api/products/search?query={query}` - Search products
- `GET /api/products/categories` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID

## How to Run

### Prerequisites
- .NET 8.0 SDK or later
- Visual Studio Code or Visual Studio

### Steps

1. **Restore dependencies**
   ```powershell
   dotnet restore
   ```

2. **Build the project**
   ```powershell
   dotnet build
   ```

3. **Run the application**
   ```powershell
   dotnet run
   ```

4. **Open in browser**
   - Navigate to: `https://localhost:7001`
   - Or: `http://localhost:5001`

5. **Access API documentation**
   - Swagger UI: `https://localhost:7001/swagger`

## JavaScript Features

- **Async/Await** for API calls
- **Fetch API** for HTTP requests
- **LocalStorage** for cart persistence
- **Event Delegation** for dynamic elements
- **ES6 Modules** pattern
- **DOM Manipulation** for dynamic UI updates

## CSS Features

- **CSS Variables** for theming
- **Flexbox & Grid** for layouts
- **Transitions & Animations** for smooth UX
- **Media Queries** for responsiveness
- **Modern color schemes** with hover effects

## Future Enhancements

- Healthcare provider authentication and accounts
- Product reviews from medical professionals
- Bulk ordering for medical facilities
- Order tracking and delivery management
- Admin dashboard for inventory management
- Database integration (SQL Server/PostgreSQL)
- Email order confirmations
- Prescription upload for regulated equipment
- Insurance and billing integration
- Compliance tracking and certifications

## Development Notes

- The application uses in-memory data storage
- Cart data persists in browser localStorage
- CORS is enabled for development
- Swagger is available in development mode
- All medical equipment shown is for demonstration purposes

## Compliance & Disclaimers

- This is a demonstration project for educational purposes
- Actual medical equipment sales require proper licensing and FDA compliance
- Consult with healthcare professionals before purchasing medical devices

## License

This project is for educational and demonstration purposes.
