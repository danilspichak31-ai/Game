const languageSelect = document.getElementById('languageSelect');
const themeSelect = document.getElementById('themeSelect');
const navHome = document.getElementById('navHome');
const navFavorites = document.getElementById('navFavorites');
const heroTag = document.getElementById('heroTag');
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const gamesList = document.getElementById('gamesList');
const favoritesList = document.getElementById('favoritesList');
const searchInput = document.getElementById('searchInput');
const genreSelect = document.getElementById('genreSelect');
const platformSelect = document.getElementById('platformSelect');
const sortSelect = document.getElementById('sortSelect');
const showFiltersButton = document.getElementById('show-filters');
const clearFiltersButton = document.getElementById('clearFilters');
const resultInfo = document.getElementById('resultInfo');
let favoritesCount = document.getElementById('favoritesCount');
const filterPanel = document.getElementById('filterPanel');

const THEME_KEY = 'gameCatalogTheme';
const FAVORITES_KEY = 'gameCatalogFavorites';

const uiText = {
  uk: {
    navHome: 'Головна',
    navFavorites: 'Обране',
    heroTag: 'Курсова робота',
    heroTitle: "Каталог комп'ютерних ігор",
    heroSubtitle: 'Навчальний веб-сайт для перегляду, пошуку та фільтрації ігор за жанром, платформою, рейтингом і роком релізу.',
    searchLabel: 'Пошук',
    searchPlaceholder: 'Наприклад: Witcher, RPG, PC',
    genreLabel: 'Жанр',
    platformLabel: 'Платформа',
    sortLabel: 'Сортування',
    allGenres: 'Усі жанри',
    allPlatforms: 'Усі платформи',
    sortDefault: 'За замовчуванням',
    sortRatingDesc: 'Рейтинг: спочатку кращі',
    sortRatingAsc: 'Рейтинг: спочатку нижчі',
    sortYearDesc: 'Рік: новіші',
    sortYearAsc: 'Рік: старіші',
    sortNameAsc: 'Назва: А→Я',
    sortNameDesc: 'Назва: Я→А',
    clearFilters: 'Скинути фільтри',
    showFilters: 'Показати фільтри',
    hideFilters: 'Сховати фільтри',
    resultCount: count => `Показано ${count} ${count === 1 ? 'гра' : 'ігор'} у каталозі.`,
    favoritesTitle: 'Обране',
    favoritesDescription: 'Тут зберігаються ігри, які ви додали в обране.',
    favoritesEmpty: 'Ваш список обраного порожній.',
    noGames: 'За заданими параметрами ігор не знайдено.',
    learnMore: 'Детальніше',
    inFavorites: 'У обраному',
    addToFavorites: 'До обраного'
  },
  ru: {
    navHome: 'Главная',
    navFavorites: 'Избранное',
    heroTag: 'Курсовая работа',
    heroTitle: 'Каталог компьютерных игр',
    heroSubtitle: 'Учебный веб-сайт для просмотра, поиска и фильтрации игр по жанру, платформе, рейтингу и году релиза.',
    searchLabel: 'Поиск',
    searchPlaceholder: 'Например: Witcher, RPG, PC',
    genreLabel: 'Жанр',
    platformLabel: 'Платформа',
    sortLabel: 'Сортировка',
    allGenres: 'Все жанры',
    allPlatforms: 'Все платформы',
    sortDefault: 'По умолчанию',
    sortRatingDesc: 'Рейтинг: сначала лучшие',
    sortRatingAsc: 'Рейтинг: сначала худшие',
    sortYearDesc: 'Год: новые',
    sortYearAsc: 'Год: старые',
    sortNameAsc: 'Название: А→Я',
    sortNameDesc: 'Название: Я→А',
    clearFilters: 'Сбросить фильтры',
    showFilters: 'Показать фильтры',
    hideFilters: 'Скрыть фильтры',
    resultCount: count => `Показано ${count} ${count === 1 ? 'игра' : 'игр'} в каталоге.`,
    favoritesTitle: 'Избранное',
    favoritesDescription: 'Здесь хранятся игры, которые вы добавили в избранное.',
    favoritesEmpty: 'Ваш список избранного пуст.',
    noGames: 'По заданным параметрам игры не найдены.',
    learnMore: 'Подробнее',
    inFavorites: 'В избранном',
    addToFavorites: 'В избранное'
  },
  en: {
    navHome: 'Home',
    navFavorites: 'Favorites',
    heroTag: 'Course project',
    heroTitle: 'Game catalog',
    heroSubtitle: 'A learning website for browsing, searching and filtering games by genre, platform, rating and release year.',
    searchLabel: 'Search',
    searchPlaceholder: 'For example: Witcher, RPG, PC',
    genreLabel: 'Genre',
    platformLabel: 'Platform',
    sortLabel: 'Sort',
    allGenres: 'All genres',
    allPlatforms: 'All platforms',
    sortDefault: 'Default',
    sortRatingDesc: 'Rating: high to low',
    sortRatingAsc: 'Rating: low to high',
    sortYearDesc: 'Year: newest',
    sortYearAsc: 'Year: oldest',
    sortNameAsc: 'Name: A→Z',
    sortNameDesc: 'Name: Z→A',
    clearFilters: 'Clear filters',
    showFilters: 'Show filters',
    hideFilters: 'Hide filters',
    resultCount: count => `Showing ${count} ${count === 1 ? 'game' : 'games'} in the catalog.`,
    favoritesTitle: 'Favorites',
    favoritesDescription: 'Here are the games you added to favorites.',
    favoritesEmpty: 'Your favorites list is empty.',
    noGames: 'No games found for the selected filters.',
    learnMore: 'Learn more',
    inFavorites: 'In favorites',
    addToFavorites: 'Add to favorites'
  }
};

