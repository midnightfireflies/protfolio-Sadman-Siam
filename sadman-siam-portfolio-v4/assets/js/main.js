(() => {
  const root = document.documentElement;
  const body = document.body;
  const nav = document.querySelector('[data-nav]');
  const menu = document.querySelector('[data-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const themeToggle = document.querySelector('[data-theme-toggle]');

  const setScrolled = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      body.classList.toggle('menu-open', !open);
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        body.classList.remove('menu-open');
      });
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('ss-theme', next); } catch (e) {}
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const clock = document.querySelector('[data-local-time]');
  if (clock) {
    const timezone = clock.dataset.timezone || 'Asia/Dhaka';
    const renderTime = () => {
      try {
        clock.textContent = new Intl.DateTimeFormat([], {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
      } catch (e) {
        clock.textContent = '--:--';
      }
    };
    renderTime();
    setInterval(renderTime, 1000);
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const subject = String(data.get('subject') || 'Portfolio inquiry').trim();
      const message = String(data.get('message') || '').trim();
      const bodyText = `Hi Sadman,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
      window.location.href = `mailto:sadmansiam1110@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    });
  }

  const githubRoot = document.getElementById('github-repos');
  if (githubRoot) {
    const username = githubRoot.dataset.user;
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=10`)
      .then((response) => {
        if (!response.ok) throw new Error('GitHub API unavailable');
        return response.json();
      })
      .then((repos) => {
        const visible = repos.filter((repo) => !repo.fork).slice(0, 4);
        githubRoot.replaceChildren();
        if (!visible.length) throw new Error('No public repositories found');

        visible.forEach((repo) => {
          const link = document.createElement('a');
          link.className = 'github-repo';
          link.href = repo.html_url;
          link.target = '_blank';
          link.rel = 'noopener';

          const title = document.createElement('strong');
          title.textContent = repo.name;

          const language = document.createElement('small');
          language.textContent = repo.language || 'Repository';

          const description = document.createElement('p');
          description.textContent = repo.description || 'Public GitHub repository.';

          link.append(title, language, description);
          githubRoot.append(link);
        });
      })
      .catch(() => {
        githubRoot.replaceChildren();
        const link = document.createElement('a');
        link.className = 'github-repo';
        link.href = `https://github.com/${encodeURIComponent(username)}`;
        link.target = '_blank';
        link.rel = 'noopener';
        const title = document.createElement('strong');
        title.textContent = 'View GitHub profile';
        const description = document.createElement('p');
        description.textContent = 'Live repository data could not be loaded right now.';
        link.append(title, description);
        githubRoot.append(link);
      });
  }
})();

/* Portfolio v3: off-canvas project navigator. */
(() => {
  const body = document.body;
  const drawer = document.querySelector('[data-project-drawer]');
  const backdrop = document.querySelector('[data-project-drawer-backdrop]');
  const toggles = document.querySelectorAll('[data-project-drawer-toggle]');
  const closeButton = document.querySelector('[data-project-drawer-close]');
  const drawerLinks = document.querySelectorAll('[data-project-drawer-link]');
  const projectsSection = document.getElementById('projects');
  const sideTab = document.querySelector('.project-drawer-tab');

  if (!drawer || !toggles.length) return;

  const setOpen = (open) => {
    body.classList.toggle('project-drawer-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)));
    if (open && closeButton) requestAnimationFrame(() => closeButton.focus());
  };

  toggles.forEach((toggle) => toggle.addEventListener('click', () => {
    setOpen(!body.classList.contains('project-drawer-open'));
  }));
  if (closeButton) closeButton.addEventListener('click', () => setOpen(false));
  if (backdrop) backdrop.addEventListener('click', () => setOpen(false));
  drawerLinks.forEach((link) => link.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('project-drawer-open')) setOpen(false);
  });

  if (projectsSection && sideTab && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => sideTab.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.12 });
    observer.observe(projectsSection);
  } else if (sideTab) {
    sideTab.classList.add('is-visible');
  }
})();
