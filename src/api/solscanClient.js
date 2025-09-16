// src/api/solscanClient.js

const axios = require('axios');
require('dotenv').config();

// Public API
const PUBLIC_BASE_URL = process.env.SOLSCAN_PUBLIC_BASE_URL;
const PUBLIC_API_KEY = process.env.SOLSCAN_PUBLIC_API_KEY;

// Pro API (optional, future use)
const PRO_BASE_URL = process.env.SOLSCAN_BASE_URL;
const PRO_API_KEY = process.env.SOLSCAN_API_KEY;

// Toggle between public/pro endpoints
const USE_PRO = process.env.SOLSCAN_USE_PRO === 'true';

// Decide which headers and base URL to use
const getHeaders = () => {
  return {
    "Accept": "application/json",
    "X-API-Key": USE_PRO ? PRO_API_KEY : PUBLIC_API_KEY
  };
};

const getBaseUrl = () => (USE_PRO ? PRO_BASE_URL : PUBLIC_BASE_URL);

/**
 * Fetch token transfer history from Solscan
 * @param {string} tokenMint
 * @param {object} options - { page, pageSize, fromTime, toTime, excludeZero }
 */
async function getTokenTransfers(tokenMint, options = {}) {
  try {
    const params = {
      address: tokenMint,
      page: options.page || 1,
      page_size: options.pageSize || 20,
      exclude_amount_zero: options.excludeZero === false ? false : true
    };

    if (options.fromTime && options.toTime) {
      params.block_time = [options.fromTime, options.toTime];
    }

    const url = `${getBaseUrl()}/v2.0/token/transfer`;

    const response = await axios.get(url, {
      params,
      headers: getHeaders()
    });

    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      console.warn("Solscan API responded with no data:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Solscan API error:", error.message);
    return [];
  }
}

module.exports = {
  getTokenTransfers
};
