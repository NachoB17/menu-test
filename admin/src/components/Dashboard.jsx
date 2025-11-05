import { useState, useEffect } from 'react';
import { Search, Plus, Wine, LogOut, RefreshCw, Filter, AlertCircle } from 'lucide-react';
import { CONFIG } from '../config';
import { googleSheetsService } from '../services/googleSheets';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

export default function Dashboard({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('cocktails');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  // Charger les données au démarrage
  useEffect(() => {
    loadData();
  }, []);

  // Filtrer les produits par onglet et recherche
  useEffect(() => {
    filterProducts();
  }, [products, activeTab, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await googleSheetsService.getAllData();
      // Filtrer les lignes vides
      const validData = data.filter(p => p.ID && p.Nom);
      setProducts(validData);

      // Calculer les stats
      const total = validData.length;
      const active = validData.filter(p => p.Actif === 'OUI').length;
      const inactive = total - active;
      setStats({ total, active, inactive });
    } catch (err) {
      console.error('Erreur chargement:', err);
      setError(err.message || 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filtrer par onglet
    if (activeTab) {
      filtered = filtered.filter(p =>
        p.Onglet && p.Onglet.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        (p.Nom && p.Nom.toLowerCase().includes(query)) ||
        (p.Description && p.Description.toLowerCase().includes(query)) ||
        (p.Section && p.Section.toLowerCase().includes(query))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct({
      ID: '',
      Onglet: activeTab,
      Section: '',
      Nom: '',
      Description: '',
      Prix: '',
      Actif: 'OUI',
      'En ce moment': 'NON',
      tag_couleur: '',
      tag_moment: '',
      tag_style: '',
      tag_accord: ''
    });
    setShowDetailModal(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (productData._rowIndex) {
        // Mise à jour
        await googleSheetsService.updateRow(productData._rowIndex, productData);
      } else {
        // Ajout
        await googleSheetsService.addRow(productData);
      }

      setShowDetailModal(false);
      setSelectedProduct(null);
      await loadData(); // Recharger les données
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${product.Nom}" ?\n\nCette action est irréversible.`)) {
      return;
    }

    try {
      await googleSheetsService.deleteRow(product._rowIndex);
      await loadData();
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const getTabIcon = (tabId) => {
    const icons = {
      cocktails: '🍸',
      vins: '🍷',
      bieres: '🍺',
      softs: '🥤',
      chaudes: '☕',
      deguster: '🍽️'
    };
    return icons[tabId] || '📋';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-white to-cream">
      {/* Header Premium */}
      <header className="bg-gradient-to-r from-deep-sage via-sage-medium to-deep-sage text-white shadow-2xl sticky top-0 z-50 border-b border-soft-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-soft-gold to-bronze rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
                  <span className="text-2xl">🏡</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Maison Fleurie</h1>
                <p className="text-sm text-soft-gold font-medium">Administration du Menu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={loadData}
                disabled={loading}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                title="Rafraîchir"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>

              <div className="hidden md:block text-right px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-soft-gold">{user.email}</p>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Erreur d'API */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={24} />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Erreur de chargement</h3>
                <p className="text-red-700 text-sm mb-2">{error}</p>
                {error.includes('403') && (
                  <div className="text-xs text-red-600 bg-red-100 p-3 rounded-lg mt-2">
                    <p className="font-semibold mb-1">Erreur 403 - Accès refusé</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Vérifiez que le Google Sheet est bien partagé avec {user.email}</li>
                      <li>Vérifiez que l'API Google Sheets est activée dans Google Cloud Console</li>
                      <li>Vérifiez les permissions OAuth (scope: spreadsheets)</li>
                    </ul>
                  </div>
                )}
                <button
                  onClick={loadData}
                  className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="group bg-gradient-to-br from-white to-cream rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-soft-gold/20 hover:border-soft-gold/40 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total</p>
              <div className="w-10 h-10 bg-deep-sage/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wine className="text-deep-sage" size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold text-deep-sage">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-1">produits au menu</p>
          </div>

          <div className="group bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-green-200 hover:border-green-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Actifs</p>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xl">✅</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600">{stats.active}</p>
            <p className="text-xs text-gray-500 mt-1">visibles par les clients</p>
          </div>

          <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Inactifs</p>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xl">💤</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-500">{stats.inactive}</p>
            <p className="text-xs text-gray-500 mt-1">temporairement désactivés</p>
          </div>
        </div>

        {/* Barre de recherche et bouton ajout Premium */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un produit par nom, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sage-medium focus:border-transparent transition-all text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
            </div>
            <button
              onClick={handleAddProduct}
              className="group bg-gradient-to-r from-deep-sage to-sage-medium hover:from-sage-medium hover:to-deep-sage text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
              Nouveau produit
            </button>
          </div>
        </div>

        {/* Navigation par onglets Premium */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CONFIG.MENU_TABS.map(tab => {
                const count = products.filter(p => p.Onglet?.toLowerCase() === tab.id).length;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-deep-sage to-sage-medium text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <span className="text-2xl transform group-hover:scale-110 transition-transform">
                      {getTabIcon(tab.id)}
                    </span>
                    <span className="font-bold">{tab.label.replace(/^[^\s]+\s/, '')}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-deep-sage shadow-sm'
                    }`}>
                      {count}
                    </span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-soft-gold rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-soft-gold/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-deep-sage border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <p className="text-lg font-semibold text-deep-sage mb-1">Chargement en cours...</p>
                <p className="text-sm text-gray-500">Récupération des produits depuis Google Sheets</p>
              </div>
            </div>
          </div>
        ) : (
          <ProductList
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            activeTab={activeTab}
            searchQuery={searchQuery}
          />
        )}
      </div>

      {/* Modal détail produit */}
      {showDetailModal && (
        <ProductDetail
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
