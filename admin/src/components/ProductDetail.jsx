import { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { CONFIG } from '../config';

export default function ProductDetail({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...product });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const isNewProduct = !formData._rowIndex;
  const isWine = formData.Onglet === 'vins';

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.Nom?.trim()) {
      newErrors.Nom = 'Le nom est obligatoire';
    }

    if (!formData.Prix?.trim()) {
      newErrors.Prix = 'Le prix est obligatoire';
    }

    if (!formData.Onglet) {
      newErrors.Onglet = 'L\'onglet est obligatoire';
    }

    if (!formData.Section?.trim()) {
      newErrors.Section = 'La section est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert('⚠️ Veuillez remplir tous les champs obligatoires');
      return;
    }

    const confirmMessage = isNewProduct
      ? `Ajouter "${formData.Nom}" au menu ?`
      : `Enregistrer les modifications pour "${formData.Nom}" ?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      alert('❌ Erreur lors de la sauvegarde. Réessayez.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Obtenir les sections pour l'onglet sélectionné
  const getSectionsForTab = (tab) => {
    const sections = {
      cocktails: ['Signatures', 'Classiques'],
      vins: ['Verre rouge', 'Verre blanc', 'Verre rosé', 'Bouteille rouge', 'Bouteille blanc', 'Bouteille rosé'],
      bieres: ['Bières pression', 'Bouteilles'],
      softs: ['Sodas', 'Energie', 'Jus'],
      chaudes: ['Boissons chaudes'],
      deguster: ['Fromages & Charcuterie', 'Mer', 'Terre', 'Veggie', 'Desserts']
    };
    return sections[tab] || [];
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-deep-sage to-sage-medium text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {isNewProduct ? '✨ Nouveau produit' : '✏️ Modifier le produit'}
              </h2>
              <p className="text-sm text-soft-gold mt-1">
                {isNewProduct ? 'Ajout d\'un nouveau produit au menu' : `ID: ${formData.ID}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Onglet et Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Onglet *
              </label>
              <select
                value={formData.Onglet}
                onChange={(e) => {
                  handleChange('Onglet', e.target.value);
                  handleChange('Section', ''); // Reset section when tab changes
                }}
                className={`input-field ${errors.Onglet ? 'border-red-500' : ''}`}
                required
              >
                <option value="">Sélectionnez...</option>
                {CONFIG.MENU_TABS.map(tab => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
              {errors.Onglet && <p className="text-xs text-red-600 mt-1">{errors.Onglet}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section *
              </label>
              <select
                value={formData.Section}
                onChange={(e) => handleChange('Section', e.target.value)}
                className={`input-field ${errors.Section ? 'border-red-500' : ''}`}
                required
                disabled={!formData.Onglet}
              >
                <option value="">Sélectionnez...</option>
                {getSectionsForTab(formData.Onglet).map(section => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
              {errors.Section && <p className="text-xs text-red-600 mt-1">{errors.Section}</p>}
            </div>
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du produit *
            </label>
            <input
              type="text"
              value={formData.Nom}
              onChange={(e) => handleChange('Nom', e.target.value)}
              className={`input-field ${errors.Nom ? 'border-red-500' : ''}`}
              placeholder="Ex: Spicy margarita"
              required
            />
            {errors.Nom && <p className="text-xs text-red-600 mt-1">{errors.Nom}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.Description}
              onChange={(e) => handleChange('Description', e.target.value)}
              className="input-field"
              placeholder="Ex: tequila infusé piment vert et rouge du Maroc"
              rows={3}
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix *
            </label>
            <input
              type="text"
              value={formData.Prix}
              onChange={(e) => handleChange('Prix', e.target.value)}
              className={`input-field ${errors.Prix ? 'border-red-500' : ''}`}
              placeholder="Ex: 12€ ou 4€ / 7,50€"
              required
            />
            {errors.Prix && <p className="text-xs text-red-600 mt-1">{errors.Prix}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Vous pouvez utiliser plusieurs prix (Ex: 25cl / 50cl → 4€ / 7,50€)
            </p>
          </div>

          {/* Statuts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actif
              </label>
              <select
                value={formData.Actif}
                onChange={(e) => handleChange('Actif', e.target.value)}
                className="input-field"
              >
                <option value="OUI">✅ OUI - Visible sur le menu</option>
                <option value="NON">❌ NON - Masqué</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                En ce moment
              </label>
              <select
                value={formData['En ce moment']}
                onChange={(e) => handleChange('En ce moment', e.target.value)}
                className="input-field"
              >
                <option value="NON">Non</option>
                <option value="OUI">⭐ OUI - Mis en avant</option>
              </select>
            </div>
          </div>

          {/* Tags pour les vins */}
          {isWine && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-deep-sage mb-4 flex items-center gap-2">
                🍷 Tags Vins
              </h3>

              <div className="space-y-4">
                {/* Couleur */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {CONFIG.WINE_TAGS.couleur.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleChange('tag_couleur', tag)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.tag_couleur === tag
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleChange('tag_couleur', '')}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 hover:bg-gray-100"
                    >
                      ✕ Aucun
                    </button>
                  </div>
                </div>

                {/* Moment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moment
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {CONFIG.WINE_TAGS.moment.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleChange('tag_moment', tag)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.tag_moment === tag
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleChange('tag_moment', '')}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 hover:bg-gray-100"
                    >
                      ✕ Aucun
                    </button>
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Style
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {CONFIG.WINE_TAGS.style.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleChange('tag_style', tag)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.tag_style === tag
                            ? 'bg-green-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleChange('tag_style', '')}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 hover:bg-gray-100"
                    >
                      ✕ Aucun
                    </button>
                  </div>
                </div>

                {/* Accord */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accord
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {CONFIG.WINE_TAGS.accord.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleChange('tag_accord', tag)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.tag_accord === tag
                            ? 'bg-orange-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleChange('tag_accord', '')}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 hover:bg-gray-100"
                    >
                      ✕ Aucun
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info sécurité */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">💡 Conseil</p>
              <p>
                Vos modifications seront sauvegardées directement dans le Google Sheet et
                visibles immédiatement sur le menu public.
              </p>
            </div>
          </div>
        </form>

        {/* Footer avec actions */}
        <div className="border-t bg-gray-50 p-6 rounded-b-xl flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={saving}
          >
            Annuler
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={20} />
                {isNewProduct ? 'Ajouter' : 'Enregistrer'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
