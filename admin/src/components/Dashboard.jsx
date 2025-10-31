import { useState, useEffect } from 'react';
import { Search, Plus, Wine, LogOut, RefreshCw, Filter } from 'lucide-react';
import { CONFIG } from '../config';
import { googleSheetsService } from '../services/googleSheets';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

export default function Dashboard({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error('Erreur chargement:', error);
      alert('Erreur lors du chargement des données. Vérifiez votre connexion.');
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
      tag_format: '',
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-deep-sage to-sage-medium text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                🏡
              </div>
              <div>
                <h1 className="text-xl font-bold">Maison Fleurie</h1>
                <p className="text-sm text-soft-gold">Administration du Menu</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={loadData}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Rafraîchir"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>

              <div className="text-right text-sm hidden sm:block">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-soft-gold">{user.email}</p>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats rapides */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <p className="text-2xl font-bold text-deep-sage">{stats.total}</p>
            <p className="text-sm text-gray-600">Total produits</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            <p className="text-sm text-gray-600">Actifs</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-gray-400">{stats.inactive}</p>
            <p className="text-sm text-gray-600">Inactifs</p>
          </div>
        </div>

        {/* Barre de recherche et bouton ajout */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-medium focus:border-transparent"
              />
            </div>
            <button
              onClick={handleAddProduct}
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Plus size={20} />
              Nouveau produit
            </button>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {CONFIG.MENU_TABS.map(tab => {
              const count = products.filter(p => p.Onglet?.toLowerCase() === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-deep-sage text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{getTabIcon(tab.id)}</span>
                  <span>{tab.label.replace(/^[^\s]+\s/, '')}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Liste des produits */}
        {loading ? (
          <div className="card text-center py-12">
            <RefreshCw className="animate-spin mx-auto mb-4 text-sage-medium" size={40} />
            <p className="text-gray-600">Chargement des produits...</p>
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
