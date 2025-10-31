import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

export default function ProductList({ products, onEdit, onDelete, activeTab, searchQuery }) {
  if (products.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-lg text-gray-600 mb-2">
          {searchQuery ? 'Aucun résultat trouvé' : 'Aucun produit dans cet onglet'}
        </p>
        <p className="text-sm text-gray-500">
          {searchQuery
            ? 'Essayez une autre recherche'
            : 'Cliquez sur "Nouveau produit" pour commencer'}
        </p>
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
    <div className="space-y-6">
      {Object.entries(productsBySection).map(([section, sectionProducts]) => (
        <div key={section}>
          <h3 className="text-lg font-semibold text-deep-sage mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-sage-medium rounded-full"></span>
            {section}
            <span className="text-sm font-normal text-gray-500">
              ({sectionProducts.length})
            </span>
          </h3>

          <div className="space-y-3">
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

  return (
    <div
      className={`card hover:shadow-lg transition-all cursor-pointer ${
        !isActive ? 'opacity-60 bg-gray-50' : ''
      } ${isHighlighted ? 'ring-2 ring-soft-gold' : ''}`}
      onClick={() => onEdit(product)}
    >
      <div className="flex items-start gap-4">
        {/* Indicateur visuel */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
            isActive ? 'bg-green-100' : 'bg-gray-200'
          }`}>
            {product.Onglet === 'cocktails' && '🍸'}
            {product.Onglet === 'vins' && '🍷'}
            {product.Onglet === 'bieres' && '🍺'}
            {product.Onglet === 'softs' && '🥤'}
            {product.Onglet === 'chaudes' && '☕'}
            {product.Onglet === 'deguster' && '🍽️'}
            {!product.Onglet && '📋'}
          </div>
          {isActive ? (
            <Eye size={16} className="text-green-600" />
          ) : (
            <EyeOff size={16} className="text-gray-400" />
          )}
        </div>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-deep-sage text-lg flex items-center gap-2">
                {product.Nom}
                {isHighlighted && (
                  <span className="text-xs px-2 py-0.5 bg-soft-gold/20 text-bronze rounded-full">
                    ⭐ En ce moment
                  </span>
                )}
              </h4>
              {product.Description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.Description}
                </p>
              )}
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-deep-sage">{product.Prix}</p>
              <p className="text-xs text-gray-500">ID: {product.ID}</p>
            </div>
          </div>

          {/* Tags vins */}
          {isWine && (product.tag_couleur || product.tag_format || product.tag_moment) && (
            <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
              {product.tag_couleur && (
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                  {product.tag_couleur}
                </span>
              )}
              {product.tag_format && (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {product.tag_format}
                </span>
              )}
              {product.tag_moment && (
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                  {product.tag_moment}
                </span>
              )}
              {product.tag_style && (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                  {product.tag_style}
                </span>
              )}
              {product.tag_accord && (
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                  {product.tag_accord}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-sage-medium text-white rounded-lg hover:bg-deep-sage transition-colors text-sm font-medium"
            >
              <Edit2 size={16} />
              Modifier
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product);
              }}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Supprimer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