const games = [
  {
    id: 'witcher3',
    title: { uk: 'The Witcher 3: Wild Hunt', ru: 'The Witcher 3: Wild Hunt', en: 'The Witcher 3: Wild Hunt' },
    genre: { uk: 'RPG', ru: 'RPG', en: 'RPG' },
    platform: 'PC',
    year: 2015,
    rating: 9.8,
    cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Епічна рольова гра з відкритим світом, яка розповідає про пригоди Геральта із Рівії. Досліджуйте світ, виконуйте завдання, боріться з чудовиськами та приймайте складні рішення.',
      ru: 'Эпическая ролевая игра с открытым миром, рассказывающая о приключениях Геральта из Ривии. Исследуйте мир, выполняйте задания, сражайтесь с монстрами и принимайте сложные решения.',
      en: 'An epic open-world role-playing game following the adventures of Geralt of Rivia. Explore the world, complete quests, fight monsters, and make difficult choices.'
    }
  },
  {
    id: 'cyberpunk2077',
    title: { uk: 'Cyberpunk 2077', ru: 'Cyberpunk 2077', en: 'Cyberpunk 2077' },
    genre: { uk: 'Action RPG', ru: 'Action RPG', en: 'Action RPG' },
    platform: 'PC',
    year: 2020,
    rating: 8.3,
    cover: 'https://images.unsplash.com/photo-1517898716754-20b979792f3f?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Футуристичний шутер з RPG-елементами у світі Найт-Сіті. Відкрийте для себе безліч можливостей кастомізації, сюжетних виборів і високодинамічних боїв.',
      ru: 'Футуристический шутер с RPG-элементами в мире Найт-Сити. Откройте для себя множество возможностей кастомизации, сюжетных выборов и динамичных боёв.',
      en: 'A futuristic shooter with RPG elements set in Night City. Discover deep customization, story choices and high-paced combat.'
    }
  },
  {
    id: 'halo-infinite',
    title: { uk: 'Halo Infinite', ru: 'Halo Infinite', en: 'Halo Infinite' },
    genre: { uk: 'Shooter', ru: 'Shooter', en: 'Shooter' },
    platform: 'Xbox',
    year: 2021,
    rating: 8.1,
    cover: 'https://images.unsplash.com/photo-1498475230038-aff8df4b2f1f?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Науково-фантастичний шутер від першої особи, який повертає легендарного Майстра Чіфа у боротьбу за всесвіт. Гра має захопливу кампанію та багатокористувацький режим.',
      ru: 'Научно-фантастический шутер от первого лица, возвращающий легендарного Мастера Чифа в борьбу за вселенную. Игра содержит захватывающую кампанию и мультиплеер.',
      en: 'A sci-fi first-person shooter bringing back Master Chief to fight for the galaxy. Includes a gripping campaign and multiplayer modes.'
    }
  },
  {
    id: 'forza-horizon-5',
    title: { uk: 'Forza Horizon 5', ru: 'Forza Horizon 5', en: 'Forza Horizon 5' },
    genre: { uk: 'Racing', ru: 'Racing', en: 'Racing' },
    platform: 'PC',
    year: 2021,
    rating: 9.2,
    cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Яскрава гоночна гра з відкритим світом і великою кількістю трас. Динаміка, красива графіка та можливість керувати сотнями автівок.',
      ru: 'Яркая гоночная игра с открытым миром и множеством трас. Динамика, красивая графика и возможность управлять сотнями автомобилей.',
      en: 'A vibrant open-world racing game with many tracks. Enjoy dynamic driving, beautiful visuals and hundreds of cars.'
    }
  },
  {
    id: 'horizon-zero-dawn',
    title: { uk: 'Horizon Zero Dawn', ru: 'Horizon Zero Dawn', en: 'Horizon Zero Dawn' },
    genre: { uk: 'Action RPG', ru: 'Action RPG', en: 'Action RPG' },
    platform: 'PlayStation',
    year: 2017,
    rating: 9.0,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Пригодницька RPG у постапокаліптичному світі роботизованих істот. Ви граєте за Елой, яка розслідує походження свого світу та бореться за виживання.',
      ru: 'Приключенческая RPG в постапокалиптическом мире роботизированных существ. Вы играете за Элой, расследующую происхождение этого мира и борющуюся за выживание.',
      en: 'An action RPG in a post-apocalyptic world of robotic creatures. Play as Aloy and uncover the origins of her world while fighting to survive.'
    }
  },
  {
    id: 'doom-eternal',
    title: { uk: 'DOOM Eternal', ru: 'DOOM Eternal', en: 'DOOM Eternal' },
    genre: { uk: 'Shooter', ru: 'Shooter', en: 'Shooter' },
    platform: 'PC',
    year: 2020,
    rating: 8.9,
    cover: 'https://images.unsplash.com/photo-1504198458649-3128b932f49b?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Швидкий і потужний шутер від першої особи. Запрошує на інтенсивну боротьбу з демонами та захопливий саундтрек.',
      ru: 'Быстрый и мощный шутер от первого лица. Предлагает интенсивную битву с демонами и захватывающий саундтрек.',
      en: 'A fast and powerful first-person shooter. Engage in intense combat against demons with an adrenaline-pumping soundtrack.'
    }
  },
  {
    id: 'fifa-23',
    title: { uk: 'FIFA 23', ru: 'FIFA 23', en: 'FIFA 23' },
    genre: { uk: 'Sports', ru: 'Sports', en: 'Sports' },
    platform: 'PC',
    year: 2022,
    rating: 7.9,
    cover: 'https://images.unsplash.com/photo-1505842465776-3ce094fd7a1f?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Симулятор футболу з режимами для одного гравця та мультиплеєром. Спортивний баланс і реалістична механіка гри.',
      ru: 'Футбольный симулятор с режимами для одного игрока и мультиплеером. Спортивный баланс и реалистичная механика игры.',
      en: 'A football simulator with single-player and multiplayer modes. Sports balance and realistic gameplay mechanics.'
    }
  },
  {
    id: 'zelda-breath',
    title: { uk: 'The Legend of Zelda: Breath of the Wild', ru: 'The Legend of Zelda: Breath of the Wild', en: 'The Legend of Zelda: Breath of the Wild' },
    genre: { uk: 'Adventure', ru: 'Adventure', en: 'Adventure' },
    platform: 'Nintendo',
    year: 2017,
    rating: 9.7,
    cover: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    description: {
      uk: 'Відкрита пригода з величезним світом, загадками і вільним дослідженням. Класична серія Zelda у новому форматі.',
      ru: 'Открытое приключение с огромным миром, загадками и свободным исследованием. Классическая серия Zelda в новом формате.',
      en: 'An open-world adventure with a vast world, puzzles, and free exploration. The classic Zelda series in a new form.'
    }
  }
];

