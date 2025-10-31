import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { googleSheetsService } from './services/googleSheets';
import { CONFIG, validateConfig } from './config';

function App() {
  const [user, setUser] = useState(null);
  const [configValid, setConfigValid] = useState(false);

  useEffect(() => {
    // Vérifier la configuration au chargement
    const validation = validateConfig();
    setConfigValid(validation.valid);

    if (!validation.valid) {
      console.error('❌ Configuration invalide:', validation.errors);
    }

    // Vérifier si l'utilisateur est déjà connecté (sessionStorage)
    const savedUser = sessionStorage.getItem('user');
    const savedToken = sessionStorage.getItem('token');

    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        googleSheetsService.setAccessToken(savedToken);
      } catch (error) {
        console.error('Erreur lors de la restauration de la session:', error);
        sessionStorage.clear();
      }
    }
  }, []);

  const handleLoginSuccess = ({ token, user: userData }) => {
    // Sauvegarder dans sessionStorage (disparaît à la fermeture du navigateur)
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userData));

    // Initialiser le service Google Sheets
    googleSheetsService.setAccessToken(token);

    // Mettre à jour l'état
    setUser(userData);
  };

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      sessionStorage.clear();
      setUser(null);
      window.location.reload();
    }
  };

  // Afficher un message d'erreur si la config n'est pas valide
  if (!configValid) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-900 mb-2">
              Configuration incomplète
            </h1>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-900 font-medium mb-2">
              Erreurs de configuration :
            </p>
            <ul className="text-sm text-red-800 space-y-1">
              {validateConfig().errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-medium mb-2">
              📖 Pour configurer l'application :
            </p>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Créez un projet Google Cloud Console</li>
              <li>Activez l'API Google Sheets</li>
              <li>Créez une OAuth 2.0 Client ID</li>
              <li>Créez une API Key</li>
              <li>Ajoutez les valeurs dans un fichier <code className="bg-blue-100 px-1 rounded">.env</code></li>
              <li>Ajoutez les emails autorisés dans <code className="bg-blue-100 px-1 rounded">src/config.js</code></li>
            </ol>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Consultez le fichier <strong>SETUP.md</strong> pour les instructions détaillées</p>
          </div>
        </div>
      </div>
    );
  }

  // Wrapper Google OAuth Provider
  return (
    <GoogleOAuthProvider clientId={CONFIG.GOOGLE_CLIENT_ID}>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
