import { useGoogleLogin } from '@react-oauth/google';
import { LogIn, AlertCircle } from 'lucide-react';
import { CONFIG } from '../config';

export default function Login({ onLoginSuccess }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Vérifier l'email de l'utilisateur
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userInfo = await userInfoResponse.json();
        const userEmail = userInfo.email;

        // Vérifier si l'email est autorisé
        if (CONFIG.AUTHORIZED_EMAILS.length === 0 || CONFIG.AUTHORIZED_EMAILS.includes(userEmail)) {
          onLoginSuccess({
            token: tokenResponse.access_token,
            user: userInfo
          });
        } else {
          alert(`❌ Accès refusé\n\nL'email ${userEmail} n'est pas autorisé à accéder à cette application.\n\nContactez l'administrateur pour obtenir l'accès.`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des infos utilisateur:', error);
        alert('Erreur lors de la connexion. Réessayez.');
      }
    },
    onError: (error) => {
      console.error('Erreur de connexion:', error);
      alert('Erreur lors de la connexion Google.');
    },
    scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email',
  });

  const configStatus = CONFIG.GOOGLE_CLIENT_ID && CONFIG.GOOGLE_API_KEY;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-soft-gold/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-deep-sage rounded-full mb-4">
            <span className="text-4xl">🏡</span>
          </div>
          <h1 className="text-3xl font-bold text-deep-sage mb-2">
            Maison Fleurie
          </h1>
          <p className="text-sage-medium">
            Administration du Menu
          </p>
        </div>

        {/* Carte de connexion */}
        <div className="card space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-deep-sage mb-2">
              Connexion Gérant
            </h2>
            <p className="text-gray-600 text-sm">
              Utilisez votre compte Google autorisé
            </p>
          </div>

          {/* Avertissement configuration */}
          {!configStatus && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-red-900 mb-1">
                  Configuration incomplète
                </p>
                <p className="text-red-700">
                  Veuillez configurer GOOGLE_CLIENT_ID et GOOGLE_API_KEY dans le fichier .env
                  <br />
                  <span className="text-xs">Consultez SETUP.md pour les instructions</span>
                </p>
              </div>
            </div>
          )}

          {/* Bouton de connexion */}
          <button
            onClick={() => login()}
            disabled={!configStatus}
            className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-medium transition-all ${
              configStatus
                ? 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-deep-sage shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <LogIn size={20} />
            Se connecter avec Google
          </button>

          {/* Info sécurité */}
          <div className="bg-soft-gold/10 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-medium mb-1">🔒 Connexion sécurisée</p>
            <p className="text-xs text-gray-600">
              Seuls les comptes autorisés peuvent accéder à l'administration.
              {CONFIG.AUTHORIZED_EMAILS.length > 0 && (
                <span> ({CONFIG.AUTHORIZED_EMAILS.length} email(s) autorisé(s))</span>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Maison Fleurie © 2025</p>
          <p className="text-xs mt-1">Application d'administration du menu</p>
        </div>
      </div>
    </div>
  );
}
