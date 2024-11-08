
# Notice d'Utilisation du Contexte Utilisateur (UserContext)

## Description
Le **UserContext** gère l'authentification de l'utilisateur dans l'application. Il permet de se connecter, de s'inscrire, de se déconnecter et de vérifier l'authenticité des sessions à l'aide de tokens JWT. Le contexte est implémenté avec TypeScript et est conçu pour être utilisé avec React 18 et `react-router-dom` v6.

## Mise en Place

1. **Importer le `UserProvider`** dans votre fichier principal de l'application (souvent `index.tsx` ou `App.tsx`).

```typescript
import { UserProvider } from './path/to/UserContext';
```

2. **Envelopper** votre application dans le `UserProvider` :

```typescript
<UserProvider>
  <App />
</UserProvider>
```

## Utilisation du Contexte

### Importer et Utiliser le Hook `useUser`

À partir de n'importe quel composant, utilisez `useUser` pour accéder aux fonctions et états d'authentification du contexte :

```typescript
import { useUser } from './path/to/UserContext';

const MyComponent = () => {
  const { user, isAuthenticated, loading, login, logout, register, message } = useUser();

  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      {isAuthenticated ? <p>Bienvenue, {user?.username}</p> : <p>Veuillez vous connecter.</p>}
      {message && <p>{message}</p>}
    </div>
  );
};
```

### État et Fonctions du Contexte

- **user** : Objet contenant les informations de l'utilisateur (id, username). Si l'utilisateur n'est pas connecté, `user` est `null`.

- **isAuthenticated** : Booléen indiquant si l'utilisateur est connecté. `true` si l'utilisateur est authentifié, `false` sinon.

- **loading** : Booléen indiquant l'état de chargement de l'application. `true` pendant les actions de vérification du token ou de connexion.

- **message** : Message de notification (succès ou erreur) lié aux actions d'authentification (ex. : échec de connexion, inscription réussie).

#### Fonctions d'Authentification

1. **login(email: string, password: string)** :
   - Permet à l'utilisateur de se connecter. Appelle l'API `/login` avec les informations d'identification de l'utilisateur.
   
2. **register(username: string, email: string, password: string)** :
   - Permet à un nouvel utilisateur de s'inscrire. Appelle l'API `/register` avec les détails de l'utilisateur.

3. **logout()** :
   - Déconnecte l'utilisateur, supprime le token du stockage local et redirige vers la page de connexion.

## Exemples d'Utilisation Avancée

### Protéger des Routes avec `isAuthenticated`

Vous pouvez créer un composant de route protégée pour restreindre l'accès aux utilisateurs connectés seulement.

```typescript
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './path/to/UserContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

Dans votre configuration de routes, utilisez `ProtectedRoute` pour envelopper les routes sécurisées :

```typescript
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### Affichage de Notifications

Utilisez `message` pour afficher des notifications basées sur les actions d'authentification :

```typescript
const Notification = () => {
  const { message } = useUser();
  return message ? <div className="notification">{message}</div> : null;
};
```

## Conclusion

Le `UserContext` centralise la gestion des sessions utilisateurs et simplifie l'accès aux informations d'authentification. Il est facilement extensible pour des besoins supplémentaires, comme la gestion de rôles utilisateur ou des opérations en temps réel (ex : via un autre contexte WebSocket).

---

Cette notice devrait vous guider pour utiliser et tirer parti du `UserContext` dans vos composants React. N'hésitez pas à adapter cette structure en fonction de vos besoins spécifiques d'application !
