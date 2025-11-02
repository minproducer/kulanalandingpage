-- Update footer config with full content fields

UPDATE configs 
SET config_value = '{
  "sections": {
    "companyInfo": {
      "enabled": true,
      "description": "Transforming concepts into high-performing assets with precision, integrity, and commitment to long-term value."
    },
    "navigation": {
      "enabled": true
    },
    "contact": {
      "enabled": false,
      "email": "info@kulanadevelopment.com",
      "phone": "(555) 123-4567",
      "location": "Texas & Southeast"
    },
    "social": {
      "enabled": false
    }
  },
  "copyright": {
    "enabled": true,
    "text": "Kulana Development"
  }
}'
WHERE config_key = 'footer';
