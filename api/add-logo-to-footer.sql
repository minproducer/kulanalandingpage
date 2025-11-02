-- Update footer config to include logoUrl field and year
UPDATE configs 
SET config_value = JSON_SET(
    config_value,
    '$.sections.companyInfo.logoUrl', '/KulanaDev Logo - center.png',
    '$.copyright.year', 2025
)
WHERE config_key = 'footer';

-- Verify the update
SELECT config_key, config_value 
FROM configs 
WHERE config_key = 'footer';
