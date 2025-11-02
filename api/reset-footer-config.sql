-- Delete existing footer config and insert new one
DELETE FROM configs WHERE config_key = 'footer';

-- Insert new footer config with complete structure
INSERT INTO configs (config_key, config_value, created_at, updated_at)
VALUES (
  'footer',
  '{
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
        "platforms": {
          "email": {"enabled": false, "value": "info@kulanadevelopment.com"},
          "linkedin": {"enabled": false, "username": "kulana-development"},
          "facebook": {"enabled": false, "username": "kulanadev"},
          "twitter": {"enabled": false, "username": "kulanadev"},
          "instagram": {"enabled": false, "username": "kulanadev"},
          "youtube": {"enabled": false, "username": "kulanadev"}
        }
      }
    },
    "copyright": {
      "enabled": true,
      "text": "Kulana Development",
      "year": 2025
    }
  }',
  NOW(),
  NOW()
);

-- Verify
SELECT config_key, config_value FROM configs WHERE config_key = 'footer';
