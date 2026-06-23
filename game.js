const languageSelect = document.getElementById('languageSelect');
const themeSelect = document.getElementById('themeSelect');
const navHome = document.getElementById('navHome');
const navFavorites = document.getElementById('navFavorites');
const detailImage = document.getElementById('detailImage');
const detailTitle = document.getElementById('detailTitle');
const detailMeta = document.getElementById('detailMeta');
const detailDescription = document.getElementById('detailDescription');
const favoriteButton = document.getElementById('favoriteButton');
const returnButton = document.getElementById('returnButton');

const uiText = {
  uk: {
    navHome: 'Головна',
    navFavorites: 'Обране',
    languageLabel: 'Мова',
    themeLabel: 'Тема',
    addFavorite: 'Додати в обране',
    inFavorites: 'У обраному',
    notFoundTitle: 'Гру не знайдено',
    notFoundText: 'Перевірте правильність посилання та поверніться на головну сторінку.',
    returnText: 'Повернутися'
  },
  ru: {
    navHome: 'Главная',
    navFavorites: 'Избранное',
    languageLabel: 'Язык',
    themeLabel: 'Тема',
    addFavorite: 'Добавить в избранное',
    inFavorites: 'В избранном',
    notFoundTitle: 'Игру не найдено',
    notFoundText: 'Проверьте правильность ссылки и вернитесь на главную страницу.',
    returnText: 'Вернуться'
  },
  en: {
    navHome: 'Home',
    navFavorites: 'Favorites',
    languageLabel: 'Language',
    themeLabel: 'Theme',
    addFavorite: 'Add to favorites',
    inFavorites: 'In favorites',
    notFoundTitle: 'Game not found',
    notFoundText: 'Check the link and return to the main page.',
    returnText: 'Return'
  }
};

let favorites = JSON.parse(localStorage.getItem('gameCatalogFavorites')) || [];
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

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

function getText(value) {
  if (typeof value === 'object') {
    return value[languageSelect.value] || value.en || value.uk || '';
  }
  return value;
}

function getPlaceholderImage(text) {
  const encoded = encodeURIComponent(text);
  return `https://via.placeholder.com/800x450?text=${encoded}`;
}

function updateFavoriteState(isFavorite) {
  favoriteButton.textContent = isFavorite ? uiText[languageSelect.value].inFavorites : uiText[languageSelect.value].addFavorite;
}

function handleFavoriteToggle(gameId) {
  favorites = favorites.includes(gameId)
    ? favorites.filter(id => id !== gameId)
    : [...favorites, gameId];
  localStorage.setItem('gameCatalogFavorites', JSON.stringify(favorites));
  updateFavoriteState(favorites.includes(gameId));
}

function renderGameDetail(game) {
  document.title = `${getText(game.title)} — GameCatalog`;
  detailImage.src = game.cover;
  detailImage.alt = `Cover: ${getText(game.title)}`;
  detailImage.onerror = () => { detailImage.src = getPlaceholderImage(getText(game.title)); };
  detailTitle.textContent = getText(game.title);
  detailMeta.innerHTML = `
    <span class="badge">${getText(game.genre)}</span>
    <span class="badge">${game.platform}</span>
    <span class="badge">${game.year}</span>
    <span class="badge">★ ${game.rating}</span>
  `;
  detailDescription.textContent = getText(game.description);
  updateFavoriteState(favorites.includes(game.id));
  favoriteButton.addEventListener('click', () => handleFavoriteToggle(game.id));
}

function showNotFound() {
  detailTitle.textContent = uiText[languageSelect.value].notFoundTitle;
  detailDescription.textContent = uiText[languageSelect.value].notFoundText;
  detailImage.src = getPlaceholderImage('Not found');
  detailMeta.innerHTML = '';
  favoriteButton.style.display = 'none';
}

function applyLanguage() {
  const lang = languageSelect.value;
  document.documentElement.lang = lang;
  navHome.textContent = uiText[lang].navHome;
  navFavorites.textContent = uiText[lang].navFavorites;
  if (favoriteButton) {
    favoriteButton.textContent = favorites.includes(gameId) ? uiText[lang].inFavorites : uiText[lang].addFavorite;
  }
  document.querySelector('label[for="languageSelect"]').textContent = uiText[lang].languageLabel;
  document.querySelector('label[for="themeSelect"]').textContent = uiText[lang].themeLabel;
  if (returnButton) {
    returnButton.textContent = uiText[lang].returnText;
  }
}

function applyTheme() {
  const theme = themeSelect.value;
  if (theme === 'light') {
    document.documentElement.classList.add('theme-light');
  } else {
    document.documentElement.classList.remove('theme-light');
  }
  localStorage.setItem('gameCatalogTheme', theme);
}

function setInitialTheme() {
  const savedTheme = localStorage.getItem('gameCatalogTheme');
  if (savedTheme) {
    themeSelect.value = savedTheme;
  }
  applyTheme();
}

function init() {
  setInitialTheme();
  applyLanguage();
  languageSelect.addEventListener('change', applyLanguage);
  themeSelect.addEventListener('change', applyTheme);

  const game = games.find(item => item.id === gameId);
  if (game) {
    renderGameDetail(game);
  } else {
    showNotFound();
  }
}

init();