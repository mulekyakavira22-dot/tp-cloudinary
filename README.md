# Merry Moments — galerie photo avec Cloudinary

**Merry Moments** est un mini-site vitrine en français qui présente quatre photos personnelles dans une galerie responsive. Les images sont hébergées dans Cloudinary et servies directement depuis ses URL publiques : aucun serveur applicatif ni base de données n'est nécessaire.

> **État de publication :** le site est prêt à être lancé localement et déployé gratuitement. Aucun lien public vers le site n'est encore disponible : un lien d'hébergement n'est créé qu'après la publication sur un compte GitHub Pages, Netlify ou équivalent. L'adresse actuelle de la galerie ne doit donc pas être confondue avec les liens Cloudinary des photos.

## Capture du compte Cloudinary

La capture ci-dessous montre la bibliothèque Cloudinary utilisée pendant le travail. **Cliquez sur l'image pour l'ouvrir en taille réelle.**

[![Capture de la bibliothèque d'images Cloudinary, montrant les ressources téléversées](assets/cloudinary-dashboard.png)](assets/cloudinary-dashboard.png)

## Résultat et fonctionnalités

- Une page d'accueil éditoriale avec présentation du projet et accès direct à la galerie.
- Quatre photos Cloudinary : **Mybesty**, **Besty**, **Me** et **Merry 2**.
- Chaque photo de la galerie et chaque aperçu de la page d'accueil est **cliquable** : le clic ouvre une fenêtre modale avec la photo originale, une description détaillée propre à l'image, sa catégorie, des informations complémentaires et son URL publique.
- Dans chaque fenêtre, les boutons permettent de télécharger l'original (`fl_attachment:<public_id>`, avec son nom de fichier), de partager le lien avec la fonction de partage du navigateur et de copier l'URL Cloudinary. Si le partage natif n'est pas proposé, le site propose la copie du lien en remplacement.
- La fenêtre se ferme avec la croix, en cliquant sur l'arrière-plan ou avec `Échap`. Le focus revient à la photo qui avait été sélectionnée.
- Recherche instantanée par nom ou description et filtres par catégorie : *Tout voir*, *Portraits*, *Style* et *Quotidien*.
- Mise en page adaptée aux téléphones, tablettes et ordinateurs.
- Chargement différé des images de la galerie pour éviter de charger trop tôt les photos qui ne sont pas encore visibles.
- Utilisation des transformations Cloudinary `f_auto`, `q_auto` et `w_720,c_limit` pour servir un format adapté au navigateur, optimiser la qualité et limiter la largeur des images d'aperçu. Le lien cliqué, lui, mène à l'original.
- Navigation au clavier : la touche `/` place le curseur dans la recherche ; `Échap` ferme la fenêtre photo ou efface la recherche lorsqu'elle est active.
- Aucun paquet ou secret n'est requis pour exécuter le site.

## Technologies et arborescence

Le projet utilise uniquement HTML, CSS et JavaScript natifs, sans framework ni étape de compilation.

```text
.
├── index.html                    # Structure et contenu de la galerie
├── styles.css                    # Mise en page responsive et styles
├── script.js                     # Recherche, filtres et raccourcis clavier
├── README.md                     # Présentation, explications et guide de publication
└── assets/
    └── cloudinary-dashboard.png  # Capture de la bibliothèque Cloudinary
```

## Comment Cloudinary est utilisé

Le nom du cloud affiché dans la capture est `wecnzts6`. Les images sont publiées avec les identifiants `mybesty`, `besty`, `me` et `merry2`. Une URL originale suit cette forme :

```text
https://res.cloudinary.com/<cloud_name>/image/upload/<public_id>
```

Par exemple, la photo **Mybesty** est diffusée à l'adresse :

<https://res.cloudinary.com/wecnzts6/image/upload/mybesty>

Les autres images :

- [Besty](https://res.cloudinary.com/wecnzts6/image/upload/besty)
- [Me](https://res.cloudinary.com/wecnzts6/image/upload/me)
- [Merry 2](https://res.cloudinary.com/wecnzts6/image/upload/merry2)

Dans la galerie, le site utilise des URL de diffusion transformées, par exemple :

```text
https://res.cloudinary.com/wecnzts6/image/upload/f_auto,q_auto,w_720,c_limit/mybesty
```

- `f_auto` : Cloudinary choisit un format d'image adapté au navigateur.
- `q_auto` : Cloudinary ajuste automatiquement la qualité pour réduire le poids.
- `w_720,c_limit` : la largeur est plafonnée à 720 pixels sans agrandir une image plus petite.
- `mybesty` : identifiant public du fichier téléversé dans Cloudinary.

Les transformations ne remplacent pas le fichier original : elles produisent une version optimisée à la demande. Les liens de chaque carte restent ceux des images originales afin de permettre leur consultation en grand format.

### Images accessibles publiquement

Les pages statiques doivent pouvoir charger les images dans le navigateur des visiteurs. C'est pourquoi les quatre photos sont référencées par leurs URL Cloudinary publiques. Ne placez **jamais** une clé API, un secret Cloudinary ou un mot de passe dans le HTML, le CSS, le JavaScript ou le dépôt Git.

Si une photo est remplacée ou son identifiant change, modifiez à la fois :

1. son lien original (`href`) dans `index.html` ;
2. son aperçu transformé (`src`) dans `index.html` ;
3. son nom ou sa description dans `data-search`, le texte alternatif et la légende.

Le nom du cloud est centralisé dans les URL de `index.html` ; après un changement de compte, vérifiez aussi les URL de la capture et la section Cloudinary de ce README.

## Lancer le site sur son ordinateur

### Option 1 — VS Code

1. Ouvrez le dossier du projet dans Visual Studio Code.
2. Ouvrez `index.html` dans un navigateur. L'extension **Live Server** peut également servir le site et actualiser la page automatiquement après chaque modification.

### Option 2 — serveur Python local

Depuis le dossier du projet, lancez :

```powershell
py -m http.server 5500
```

Puis ouvrez <http://localhost:5500> dans le navigateur. Arrêtez le serveur en revenant dans le terminal et en appuyant sur `Ctrl+C`.

Une connexion Internet est nécessaire pour télécharger les images hébergées sur Cloudinary.

## Vérifications avant la remise

1. Ouvrir la page et vérifier que les quatre photos s'affichent.
2. Cliquer sur chacune des quatre photos, y compris les deux aperçus de la page d'accueil, pour vérifier la fenêtre, la bonne description, le compteur et l'URL.
3. Dans une fiche photo, essayer **Télécharger l'image originale**, **Partager** et **Copier l'URL publique**. Autoriser le navigateur à copier dans le presse-papiers si une confirmation est demandée ; tester le partage sur un appareil qui le prend en charge.
4. Fermer la fenêtre avec la croix, avec `Échap` et en cliquant à l'extérieur ; vérifier que le focus revient à la photo sélectionnée.
5. Essayer les filtres *Portraits*, *Style*, *Quotidien* et *Tout voir*.
6. Rechercher un nom comme « Besty », puis tester une recherche sans résultat.
7. Redimensionner la fenêtre pour vérifier l'affichage sur petit écran.
8. Vérifier les liens Cloudinary dans [la bibliothèque des images](https://console.cloudinary.com/).
9. Après déploiement, ouvrir le lien public dans une fenêtre privée ou sur un autre appareil pour vérifier qu'il est accessible sans connexion au compte Cloudinary.

Si une image ne s'affiche plus, vérifiez d'abord le `cloud_name`, le `public_id`, le type de ressource (`image/upload`) et le caractère public de la ressource. Le site affiche le texte alternatif si le chargement d'une image échoue, mais il ne téléverse pas lui-même de nouvelles images : les photos doivent d'abord être ajoutées à Cloudinary.

## Publication gratuite et partage du site

Le site étant statique, il peut être publié sans serveur. Deux méthodes simples sont proposées.

### Méthode A — GitHub Pages

1. Connectez-vous à GitHub et créez un dépôt **public** pour le projet, par exemple `merry-moments-cloudinary`.
2. Ajoutez les fichiers et le dossier `assets` du projet à la racine du dépôt, puis envoyez-les sur la branche `main`.
3. Dans le dépôt, ouvrez **Settings → Pages**.
4. Dans **Build and deployment**, choisissez **Deploy from a branch**, sélectionnez `main` et le dossier `/ (root)`, puis enregistrez.
5. Attendez la fin du déploiement. GitHub Pages affiche l'adresse publique dans la section **Pages**, généralement sous la forme `https://<nom-utilisateur>.github.io/merry-moments-cloudinary/`.
6. Testez cette adresse depuis un autre navigateur, puis partagez **l'adresse exacte fournie par GitHub** avec l'enseignant.

Le dépôt doit contenir `index.html` à sa racine. GitHub Pages publie les fichiers du site ; les photos restent hébergées chez Cloudinary.

### Méthode B — Netlify

1. Ouvrez un compte Netlify et choisissez **Add new site → Deploy manually** (l'intitulé peut varier).
2. Faites glisser dans la zone de déploiement le dossier contenant `index.html`, `styles.css`, `script.js` et `assets`.
3. Attendez la fin du téléversement. Netlify fournit une adresse publique en `https://<nom-du-site>.netlify.app`.
4. Vérifiez le site à cette adresse et partagez le lien fourni. Un nom de site personnalisé peut être choisi dans les paramètres Netlify s'il est disponible.

**À compléter après publication :** collez ici l'adresse publique réelle du site afin qu'elle soit visible immédiatement par l'enseignant et les personnes à qui vous la partagez. Ne remplacez pas cette note par une URL inventée.

```text
Lien public du site : à renseigner après le déploiement
```

## Limites du mini-projet

- La galerie affiche les quatre images déjà hébergées dans Cloudinary ; elle ne contient pas de formulaire d'envoi de photos.
- La recherche et les filtres fonctionnent dans le navigateur, sur les quatre cartes affichées.
- Le lien public du site doit être créé dans un service d'hébergement (GitHub Pages, Netlify, etc.). Il ne peut pas être produit par le seul code présent dans ce dossier.
- La capture de démonstration documente l'espace Cloudinary ; elle n'est pas utilisée comme image de la galerie.
