const storageKey = "creatorStudioPortfolio";

const uploadForm = document.getElementById("uploadForm");
const portfolioGrid = document.getElementById("portfolioGrid");
const clearAllButton = document.getElementById("clearAll");
const cardTemplate = document.getElementById("portfolioCardTemplate");

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveItems(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function renderItems() {
  const items = loadItems();
  portfolioGrid.innerHTML = "";

  if (items.length === 0) {
    portfolioGrid.innerHTML = "<p>No projects added yet. Upload your first piece above.</p>";
    return;
  }

  items.forEach((item, index) => {
    const node = cardTemplate.content.cloneNode(true);
    const image = node.querySelector(".portfolio-image");
    const badge = node.querySelector(".badge");
    const title = node.querySelector("h3");
    const description = node.querySelector("p");
    const removeButton = node.querySelector(".remove-item");

    image.src = item.image;
    image.alt = `${item.title} preview`;
    badge.textContent = item.category;
    title.textContent = item.title;
    description.textContent = item.description;

    removeButton.addEventListener("click", () => {
      const updated = loadItems().filter((_, i) => i !== index);
      saveItems(updated);
      renderItems();
    });

    portfolioGrid.appendChild(node);
  });
}

uploadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fileInput = document.getElementById("mediaFile");
  const file = fileInput.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const newItem = {
      title: document.getElementById("title").value.trim(),
      description: document.getElementById("description").value.trim(),
      category: document.getElementById("category").value,
      image: reader.result,
    };

    const items = loadItems();
    items.unshift(newItem);
    saveItems(items);
    renderItems();
    uploadForm.reset();
  };

  reader.readAsDataURL(file);
});

clearAllButton.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  renderItems();
});

renderItems();
