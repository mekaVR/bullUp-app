# API Services Documentation

## Configuration

### Base URL
La BASE_URL est configurée via la variable d'environnement `EXPO_PUBLIC_BASE_URL` dans le fichier `.env`:
```
EXPO_PUBLIC_BASE_URL=http://192.168.1.10:8000
```

La configuration est chargée dans `constants/api.ts`:
```typescript
BASE_URL: process.env.EXPO_PUBLIC_BASE_URL || "http://192.168.1.10:8000"
```

**Note**: Après avoir modifié le fichier `.env`, vous devez redémarrer le serveur Expo pour que les changements prennent effet.

## Axios Configuration

Le fichier `services/axios.config.ts` contient:
- Instance axios configurée avec BASE_URL
- Intercepteurs de requête pour ajouter automatiquement le token d'accès
- Intercepteurs de réponse pour gérer le refresh token automatiquement

### Token Interceptor

L'intercepteur gère automatiquement:
1. **Ajout du token** - Ajoute automatiquement le token Bearer à chaque requête
2. **Refresh automatique** - Rafraîchit le token quand il expire (401)
3. **Queue de requêtes** - Met en queue les requêtes pendant le refresh
4. **Retry automatique** - Rejoue les requêtes après le refresh du token

## Utilisation

### 1. Authentification

```typescript
import { authService } from '@/services/api.service';

// Login
const tokens = await authService.login('username', 'password');
// Returns: { access: string, refresh: string }

// Register
const user = await authService.register('username', 'email@example.com', 'password');

// Check username
const exists = await authService.checkUsernameExists('username');
// Returns: { exists: boolean, message: string }
```

### 2. Comic Books

```typescript
import { comicBookService } from '@/services';

// Get all comics with pagination
const comics = await comicBookService.getComicBooks({ page: 1, page_size: 10 });

// Get comic by ID
const comic = await comicBookService.getComicBookById(1);

// Search comics
const results = await comicBookService.searchComicBooks('Spider-Man');

// Get comics by author
const authorComics = await comicBookService.getComicBooksByAuthor('Stan Lee');

// Get featured comics
const featured = await comicBookService.getFeaturedComicBooks();
```

### 3. Requêtes personnalisées

```typescript
import { apiService } from '@/services/api.service';

// GET
const data = await apiService.get('/custom/endpoint', { param: 'value' });

// POST
const result = await apiService.post('/custom/endpoint', { key: 'value' });

// PUT
const updated = await apiService.put('/custom/endpoint/1', { key: 'new value' });

// PATCH
const patched = await apiService.patch('/custom/endpoint/1', { key: 'value' });

// DELETE
await apiService.delete('/custom/endpoint/1');
```

### 4. Utilisation directe d'axios

```typescript
import api from '@/services/axios.config';

// L'instance axios est déjà configurée avec les intercepteurs
const response = await api.get('/endpoint');
```

## Gestion des erreurs

```typescript
import { authService } from '@/services/api.service';
import { AxiosError } from 'axios';

try {
  const tokens = await authService.login('username', 'password');
  // Success
} catch (error) {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      console.log('Invalid credentials');
    } else if (error.response?.status === 500) {
      console.log('Server error');
    }
    console.log('Error:', error.response?.data);
  }
}
```

## Token Management

Les tokens sont automatiquement:
- **Stockés** de manière sécurisée (SecureStore sur mobile, localStorage sur web)
- **Ajoutés** aux headers de chaque requête
- **Rafraîchis** automatiquement quand ils expirent
- **Nettoyés** si le refresh échoue

### Déconnexion manuelle

```typescript
import { clearTokens } from '@/services/axios.config';

// Clear tokens from storage
await clearTokens();
```

## Structure des fichiers

```
services/
├── axios.config.ts      # Configuration axios + intercepteurs
├── api.service.ts       # Services API (auth, comics, etc.)
└── README.md           # Cette documentation

constants/
└── api.ts              # Configuration API (BASE_URL, endpoints)
```

## Notes importantes

1. **Refresh Token Flow**:
   - Quand une requête retourne 401, l'intercepteur tente automatiquement de refresh le token
   - Si le refresh réussit, la requête originale est rejouée avec le nouveau token
   - Si le refresh échoue, les tokens sont nettoyés et l'erreur est propagée

2. **Queue de requêtes**:
   - Si plusieurs requêtes échouent simultanément, une seule requête de refresh est effectuée
   - Les autres requêtes sont mises en queue et rejouées après le refresh

3. **Platform Support**:
   - Mobile: utilise expo-secure-store
   - Web: utilise localStorage
