let news

document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = this.getElementById('news')
    fetchNews()
        .then(news => {
            newsContainer.innerHTML = ''

            news.forEach(item => {
                const newsElement = createNewsItem(item);
                newsContainer.appendChild(newsElement);
            });
        })
        .catch(error => {
            console.error(error);
        });
});

function createNewsItem(item) {
    const titleParts = item.title.split(' - ');

    const anchor = document.createElement('a');
    anchor.href = item.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.setAttribute('aria-label', `Leia mais sobre ${titleParts[0]}`);

    const newsItem = document.createElement('div');
    newsItem.className = "bg-white border rounded-lg p-5 shadow-custom flex items-center justify-between";

    const content = document.createElement('div');
    content.className = "flex flex-col gap-3";

    const title = document.createElement('span');
    title.className = "text-xl font-semibold";
    title.textContent = titleParts[0];

    const metaInfo = document.createElement('div');
    metaInfo.className = "flex gap-5";

    const name = document.createElement('span');
    name.textContent = item.name;

    const separator = document.createElement('span');
    separator.textContent = "|";

    const date = document.createElement('span');
    date.textContent = dayjs().to(item.date);

    metaInfo.appendChild(name);
    metaInfo.appendChild(separator);
    metaInfo.appendChild(date);

    content.appendChild(title);
    content.appendChild(metaInfo);

    const iconContainer = document.createElement('div');
    iconContainer.className = "hidden lg:inline-block";
    iconContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link max-w-16 max-h-16 min-h-12 min-w-12">
        <path d="M15 3h6v6"></path>
        <path d="M10 14 21 3"></path>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      </svg>
    `;

    newsItem.appendChild(content);
    newsItem.appendChild(iconContainer);

    anchor.appendChild(newsItem);

    return anchor;
}

function hamburguerMenu() {
    const hamburguer1 = document.getElementById('hambuerguer1')
    const hamburguer2 = document.getElementById('hambuerguer2')
    const menu = document.getElementById('menu')

    if (!menu) return console.error('menu n encontrado')

    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full')
    } else {
        menu.classList.add('translate-x-full')
    }
}

function video() {
    const videoDiv = document.getElementById('video')

    if (!videoDiv) return console.error('div n encontrada')
    videoDiv.innerHTML = '<h1>video</h1>'
}

function fetchNews() {
    return new Promise((resolve, reject) => {
        fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://news.google.com/rss/search?q=piscinas&gl=BR'))
            .then(response => response.json())
            .then(data => {
                const text = data.contents;
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, 'application/xml');
                const items = Array.from(xml.querySelectorAll('item')).map(item => ({
                    title: item.querySelector('title')?.textContent || '',
                    description: item.querySelector('description')?.textContent || '',
                    date: item.querySelector('pubDate')?.textContent || '',
                    url: item.querySelector('link')?.textContent || '',
                    name: item.querySelector('source')?.textContent || ''
                }));

                items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                resolve(items.slice(0, 5));
            })
            .catch(error => {
                reject('Error fetching news: ' + error);
            });
    });
}