let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

function getText(value) {
  if (typeof value === 'object') {
    return value[languageSelect.value] || value.en || value.uk || '';
  }
  return value;
}

function getUniqueValues(field) {
  return [...new Set(games.map(game => getText(game[field])))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, languageSelect.value));
}

function createOption(value) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = value;
  return option;
}

function fillFilters() {
  genreSelect.innerHTML = `<option value="all">${uiText[languageSelect.value].allGenres}</option>`;
  platformSelect.innerHTML = `<option value="all">${uiText[languageSelect.value].allPlatforms}</option>`;
  getUniqueValues('genre').forEach(genre => genreSelect.appendChild(createOption(genre)));
  getUniqueValues('platform').forEach(platform => platformSelect.appendChild(createOption(platform)));
}

function getPlaceholderImage(text) {
  // Используем Data URI вместо external placeholder
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  
  // Случайный цвет
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA15E'];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 640, 360);
  
  // Текст
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.substring(0, 20), 320, 180);
  
  return canvas.toDataURL();
}

function buildGameCard(game, includeFavoriteAction = true) {
  const card = document.createElement('article');
  card.className = 'game-card';

  const img = document.createElement('img');
  img.src = game.cover;
  img.alt = `Cover: ${getText(game.title)}`;
  img.onerror = () => { img.src = getPlaceholderImage(getText(game.title)); };
  card.appendChild(img);

  const content = document.createElement('div');
  content.className = 'game-card-content';

  const title = document.createElement('h3');
  title.className = 'game-card-title';
  title.textContent = getText(game.title);
  content.appendChild(title);

  const meta = document.createElement('div');
  meta.className = 'game-card-meta';
  meta.innerHTML = `<span class="badge">${getText(game.genre)}</span><span class="badge">${game.platform}</span><span class="badge">${game.year}</span><span class="badge">★ ${game.rating}</span>`;
  content.appendChild(meta);

  const description = document.createElement('p');
  description.className = 'game-card-description';
  description.textContent = getText(game.description);
  content.appendChild(description);

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const detailLink = document.createElement('a');
  detailLink.className = 'btn';
  detailLink.href = `game.html?id=${encodeURIComponent(game.id)}`;
  detailLink.textContent = uiText[languageSelect.value].learnMore;
  actions.appendChild(detailLink);

  if (includeFavoriteAction) {
    const favButton = document.createElement('button');
    favButton.type = 'button';
    favButton.className = 'btn btn-secondary';
    favButton.textContent = favorites.includes(game.id)
      ? uiText[languageSelect.value].inFavorites
      : uiText[languageSelect.value].addToFavorites;
    favButton.addEventListener('click', () => toggleFavorite(game.id));
    actions.appendChild(favButton);
  }

  content.appendChild(actions);
  card.appendChild(content);
  return card;
}

