import { CONFIG } from '../config';

// Service pour interagir avec Google Sheets API v4

class GoogleSheetsService {
  constructor() {
    this.accessToken = null;
    this.initialized = false;
  }

  // Initialiser le service avec le token d'accès OAuth
  setAccessToken(token) {
    this.accessToken = token;
    this.initialized = true;
  }

  // Récupérer toutes les données du sheet
  async getAllData() {
    if (!this.initialized) {
      throw new Error('Service non initialisé. Connectez-vous d\'abord.');
    }

    try {
      const range = `${CONFIG.SHEET_TAB_NAME}!A:M`; // Colonnes A à M (ID jusqu'à tag_accord)
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.GOOGLE_SHEET_ID}/values/${range}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      if (rows.length === 0) {
        return [];
      }

      // Première ligne = headers
      const headers = rows[0];

      // Convertir en objets
      const products = rows.slice(1).map((row, index) => {
        const product = { _rowIndex: index + 2 }; // +2 car ligne 1 = headers, et index commence à 0
        headers.forEach((header, i) => {
          product[header] = row[i] || '';
        });
        return product;
      });

      return products;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  }

  // Mettre à jour une ligne
  async updateRow(rowIndex, productData) {
    if (!this.initialized) {
      throw new Error('Service non initialisé. Connectez-vous d\'abord.');
    }

    try {
      // Construire les valeurs dans le bon ordre (colonnes A à M)
      const values = [[
        productData.ID || '',
        productData.Onglet || '',
        productData.Section || '',
        productData.Nom || '',
        productData.Description || '',
        productData.Prix || '',
        productData.Actif || 'NON',
        productData['En ce moment'] || 'NON',
        productData.tag_couleur || '',
        productData.tag_format || '',
        productData.tag_moment || '',
        productData.tag_style || '',
        productData.tag_accord || ''
      ]];

      const range = `${CONFIG.SHEET_TAB_NAME}!A${rowIndex}:M${rowIndex}`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.GOOGLE_SHEET_ID}/values/${range}?valueInputOption=RAW`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values })
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  }

  // Ajouter une nouvelle ligne
  async addRow(productData) {
    if (!this.initialized) {
      throw new Error('Service non initialisé. Connectez-vous d\'abord.');
    }

    try {
      // Récupérer toutes les données pour avoir le prochain ID
      const allData = await this.getAllData();
      const maxId = Math.max(0, ...allData.map(p => parseInt(p.ID) || 0));
      const newId = maxId + 1;

      productData.ID = newId.toString();

      const values = [[
        productData.ID,
        productData.Onglet || '',
        productData.Section || '',
        productData.Nom || '',
        productData.Description || '',
        productData.Prix || '',
        productData.Actif || 'OUI',
        productData['En ce moment'] || 'NON',
        productData.tag_couleur || '',
        productData.tag_format || '',
        productData.tag_moment || '',
        productData.tag_style || '',
        productData.tag_accord || ''
      ]];

      const range = `${CONFIG.SHEET_TAB_NAME}!A:M`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.GOOGLE_SHEET_ID}/values/${range}:append?valueInputOption=RAW`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values })
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'ajout: ${response.status}`);
      }

      return { ...productData, _rowIndex: allData.length + 2 };
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      throw error;
    }
  }

  // Supprimer une ligne (en fait, on la vide)
  async deleteRow(rowIndex) {
    if (!this.initialized) {
      throw new Error('Service non initialisé. Connectez-vous d\'abord.');
    }

    try {
      // On vide la ligne plutôt que de la supprimer physiquement pour éviter les décalages
      const emptyValues = [['', '', '', '', '', '', '', '', '', '', '', '', '']];

      const range = `${CONFIG.SHEET_TAB_NAME}!A${rowIndex}:M${rowIndex}`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.GOOGLE_SHEET_ID}/values/${range}?valueInputOption=RAW`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: emptyValues })
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  }
}

// Export singleton
export const googleSheetsService = new GoogleSheetsService();
