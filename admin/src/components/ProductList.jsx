import { Edit2, Trash2, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function ProductList({ products, onEdit, onDelete, activeTab, searchQuery }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <div className="max-w-sm mx-auto">
          <div className="text-7xl mb-4 animate-bounce">🔍</div>
          <h3 className="text-xl font-bold text-deep-sage mb-2">
            {searchQuery ? 'Aucun résultat trouvé' : 'Aucun produit dans cet onglet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? 'Essayez une autre recherche ou vérifiez l\'orthographe'
              : 'Cliquez sur "Nouveau produit" pour commencer'}
          </p>
          {!searchQuery && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-deep-sage/5 text-deep-sage rounded-lg text-sm">
              <Sparkles size={16} />
              <span>Astuce : Ajoutez votre premier produit !</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grouper par section
  const productsBySection = products.reduce((acc, product) => {
    const section = product.Section || 'Sans section';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(productsBySection).map(([section, sectionProducts]) => (
        <div key={section} className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-deep-sage to-sage-medium rounded-full shadow-lg"></div>
            <h3 className="text-xl font-bold text-deep-sage">
              {section}
            </h3>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-soft-gold/30 to-transparent"></div>
            <span className="text-sm font-semibold px-3 py-1 bg-deep-sage/5 text-deep-sage rounded-full">
              {sectionProducts.length} produit{sectionProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid gap-4">
            {sectionProducts.map(product => (
              <ProductCard
                key={product.ID}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product, onEdit, onDelete }) {
  const isActive = product.Actif === 'OUI';
  const isHighlighted = product['En ce moment'] === 'OUI';
  const isWine = product.Onglet === 'vins';

  const getProductIcon = () => {
    const icons = {
      cocktails: '🍸',
      vins: '🍷',
      bieres: '🍺',
      softs: '🥤',
      chaudes: '☕',
      deguster: '🍽️'
    };
    return icons[product.Onglet] || '📋';
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 cursor-pointer transform hover:-translate-y-1 ${
        !isActive
          ? 'opacity-70 border-gray-200 hover:opacity-90'
          : isHighlighted
          ? 'border-soft-gold bg-gradient-to-br from-white to-soft-gold/5'
          : 'border-gray-100 hover:border-sage-medium/30'
      }`}
      onClick={() => onEdit(product)}
    >
      {/* Badge "En ce moment" */}
      {isHighlighted && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-soft-gold to-bronze text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-lg flex items-center gap-1">
          <Sparkles size={12} className="animate-pulse" />
          En ce moment
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Icône et Statut */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-br from-green-100 to-green-50 ring-2 ring-green-200'
                : 'bg-gradient-to-br from-gray-100 to-gray-50 ring-2 ring-gray-200'
            }`}>
              <span className="transform group-hover:rotate-12 transition-transform">
                {getProductIcon()}
              </span>
              {/* Indicateur de statut */}
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-md ${
                isActive ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                {isActive ? (
                  <Eye size={12} className="text-white m-auto mt-0.5" />
                ) : (
                  <EyeOff size={12} className="text-white m-auto mt-0.5" />
                )}
              </div>
            </div>

            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {isActive ? 'Actif' : 'Inactif'}
            </span>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-deep-sage mb-1 group-hover:text-sage-medium transition-colors">
                  {product.Nom}
                </h4>
                {product.Description && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {product.Description}
                  </p>
                )}
              </div>

              <div className="text-right flex-shrink-0 bg-deep-sage/5 px-4 py-2 rounded-xl">
                <p className="text-2xl font-bold text-deep-sage">{product.Prix}</p>
                <p className="text-xs text-gray-500 font-medium">ID: {product.ID}</p>
              </div>
            </div>

            {/* Tags vins */}
            {isWine && (product.tag_couleur || product.tag_moment || product.tag_style || product.tag_accord) && (
              <div className="flex flex-wrap gap-2 my-4 p-3 bg-gradient-to-r from-gray-50 to-transparent rounded-lg border-l-2 border-soft-gold">
                {product.tag_couleur && (
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-lg shadow-sm border border-red-200">
                    🍷 {product.tag_couleur}
                  </span>
                )}
                {product.tag_moment && (
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-lg shadow-sm border border-purple-200">
                    ⏰ {product.tag_moment}
                  </span>
                )}
                {product.tag_style && (
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-lg shadow-sm border border-green-200">
                    ✨ {product.tag_style}
                  </span>
                )}
                {product.tag_accord && (
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 rounded-lg shadow-sm border border-orange-200">
                    🍽️ {product.tag_accord}
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product);
                }}
                className="flex-1 group/btn flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-deep-sage to-sage-medium text-white rounded-xl hover:from-sage-medium hover:to-deep-sage transition-all duration-200 text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Edit2 size={16} className="group-hover/btn:rotate-12 transition-transform" />
                <span>Modifier</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product);
                }}
                className="group/btn px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200 flex items-center gap-2 text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                <span className="hidden sm:inline">Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Effet de hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-sage/0 via-sage-medium/0 to-soft-gold/0 group-hover:from-deep-sage/5 group-hover:via-sage-medium/5 group-hover:to-soft-gold/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
}
