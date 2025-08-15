node_modules/
public/
src/
├── assets/                 # Imágenes, íconos y recursos estáticos
├── components/             # Componentes reutilizables (Navbar, Button, Card, etc.)
│   ├── ui/                 # Botones, cards, etc.
│   │   └── Button.jsx      # Botones estandar reutilizable.
│   ├── layouts/            # Wrappers globales
│   ├── Footer.jsx          # Pie de pagina.
│   └── Navbar.jsx          # Barra de navegación.
├── features/               # Módulos lógicos de la app (Redux slices, lógica)
│   ├── products/           # Todo lo relacionado a productos (slice, API calls, etc.)
│   ├── cart/               # Carrito de compras
│   └── user/               # Usuario / login
├── hooks/                  # Custom hooks (useFetch, useAuth, etc.) "Encapsular lógica que se repite"
│   ├── useFetch.js         # 
│   └── useLocalStorage.js  # 
├── pages/                  # Páginas completas (Home, ProductDetailPage, CartPage, LoginPage)
│   ├── HomePage.jsx        #
│   ├── ProductDetailPage.jsx #
│   ├── CartPage.jsx        #
│   └── LoginPage.jsx       #
├── routes/                 # Rutas
│   ├── AppRouter.jsx       # Rutas principales
│   └── PrivateRoute.jsx    # Wrapper para rutas privadas
├── services/               # Comunicación con APIs externas (axios configs, funciones) "Centralizas llamadas HTTP"
│   ├── api.js              # Config de axios (baseURL)
│   └── products.js         # Funciones específicas (getProducts, getProductById, etc.)
├── styles/                 # CSS global (index.css, Tailwind config, variables extra)
│   └── index.css           # Entrada principal de estilos
├── utils/                  # Funciones de ayuda (formatPrice, calcularPromedio, etc.)
│   ├── formatPrice.js      #
│   └── calculateDiscount.js # 
├── App.jsx                 #
├── main.jsx                #
.gitignore                  #
eslint.config.js            #
index.html                  #
package-lock.json           #
package.json                #
postcss.config.js           #
README.md                   #
tailwind.config.js          #
vite.config.js              #





