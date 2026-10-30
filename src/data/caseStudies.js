// Architecture and contribution notes supplied in the reference.
export const caseStudies = [
  {
    "slug": "foodboxx",
    "num": "01",
    "name": "FoodBoxx",
    "subtitle": "Vue / Express REST / relational MySQL",
    "objective": "Build an ordering application where customers can browse products, construct boxes and manage orders or subscriptions through a full-stack workflow.",
    "role": "Project Manager and Backend Lead on a four-person YouthCode team. I coordinated milestones and integration, and worked on the Node/Express backend and database-oriented functionality.",
    "technologies": [
      "Vue 3 and Vite (team frontend)",
      "Node.js and Express",
      "MySQL / mysql2",
      "REST endpoints",
      "JWT and bcrypt (repository implementation)"
    ],
    "decisions": "The repository separates backend routes, controllers, models and services. It exposes authenticated account, product, order and subscription endpoints under /api; queries use parameterised SQL. Payment testing includes a simulated gateway and PayFast sandbox, not live payment claims.",
    "challenge": "Coordinating frontend/backend integration while building reliable checkout and account workflows was a documented project challenge. The deployed application was later revised to handle backend/database outages more gracefully.",
    "outcome": "A real team application with a public demo and documented source; no unsupported revenue, uptime or user figures claimed.",
    "labels": [
      "Vue interface",
      "Express REST API",
      "MySQL database"
    ],
    "subs": [
      "Views / client routes",
      "Controllers / services",
      "Persistent relational records"
    ],
    "descriptions": [
      "Vue 3 provides the customer-facing interface, product browsing and box-building flows. The interface calls the backend API.",
      "Express provides /api endpoints for authentication, products, orders, subscriptions and payment flows. Project source documents authentication and middleware.",
      "MySQL stores the relational application entities, including users, products, orders, order items and subscriptions. Queries are parameterised."
    ],
    "repo": "https://github.com/Caleb-Asia/Group-10---Module-3-Core-Project",
    "demo": "https://foodboxx.onrender.com/"
  },
  {
    "slug": "market-pulse",
    "num": "02",
    "name": "Market Pulse",
    "subtitle": "Data extraction / Flask API / Vue dashboard",
    "objective": "Collect retail and cryptocurrency market information from external sources, transform it into usable data and present it in a searchable, filterable dashboard.",
    "role": "Backend scraper contributor on a larger sprint team. I worked on web scraping and data extraction; the Flask route, storage and frontend work were shared across other named team members.",
    "technologies": [
      "Python Requests",
      "BeautifulSoup4",
      "Flask",
      "SQLite (team storage)",
      "Vue 3 / Pinia (team frontend)"
    ],
    "decisions": "The repository separates scrapers, API routes, storage services and frontend views. Data sources include WebScraper.io retail pages and CoinPaprika cryptocurrency data. The Flask backend exposes data, statistics and scrape routes.",
    "challenge": "Handling variable source data, scrape timing and error conditions required attention to parsing and failure behaviour. Scheduling, storage and some API integration were team responsibilities, not claimed as solo work.",
    "outcome": "A deployed application with a source repository and separate web scraping, storage and dashboard layers. No unverified performance improvements claimed.",
    "labels": [
      "External sources",
      "Python scrapers",
      "Flask + SQLite",
      "Vue dashboard"
    ],
    "subs": [
      "Retail / crypto feeds",
      "Requests / parsing",
      "API routes / storage",
      "Interactive frontend"
    ],
    "descriptions": [
      "WebScraper.io and CoinPaprika are the documented retail and cryptocurrency data sources.",
      "I worked on the Python extraction layer, requesting and parsing source data into structured records.",
      "The team Flask application provides API routes; the repository documents SQLite-backed storage and scraping services.",
      "The Vue 3 dashboard consumes backend data and presents market information, search, filters and history."
    ],
    "repo": "https://github.com/adamjattiem12-gif/-Flask-Web-Scraping-Dashboard",
    "demo": "https://market-pulse-11gq.onrender.com/"
  }
]
