const cards = [...document.querySelectorAll(".photo-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const searchInput = document.querySelector("#photo-search");
const emptyState = document.querySelector("#empty-state");
const photoDialog = document.querySelector("#photo-dialog");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalSubtitle = document.querySelector("#modal-subtitle");
const modalDescription = document.querySelector("#modal-description");
const modalCategory = document.querySelector("#modal-category");
const modalCounter = document.querySelector("#modal-counter");
const modalFacts = document.querySelector("#modal-facts");
const modalStatus = document.querySelector("#modal-status");
const modalClose = document.querySelector("#modal-close");
const modalShare = document.querySelector("#modal-share");
const modalCopy = document.querySelector("#modal-copy");
const modalDownload = document.querySelector("#modal-download");
const modalUrl = document.querySelector("#modal-url");
let activeFilter = "all";
let lastFocusedElement = null;

const photoDetails = {
  mybesty: {
    name: "Mybesty",
    category: "Portrait · Instant spontané",
    subtitle: "Un sourire au naturel",
    description:
      "Un portrait en pied devant une grande porte vitrée aux encadrements orange. La tenue sombre contraste avec le décor lumineux et attire le regard vers la silhouette, tandis que le sac tenu à la main donne à la scène son caractère quotidien. La composition verticale laisse voir le lieu autant que le sujet : une image de souvenir, simple et directe, comme une pause capturée sur le chemin.",
    facts: ["Portrait en pied", "Cadre extérieur", "Original hébergé sur Cloudinary"],
  },
  besty: {
    name: "Besty",
    category: "Style · Couleurs & caractère",
    subtitle: "Une silhouette pleine de couleurs",
    description:
      "Cette photo met en valeur une tenue aux motifs colorés, photographiée devant un portail sombre. Le fond régulier forme un contraste avec les couleurs du vêtement et de l'accessoire porté à la main. Le cadrage vertical montre la tenue dans son ensemble et conserve le décor, pour raconter un petit moment de style plutôt qu'un simple gros plan.",
    facts: ["Portrait en pied", "Motifs colorés", "Original hébergé sur Cloudinary"],
  },
  me: {
    name: "Me",
    category: "Portrait · Regard & présence",
    subtitle: "Un instant pour soi",
    description:
      "Un portrait rapproché réalisé près d'une fenêtre : la lumière naturelle éclaire le visage et adoucit l'image. Le cadre se concentre sur l'expression et le regard, avec les détails de l'intérieur visibles en arrière-plan. Cette composition intime contraste avec les portraits en pied de la galerie et offre une autre façon de conserver un souvenir personnel.",
    facts: ["Portrait rapproché", "Lumière naturelle", "Original hébergé sur Cloudinary"],
  },
  merry2: {
    name: "Merry 2",
    category: "Quotidien · Douceur & lumière",
    subtitle: "La douceur d'un moment au calme",
    description:
      "Assise dans un intérieur lumineux, la personne photographiée regarde l'objectif dans une posture détendue. Le polo clair et les couleurs du siège composent une scène paisible, tandis que la fenêtre en arrière-plan laisse entrer la lumière. Une photo du quotidien, cadrée verticalement, qui apporte à l'album une ambiance calme et familière.",
    facts: ["Portrait assis", "Intérieur lumineux", "Original hébergé sur Cloudinary"],
  },
};

function showPhoto(photoLink) {
  const photo = photoDetails[photoLink.dataset.photoId];

  if (!photo) {
    modalStatus.textContent = "Cette photo ne possède pas encore de fiche descriptive.";
    return;
  }

  lastFocusedElement = photoLink;
  modalImage.src = photoLink.href;
  modalImage.alt = photo.name;
  modalTitle.textContent = photo.name;
  modalSubtitle.textContent = photo.subtitle;
  modalDescription.textContent = photo.description;
  modalCategory.textContent = photo.category;
  modalCounter.textContent = `${String(Object.keys(photoDetails).indexOf(photoLink.dataset.photoId) + 1).padStart(2, "0")} / ${String(Object.keys(photoDetails).length).padStart(2, "0")}`;
  modalUrl.href = photoLink.href;
  modalUrl.textContent = photoLink.href;
  modalDownload.href = photoLink.href.replace(
    "/image/upload/",
    `/image/upload/fl_attachment:${photoLink.dataset.photoId}/`,
  );
  modalDownload.download = `${photoLink.dataset.photoId}.jpg`;
  modalStatus.textContent = "";
  modalFacts.replaceChildren(
    ...photo.facts.map((fact) => {
      const item = document.createElement("span");
      item.className = "modal-fact";
      item.textContent = fact;
      return item;
    }),
  );
  photoDialog.showModal();
  modalClose.focus();
}

function closePhoto() {
  if (photoDialog.open) {
    photoDialog.close();
  }
}

async function copyPublicUrl() {
  try {
    await navigator.clipboard.writeText(modalUrl.href);
    modalStatus.textContent = "Lien public copié dans le presse-papiers.";
  } catch {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = modalUrl.href;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.append(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand("copy");
    temporaryInput.remove();
    modalStatus.textContent = copied
      ? "Lien public copié dans le presse-papiers."
      : "La copie automatique est refusée par le navigateur. Sélectionnez le lien public ci-dessous pour le copier.";
  }
}

function updateGallery() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("fr");
  let visibleCount = 0;

  for (const card of cards) {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.search.toLocaleLowerCase("fr").includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;

    card.hidden = !isVisible;
    visibleCount += Number(isVisible);
  }

  emptyState.hidden = visibleCount > 0;
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    for (const filterButton of filterButtons) {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    }

    updateGallery();
  });
}

searchInput.addEventListener("input", updateGallery);

for (const photoLink of document.querySelectorAll("[data-photo-id]")) {
  photoLink.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    showPhoto(photoLink);
  });
}

modalClose.addEventListener("click", closePhoto);

photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) {
    closePhoto();
  }
});

photoDialog.addEventListener("close", () => {
  lastFocusedElement?.focus();
});

modalCopy.addEventListener("click", copyPublicUrl);

modalShare.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Merry Moments — ${modalTitle.textContent}`,
        text: modalSubtitle.textContent,
        url: modalUrl.href,
      });
      modalStatus.textContent = "La fenêtre de partage a été ouverte.";
    } catch (error) {
      if (error.name !== "AbortError") {
        modalStatus.textContent = "Le partage a échoué. Vous pouvez copier l'URL publique à la place.";
      }
    }
    return;
  }

  modalStatus.textContent = "Le partage direct n'est pas disponible dans ce navigateur. Copie du lien public…";
  await copyPublicUrl();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && photoDialog.open) {
    closePhoto();
    return;
  }

  if (
    event.key === "/" &&
    !photoDialog.open &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    updateGallery();
    searchInput.blur();
  }
});

for (const image of document.querySelectorAll("img")) {
  image.addEventListener("error", () => {
    image.alt = `${image.alt} (image momentanément indisponible)`;
  }, { once: true });
}
