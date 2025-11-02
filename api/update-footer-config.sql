-- Update footer config with all fields including navigation links and titles

UPDATE configs 
SET config_value = '{
  "sections": {
    "companyInfo": {
      "enabled": true,
      "logoUrl": "/KulanaDev Logo - center.png",
      "description": "Transforming concepts into high-performing assets with precision, integrity, and commitment to long-term value."
    },
    "navigation": {
      "enabled": true,
      "title": "Quick Links",
      "links": [
        {"name": "Home", "path": "/"},
        {"name": "Projects", "path": "/projects"},
        {"name": "Management Team", "path": "/management-team"},
        {"name": "FAQ", "path": "/faq"}
      ]
    },
    "contact": {
      "enabled": false,
      "title": "Contact",
      "email": "info@kulanadevelopment.com",
      "phone": "(555) 123-4567",
      "location": "Texas & Southeast"
    },
    "social": {
      "enabled": false,
      "title": "Follow Us",
      "links": {
        "email": "#",
        "linkedin": "#",
        "facebook": "#"
      }
    }
  },
  "copyright": {
    "enabled": true,
    "text": "Kulana Development",
    "year": 2025
  }
}'
WHERE config_key = 'footer';

-- Verify the update
SELECT config_key, JSON_PRETTY(config_value) as formatted_config
FROM configs 
WHERE config_key = 'footer';
