# BullUp 📚

Application mobile pour suivre les dernières sorties de BD et gérer votre collection.

## 📱 Features

- **Actualités** : Suivez les dernières sorties de bandes dessinées
- **Collection** : Gérez votre bibliothèque personnelle
- **Wishlist** : Sauvegardez vos prochains achats
- **Recherche** : Trouvez rapidement une BD
- **Profil** : Personnalisez votre compte

## 🛠️ Stack Technique

- **Framework** : React Native + Expo
- **Language** : TypeScript
- **UI Library** : Gluestack-UI v3
- **Styling** : NativeWind (Tailwind CSS)
- **State Management** : React Query
- **Navigation** : Expo Router
- **HTTP Client** : Axios

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/your-username/bullup-app.git

# Installer les dépendances
cd bullup-app
npm install

# Lancer l'app
npm start
```

## 📂 Structure du Projet

```
bullup-app/
├── app/                    # Routes (Expo Router)
│   ├── (auth)/            # Écrans d'authentification
│   ├── (tabs)/            # Navigation principale
│   └── (profile)/         # Gestion du profil
├── components/            # Composants réutilisables
├── constants/             # Couleurs, Typography, API
├── contexts/              # Context React (Auth)
├── hooks/                 # Custom hooks
├── services/              # Services API
└── utils/                 # Fonctions utilitaires
```

## 🎨 Fonts

- **Interface** : Montserrat
- **Logo** : Vaseline Extra
- **Code** : Space Mono

## 📝 Scripts

```bash
npm start              # Lancer Metro bundler
npm run android        # Lancer sur Android
npm run ios            # Lancer sur iOS
npm run web            # Lancer sur Web
```

## 🔑 Variables d'Environnement

Créer un fichier `.env` à la racine :

```env
API_BASE_URL=https://your-api.com
```

## 📄 License

MIT

## 👤 Auteur

**Meka**

---

💙 Développé avec passion pour les amateurs de bandes dessinées