function filterAndSortGames() {
  const search = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreSelect.value;
  const selectedPlatform = platformSelect.value;
  const sortBy = sortSelect.value;

  let filtered = games.filter(game => {
    const fields = [getText(game.title), getText(game.genre), game.platform, getText(game.description)];
    const matchesSearch = fields.some(field => field.toLowerCase().includes(search));
    const matchesGenre = selectedGenre === 'all' || getText(game.genre) === selectedGenre;
    const matchesPlatform = selectedPlatform === 'all' || game.platform === selectedPlatform;
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  switch (sortBy) {
    case 'ratingDesc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'ratingAsc':
      filtered.sort((a, b) => a.rating - b.rating);
      break;
    case 'yearDesc':
      filtered.sort((a, b) => b.year - a.year);
      break;
    case 'yearAsc':
      filtered.sort((a, b) => a.year - b.year);
      break;
    case 'nameAsc':
      filtered.sort((a, b) => getText(a.title).localeCompare(getText(b.title), languageSelect.value));
      break;
    case 'nameDesc':
      filtered.sort((a, b) => getText(b.title).localeCompare(getText(a.title), languageSelect.value));
      break;
    default:
      break;
  }

  return filtered;
}

function renderGames() {
  gamesList.innerHTML = '';
  const filteredGames = filterAndSortGames();

  resultInfo.textContent = uiText[languageSelect.value].resultCount(filteredGames.length);

  if (filteredGames.length === 0) {
    const message = document.createElement('p');
    message.textContent = uiText[languageSelect.value].noGames;
    message.style.color = 'var(--text-muted)';
    gamesList.appendChild(message);
    return;
  }

  filteredGames.forEach(game => gamesList.appendChild(buildGameCard(game)));
}

function updateFavoritesCount() {
  const currentCount = document.getElementById('favoritesCount');
  if (currentCount) {
    currentCount.textContent = favorites.length;
  }
}

function renderFavorites() {
  favoritesList.innerHTML = '';
  if (favorites.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = uiText[languageSelect.value].favoritesEmpty;
    empty.style.color = 'var(--text-muted)';
    favoritesList.appendChild(empty);
    return;
  }

  favorites
    .map(id => games.find(game => game.id === id))
    .filter(Boolean)
    .forEach(game => favoritesList.appendChild(buildGameCard(game, false)));
}

function toggleFavorite(gameId) {
  if (favorites.includes(gameId)) {
    favorites = favorites.filter(id => id !== gameId);
  } else {
    favorites.push(gameId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  renderGames();
  renderFavorites();
  updateFavoritesCount();
}

function clearFilters() {
  searchInput.value = '';
  genreSelect.value = 'all';
  platformSelect.value = 'all';
  sortSelect.value = 'default';
  renderGames();
}

function applyLanguage() {
  const lang = languageSelect.value;
  document.documentElement.lang = lang;
  navHome.textContent = uiText[lang].navHome;
  navFavorites.innerHTML = `${uiText[lang].navFavorites} <span id="favoritesCount" class="badge badge-mini">${favorites.length}</span>`;
  favoritesCount = document.getElementById('favoritesCount');
  heroTag.textContent = uiText[lang].heroTag;
  heroTitle.textContent = uiText[lang].heroTitle;
  heroSubtitle.textContent = uiText[lang].heroSubtitle;
  searchInput.placeholder = uiText[lang].searchPlaceholder;
  genreSelect.options[0].textContent = uiText[lang].allGenres;
  platformSelect.options[0].textContent = uiText[lang].allPlatforms;
  sortSelect.options[0].textContent = uiText[lang].sortDefault;
  sortSelect.options[1].textContent = uiText[lang].sortRatingDesc;
  sortSelect.options[2].textContent = uiText[lang].sortRatingAsc;
  sortSelect.options[3].textContent = uiText[lang].sortYearDesc;
  sortSelect.options[4].textContent = uiText[lang].sortYearAsc;
  sortSelect.options[5].textContent = uiText[lang].sortNameAsc;
  sortSelect.options[6].textContent = uiText[lang].sortNameDesc;
  clearFiltersButton.textContent = uiText[lang].clearFilters;
  showFiltersButton.textContent = uiText[lang].showFilters;
  document.querySelector('label[for="searchInput"]').textContent = uiText[lang].searchLabel;
  document.querySelector('label[for="genreSelect"]').textContent = uiText[lang].genreLabel;
  document.querySelector('label[for="platformSelect"]').textContent = uiText[lang].platformLabel;
  document.querySelector('label[for="sortSelect"]').textContent = uiText[lang].sortLabel;
  document.getElementById('favoritesHeading').textContent = uiText[lang].favoritesTitle;
  document.getElementById('favoritesDescription').textContent = uiText[lang].favoritesDescription;
  fillFilters();
  renderGames();
  renderFavorites();
  updateFavoritesCount();
}

function applyTheme() {
  const theme = themeSelect.value;
  if (theme === 'light') {
    document.documentElement.classList.add('theme-light');
  } else {
    document.documentElement.classList.remove('theme-light');
  }
  localStorage.setItem(THEME_KEY, theme);
}

function setInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    themeSelect.value = savedTheme;
  }
  applyTheme();
}

function toggleFilterPanel() {
  const isVisible = filterPanel.classList.toggle('controls-panel--visible');
  showFiltersButton.textContent = isVisible
    ? uiText[languageSelect.value].hideFilters
    : uiText[languageSelect.value].showFilters;
  if (isVisible) {
    filterPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function init() {
  setInitialTheme();
  fillFilters();
  applyLanguage();
  renderGames();
  renderFavorites();
  updateFavoritesCount();

  searchInput.addEventListener('input', renderGames);
  genreSelect.addEventListener('change', renderGames);
  platformSelect.addEventListener('change', renderGames);
  sortSelect.addEventListener('change', renderGames);
  clearFiltersButton.addEventListener('click', clearFilters);
  showFiltersButton.addEventListener('click', toggleFilterPanel);
  languageSelect.addEventListener('change', applyLanguage);
  themeSelect.addEventListener('change', applyTheme);
}

init();