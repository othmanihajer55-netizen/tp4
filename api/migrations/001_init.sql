CREATE TABLE IF NOT EXISTS taches (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    fait BOOLEAN DEFAULT FALSE
);

INSERT INTO taches (titre, fait)
SELECT 'Installer Docker Desktop', true
WHERE NOT EXISTS (
    SELECT 1 FROM taches WHERE titre = 'Installer Docker Desktop'
);

INSERT INTO taches (titre, fait)
SELECT 'Construire une image', false
WHERE NOT EXISTS (
    SELECT 1 FROM taches WHERE titre = 'Construire une image'
);

INSERT INTO taches (titre, fait)
SELECT 'Découvrir Docker Compose', false
WHERE NOT EXISTS (
    SELECT 1 FROM taches WHERE titre = 'Découvrir Docker Compose'
);
