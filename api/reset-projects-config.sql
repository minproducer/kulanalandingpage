-- Delete existing projects config and insert new one
DELETE FROM configs WHERE config_key = 'projects';

-- Insert new projects config with sample data
INSERT INTO configs (config_key, config_value, created_at, updated_at)
VALUES (
  'projects',
  '{
    "projects": [
      {
        "id": 1,
        "name": "Coming Soon",
        "location": "Missouri",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "description": "Premium apartment development project in progress",
        "status": "In Progress",
        "size": ""
      }
    ]
  }',
  NOW(),
  NOW()
);

-- Verify
SELECT config_key, config_value FROM configs WHERE config_key = 'projects';
