document.addEventListener('DOMContentLoaded', () => {
  // preload
  setTimeout(() => document.documentElement.classList.remove('preload'), 0);

  const userPref = localStorage.getItem('DashboardTheme');
  const systemPref = window.matchMedia('(prefers-color-scheme: light)');

  // for first time visit, use system pref color scheme else use userPref
  if (userPref === null) {
    applyTheme(systemPref.matches ? 'light' : 'dark');
  } else {
    applyTheme(userPref);
  }

  // watch for systemPref changes 
  systemPref.addEventListener('change', event => {
    // if DashboardTheme exist, just return
    // I didn't use "userPref" variable here because, if the user manually delete
    // the "DashBooardDarkMode" on localStorage, the "userPref" will retains its old value
    if (localStorage.getItem('DashboardTheme') !== null) return;

    applyTheme(event.currentTarget.matches ? 'light' : 'dark');
  });

  // when user changed dark mode toggle manually
  document.querySelector('#themeSwitch').addEventListener('change', event => {
    const theme = event.currentTarget.checked ? 'dark' : 'light';
    applyTheme(theme);
    // save to localstorage
    localStorage.setItem('DashboardTheme', theme);
  });
});



function applyTheme(theme) {
  // change [data-theme] value
  document.documentElement.setAttribute('data-theme', theme);

  // darkmode switcher
  document.querySelector('input[type=checkbox]#themeSwitch').checked = (theme == 'dark') ? true : false;
}