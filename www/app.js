(function() {
  'use strict';

  // --- 0. MANIFEST (HTTP ONLY), LOGO FALLBACK & OFFLINE VECTOR ICONS ---
  if (window.location.protocol && window.location.protocol.startsWith('http')) {
    var manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);
  }

  var FALLBACK_LOGO_SVG = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<rect width="100" height="100" rx="22" fill="#ffffff"/>' +
      '<path d="M22 50c9-15 21-23 28-23s19 8 28 23c-9 15-21 23-28 23s-19-8-28-23z" fill="none" stroke="#0f172a" stroke-width="6"/>' +
      '<circle cx="50" cy="50" r="15" fill="none" stroke="#0f172a" stroke-width="5"/>' +
      '<rect x="44" y="42" width="14" height="9" rx="2" transform="rotate(-35 50 48)" fill="#f59e0b"/>' +
      '<rect x="40" y="50" width="14" height="4.5" rx="2" transform="rotate(-35 47 52)" fill="#f59e0b"/>' +
    '</svg>'
  );

  function handleLogoLoaded() {
    var fav = document.getElementById('app-favicon');
    if (fav && fav.getAttribute('href') !== 'FFLOGO.png') {
      fav.type = 'image/png';
      fav.href = 'FFLOGO.png';
    }
  }

  function handleLogoError(img) {
    if (!img) return;
    if (!img.dataset.triedAlt && window.location.protocol && window.location.protocol.startsWith('http')) {
      img.dataset.triedAlt = '1';
      img.src = '/assets/aistudio/FFLOGO_70d20ad7.png';
      return;
    }
    img.onerror = null;
    img.src = FALLBACK_LOGO_SVG;
    var fav = document.getElementById('app-favicon');
    if (fav) {
      fav.type = 'image/svg+xml';
      fav.href = FALLBACK_LOGO_SVG;
    }
  }

  function bindLogoImages() {
    ['splash-logo-img', 'navbar-logo-img'].forEach(function(id) {
      var img = document.getElementById(id);
      if (!img) return;
      img.addEventListener('load', handleLogoLoaded);
      img.addEventListener('error', function() { handleLogoError(img); });
      if (img.complete && img.naturalWidth === 0) {
        handleLogoError(img);
      }
    });
  }

  var OFFLINE_ICONS = {
    'bar-chart-3': '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    'check-circle-2': '<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>',
    'check-square': '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    'check': '<polyline points="20 6 9 17 4 12"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 16 14"/>',
    'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    'gem': '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/>',
    'gift': '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'pause': '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    'play': '<polygon points="5 3 19 12 5 21 5 3"/>',
    'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'refresh-cw': '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
    'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    'sparkles': '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'trash-2': '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
    'trophy': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
    'x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    'info': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'list-todo': '<rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    'tag': '<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/>',
    'award': '<circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    'edit-3': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'timer': '<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/>',
    'volume-2': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    'volume-x': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>',
    'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'
  };

  function renderIcons(container) {
    var root = container || document;
    var targets = root.querySelectorAll('[data-lucide]:not([data-icon-rendered])');
    for (var i = 0; i < targets.length; i++) {
      var el = targets[i];
      var name = el.getAttribute('data-lucide');
      var path = OFFLINE_ICONS[name] || '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/>';
      var size = el.getAttribute('size') || el.getAttribute('width') || 18;
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-' + name + '">' + path + '</svg>';
      el.setAttribute('data-icon-rendered', 'true');
    }
  }

  window.lucide = {
    createIcons: renderIcons
  };

  // --- 1. LOCAL STORAGE & DATA STATE ---
  var CYCLE_TARGET_SECS = 6000;
  var CYCLE_BONUS_PTS = 250;
  var POINTS_PER_FOCUS_SEC = 0.2 / 60;
  var MIN_REWARD_COST = 70;

  var STORAGE_KEYS = {
    TASKS: 'focusforge_tasks_v3',
    REWARDS: 'focusforge_rewards_v3',
    STATS: 'focusforge_stats_v3',
    TICKETS: 'focusforge_tickets_v3',
    TUTORIAL_SEEN: 'focusforge_tutorial_seen',
    SETTINGS: 'focusforge_settings_v3',
    POMO_STATE: 'focusforge_pomo_state_v3',
    CYCLE100: 'focusforge_cycle100_claimed_v3',
    SENT_SLOTS: 'focusforge_sent_deadline_slots_v1',
    NATIVE_NOTIF_IDS: 'focusforge_native_notif_ids_v1'
  };

  var DEFAULT_TASKS = [];

  var DEFAULT_REWARDS = [
    { id: 'r-1', title: '15 Mins Gaming / Social Media', pointsCost: 70, redemptionCount: 0 },
    { id: 'r-2', title: 'Favorite Snack or Drink', pointsCost: 100, redemptionCount: 0 },
    { id: 'r-3', title: 'Watch 1 Anime / Series Episode', pointsCost: 150, redemptionCount: 0 }
  ];

  // Intentionally omit cycleBaseSecs from DEFAULT_STATS so saved stats without it trigger legacy migration once
  var DEFAULT_STATS = {
    streakCount: 0,
    dopamineVaultPoints: 0,
    totalSecondsFocused: 0,
    dailyGoalText: '',
    lastDailyNotifDate: '',
    lastDailyNotifKey: '',
    dailyNotifUserEditedDate: ''
  };

  var DEFAULT_SETTINGS = {
    afkProtection: true,
    audioChimes: true,
    auto100Ticket: true,
    priorityBanner: true,
    dailyReminderBanner: true,
    maxSessionCap: true,
    showPomoCard: true,
    enableToasts: true,
    deviceNotifications: false,
    dailyNotifTime: '09:00',
    deadlineReminders: true
  };

  var DEFAULT_POMO_STATE = {
    secondsLeft: 1500,
    totalSeconds: 1500,
    isRunning: false,
    modeName: '25m Focus',
    soundOn: true,
    linkedTaskId: ''
  };

  function loadData(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveData(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  function migrateStats() {
    var changed = false;
    if (typeof stats.totalSecondsFocused !== 'number' || !Number.isFinite(stats.totalSecondsFocused) || stats.totalSecondsFocused < 0) {
      stats.totalSecondsFocused = 0;
      changed = true;
    }
    if (typeof stats.dopamineVaultPoints !== 'number' || !Number.isFinite(stats.dopamineVaultPoints) || stats.dopamineVaultPoints < 0) {
      stats.dopamineVaultPoints = 0;
      changed = true;
    }
    if (typeof stats.cycleBaseSecs !== 'number' || !Number.isFinite(stats.cycleBaseSecs) || stats.cycleBaseSecs < 0) {
      stats.cycleBaseSecs = Math.floor(stats.totalSecondsFocused / CYCLE_TARGET_SECS) * CYCLE_TARGET_SECS;
      changed = true;
    } else if (stats.cycleBaseSecs > stats.totalSecondsFocused) {
      stats.cycleBaseSecs = Math.floor(stats.totalSecondsFocused / CYCLE_TARGET_SECS) * CYCLE_TARGET_SECS;
      changed = true;
    }
    if (changed) {
      saveData(STORAGE_KEYS.STATS, stats);
    }
    return changed;
  }

  function migrateRewards() {
    var changed = false;
    for (var i = 0; i < rewards.length; i++) {
      var r = rewards[i];
      if (!r) continue;
      var parsedCost = Number(r.pointsCost);
      if (!Number.isFinite(parsedCost) || parsedCost < MIN_REWARD_COST) {
        rewards[i] = Object.assign({}, r, { pointsCost: MIN_REWARD_COST });
        changed = true;
      } else {
        var roundedCost = Math.round((parsedCost + 1e-9) * 100) / 100;
        if (roundedCost !== parsedCost) {
          rewards[i] = Object.assign({}, r, { pointsCost: roundedCost });
          changed = true;
        }
      }
    }
    if (changed) {
      saveData(STORAGE_KEYS.REWARDS, rewards);
    }
    return changed;
  }

  var tasks = loadData(STORAGE_KEYS.TASKS, DEFAULT_TASKS);
  if (!Array.isArray(tasks)) tasks = [];

  var rewards = loadData(STORAGE_KEYS.REWARDS, DEFAULT_REWARDS.map(function(r) { return Object.assign({}, r); }));
  if (!Array.isArray(rewards)) rewards = DEFAULT_REWARDS.map(function(r) { return Object.assign({}, r); });
  migrateRewards();

  var stats = Object.assign({}, DEFAULT_STATS, loadData(STORAGE_KEYS.STATS, DEFAULT_STATS));
  migrateStats();

  var tickets = loadData(STORAGE_KEYS.TICKETS, []);
  if (!Array.isArray(tickets)) tickets = [];

  var settings = Object.assign({}, DEFAULT_SETTINGS, loadData(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS));
  if ('dynamicScaling' in settings) {
    delete settings.dynamicScaling;
    saveData(STORAGE_KEYS.SETTINGS, settings);
  }

  var activeCategoryFilter = 'all';
  var currentView = 'tasks';
  var formCategory = 'academic';
  var editingTaskId = null;
  var activeTaskId = null;
  var lastUserActivityMs = Date.now();
  var lastTimerTickMs = Date.now();
  var currentTutorialStep = 1;

  var existingRunning = tasks.find(function(t) { return t && t.status === 'active'; });
  if (existingRunning) activeTaskId = existingRunning.id;

  // Constant Notification IDs & Android Channels (default app icon; no custom smallIcon)
  var NOTIF_ID_TEST = 999999;
  var NOTIF_ID_DAILY_CHECKIN = 10001;
  var NOTIF_ID_DAILY_CHECKIN_IMMEDIATE = 10002;
  var NOTIF_ID_POMO_FINISH = 50002;
  var NOTIF_ID_TASK_FINISH = 50003;
  var NOTIF_ID_SESSION_CAP = 50004;
  var NOTIF_ID_100_CYCLE = 50005;
  var NOTIF_CHANNEL_DEADLINES = 'deadlines';
  var NOTIF_CHANNEL_DAILY_FOCUS = 'daily-focus';
  var MAX_CAPACITOR_SLOTS_PER_TASK = 24;
  var AFK_TIMEOUT_MS = 180000;

  var MIN_MS = 60000;
  var HOUR_MS = 3600000;
  var DAY_MS = 86400000;
  var MAX_LOOKAHEAD_MS = 72 * HOUR_MS;
  var GRACE_WINDOW_MS = 10 * MIN_MS;

  // --- 25-MIN FAST FOCUS POMODORO ENGINE STATE ---
  var pomoState = Object.assign({}, DEFAULT_POMO_STATE, loadData(STORAGE_KEYS.POMO_STATE, {}));

  // --- AUDIO CHIMES ENGINE (100% OFFLINE WEB AUDIO API) ---
  var audioCtxInstance = null;
  function getAudioCtx() {
    if (!audioCtxInstance) {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtxInstance = new AudioCtx();
    }
    if (audioCtxInstance && audioCtxInstance.state === 'suspended') {
      audioCtxInstance.resume();
    }
    return audioCtxInstance;
  }

  function playOfflineAudioChime(type) {
    if (!settings.audioChimes || !pomoState.soundOn) return;
    try {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var now = ctx.currentTime;

      if (type === 'click' || type === 'tap') {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'start') {
        [440, 880].forEach(function(freq, idx) {
          var o = ctx.createOscillator();
          var g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.12, now + idx * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.08);
          o.stop(now + idx * 0.08 + 0.2);
        });
      } else if (type === 'pause') {
        [440, 330].forEach(function(freq, idx) {
          var o = ctx.createOscillator();
          var g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.1, now + idx * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.08);
          o.stop(now + idx * 0.08 + 0.2);
        });
      } else if (type === 'complete') {
        [523.25, 659.25, 783.99, 1046.50].forEach(function(freq, idx) {
          var o = ctx.createOscillator();
          var g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.16, now + idx * 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.1);
          o.stop(now + idx * 0.1 + 0.3);
        });
      } else if (type === 'delete' || type === 'remove') {
        var od = ctx.createOscillator();
        var gd = ctx.createGain();
        od.type = 'sawtooth';
        od.frequency.setValueAtTime(240, now);
        od.frequency.exponentialRampToValueAtTime(80, now + 0.12);
        gd.gain.setValueAtTime(0.1, now);
        gd.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        od.connect(gd);
        gd.connect(ctx.destination);
        od.start(now);
        od.stop(now + 0.12);
      } else if (type === 'reward' || type === 'redeem') {
        [880, 1174.66, 1396.91, 1760].forEach(function(freq, idx) {
          var o = ctx.createOscillator();
          var g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.15, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.06);
          o.stop(now + idx * 0.06 + 0.25);
        });
      } else if (type === 'fanfare' || type === 'victory') {
        [659.25, 830.61, 987.77, 1318.51].forEach(function(freq, idx) {
          var o = ctx.createOscillator();
          var g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.18, now + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.5);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.12);
          o.stop(now + idx * 0.12 + 0.5);
        });
      } else if (type === 'reset') {
        [500, 380].forEach(function(freq, idx) {
          var o = ctx.createOscillator();
          var g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.08, now + idx * 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.08);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.05);
          o.stop(now + idx * 0.05 + 0.08);
        });
      } else if (type === 'toast' || type === 'alert') {
        var ot = ctx.createOscillator();
        var gt = ctx.createGain();
        ot.type = 'sine';
        ot.frequency.setValueAtTime(784, now);
        gt.gain.setValueAtTime(0.08, now);
        gt.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        ot.connect(gt);
        gt.connect(ctx.destination);
        ot.start(now);
        ot.stop(now + 0.18);
      }
    } catch (e) {}
  }

  // --- UTILITIES ---
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTimer(totalSeconds) {
    var s = Number(totalSeconds) || 0;
    var mins = Math.floor(Math.max(0, s) / 60);
    var secs = Math.floor(Math.max(0, s) % 60);
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  function toLocalDateStr(dateObj) {
    var y = dateObj.getFullYear();
    var m = String(dateObj.getMonth() + 1).padStart(2, '0');
    var d = String(dateObj.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function patchElementText(id, text) {
    var el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== text) {
      el.textContent = text;
    }
  }

  function normalizePointsCenti(val) {
    var num = Math.max(0, Number(val) || 0);
    if (!Number.isFinite(num)) return 0;
    return Math.round((num + 1e-9) * 100);
  }

  function formatPoints(val) {
    return (normalizePointsCenti(val) / 100).toFixed(2);
  }

  function getDisplayedPoints() {
    return formatPoints(stats.dopamineVaultPoints);
  }

  function patchPointsDisplay() {
    var formatted = getDisplayedPoints();
    patchElementText('stat-points-val', formatted + ' PTS');
    patchElementText('mobile-stat-points-val', formatted + ' PTS');
    patchElementText('vault-pts-display', formatted);
  }

  function formatDateTimeLocalInput(dateStr) {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dateStr)) {
      return dateStr.slice(0, 16);
    }
    var d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return '';
    var pad = function(n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  // --- POMO ENGINE UI & CONTROLS ---
  var lastPomoSelectHtml = '';
  var lastPomoSoundState = null;

  function syncPomoState(forceSave) {
    if (forceSave) {
      saveData(STORAGE_KEYS.POMO_STATE, pomoState);
    }
    updatePomoUI();
  }

  function resetPomo() {
    pomoState = Object.assign({}, DEFAULT_POMO_STATE);
    try {
      localStorage.removeItem(STORAGE_KEYS.POMO_STATE);
    } catch (e) {}
    lastPomoSoundState = null;
    lastPomoSelectHtml = '';
    document.querySelectorAll('.btn-pomo-preset').forEach(function(b) {
      b.classList.remove('active');
    });
    var p25 = document.getElementById('preset-25m');
    var mp25 = document.getElementById('modal-preset-25m');
    if (p25) p25.classList.add('active');
    if (mp25) mp25.classList.add('active');
    updatePomoUI();
  }

  function togglePomoTimer() {
    var wasAnyRunning = !!(activeTaskId || pomoState.isRunning);
    pomoState.isRunning = !pomoState.isRunning;
    if (pomoState.isRunning) {
      if (!wasAnyRunning) {
        lastTimerTickMs = Date.now();
      }
      lastUserActivityMs = Date.now();
      playOfflineAudioChime('start');
      showToast(pomoState.modeName + ' running', 'info', '⚡ Focus Sprint Started');
    } else {
      showToast('Timer paused', 'info', 'Fast Focus Sprint');
    }
    syncPomoState(true);
  }

  function resetPomoTimer(newSecs) {
    var targetSecs = typeof newSecs === 'number' ? newSecs : pomoState.totalSeconds;
    pomoState.isRunning = false;
    pomoState.totalSeconds = targetSecs;
    pomoState.secondsLeft = targetSecs;
    syncPomoState(true);
    showToast('Timer reset to ' + formatTimer(targetSecs), 'info', 'Fast Focus Sprint');
  }

  function setPomoPreset(seconds, name) {
    pomoState.isRunning = false;
    pomoState.totalSeconds = seconds;
    pomoState.secondsLeft = seconds;
    pomoState.modeName = name;

    document.querySelectorAll('.btn-pomo-preset').forEach(function(b) {
      b.classList.remove('active');
    });
    if (seconds === 1500) {
      document.getElementById('preset-25m') && document.getElementById('preset-25m').classList.add('active');
      document.getElementById('modal-preset-25m') && document.getElementById('modal-preset-25m').classList.add('active');
    } else if (seconds === 900) {
      document.getElementById('preset-15m') && document.getElementById('preset-15m').classList.add('active');
      document.getElementById('modal-preset-15m') && document.getElementById('modal-preset-15m').classList.add('active');
    } else if (seconds === 300) {
      document.getElementById('preset-5m') && document.getElementById('preset-5m').classList.add('active');
      document.getElementById('modal-preset-5m') && document.getElementById('modal-preset-5m').classList.add('active');
    }

    syncPomoState(true);
    showToast('Preset changed to ' + name, 'info', 'Fast Focus Sprint');
  }

  function setPomoLinkedTask(taskId) {
    pomoState.linkedTaskId = taskId;
    syncPomoState(true);
    if (taskId) {
      var t = tasks.find(function(x) { return x.id === taskId; });
      showToast('Linked: ' + (t ? t.title : 'Task'), 'info', 'Focus Sprint Linked');
    }
  }

  function togglePomoAudio() {
    pomoState.soundOn = !pomoState.soundOn;
    syncPomoState(true);
    showToast(pomoState.soundOn ? 'Offline chimes enabled 🔊' : 'Audio chimes muted 🔇', 'info', 'Audio Preference');
  }

  function openPomoModal() {
    var modal = document.getElementById('modal-pomo-timer');
    if (modal) {
      modal.classList.add('active');
      window.lucide.createIcons(modal);
    }
    updatePomoUI();
  }

  function closePomoModal() {
    var modal = document.getElementById('modal-pomo-timer');
    if (modal) modal.classList.remove('active');
  }

  function updatePomoTaskOptions() {
    var selectEl = document.getElementById('pomo-task-select');
    if (!selectEl) return;
    var activeTasks = tasks.filter(function(t) {
      return t.status !== 'completed' && t.status !== 'terminated';
    });
    var opts = ['<option value="">-- Standalone (No Linked Task) --</option>'];
    for (var i = 0; i < activeTasks.length; i++) {
      var t = activeTasks[i];
      var sel = t.id === pomoState.linkedTaskId ? 'selected' : '';
      opts.push('<option value="' + escapeHtml(t.id) + '" ' + sel + '>' + escapeHtml(t.title) + ' (' + formatTimer(t.activeSeconds || 0) + ')</option>');
    }
    var nextHtml = opts.join('');
    if (nextHtml !== lastPomoSelectHtml) {
      lastPomoSelectHtml = nextHtml;
      selectEl.innerHTML = nextHtml;
    }
  }

  function updatePomoUI() {
    var timeStr = formatTimer(pomoState.secondsLeft);

    patchElementText('pomo-widget-clock', timeStr);
    patchElementText('pomo-modal-clock', timeStr);

    patchElementText('pomo-widget-start-text', pomoState.isRunning ? 'Pause Sprint' : 'Start ' + pomoState.modeName);
    patchElementText('pomo-modal-start-text', pomoState.isRunning ? 'Pause Focus Sprint' : 'Start ' + pomoState.modeName);

    var audioBtn = document.getElementById('pomo-audio-toggle-btn');
    if (audioBtn && lastPomoSoundState !== pomoState.soundOn) {
      lastPomoSoundState = pomoState.soundOn;
      var textNode = pomoState.soundOn ? ' Sound: ON' : ' Sound: MUTED';
      audioBtn.innerHTML = (pomoState.soundOn ? '<i data-lucide="volume-2" size="14"></i>' : '<i data-lucide="volume-x" size="14"></i>') + textNode;
      window.lucide.createIcons(audioBtn);
    }

    patchElementText(
      'pomo-modal-mode-label',
      'Mode: ' + pomoState.modeName + ' (' + (pomoState.totalSeconds === 300 ? 'Break Mode' : '0.2 PTS/min') + ')'
    );

    var ringFill = document.getElementById('pomo-ring-fill');
    if (ringFill && pomoState.totalSeconds > 0) {
      var ratio = pomoState.secondsLeft / pomoState.totalSeconds;
      ringFill.style.strokeDashoffset = (326.72 * (1 - ratio)).toFixed(2);
    }

    updatePomoTaskOptions();
  }

  // --- PERSISTENCE & RENDER SCHEDULER ---
  var secondsSinceLastStorageSave = 0;

  function saveProgressData() {
    saveData(STORAGE_KEYS.TASKS, tasks);
    saveData(STORAGE_KEYS.STATS, stats);
    if (pomoState.isRunning || pomoState.secondsLeft !== pomoState.totalSeconds) {
      saveData(STORAGE_KEYS.POMO_STATE, pomoState);
    }
  }

  function saveAllData() {
    saveData(STORAGE_KEYS.TASKS, tasks);
    saveData(STORAGE_KEYS.REWARDS, rewards);
    saveData(STORAGE_KEYS.STATS, stats);
    saveData(STORAGE_KEYS.TICKETS, tickets);
    saveData(STORAGE_KEYS.SETTINGS, settings);
    saveData(STORAGE_KEYS.POMO_STATE, pomoState);
  }

  function syncStateImmediate() {
    saveAllData();
    secondsSinceLastStorageSave = 0;
  }

  var isRenderScheduled = false;
  function scheduleRender() {
    if (isRenderScheduled) return;
    isRenderScheduled = true;
    requestAnimationFrame(function() {
      isRenderScheduled = false;
      fullRender();
    });
  }

  function syncState() {
    syncStateImmediate();
    var running = tasks.find(function(t) { return t.status === 'active'; });
    activeTaskId = running ? running.id : null;
    scheduleRender();
  }

  // --- CAPACITOR LOCAL NOTIFICATIONS & BROWSER BRIDGE ENGINE ---
  var sentDeadlineSlots = loadData(STORAGE_KEYS.SENT_SLOTS, {});
  if (!sentDeadlineSlots || typeof sentDeadlineSlots !== 'object' || Array.isArray(sentDeadlineSlots)) {
    sentDeadlineSlots = {};
  }
  var nativeNotifIdRegistry = loadData(STORAGE_KEYS.NATIVE_NOTIF_IDS, {});
  if (!nativeNotifIdRegistry || typeof nativeNotifIdRegistry !== 'object' || Array.isArray(nativeNotifIdRegistry)) {
    nativeNotifIdRegistry = {};
  }
  var channelsInitPromise = null;
  var lastResumeReconcileMs = 0;

  function getCapacitorLocalNotifications() {
    if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
      return window.Capacitor.Plugins.LocalNotifications;
    }
    return null;
  }

  async function ensureNotificationChannels(ln) {
    if (!ln || typeof ln.createChannel !== 'function') return;
    if (!channelsInitPromise) {
      channelsInitPromise = (async function() {
        try {
          await ln.createChannel({
            id: NOTIF_CHANNEL_DEADLINES,
            name: 'Deadlines',
            description: 'Urgent task deadline countdowns and due alerts',
            importance: 5,
            vibration: true,
            visibility: 1
          });
          await ln.createChannel({
            id: NOTIF_CHANNEL_DAILY_FOCUS,
            name: 'Daily Focus',
            description: 'Daily focus check-ins and sprint updates',
            importance: 3,
            vibration: false,
            visibility: 1
          });
        } catch (err) {
          channelsInitPromise = null;
        }
      })();
    }
    await channelsInitPromise;
  }

  async function scheduleNativeNotificationsSafe(ln, notifications) {
    if (!ln || !Array.isArray(notifications) || notifications.length === 0) return;
    try {
      await ln.schedule({ notifications: notifications });
    } catch (err) {
      var minimal = notifications.map(function(n) {
        return {
          id: n.id,
          title: n.title,
          body: n.body,
          channelId: n.channelId,
          schedule: n.schedule
        };
      });
      await ln.schedule({ notifications: minimal });
    }
  }

  function hashString32(str) {
    var hash = 2166136261;
    for (var i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function getDeadlineSlotNotifId(taskId, deadlineMs, slotKey) {
    var h = hashString32(String(taskId) + '|' + String(deadlineMs) + '|' + String(slotKey));
    return 2000000 + (h % 2000000000);
  }

  function getSentSlotStorageKey(taskId, deadlineMs, slotKey) {
    return String(taskId) + '|' + String(deadlineMs) + '|' + String(slotKey);
  }

  function clearTaskSentSlots(taskId) {
    if (!taskId) return;
    var prefix = String(taskId) + '|';
    var changed = false;
    var keys = Object.keys(sentDeadlineSlots);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].startsWith(prefix)) {
        delete sentDeadlineSlots[keys[i]];
        changed = true;
      }
    }
    if (changed) {
      saveData(STORAGE_KEYS.SENT_SLOTS, sentDeadlineSlots);
    }
  }

  function pruneSentDeadlineSlots() {
    var activeTaskMap = {};
    for (var i = 0; i < tasks.length; i++) {
      var t = tasks[i];
      if (t && t.id && t.deadline && t.status !== 'completed' && t.status !== 'terminated') {
        var dlMs = new Date(t.deadline).getTime();
        if (Number.isFinite(dlMs) && dlMs > 0) {
          activeTaskMap[String(t.id)] = String(dlMs);
        }
      }
    }
    var changed = false;
    var keys = Object.keys(sentDeadlineSlots);
    for (var k = 0; k < keys.length; k++) {
      var key = keys[k];
      var parts = key.split('|');
      var tId = parts[0];
      var dlStr = parts[1];
      if (!activeTaskMap[tId] || activeTaskMap[tId] !== dlStr) {
        delete sentDeadlineSlots[key];
        changed = true;
      }
    }
    if (changed) {
      saveData(STORAGE_KEYS.SENT_SLOTS, sentDeadlineSlots);
    }
  }

  function getDailyCheckInTimeParts(timeOverride) {
    var time = timeOverride || (settings && settings.dailyNotifTime) || '09:00';
    var parts = String(time).split(':');
    var parsedHour = parseInt(parts[0], 10);
    var parsedMin = parseInt(parts[1], 10);
    var hour = Number.isNaN(parsedHour) ? 9 : Math.max(0, Math.min(23, parsedHour));
    var minute = Number.isNaN(parsedMin) ? 0 : Math.max(0, Math.min(59, parsedMin));
    return {
      hour: hour,
      minute: minute,
      formatted: String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')
    };
  }

  function formatDeadlineAlertContent(taskTitle, remainingMs, isDeadlineReached) {
    var cleanTitle = (taskTitle || 'Focus Task').trim();
    if (isDeadlineReached || remainingMs <= 0) {
      return {
        title: '⚠️ Deadline reached: ' + cleanTitle,
        body: 'Time is up! Wrap it up or update deadline.',
        urgency: 'deadline',
        toastType: 'alert',
        toastTitle: '⚠️ ' + cleanTitle,
        toastDetail: 'Deadline reached — Wrap it up or update deadline.',
        vibrate: [300, 120, 300, 120, 400]
      };
    }

    if (remainingMs < HOUR_MS) {
      var mins = Math.max(1, Math.round(remainingMs / MIN_MS));
      var unit = mins === 1 ? 'minute' : 'minutes';
      return {
        title: '🔥 Due in ' + mins + ' ' + unit + ': ' + cleanTitle,
        body: mins + ' ' + unit + ' left. One focused block right now!',
        urgency: 'critical',
        toastType: 'alert',
        toastTitle: '🔥 ' + cleanTitle,
        toastDetail: 'Due in ' + mins + ' ' + unit + ' — One focused block right now!',
        vibrate: [300, 120, 300, 120, 400]
      };
    }

    var hours = Math.max(1, Math.round(remainingMs / HOUR_MS));
    var hourUnit = hours === 1 ? 'hour' : 'hours';
    if (hours <= 3) {
      return {
        title: '⏰ Due in ' + hours + ' ' + hourUnit + ': ' + cleanTitle,
        body: hours + ' ' + hourUnit + ' left. Lock in and finish strong.',
        urgency: 'soon',
        toastType: 'warning',
        toastTitle: '⏰ ' + cleanTitle,
        toastDetail: 'Due in ' + hours + ' ' + hourUnit + ' — Lock in and finish strong.',
        vibrate: [120]
      };
    }

    return {
      title: '📘 Due in ' + hours + ' hours: ' + cleanTitle,
      body: hours + ' hours left. Take one focused step now.',
      urgency: 'normal',
      toastType: 'info',
      toastTitle: '📘 ' + cleanTitle,
      toastDetail: 'Due in ' + hours + ' hours — Take one focused step now.',
      vibrate: [120]
    };
  }

  function buildDeadlineReminderSlots(task, nowMs, isCreateOrEdit, originalAnchorMs) {
    if (!task || !task.deadline || task.status === 'completed' || task.status === 'terminated') {
      return [];
    }
    var deadlineMs = new Date(task.deadline).getTime();
    if (!Number.isFinite(deadlineMs) || deadlineMs <= 0) return [];

    var remainingFromNow = deadlineMs - nowMs;

    // > 72 hours before deadline: do not send or schedule reminders yet
    if (remainingFromNow > MAX_LOOKAHEAD_MS) {
      return [];
    }

    var anchorMs = originalAnchorMs || task.reminderAnchorMs || new Date(task.createdAt || nowMs).getTime() || nowMs;
    var createdUnderOneHour = (deadlineMs - anchorMs) > 0 && (deadlineMs - anchorMs) < HOUR_MS;
    var slots = [];

    // Created or edited with < 1 hour left: one reminder right away + final deadline alert
    if (createdUnderOneHour) {
      if (remainingFromNow > 0 && remainingFromNow < HOUR_MS) {
        var immKey = getSentSlotStorageKey(task.id, deadlineMs, 'imm');
        if (isCreateOrEdit || !sentDeadlineSlots[immKey]) {
          slots.push({
            slotKey: 'imm',
            fireAtMs: nowMs,
            remainingMs: remainingFromNow,
            isDeadlineReached: false,
            isImmediate: true
          });
        }
      }
      if (deadlineMs > nowMs || (!isCreateOrEdit && (nowMs - deadlineMs) <= GRACE_WINDOW_MS)) {
        slots.push({
          slotKey: 'due',
          fireAtMs: deadlineMs,
          remainingMs: 0,
          isDeadlineReached: true,
          isImmediate: false
        });
      }
      slots.sort(function(a, b) { return a.fireAtMs - b.fireAtMs; });
      return slots;
    }

    // Deadline already reached (never schedule past; allow browser/Electron grace catch-up)
    if (deadlineMs <= nowMs) {
      if (!isCreateOrEdit && deadlineMs >= anchorMs && (nowMs - deadlineMs) <= GRACE_WINDOW_MS) {
        slots.push({
          slotKey: 'due',
          fireAtMs: deadlineMs,
          remainingMs: 0,
          isDeadlineReached: true,
          isImmediate: false
        });
      }
      return slots;
    }

    // Band 1: 72h to 24h before deadline — 3, 2, 1 days left at daily check-in time
    // (or immediate catch-up when app runs if today's check-in time already passed)
    var checkIn = getDailyCheckInTimeParts();
    var todayDateObj = new Date(nowMs);
    var todayDateStr = toLocalDateStr(todayDateObj);

    var bandStartMs = Math.max(nowMs, deadlineMs - MAX_LOOKAHEAD_MS);
    var bandEndMs = deadlineMs - DAY_MS;

    var scanCursor = new Date(bandStartMs);
    scanCursor.setHours(0, 0, 0, 0);
    var endDay = new Date(Math.max(bandStartMs, bandEndMs));
    endDay.setHours(23, 59, 59, 999);

    var visitedDates = {};
    while (scanCursor.getTime() <= endDay.getTime()) {
      var dateStr = toLocalDateStr(scanCursor);
      if (!visitedDates[dateStr]) {
        visitedDates[dateStr] = true;
        var checkInDate = new Date(scanCursor.getFullYear(), scanCursor.getMonth(), scanCursor.getDate(), checkIn.hour, checkIn.minute, 0, 0);
        var checkInMs = checkInDate.getTime();
        var slotKey = 'd_' + dateStr;
        var sentKey = getSentSlotStorageKey(task.id, deadlineMs, slotKey);

        if (dateStr === todayDateStr && nowMs >= checkInMs) {
          if (remainingFromNow >= DAY_MS && remainingFromNow <= MAX_LOOKAHEAD_MS && !sentDeadlineSlots[sentKey]) {
            slots.push({
              slotKey: slotKey,
              fireAtMs: nowMs,
              remainingMs: remainingFromNow,
              isDeadlineReached: false,
              isImmediate: true
            });
          }
        } else if (checkInMs > nowMs && checkInMs >= anchorMs) {
          var remAtCheckIn = deadlineMs - checkInMs;
          if (remAtCheckIn >= DAY_MS && remAtCheckIn <= MAX_LOOKAHEAD_MS) {
            slots.push({
              slotKey: slotKey,
              fireAtMs: checkInMs,
              remainingMs: remAtCheckIn,
              isDeadlineReached: false,
              isImmediate: false
            });
          }
        }
      }
      scanCursor.setDate(scanCursor.getDate() + 1);
    }

    // Band 2: < 24h before deadline — every local full hour + 15 minutes before deadline
    var hourWindowStart = Math.max(nowMs, deadlineMs - DAY_MS, anchorMs);
    var hourCursor = new Date(hourWindowStart);
    hourCursor.setMinutes(0, 0, 0);
    var firstFullHourMs = hourCursor.getTime() + HOUR_MS;
    var m15Ms = deadlineMs - 15 * MIN_MS;

    for (var t = firstFullHourMs; t < deadlineMs; t += HOUR_MS) {
      if (t > nowMs && t >= anchorMs && Math.abs(t - m15Ms) >= MIN_MS) {
        slots.push({
          slotKey: 'h_' + Math.round(t / MIN_MS),
          fireAtMs: t,
          remainingMs: deadlineMs - t,
          isDeadlineReached: false,
          isImmediate: false
        });
      }
    }

    if (m15Ms > nowMs && m15Ms >= anchorMs) {
      slots.push({
        slotKey: 'm15',
        fireAtMs: m15Ms,
        remainingMs: 15 * MIN_MS,
        isDeadlineReached: false,
        isImmediate: false
      });
    }

    // Final alert at deadline reached
    if (deadlineMs > nowMs && deadlineMs >= anchorMs) {
      slots.push({
        slotKey: 'due',
        fireAtMs: deadlineMs,
        remainingMs: 0,
        isDeadlineReached: true,
        isImmediate: false
      });
    }

    slots.sort(function(a, b) { return a.fireAtMs - b.fireAtMs; });
    return slots;
  }

  async function triggerImmediateNativeNotification(title, body, id, channelId) {
    var resolvedId = id || Math.floor(Date.now() % 1000000);
    var resolvedChannel = channelId || NOTIF_CHANNEL_DAILY_FOCUS;
    var ln = getCapacitorLocalNotifications();
    if (ln) {
      try {
        await ensureNotificationChannels(ln);
        await scheduleNativeNotificationsSafe(ln, [
          {
            id: Number(resolvedId),
            title: title,
            body: body,
            channelId: resolvedChannel,
            schedule: { at: new Date(Date.now() + 500), allowWhileIdle: true }
          }
        ]);
        return;
      } catch (e) {
        console.warn('Capacitor schedule immediate notification failed:', e);
      }
    }
    sendDeviceNotification(title, { body: body, tag: 'notif-' + resolvedId });
  }

  async function cancelTaskDeadlineNotifications(taskId) {
    if (!taskId) return;
    var tracked = Array.isArray(nativeNotifIdRegistry[taskId]) ? nativeNotifIdRegistry[taskId] : [];
    var uniqueIds = Array.from(new Set(tracked)).filter(function(n) { return Number.isFinite(n); });

    if (nativeNotifIdRegistry[taskId]) {
      delete nativeNotifIdRegistry[taskId];
      saveData(STORAGE_KEYS.NATIVE_NOTIF_IDS, nativeNotifIdRegistry);
    }

    var ln = getCapacitorLocalNotifications();
    if (ln && uniqueIds.length > 0) {
      try {
        await ln.cancel({
          notifications: uniqueIds.map(function(id) { return { id: id }; })
        });
      } catch (e) {
        console.warn('Error cancelling deadline notifications:', e);
      }
    }
  }

  async function scheduleTaskDeadlineNotifications(task, isCreateOrEdit) {
    if (!task || !task.deadline || task.status === 'completed' || task.status === 'terminated') {
      return;
    }
    if (!settings.deadlineReminders) return;

    var deadlineMs = new Date(task.deadline).getTime();
    if (!Number.isFinite(deadlineMs) || deadlineMs <= 0) return;

    var now = Date.now();
    // Skip tasks > 72 hours away cleanly
    if ((deadlineMs - now) > MAX_LOOKAHEAD_MS) {
      await cancelTaskDeadlineNotifications(task.id);
      return;
    }

    var slots = buildDeadlineReminderSlots(task, now, !!isCreateOrEdit, task.reminderAnchorMs);
    var ln = getCapacitorLocalNotifications();

    if (!ln) {
      var immBrowserSlot = slots.find(function(s) { return s.isImmediate; });
      if (immBrowserSlot) {
        var sentBrowserKey = getSentSlotStorageKey(task.id, deadlineMs, immBrowserSlot.slotKey);
        if (!sentDeadlineSlots[sentBrowserKey]) {
          var formatted = formatDeadlineAlertContent(task.title, immBrowserSlot.remainingMs, false);
          sentDeadlineSlots[sentBrowserKey] = now;
          saveData(STORAGE_KEYS.SENT_SLOTS, sentDeadlineSlots);
          sendDeviceNotification(formatted.title, {
            body: formatted.body,
            tag: 'ff-dl-' + task.id + '-' + immBrowserSlot.slotKey,
            vibrate: formatted.vibrate
          });
          showToast(formatted.toastDetail, formatted.toastType, formatted.toastTitle);
        }
      }
      return;
    }

    try {
      await ensureNotificationChannels(ln);
      await cancelTaskDeadlineNotifications(task.id);

      var capSlots = slots
        .filter(function(s) {
          if (s.isImmediate) {
            var sk = getSentSlotStorageKey(task.id, deadlineMs, s.slotKey);
            return !sentDeadlineSlots[sk];
          }
          return s.fireAtMs > now;
        })
        .slice(0, MAX_CAPACITOR_SLOTS_PER_TASK);

      if (capSlots.length === 0) return;

      var scheduledIds = [];
      var immMarked = false;
      var notifsToSchedule = capSlots.map(function(slot, index) {
        var notifId = getDeadlineSlotNotifId(task.id, deadlineMs, slot.slotKey);
        scheduledIds.push(notifId);
        var content = formatDeadlineAlertContent(task.title, slot.remainingMs, slot.isDeadlineReached);
        var fireDate = slot.isImmediate ? new Date(now + 500 + index * 50) : new Date(slot.fireAtMs);
        if (slot.isImmediate) {
          sentDeadlineSlots[getSentSlotStorageKey(task.id, deadlineMs, slot.slotKey)] = now;
          immMarked = true;
        }
        return {
          id: notifId,
          title: content.title,
          body: content.body,
          channelId: NOTIF_CHANNEL_DEADLINES,
          schedule: { at: fireDate, allowWhileIdle: true }
        };
      });

      if (immMarked) {
        saveData(STORAGE_KEYS.SENT_SLOTS, sentDeadlineSlots);
      }

      await scheduleNativeNotificationsSafe(ln, notifsToSchedule);
      nativeNotifIdRegistry[task.id] = scheduledIds;
      saveData(STORAGE_KEYS.NATIVE_NOTIF_IDS, nativeNotifIdRegistry);

      var immCapSlot = capSlots.find(function(s) { return s.isImmediate; });
      if (immCapSlot) {
        var toastContent = formatDeadlineAlertContent(task.title, immCapSlot.remainingMs, false);
        showToast(toastContent.toastDetail, toastContent.toastType, toastContent.toastTitle);
      }
    } catch (err) {
      console.warn('Error scheduling native task deadline notifications:', err);
    }
  }

  async function scheduleDailyCheckInAlarm(timeStr) {
    var parts = getDailyCheckInTimeParts(timeStr);
    var hour = parts.hour;
    var minute = parts.minute;

    var ln = getCapacitorLocalNotifications();
    if (ln) {
      try {
        await ensureNotificationChannels(ln);
        await ln.cancel({
          notifications: [{ id: NOTIF_ID_DAILY_CHECKIN }]
        });

        await scheduleNativeNotificationsSafe(ln, [
          {
            id: NOTIF_ID_DAILY_CHECKIN,
            title: 'FocusForge Daily Check-In',
            body: 'Any goal or task today? Set your daily focus and keep your flow streak alive!',
            channelId: NOTIF_CHANNEL_DAILY_FOCUS,
            schedule: {
              on: { hour: hour, minute: minute },
              allowWhileIdle: true
            }
          }
        ]);
      } catch (err) {
        console.warn('Failed to schedule native Capacitor daily alarm:', err);
      }
    }
  }

  function deliverDailyCheckInReminder(todayDateStr, targetTimeStr, isFromEdit) {
    var goalStatus = (stats.dailyGoalText && stats.dailyGoalText.trim())
      ? 'Current Goal: "' + stats.dailyGoalText + '"'
      : 'No goal set yet for today.';
    var bodyText = 'Any goal or task today? ' + goalStatus + ' Keep your flow streak alive!';

    stats.lastDailyNotifDate = todayDateStr;
    stats.lastDailyNotifKey = todayDateStr + '|' + targetTimeStr;
    saveData(STORAGE_KEYS.STATS, stats);

    var ln = getCapacitorLocalNotifications();
    if (ln) {
      if (isFromEdit) {
        triggerImmediateNativeNotification(
          'FocusForge Daily Check-In',
          bodyText,
          NOTIF_ID_DAILY_CHECKIN_IMMEDIATE,
          NOTIF_CHANNEL_DAILY_FOCUS
        );
      }
    } else if (settings.deviceNotifications && ('Notification' in window) && Notification.permission === 'granted') {
      sendDeviceNotification('FocusForge Daily Focus', {
        body: bodyText,
        tag: 'daily-checkin-' + todayDateStr + '-' + targetTimeStr.replace(':', '') + (isFromEdit ? '-' + Date.now() : ''),
        vibrate: [120]
      });
    }

    showToast('Any goal or task today? ' + goalStatus, 'info', 'Daily Focus Check-In (' + targetTimeStr + ')');
  }

  function reconcileAllNativeNotifications() {
    var ln = getCapacitorLocalNotifications();
    if (!ln) return;
    ensureNotificationChannels(ln);
    scheduleDailyCheckInAlarm(settings.dailyNotifTime || '09:00');
    var nowMs = Date.now();
    for (var i = 0; i < tasks.length; i++) {
      var t = tasks[i];
      if (!t || !t.deadline || t.status === 'completed' || t.status === 'terminated') continue;
      var dlMs = new Date(t.deadline).getTime();
      if (Number.isFinite(dlMs) && dlMs > 0 && (dlMs - nowMs) <= MAX_LOOKAHEAD_MS) {
        scheduleTaskDeadlineNotifications(t, false);
      } else {
        cancelTaskDeadlineNotifications(t.id);
      }
    }
  }

  // --- FOCUS CREDIT & CYCLE EVALUATION ---
  function evaluateCycles() {
    var completedCount = 0;
    var latestTicket = null;

    while ((stats.totalSecondsFocused - stats.cycleBaseSecs) >= CYCLE_TARGET_SECS) {
      stats.cycleBaseSecs += CYCLE_TARGET_SECS;
      stats.dopamineVaultPoints = (Number(stats.dopamineVaultPoints) || 0) + CYCLE_BONUS_PTS;
      stats.streakCount = (Number(stats.streakCount) || 0) + 1;
      completedCount++;

      var code = 'FORGE-' + Math.floor(1000 + Math.random() * 9000);
      latestTicket = {
        id: 'tk-' + Date.now() + '-' + completedCount,
        title: 'Golden Focus Ticket (+250 PTS)',
        points: CYCLE_BONUS_PTS,
        code: code,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      tickets.unshift(latestTicket);
    }

    if (completedCount > 0 && latestTicket) {
      var totalBonus = completedCount * CYCLE_BONUS_PTS;
      var notifBody = completedCount > 1
        ? (completedCount + ' focus cycles achieved! +' + totalBonus + ' points added to your Vault!')
        : 'Outstanding focus! Golden ticket auto-issued and +250 points added to your Vault!';

      triggerImmediateNativeNotification(
        '🏆 100% Focus Cycle Achieved!',
        notifBody,
        NOTIF_ID_100_CYCLE,
        NOTIF_CHANNEL_DAILY_FOCUS
      );

      var toastMsg = completedCount > 1
        ? (completedCount + ' Golden Tickets auto-issued (+' + totalBonus + ' PTS)')
        : 'Golden Ticket auto-issued (+250 PTS)';
      showToast(toastMsg, 'success', '🏆 100% Focus Cycle Reached!');

      if (settings.auto100Ticket) {
        openCelebrationModal(latestTicket);
      }
    }

    return {
      completedCount: completedCount,
      latestTicket: latestTicket
    };
  }

  function creditFocus(seconds) {
    var secs = Math.max(0, Number(seconds) || 0);
    if (secs <= 0) {
      return { completedCount: 0, latestTicket: null };
    }
    stats.totalSecondsFocused = (Number(stats.totalSecondsFocused) || 0) + secs;
    stats.dopamineVaultPoints = (Number(stats.dopamineVaultPoints) || 0) + (secs * POINTS_PER_FOCUS_SEC);
    return evaluateCycles();
  }

  // --- SINGLE 1-SECOND TIMER & AFK ENGINE + SINGLE 30-SECOND CHECKER ---
  if (window._focusforgeTimerInterval) clearInterval(window._focusforgeTimerInterval);
  if (window._focusforgeNotifInterval) clearInterval(window._focusforgeNotifInterval);
  if (window._focusforgeAfkInterval) clearInterval(window._focusforgeAfkInterval);

  window._focusforgeNotifInterval = setInterval(checkOfflineScheduledNotifications, 30000);

  function runTimerTick(fromInterval) {
    var nowMs = Date.now();
    var prevTickMs = lastTimerTickMs;
    var elapsedMs = nowMs - prevTickMs;

    if (elapsedMs < 0) {
      lastTimerTickMs = nowMs;
      return;
    }

    if (!activeTaskId && !pomoState.isRunning) {
      lastTimerTickMs = nowMs;
      return;
    }

    var elapsedSecs = Math.floor(elapsedMs / 1000);
    if (elapsedSecs === 0 && fromInterval && elapsedMs >= 900) {
      elapsedSecs = 1;
      lastTimerTickMs = nowMs;
    } else if (elapsedSecs >= 1) {
      lastTimerTickMs = (elapsedSecs === 1 && fromInterval && elapsedMs < 1500)
        ? nowMs
        : (prevTickMs + elapsedSecs * 1000);
    } else {
      return;
    }

    var stateChanged = false;
    var needsFullRender = false;
    var shouldSyncState = false;
    var taskFocusSecs = 0;
    var pomoConsumed = 0;
    var hadActiveTask = !!activeTaskId;

    // 1. AFK Inactivity Protection: credit ONLY up to lastUserActivityMs, never idle seconds (no clawback)
    var afkTriggered = !!(settings.afkProtection && activeTaskId && (nowMs - lastUserActivityMs >= AFK_TIMEOUT_MS));
    if (afkTriggered) {
      for (var k = 0; k < tasks.length; k++) {
        var afkTask = tasks[k];
        if (afkTask.id === activeTaskId && afkTask.status === 'active') {
          var creditBeforeAfk = (prevTickMs < lastUserActivityMs)
            ? Math.max(0, Math.floor((lastUserActivityMs - prevTickMs) / 1000))
            : 0;
          if (creditBeforeAfk > 0) {
            if (settings.maxSessionCap) {
              creditBeforeAfk = Math.min(creditBeforeAfk, Math.max(0, 7200 - (afkTask.activeSeconds || 0)));
            }
            if (creditBeforeAfk > 0) {
              afkTask.activeSeconds = (afkTask.activeSeconds || 0) + creditBeforeAfk;
              taskFocusSecs = creditBeforeAfk;
            }
          }
          afkTask.status = 'paused';
          afkTask.statusBadge = 'Paused: AFK Inactive';
          break;
        }
      }
      activeTaskId = null;
      lastUserActivityMs = nowMs;
      stateChanged = true;
      needsFullRender = true;
      shouldSyncState = true;
      showToast('Auto-paused after 3 mins inactivity', 'alert', 'AFK Guard Activated');
    }

    // 2. Active Task Timer Tick (catches up real off-screen elapsed seconds)
    if (activeTaskId && !afkTriggered) {
      for (var i = 0; i < tasks.length; i++) {
        var t = tasks[i];
        if (t.id === activeTaskId && t.status === 'active') {
          var taskDeltaSecs = elapsedSecs;
          if (settings.maxSessionCap) {
            taskDeltaSecs = Math.min(taskDeltaSecs, Math.max(0, 7200 - (t.activeSeconds || 0)));
          }
          if (taskDeltaSecs > 0) {
            t.activeSeconds = (t.activeSeconds || 0) + taskDeltaSecs;
            taskFocusSecs = taskDeltaSecs;
            stateChanged = true;
            if (elapsedSecs > 1) secondsSinceLastStorageSave += taskDeltaSecs;
            patchElementText('task-clock-' + t.id, formatTimer(t.activeSeconds));
          }

          if (settings.maxSessionCap && t.activeSeconds >= 7200) {
            t.activeSeconds = 7200;
            t.status = 'paused';
            t.statusBadge = 'Paused: Max Cap';
            showToast('120-min continuous limit reached', 'warning', 'Focus Session Capped');
            triggerImmediateNativeNotification(
              'Focus Session Capped (120m)',
              '"' + t.title + '" reached the 120-minute maximum continuous focus limit.',
              NOTIF_ID_SESSION_CAP,
              NOTIF_CHANNEL_DAILY_FOCUS
            );
            activeTaskId = null;
            needsFullRender = true;
            shouldSyncState = true;
          }
          break;
        }
      }
    }

    // 3. Separated 25-Min Fast Focus Pomodoro Timer Tick
    if (pomoState.isRunning) {
      pomoConsumed = Math.min(elapsedSecs, Math.max(0, pomoState.secondsLeft));
      if (pomoConsumed > 0) {
        pomoState.secondsLeft -= pomoConsumed;
        stateChanged = true;
        if (elapsedSecs > 1 && taskFocusSecs === 0) secondsSinceLastStorageSave += pomoConsumed;

        // Credit linked task ONLY when no active task timer is already claiming this tick
        if (!hadActiveTask && pomoState.linkedTaskId) {
          for (var j = 0; j < tasks.length; j++) {
            var lt = tasks[j];
            if (lt.id === pomoState.linkedTaskId && lt.status !== 'completed' && lt.status !== 'terminated') {
              lt.activeSeconds = (lt.activeSeconds || 0) + pomoConsumed;
              patchElementText('task-clock-' + lt.id, formatTimer(lt.activeSeconds));
              break;
            }
          }
        }
      }

      var timeStr = formatTimer(pomoState.secondsLeft);
      patchElementText('pomo-widget-clock', timeStr);
      patchElementText('pomo-modal-clock', timeStr);

      var ringFill = document.getElementById('pomo-ring-fill');
      if (ringFill && pomoState.totalSeconds > 0) {
        var ratio = pomoState.secondsLeft / pomoState.totalSeconds;
        ringFill.style.strokeDashoffset = (326.72 * (1 - ratio)).toFixed(2);
      }

      if (pomoState.secondsLeft <= 0) {
        pomoState.isRunning = false;
        pomoState.secondsLeft = pomoState.totalSeconds;
        playOfflineAudioChime('complete');

        var notifTitle = '⚡ ' + pomoState.modeName + ' Complete!';
        var notifBody = 'Great focus! Your ' + pomoState.modeName + ' session has finished.';

        if (pomoState.totalSeconds === 1500) {
          notifTitle = '⚡ 25-Min Focus Sprint Complete!';
          notifBody = '25-minute focus session finished! Focus time & 0.2 PTS/min credited to your Vault! 🎉';
          showToast('25-minute sprint complete! Focus points credited to Vault 🎉', 'success', '⚡ 25-Min Focus Sprint Complete');
        } else if (pomoState.totalSeconds === 900) {
          notifTitle = '🚀 15m Speed Sprint Complete!';
          notifBody = '15-minute speed focus finished! Well done!';
          showToast('15-minute speed sprint finished!', 'success', '🚀 15m Speed Complete');
        } else if (pomoState.totalSeconds === 300) {
          notifTitle = '☕ 5m Break Over!';
          notifBody = '5-minute break is complete. Ready for the next focus sprint?';
          showToast('Break finished — ready for next sprint', 'success', '☕ 5m Break Over');
        }

        triggerImmediateNativeNotification(notifTitle, notifBody, NOTIF_ID_POMO_FINISH, NOTIF_CHANNEL_DAILY_FOCUS);
        needsFullRender = true;
        shouldSyncState = true;
      }
    }

    // 4. Single real-second credit for bar progress, points & cycle milestones
    var focusCreditSecs = Math.max(taskFocusSecs, pomoConsumed);
    if (focusCreditSecs > 0) {
      var cycleRes = creditFocus(focusCreditSecs);
      stateChanged = true;
      patchPointsDisplay();
      if (cycleRes.completedCount > 0) {
        needsFullRender = true;
        shouldSyncState = true;
      }
    }

    // 5. Targeted Progress Bar update & 12s throttled save
    if (stateChanged) {
      updateProgressBarOnly();

      secondsSinceLastStorageSave += 1;
      if (shouldSyncState || needsFullRender || secondsSinceLastStorageSave >= 12) {
        if (shouldSyncState || needsFullRender) {
          syncStateImmediate();
        } else {
          saveProgressData();
          secondsSinceLastStorageSave = 0;
        }
      }

      if (needsFullRender) {
        scheduleRender();
      }
    }
  }

  window._focusforgeTimerInterval = setInterval(function() {
    runTimerTick(true);
  }, 1000);

  // Targeted updater for progress bar & active counters (strictly display-only; NO task grid rebuild, NO cycle awards)
  var lastSummaryText = '';
  var lastBarWidthPct = '';

  function updateProgressBarOnly() {
    var activeCount = 0;
    for (var i = 0; i < tasks.length; i++) {
      var t = tasks[i];
      if (t && t.status !== 'terminated' && t.status !== 'completed') {
        activeCount++;
      }
    }

    var totalSecs = Math.max(0, Number(stats.totalSecondsFocused) || 0);
    var cycleBase = Math.max(0, Number(stats.cycleBaseSecs) || 0);
    var cycleSecs = Math.max(0, totalSecs - cycleBase);
    var rawPct = (cycleSecs / CYCLE_TARGET_SECS) * 100;
    var pct = Math.max(0, Math.min(100, rawPct));

    var fillEl = document.getElementById('overload-fill');
    var nextWidth = pct.toFixed(2) + '%';
    if (fillEl && lastBarWidthPct !== nextWidth) {
      lastBarWidthPct = nextWidth;
      fillEl.style.width = nextWidth;
    }

    var displayPct = pct >= 100 ? '100' : (pct > 0 && pct < 1 ? pct.toFixed(2) : pct.toFixed(1));
    var completedMins = (cycleSecs / 60).toFixed(1);
    var goalMins = Math.round(CYCLE_TARGET_SECS / 60);
    var nextSummary = displayPct + '% Completed (' + completedMins + 'm / ' + goalMins + 'm Goal) • ' + activeCount + ' active tasks';
    if (lastSummaryText !== nextSummary) {
      lastSummaryText = nextSummary;
      patchElementText('overload-stats-summary', nextSummary);
    }

    var claimBtn = document.getElementById('btn-claim-100');
    if (claimBtn) {
      var targetDisplay = tickets.length > 0 ? 'inline-block' : 'none';
      if (claimBtn.style.display !== targetDisplay) {
        claimBtn.style.display = targetDisplay;
      }
    }
  }

  // Visibility, Pagehide & Capacitor Resume Handling
  function handleAppResume() {
    // Reconcile off-screen timer delta BEFORE resetting activity timestamp so AFK ON still honors 3-min rule
    runTimerTick(false);
    var nowMs = Date.now();
    lastUserActivityMs = nowMs;
    scheduleRender();
    checkOfflineScheduledNotifications();
    if (nowMs - lastResumeReconcileMs >= 5000) {
      lastResumeReconcileMs = nowMs;
      reconcileAllNativeNotifications();
    }
  }

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Never pause timers immediately when leaving app or locking device; save state cleanly instead
      runTimerTick(false);
      syncStateImmediate();
    } else {
      handleAppResume();
    }
  });

  window.addEventListener('pagehide', syncStateImmediate);
  window.addEventListener('beforeunload', syncStateImmediate);

  ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'].forEach(function(evt) {
    window.addEventListener(evt, function() { lastUserActivityMs = Date.now(); }, { passive: true });
  });

  // --- 3. FULL UI RENDER (CALLED ONLY ON STRUCTURAL STATE MUTATIONS) ---
  function fullRender() {
    patchElementText('stat-streak-val', stats.streakCount + ' Flow Streak');
    patchPointsDisplay();

    var goalTextEl = document.getElementById('stat-goal-text');
    var goalRemoveBtn = document.getElementById('btn-remove-goal-header');
    if (stats.dailyGoalText && stats.dailyGoalText.trim() !== '') {
      if (goalTextEl) goalTextEl.textContent = stats.dailyGoalText;
      if (goalRemoveBtn) goalRemoveBtn.style.display = 'inline-flex';
    } else {
      if (goalTextEl) goalTextEl.textContent = 'Set Daily Goal';
      if (goalRemoveBtn) goalRemoveBtn.style.display = 'none';
    }

    patchElementText('mobile-stat-streak-val', stats.streakCount + ' Flow Streak');
    patchElementText('mobile-stat-goal-text', (stats.dailyGoalText && stats.dailyGoalText.trim()) ? stats.dailyGoalText : 'Set Daily Goal');

    checkDailyOfflineReminder();
    updateProgressBarOnly();

    var pomoCardEl = document.querySelector('.pomo-card');
    if (pomoCardEl) {
      pomoCardEl.style.display = settings.showPomoCard ? 'block' : 'none';
    }

    var nonTerminated = tasks.filter(function(t) { return t.status !== 'terminated'; });
    var active = nonTerminated.filter(function(t) { return t.status !== 'completed'; });
    var badgeEl = document.getElementById('overload-badge');
    var fillEl = document.getElementById('overload-fill');

    if (badgeEl && fillEl) {
      if (active.length >= 8) {
        badgeEl.className = 'level-badge level-danger';
        badgeEl.textContent = 'DANGER: Overloaded (8+ Tasks)';
        fillEl.className = 'track-fill danger';
      } else if (active.length >= 5) {
        badgeEl.className = 'level-badge level-warning';
        badgeEl.textContent = 'Space Shrinking (5-7 Tasks)';
        fillEl.className = 'track-fill warning';
      } else {
        badgeEl.className = 'level-badge level-healthy';
        badgeEl.textContent = 'Healthy Balance';
        fillEl.className = 'track-fill';
      }
    }

    renderPriorityBanner(active);

    var academicCount = 0;
    var householdCount = 0;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].category === 'academic') academicCount++;
      else if (tasks[i].category === 'household') householdCount++;
    }
    patchElementText('category-ratio-text', 'Balance: ' + academicCount + ' Academic / ' + householdCount + ' Household');

    if (currentView === 'tasks') {
      renderTaskGrid();
    } else if (currentView === 'shop') {
      renderShopItems();
    } else if (currentView === 'analytics') {
      renderAnalytics();
    }

    updatePomoTaskOptions();
  }

  function checkDailyOfflineReminder() {
    var banner = document.getElementById('daily-reminder-banner');
    if (!banner) return;
    if (!settings.dailyReminderBanner) {
      banner.style.display = 'none';
      return;
    }
    var text = document.getElementById('reminder-banner-text');

    if (!stats.dailyGoalText || stats.dailyGoalText.trim() === '') {
      if (text) text.textContent = 'No daily focus goal locked in for today yet! Set your daily target to maintain your flow streak.';
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  }

  function dismissReminderBanner() {
    var banner = document.getElementById('daily-reminder-banner');
    if (banner) banner.style.display = 'none';
  }

  function renderPriorityBanner(activeTasks) {
    var bannerContainer = document.getElementById('priority-banner-container');
    if (!bannerContainer) return;
    if (!settings.priorityBanner) {
      if (bannerContainer.innerHTML !== '') bannerContainer.innerHTML = '';
      return;
    }
    var sorted = activeTasks
      .filter(function(t) { return t.deadline; })
      .sort(function(a, b) { return new Date(a.deadline).getTime() - new Date(b.deadline).getTime(); });

    if (sorted.length === 0) {
      if (bannerContainer.innerHTML !== '') bannerContainer.innerHTML = '';
      return;
    }

    var earliest = sorted[0];
    var dl = new Date(earliest.deadline);
    var diffHr = Math.round((dl.getTime() - Date.now()) / HOUR_MS);

    bannerContainer.innerHTML =
      '<div class="priority-banner">' +
        '<div class="priority-info">' +
          '<div class="priority-icon">' +
            '<i data-lucide="clock" size="22"></i>' +
          '</div>' +
          '<div>' +
            '<span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--amber-dark); background: rgba(245, 158, 11, 0.2); padding: 2px 6px; border-radius: 4px;">' +
              'Earliest Deadline Priority' +
            '</span>' +
            '<h3 style="font-size: 15px; font-weight: 800; margin-top: 2px;">' + escapeHtml(earliest.title) + '</h3>' +
            '<p style="font-size: 11px; color: var(--text-muted);">' +
              dl.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' • ' +
              '<strong style="color: ' + (diffHr < 0 ? 'var(--rose)' : 'var(--amber-dark)') + '">' + (diffHr < 0 ? 'Overdue!' : 'Due in ' + diffHr + ' hrs') + '</strong>' +
            '</p>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn-focus-first" onclick="startTaskTimer(\'' + escapeHtml(earliest.id) + '\')">' +
          '<i data-lucide="play" size="14"></i> Focus First On This' +
        '</button>' +
      '</div>';
    window.lucide.createIcons(bannerContainer);
  }

  function renderTaskGrid() {
    var container = document.getElementById('task-cards-grid');
    if (!container) return;
    var filtered = tasks.filter(function(t) {
      return activeCategoryFilter === 'all' || t.category === activeCategoryFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML =
        '<div style="grid-column: 1/-1; text-align: center; padding: 56px 20px; background: white; border-radius: 20px; border: 1px dashed var(--border-color); color: var(--text-muted);">' +
          '<div style="width: 56px; height: 56px; border-radius: 16px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">' +
            '<i data-lucide="sparkles" size="28"></i>' +
          '</div>' +
          '<h3 style="font-size: 16px; font-weight: 800; color: var(--text-main);">No Tasks Yet</h3>' +
          '<p style="font-size: 12px; margin-top: 4px; max-width: 360px; margin-left: auto; margin-right: auto;">' +
            'Your workspace is completely fresh. Tap <strong>\'+ New\'</strong> below or click the button to create your first focus item!' +
          '</p>' +
          '<button type="button" class="btn-modal-primary" style="margin: 16px auto 0 auto;" onclick="openTaskModal()">' +
            '<i data-lucide="plus" size="16"></i> Add First Task' +
          '</button>' +
        '</div>';
      window.lucide.createIcons(container);
      return;
    }

    container.innerHTML = filtered.map(function(t) {
      var isCompleted = t.status === 'completed';
      var isTerminated = t.status === 'terminated';
      var isActive = t.status === 'active';

      var taskPct = ((t.activeSeconds || 0) / CYCLE_TARGET_SECS) * 100;
      var taskPctStr = taskPct >= 1 ? taskPct.toFixed(1) : (taskPct > 0 ? taskPct.toFixed(2) : '0');
      var safeId = escapeHtml(t.id);

      var controlsHtml = (!isCompleted && !isTerminated) ? (
        '<div style="display: flex; flex-wrap: wrap; gap: 6px;">' +
          (isActive ? (
            '<button type="button" class="btn-ctrl btn-pause" data-action="pause" data-task-id="' + safeId + '">' +
              '<i data-lucide="pause" size="14"></i> Pause' +
            '</button>'
          ) : (
            '<button type="button" class="btn-ctrl btn-start" data-action="start" data-task-id="' + safeId + '">' +
              '<i data-lucide="play" size="14"></i> Focus' +
            '</button>'
          )) +
          '<button type="button" class="btn-ctrl btn-complete" data-action="complete" data-task-id="' + safeId + '">' +
            '<i data-lucide="check-circle" size="14"></i> Complete' +
          '</button>' +
          '<button type="button" class="btn-ctrl btn-edit" data-action="edit" data-task-id="' + safeId + '" title="Edit Task">' +
            '<i data-lucide="edit-3" size="14"></i> Edit' +
          '</button>' +
        '</div>' +
        '<button type="button" class="btn-remove-task" data-action="delete" data-task-id="' + safeId + '" title="Delete Task with Confirmation">' +
          '<i data-lucide="trash-2" size="14"></i> Delete' +
        '</button>'
      ) : (
        '<div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">' +
          '<span style="font-size: 12px; font-weight: 700; color: var(--text-muted);">' +
            (isCompleted ? '✓ Completed' : '✕ Terminated') +
          '</span>' +
          '<button type="button" class="btn-remove-task" data-action="delete" data-task-id="' + safeId + '" title="Delete Task with Confirmation">' +
            '<i data-lucide="trash-2" size="14"></i> Remove' +
          '</button>' +
        '</div>'
      );

      return (
        '<div id="task-card-' + safeId + '" class="task-card ' + (isActive ? 'active' : '') + ' ' + (isCompleted ? 'completed' : '') + ' ' + (isTerminated ? 'terminated' : '') + '">' +
          '<div>' +
            '<div class="task-card-header">' +
              '<span class="badge-cat ' + (t.category === 'academic' ? 'badge-academic' : 'badge-household') + '">' +
                (t.category === 'academic' ? 'Academic' : 'Household') +
              '</span>' +
              '<span style="font-size: 11px; font-weight: 700; color: var(--text-muted);">' + escapeHtml(t.statusBadge || t.status) + '</span>' +
            '</div>' +
            '<h3 class="task-title" style="' + (isCompleted ? 'text-decoration: line-through; color: var(--text-muted);' : '') + '">' + escapeHtml(t.title) + '</h3>' +
          '</div>' +
          '<div>' +
            '<div class="timer-box">' +
              '<div>' +
                '<span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; display: block;">Active Focus</span>' +
                '<div class="timer-clock" id="task-clock-' + safeId + '">' + formatTimer(t.activeSeconds) + '</div>' +
              '</div>' +
              '<div style="text-align: right;">' +
                '<span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; display: block;">Bar Value</span>' +
                '<span style="font-size: 12px; font-weight: 700; color: var(--primary);">+' + taskPctStr + '%</span>' +
              '</div>' +
            '</div>' +
            '<div class="task-controls">' + controlsHtml + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
    window.lucide.createIcons(container);
  }

  function renderShopItems() {
    var container = document.getElementById('rewards-grid-container');
    if (!container) return;
    if (rewards.length === 0) {
      container.innerHTML =
        '<div style="grid-column: 1/-1; text-align: center; padding: 32px 16px; border: 1px dashed var(--border-color); border-radius: 16px; color: var(--text-muted);">' +
          '<i data-lucide="gift" size="28" style="margin-bottom: 8px; color: var(--amber);"></i>' +
          '<p style="font-size: 13px; font-weight: 700;">No custom rewards in your vault!</p>' +
          '<p style="font-size: 11px;">Click "+ Add Custom Reward" above to create your own offline incentives.</p>' +
        '</div>';
    } else {
      container.innerHTML = rewards.map(function(r) {
        var safeRewardId = escapeHtml(r.id);
        var cost = Math.round((Math.max(0, Number(r.pointsCost) || 0) + 1e-9) * 100) / 100;
        var costDisplay = formatPoints(cost);
        return (
          '<div class="reward-card" id="reward-card-' + safeRewardId + '">' +
            '<div>' +
              '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">' +
                '<span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary); background: var(--primary-light); padding: 2px 8px; border-radius: 100px;">INCENTIVE</span>' +
                '<div style="display: flex; align-items: center; gap: 8px;">' +
                  '<span style="font-size: 12px; font-weight: 800; color: #d97706; font-family: var(--font-mono);">💎 ' + costDisplay + ' PTS</span>' +
                  '<button type="button" class="btn-remove-reward" data-reward-action="remove" data-reward-id="' + safeRewardId + '" title="Remove Custom Reward Option">' +
                    '<i data-lucide="trash-2" size="13"></i> Remove' +
                  '</button>' +
                '</div>' +
              '</div>' +
              '<h4 style="font-size: 14px; font-weight: 800; margin-bottom: 12px; color: var(--text-main);">' + escapeHtml(r.title) + '</h4>' +
            '</div>' +
            '<button type="button" class="btn-chip active" style="width: 100%; justify-content: center; background: var(--amber); color: #0f172a; font-weight: 800; padding: 10px;" data-reward-action="redeem" data-reward-id="' + safeRewardId + '" data-reward-cost="' + cost + '">' +
              'Redeem Reward' +
            '</button>' +
          '</div>'
        );
      }).join('');
    }
    window.lucide.createIcons(container);

    var tplContainer = document.getElementById('tickets-list-container');
    if (tplContainer) {
      if (tickets.length === 0) {
        tplContainer.innerHTML = '<div style="grid-column: 1/-1; font-size: 12px; color: var(--text-muted); background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px dashed var(--border-color); text-align: center;">No tickets claimed yet. Reach 100% progress to earn tickets!</div>';
      } else {
        tplContainer.innerHTML = tickets.map(function(tk) {
          return (
            '<div style="background: linear-gradient(135deg, #fffbeb, #fef3c7); border: 1px solid #fde68a; padding: 14px; border-radius: 14px; position: relative; box-shadow: 0 2px 8px rgba(245,158,11,0.08);">' +
              '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">' +
                '<span class="selectable-text" style="font-size: 10px; font-weight: 800; color: var(--amber-dark); text-transform: uppercase; font-family: var(--font-mono); background: rgba(245, 158, 11, 0.2); padding: 2px 6px; border-radius: 4px;">Ticket Code: ' + escapeHtml(tk.code) + '</span>' +
                '<span style="font-size: 10px; font-weight: 700; color: var(--text-muted);">' + escapeHtml(tk.date || 'Auto-Earned') + '</span>' +
              '</div>' +
              '<h4 style="font-size: 13px; font-weight: 800; color: #78350f; margin-top: 4px;">' + escapeHtml(tk.title) + '</h4>' +
              '<div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">' +
                '<span style="font-size: 12px; font-weight: 800; color: var(--emerald-dark);">+' + formatPoints(Number(tk.points) || 0) + ' PTS</span>' +
                '<span style="font-size: 10px; font-weight: 800; color: #059669; background: #d1fae5; padding: 2px 8px; border-radius: 100px;">✓ Auto-Issued</span>' +
              '</div>' +
            '</div>'
          );
        }).join('');
      }
    }
  }

  function renderAnalytics() {
    var completed = tasks.filter(function(t) { return t.status === 'completed' && t.completedAt; });
    var totalMins = 0;
    for (var i = 0; i < completed.length; i++) {
      var t = completed[i];
      var diff = (new Date(t.completedAt).getTime() - new Date(t.createdAt).getTime()) / MIN_MS;
      totalMins += Math.max(1, diff);
    }

    var avgSpeed = completed.length > 0 ? Math.round(totalMins / completed.length) : 0;
    patchElementText('metric-avg-speed', avgSpeed + ' Mins');
    patchElementText('metric-streak-display', stats.streakCount + ' Days');

    var terminatedCount = tasks.filter(function(t) { return t.status === 'terminated'; }).length;
    var termRate = tasks.length > 0 ? Math.round((terminatedCount / tasks.length) * 100) : 0;
    patchElementText('metric-term-rate', termRate + '%');

    var minsFocused = Math.round(stats.totalSecondsFocused / 60);
    patchElementText('metric-total-focused', minsFocused + 'm');
  }

  // --- 4. ACTION HANDLERS ---
  function startTaskTimer(id) {
    var wasAnyRunning = !!(activeTaskId || pomoState.isRunning);
    tasks = tasks.map(function(t) {
      if (t.id === id) return Object.assign({}, t, { status: 'active', statusBadge: 'Active Focus' });
      if (t.status === 'active') return Object.assign({}, t, { status: 'paused', statusBadge: 'Paused' });
      return t;
    });
    activeTaskId = id;
    if (!wasAnyRunning) {
      lastTimerTickMs = Date.now();
    }
    lastUserActivityMs = Date.now();
    syncState();
    playOfflineAudioChime('start');
    showToast('Task clock is running', 'info', 'Focus Timer Started');
  }

  function pauseTaskTimer(id) {
    tasks = tasks.map(function(t) {
      return t.id === id ? Object.assign({}, t, { status: 'paused', statusBadge: 'Paused' }) : t;
    });
    if (activeTaskId === id) activeTaskId = null;
    syncState();
    playOfflineAudioChime('pause');
  }

  function completeTaskWithAnimation(id) {
    var task = tasks.find(function(t) { return t.id === id; });
    if (!task || task.status === 'completed') return;
    tasks = tasks.map(function(t) {
      return t.id === id ? Object.assign({}, t, { status: 'completed', completedAt: new Date().toISOString(), statusBadge: 'Completed' }) : t;
    });
    if (activeTaskId === id) activeTaskId = null;
    if (pomoState.linkedTaskId === id) pomoState.linkedTaskId = '';

    cancelTaskDeadlineNotifications(id);
    clearTaskSentSlots(id);

    var taskTitle = task ? task.title : 'Task';
    triggerImmediateNativeNotification(
      'Task Completed! 🎉',
      '"' + taskTitle + '" has been completed!',
      NOTIF_ID_TASK_FINISH,
      NOTIF_CHANNEL_DAILY_FOCUS
    );

    syncState();
    playOfflineAudioChime('complete');
    showToast(taskTitle + ' marked completed!', 'success', 'Task Completed! 🎉');
  }

  function removeTaskWithAnimation(id) {
    playOfflineAudioChime('delete');
    cancelTaskDeadlineNotifications(id);
    clearTaskSentSlots(id);
    if (pomoState.linkedTaskId === id) pomoState.linkedTaskId = '';

    var cardEl = document.getElementById('task-card-' + id);
    if (cardEl) {
      cardEl.classList.add('removing');
      setTimeout(function() {
        tasks = tasks.filter(function(t) { return t.id !== id; });
        if (activeTaskId === id) activeTaskId = null;
        syncState();
        showToast('Task removed from workspace', 'info', 'Task Removed');
      }, 250);
    } else {
      tasks = tasks.filter(function(t) { return t.id !== id; });
      if (activeTaskId === id) activeTaskId = null;
      syncState();
      showToast('Task removed from workspace', 'info', 'Task Removed');
    }
  }

  function triggerAutomatic100PercentTicket(isManualClick) {
    var ticketToDisplay = tickets[0] || {
      id: 'tk-' + Date.now(),
      title: 'Golden Focus Ticket (+250 PTS)',
      points: CYCLE_BONUS_PTS,
      code: 'FORGE-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    if (!isManualClick) {
      ticketToDisplay = tickets[0] || ticketToDisplay;
    }

    openCelebrationModal(ticketToDisplay);
  }

  function openCelebrationModal(ticket) {
    if (!ticket) return;
    playOfflineAudioChime('fanfare');

    patchElementText('celebration-ticket-title', ticket.title || 'Golden Focus Ticket (+250 PTS)');
    patchElementText('celebration-ticket-code', ticket.code || 'FORGE-1000');
    patchElementText('celebration-streak-num', String(stats.streakCount));

    var confettiContainer = document.getElementById('confetti-holder');
    if (confettiContainer) {
      confettiContainer.innerHTML = '';
      var colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#f43f5e'];
      var isCoarseOrNarrow = window.innerWidth <= 900 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      var count = isCoarseOrNarrow ? 12 : 24;

      for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.left = (Math.random() * 100) + '%';
        p.style.backgroundColor = colors[i % colors.length];
        p.style.animationDuration = (1.6 + Math.random() * 1.1) + 's';
        p.style.animationDelay = (Math.random() * 0.35) + 's';
        confettiContainer.appendChild(p);
      }
    }

    var modalEl = document.getElementById('modal-celebration');
    if (modalEl) {
      modalEl.classList.add('active');
      window.lucide.createIcons(modalEl);
    }
  }

  function closeCelebrationModal() {
    playOfflineAudioChime('click');
    var modalEl = document.getElementById('modal-celebration');
    if (modalEl) modalEl.classList.remove('active');
    var confettiContainer = document.getElementById('confetti-holder');
    if (confettiContainer) confettiContainer.innerHTML = '';
  }

  function removeRewardWithAnimation(id) {
    playOfflineAudioChime('delete');
    var cardEl = document.getElementById('reward-card-' + id);
    if (cardEl) {
      cardEl.style.transition = 'opacity 0.2s, transform 0.2s';
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'scale(0.9)';
      setTimeout(function() {
        rewards = rewards.filter(function(r) { return r.id !== id; });
        syncState();
        showToast('Reward option removed from Vault', 'info', 'Reward Removed');
      }, 200);
    } else {
      rewards = rewards.filter(function(r) { return r.id !== id; });
      syncState();
      showToast('Reward option removed from Vault', 'info', 'Reward Removed');
    }
  }

  function redeemReward(rewardId, cost) {
    var resolvedCost = Math.round((Math.max(0, Number(cost) || 0) + 1e-9) * 100) / 100;
    var costCenti = Math.round((resolvedCost + 1e-9) * 100);
    var availableCenti = normalizePointsCenti(stats.dopamineVaultPoints);
    if (availableCenti < costCenti) {
      playOfflineAudioChime('pause');
      showToast('Need ' + formatPoints(resolvedCost) + ' PTS (you have ' + getDisplayedPoints() + ' PTS)', 'warning', 'Not Enough Points');
      return false;
    }

    var nextBalance = (Number(stats.dopamineVaultPoints) || 0) - resolvedCost;
    if (!Number.isFinite(nextBalance) || nextBalance < 1e-9) {
      nextBalance = 0;
    }
    stats.dopamineVaultPoints = nextBalance;
    rewards = rewards.map(function(r) {
      return r.id === rewardId ? Object.assign({}, r, { redemptionCount: (r.redemptionCount || 0) + 1 }) : r;
    });
    syncState();
    playOfflineAudioChime('reward');
    showToast('Enjoy your offline reward!', 'success', 'Reward Unlocked 🎉');
    return true;
  }

  function removeDailyGoal() {
    stats.dailyGoalText = '';
    syncState();
    showToast('Daily goal cleared', 'info', 'Daily Goal Removed');
  }

  function handleGoalSubmit(e) {
    e.preventDefault();
    var text = document.getElementById('input-goal-text').value.trim();
    stats.dailyGoalText = text;
    syncState();
    closeGoalModal();
    if (text) {
      showToast(text, 'success', 'Daily Goal Locked In 🎯');
    } else {
      showToast('Daily goal cleared', 'info', 'Daily Goal');
    }
  }

  // --- TASK DELETION CONFIRMATION MODAL LOGIC ---
  var pendingDeleteTaskId = null;

  function promptDeleteTask(id) {
    var task = tasks.find(function(t) { return t.id === id; });
    if (!task) return;
    pendingDeleteTaskId = id;

    patchElementText('delete-modal-task-title', task.title);
    patchElementText('delete-modal-task-cat', (task.category || 'general').toUpperCase() + ' TASK');
    patchElementText('delete-modal-task-time', formatTimer(task.activeSeconds || 0));

    var modal = document.getElementById('modal-delete-task');
    if (modal) {
      modal.classList.add('active');
      window.lucide.createIcons(modal);
    }
  }

  function closeDeleteTaskModal() {
    var modal = document.getElementById('modal-delete-task');
    if (modal) modal.classList.remove('active');
    pendingDeleteTaskId = null;
  }

  function confirmDeleteCurrentTask() {
    if (!pendingDeleteTaskId) return;
    var idToDelete = pendingDeleteTaskId;
    closeDeleteTaskModal();
    removeTaskWithAnimation(idToDelete);
  }

  // --- NOTIFICATION PERMISSION & TEST ENGINE ---
  function checkDeviceNotificationPermission() {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
  }

  function updateNotificationPermissionBadge(status) {
    var badge = document.getElementById('notif-permission-badge');
    if (!badge) return;
    if (status === 'granted') {
      badge.textContent = 'Granted';
      badge.style.background = '#d1fae5';
      badge.style.color = '#065f46';
    } else if (status === 'denied') {
      badge.textContent = 'Denied';
      badge.style.background = '#fee2e2';
      badge.style.color = '#991b1b';
    } else if (status === 'unsupported') {
      badge.textContent = 'Unsupported';
      badge.style.background = '#f1f5f9';
      badge.style.color = '#64748b';
    } else {
      badge.textContent = 'Permission: Not Granted';
      badge.style.background = '#fef3c7';
      badge.style.color = '#92400e';
    }
  }

  async function updateNotificationPermissionUI() {
    var ln = getCapacitorLocalNotifications();
    if (ln && ln.checkPermissions) {
      try {
        var res = await ln.checkPermissions();
        var isGranted = !!(res && (res.display === 'granted' || res.receive === 'granted'));
        updateNotificationPermissionBadge(isGranted ? 'granted' : (res && res.display === 'denied' ? 'denied' : 'prompt'));
        return;
      } catch (e) {}
    }

    var perm = checkDeviceNotificationPermission();
    updateNotificationPermissionBadge(perm);
  }

  async function handleDeviceNotifToggle(enabled) {
    var ln = getCapacitorLocalNotifications();
    var toggle = document.getElementById('set-deviceNotifications');
    if (enabled) {
      if (ln) {
        try {
          var permResult = await ln.requestPermissions();
          var isGranted = !!(permResult && (permResult.display === 'granted' || permResult.receive === 'granted'));
          updateNotificationPermissionBadge(isGranted ? 'granted' : 'denied');
          if (isGranted) {
            settings.deviceNotifications = true;
            syncState();
            showToast('Native offline notifications active 🔔', 'success', 'Notifications Enabled');
            reconcileAllNativeNotifications();
          } else {
            settings.deviceNotifications = false;
            if (toggle) toggle.checked = false;
            syncState();
            showToast('Notification permission was denied.', 'warning', 'Permission Required');
          }
          return;
        } catch (e) {
          console.warn('Capacitor requestPermissions error:', e);
        }
      }

      if (!('Notification' in window)) {
        showToast('Device notifications unsupported in this browser', 'alert', 'Unsupported');
        if (toggle) toggle.checked = false;
        settings.deviceNotifications = false;
        syncState();
        updateNotificationPermissionBadge('unsupported');
        return;
      }

      if (Notification.permission === 'granted') {
        settings.deviceNotifications = true;
        syncState();
        showToast('Offline device notifications enabled! 🔔', 'success', 'Notifications Active');
        updateNotificationPermissionBadge('granted');
        sendDeviceNotification('FocusForge Notifications Active', {
          body: 'You will receive offline daily check-ins and smart deadline countdown alerts.',
          tag: 'focusforge-welcome'
        });
        checkOfflineScheduledNotifications();
      } else if (Notification.permission === 'denied') {
        showToast('Blocked in your browser settings', 'alert', 'Permission Blocked');
        if (toggle) toggle.checked = false;
        settings.deviceNotifications = false;
        syncState();
        updateNotificationPermissionBadge('denied');
      } else {
        try {
          var perm = await Notification.requestPermission();
          if (perm === 'granted') {
            settings.deviceNotifications = true;
            syncState();
            showToast('Device notifications granted & active! 🔔', 'success', 'Notifications Enabled');
            updateNotificationPermissionBadge('granted');
            sendDeviceNotification('FocusForge Notifications Active', {
              body: 'You will receive offline daily check-ins and smart deadline countdown alerts.',
              tag: 'focusforge-welcome'
            });
            checkOfflineScheduledNotifications();
          } else {
            settings.deviceNotifications = false;
            if (toggle) toggle.checked = false;
            syncState();
            showToast('Notification permission was not granted.', 'warning', 'Permission Denied');
            updateNotificationPermissionBadge('denied');
          }
        } catch (e) {
          settings.deviceNotifications = false;
          if (toggle) toggle.checked = false;
          syncState();
        }
      }
    } else {
      settings.deviceNotifications = false;
      syncState();
      showToast('Device notifications turned off', 'info', 'Notifications Disabled');
      updateNotificationPermissionUI();
    }
  }

  async function sendTestDeviceNotification() {
    var ln = getCapacitorLocalNotifications();
    if (ln) {
      try {
        var permResult = await ln.requestPermissions();
        var isGranted = !!(permResult && (permResult.display === 'granted' || permResult.receive === 'granted'));
        updateNotificationPermissionBadge(isGranted ? 'granted' : 'denied');

        if (!isGranted) {
          showToast('Enable notifications in device settings', 'warning', 'Permission Denied');
          return;
        }

        settings.deviceNotifications = true;
        var toggle = document.getElementById('set-deviceNotifications');
        if (toggle) toggle.checked = true;
        syncState();

        await ensureNotificationChannels(ln);
        await scheduleNativeNotificationsSafe(ln, [
          {
            id: NOTIF_ID_TEST,
            title: 'FocusForge 100% Offline Notification',
            body: 'Actual device notification delivered successfully! Vibration and sound test passed.',
            channelId: NOTIF_CHANNEL_DAILY_FOCUS,
            schedule: { at: new Date(Date.now() + 1000), allowWhileIdle: true }
          }
        ]);

        playOfflineAudioChime('fanfare');
        showToast('Scheduled in 1 second 🔔', 'success', 'Native Test Sent');
        return;
      } catch (err) {
        console.warn('Capacitor LocalNotifications schedule error:', err);
      }
    }

    if (!('Notification' in window)) {
      updateNotificationPermissionBadge('unsupported');
      showToast('Device notifications not supported in this browser', 'alert', 'Unsupported');
      return;
    }

    if (Notification.permission !== 'granted') {
      var perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        updateNotificationPermissionBadge('denied');
        showToast('Grant notification permission first!', 'warning', 'Permission Needed');
        return;
      }
      settings.deviceNotifications = true;
      var browserToggle = document.getElementById('set-deviceNotifications');
      if (browserToggle) browserToggle.checked = true;
      syncState();
    }

    updateNotificationPermissionBadge('granted');
    setTimeout(function() {
      sendDeviceNotification('FocusForge 100% Offline Notification', {
        body: 'Actual device notification delivered successfully! Vibration and sound test passed.',
        tag: 'test-device-notif'
      });
    }, 1000);
    playOfflineAudioChime('fanfare');
    showToast('Check your notification shade in 1s 🔔', 'success', 'Test Notification Scheduled');
  }

  function sendDeviceNotification(title, options) {
    if (!settings.deviceNotifications) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    var opts = Object.assign({
      icon: 'FFLOGO.png',
      badge: 'FFLOGO.png',
      vibrate: [120],
      silent: false
    }, options || {});

    if (opts.vibrate && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(opts.vibrate);
      } catch (e) {}
    }

    try {
      var notif = new Notification(title, opts);
      notif.onclick = function() {
        window.focus();
        this.close();
      };
    } catch (err) {
      if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
        navigator.serviceWorker.ready.then(function(reg) {
          reg.showNotification(title, opts);
        }).catch(function() {});
      }
    }
  }

  function checkOfflineScheduledNotifications() {
    var nowMs = Date.now();
    var now = new Date(nowMs);
    var todayDateStr = toLocalDateStr(now);
    var currentHours = String(now.getHours()).padStart(2, '0');
    var currentMinutes = String(now.getMinutes()).padStart(2, '0');
    var currentTimeStr = currentHours + ':' + currentMinutes;
    var targetTimeStr = getDailyCheckInTimeParts().formatted;
    var todayDailyKey = todayDateStr + '|' + targetTimeStr;
    var hasBrowserNotifs = !!(settings.deviceNotifications && ('Notification' in window) && Notification.permission === 'granted');
    var isCapacitor = !!getCapacitorLocalNotifications();

    // 1. Daily Check-in Notification Fallback (Browser / Electron; keyed by date+time so edits re-arm it)
    if (!isCapacitor && (hasBrowserNotifs || stats.dailyNotifUserEditedDate === todayDateStr) && currentTimeStr >= targetTimeStr && stats.lastDailyNotifKey !== todayDailyKey) {
      deliverDailyCheckInReminder(todayDateStr, targetTimeStr, false);
    }

    // 2. Extended Deadline Countdown Checker (only tasks due within 72h; skips completed/terminated/deleted)
    if (settings.deadlineReminders && !isCapacitor) {
      var slotsUpdated = false;

      for (var i = 0; i < tasks.length; i++) {
        var t = tasks[i];
        if (!t || t.status === 'completed' || t.status === 'terminated' || !t.deadline) continue;

        var deadlineMs = new Date(t.deadline).getTime();
        if (!Number.isFinite(deadlineMs) || deadlineMs <= 0) continue;

        var msUntilDeadline = deadlineMs - nowMs;
        // Skip anything > 72h away or already past the 10-minute grace window
        if (msUntilDeadline > MAX_LOOKAHEAD_MS || (nowMs - deadlineMs) > GRACE_WINDOW_MS) {
          continue;
        }

        var anchorMs = t.reminderAnchorMs || new Date(t.createdAt || nowMs).getTime() || nowMs;
        var candidateSlots = buildDeadlineReminderSlots(t, nowMs, false, anchorMs);

        var dueUnsentSlots = candidateSlots.filter(function(slot) {
          if (slot.fireAtMs > nowMs) return false;
          if ((nowMs - slot.fireAtMs) > GRACE_WINDOW_MS) return false;
          var sentKey = getSentSlotStorageKey(t.id, deadlineMs, slot.slotKey);
          return !sentDeadlineSlots[sentKey];
        });

        if (dueUnsentSlots.length === 0) continue;

        for (var sIdx = 0; sIdx < dueUnsentSlots.length; sIdx++) {
          var sKey = getSentSlotStorageKey(t.id, deadlineMs, dueUnsentSlots[sIdx].slotKey);
          sentDeadlineSlots[sKey] = nowMs;
          slotsUpdated = true;
        }

        var latestSlot = dueUnsentSlots[dueUnsentSlots.length - 1];
        var remainingNowMs = Math.max(0, deadlineMs - nowMs);
        var content = formatDeadlineAlertContent(t.title, latestSlot.isDeadlineReached ? 0 : remainingNowMs, latestSlot.isDeadlineReached);

        if (hasBrowserNotifs) {
          sendDeviceNotification(content.title, {
            body: content.body,
            tag: 'ff-dl-' + t.id + '-' + latestSlot.slotKey,
            vibrate: content.vibrate
          });
        }
        showToast(content.toastDetail, content.toastType, content.toastTitle);
      }

      if (slotsUpdated) {
        saveData(STORAGE_KEYS.SENT_SLOTS, sentDeadlineSlots);
      }
    }
  }

  // --- MODALS & FORMS ---
  function openResetModal() {
    var modal = document.getElementById('modal-reset');
    if (modal) {
      modal.classList.add('active');
      window.lucide.createIcons(modal);
    }
  }

  function closeResetModal() {
    var modal = document.getElementById('modal-reset');
    if (modal) modal.classList.remove('active');
  }

  async function confirmResetAppData() {
    tasks.forEach(function(t) { cancelTaskDeadlineNotifications(t.id); });
    var ln = getCapacitorLocalNotifications();
    if (ln) {
      try {
        await ln.cancel({ notifications: [{ id: NOTIF_ID_DAILY_CHECKIN }, { id: NOTIF_ID_DAILY_CHECKIN_IMMEDIATE }, { id: NOTIF_ID_TEST }] });
      } catch (e) {}
    }

    tasks = [];
    rewards = DEFAULT_REWARDS.map(function(r) { return Object.assign({}, r); });
    stats = Object.assign({}, DEFAULT_STATS, { cycleBaseSecs: 0 });
    tickets = [];
    settings = Object.assign({}, DEFAULT_SETTINGS);
    sentDeadlineSlots = {};
    nativeNotifIdRegistry = {};
    activeTaskId = null;

    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.REWARDS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.TICKETS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SENT_SLOTS);
    localStorage.removeItem(STORAGE_KEYS.NATIVE_NOTIF_IDS);
    localStorage.removeItem(STORAGE_KEYS.CYCLE100);

    resetPomo();

    syncState();
    closeResetModal();
    showToast('Clean fresh state restored', 'info', 'App Reset');
  }

  function openTutorialModal(step) {
    currentTutorialStep = typeof step === 'number' ? step : 1;
    renderTutorialStep();
    var modal = document.getElementById('modal-tutorial');
    if (modal) {
      modal.classList.add('active');
      var card = document.getElementById('tutorial-modal-card');
      if (card) card.scrollTop = 0;
      window.lucide.createIcons(modal);
    }
  }

  function closeTutorialModal() {
    var modal = document.getElementById('modal-tutorial');
    if (modal) modal.classList.remove('active');
    localStorage.setItem(STORAGE_KEYS.TUTORIAL_SEEN, 'true');
  }

  function goToTutorialStep(step) {
    if (step < 1) step = 1;
    if (step > 3) step = 3;
    currentTutorialStep = step;
    renderTutorialStep();
  }

  function navigateTutorial(direction) {
    currentTutorialStep += direction;
    if (currentTutorialStep > 3) {
      closeTutorialModal();
      return;
    }
    if (currentTutorialStep < 1) currentTutorialStep = 1;
    renderTutorialStep();
  }

  function renderTutorialStep() {
    var s1 = document.getElementById('tut-step-1');
    var s2 = document.getElementById('tut-step-2');
    var s3 = document.getElementById('tut-step-3');
    if (s1) s1.style.display = currentTutorialStep === 1 ? 'block' : 'none';
    if (s2) s2.style.display = currentTutorialStep === 2 ? 'block' : 'none';
    if (s3) s3.style.display = currentTutorialStep === 3 ? 'block' : 'none';

    var d1 = document.getElementById('tut-dot-1');
    var d2 = document.getElementById('tut-dot-2');
    var d3 = document.getElementById('tut-dot-3');
    if (d1) d1.className = 'tutorial-dot ' + (currentTutorialStep === 1 ? 'active' : '');
    if (d2) d2.className = 'tutorial-dot ' + (currentTutorialStep === 2 ? 'active' : '');
    if (d3) d3.className = 'tutorial-dot ' + (currentTutorialStep === 3 ? 'active' : '');

    var prevBtn = document.getElementById('btn-tut-prev');
    if (prevBtn) prevBtn.style.display = currentTutorialStep > 1 ? 'inline-flex' : 'none';

    var nextBtn = document.getElementById('btn-tut-next');
    if (nextBtn) nextBtn.textContent = currentTutorialStep === 3 ? 'Start Forging! 🚀' : 'Next Step →';
  }

  function openTaskModal(taskId) {
    var modal = document.getElementById('modal-task');
    var heading = document.getElementById('modal-task-heading');
    var submitBtn = document.getElementById('btn-task-submit');
    var titleInput = document.getElementById('input-task-title');
    var deadlineInput = document.getElementById('input-task-deadline');

    var existing = (typeof taskId === 'string' && taskId)
      ? tasks.find(function(t) { return t.id === taskId && t.status !== 'completed' && t.status !== 'terminated'; })
      : null;

    if (existing) {
      editingTaskId = existing.id;
      if (heading) heading.textContent = 'Edit Focus Task';
      if (submitBtn) submitBtn.textContent = 'Save Task Changes';
      if (titleInput) titleInput.value = existing.title || '';
      selectFormCategory(existing.category === 'household' ? 'household' : 'academic');
      if (deadlineInput) deadlineInput.value = formatDateTimeLocalInput(existing.deadline);
    } else {
      editingTaskId = null;
      if (heading) heading.textContent = 'Add New Focus Task';
      if (submitBtn) submitBtn.textContent = 'Add Task to Forge';
      if (titleInput) titleInput.value = '';
      selectFormCategory('academic');
      if (deadlineInput) deadlineInput.value = '';
    }

    if (modal) {
      modal.classList.add('active');
      window.lucide.createIcons(modal);
    }
  }

  function closeTaskModal() {
    editingTaskId = null;
    var modal = document.getElementById('modal-task');
    if (modal) modal.classList.remove('active');
  }

  function openGoalModal() {
    var input = document.getElementById('input-goal-text');
    if (input) input.value = stats.dailyGoalText || '';
    var modal = document.getElementById('modal-goal');
    if (modal) {
      modal.classList.add('active');
      window.lucide.createIcons(modal);
    }
  }

  function closeGoalModal() {
    var modal = document.getElementById('modal-goal');
    if (modal) modal.classList.remove('active');
  }

  function openAddRewardModal() {
    var modal = document.getElementById('modal-reward');
    if (modal) {
      modal.classList.add('active');
      window.lucide.createIcons(modal);
    }
  }

  function closeAddRewardModal() {
    var modal = document.getElementById('modal-reward');
    if (modal) modal.classList.remove('active');
  }

  function selectFormCategory(cat) {
    formCategory = cat;
    var acBtn = document.getElementById('btn-cat-academic');
    var hhBtn = document.getElementById('btn-cat-household');
    if (acBtn) acBtn.className = 'btn-chip ' + (cat === 'academic' ? 'active' : '');
    if (hhBtn) hhBtn.className = 'btn-chip ' + (cat === 'household' ? 'active' : '');
  }

  async function handleTaskSubmit(e) {
    e.preventDefault();
    var titleInput = document.getElementById('input-task-title');
    var deadlineInput = document.getElementById('input-task-deadline');
    var title = titleInput ? titleInput.value.trim() : '';
    if (!title) {
      showToast('Please enter a task name first.', 'warning', 'Task Name Required');
      if (titleInput) titleInput.focus();
      return;
    }
    var dl = deadlineInput ? deadlineInput.value : '';

    if (editingTaskId) {
      var existingIdx = tasks.findIndex(function(t) { return t.id === editingTaskId; });
      if (existingIdx !== -1) {
        var prevTask = tasks[existingIdx];
        var updatedDeadline = dl || null;
        var scheduleChanged = prevTask.title !== title || (prevTask.deadline || null) !== updatedDeadline;

        var updatedTask = Object.assign({}, prevTask, {
          title: title,
          category: formCategory,
          deadline: updatedDeadline,
          reminderAnchorMs: scheduleChanged ? Date.now() : prevTask.reminderAnchorMs
        });
        if (scheduleChanged) {
          updatedTask.deadlineNotifsSent = {};
        }
        tasks[existingIdx] = updatedTask;

        syncState();
        closeTaskModal();
        if (titleInput) titleInput.value = '';
        if (deadlineInput) deadlineInput.value = '';
        selectFormCategory('academic');
        playOfflineAudioChime('start');
        showToast(title, 'success', 'Task Updated');

        if (scheduleChanged) {
          clearTaskSentSlots(updatedTask.id);
          await cancelTaskDeadlineNotifications(updatedTask.id);
          if (updatedTask.deadline) {
            scheduleTaskDeadlineNotifications(updatedTask, true);
          }
        }
        return;
      }
    }

    var nowMs = Date.now();
    var newTask = {
      id: 't-' + nowMs,
      title: title,
      category: formCategory,
      deadline: dl || null,
      activeSeconds: 0,
      status: 'not_started',
      createdAt: new Date(nowMs).toISOString(),
      reminderAnchorMs: nowMs,
      statusBadge: 'Not Started'
    };

    tasks.unshift(newTask);

    syncState();
    closeTaskModal();
    if (titleInput) titleInput.value = '';
    if (deadlineInput) deadlineInput.value = '';
    selectFormCategory('academic');
    playOfflineAudioChime('start');
    showToast(title, 'success', 'Task Created 🚀');

    if (newTask.deadline) {
      scheduleTaskDeadlineNotifications(newTask, true);
    }
  }

  function handleRewardSubmit(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    var titleInput = document.getElementById('input-reward-title');
    var costInput = document.getElementById('input-reward-cost');
    var title = titleInput ? titleInput.value.trim() : '';
    if (!title) {
      showToast('Please enter a reward name.', 'warning', 'Reward Name Required');
      if (titleInput) titleInput.focus();
      return false;
    }
    var rawVal = costInput ? String(costInput.value).trim() : '';
    var rawCost = rawVal === '' ? NaN : Number(rawVal);
    var normalizedCost = Number.isFinite(rawCost) ? Math.round((rawCost + 1e-9) * 100) / 100 : NaN;
    if (!Number.isFinite(rawCost) || rawCost < MIN_REWARD_COST || !Number.isFinite(normalizedCost) || normalizedCost < MIN_REWARD_COST) {
      showToast('Minimum reward cost is ' + formatPoints(MIN_REWARD_COST) + ' PTS.', 'warning', 'Minimum 70.00 PTS Required');
      if (costInput) costInput.focus();
      return false;
    }
    var cost = Math.min(10000, normalizedCost);

    var newReward = {
      id: 'r-' + Date.now(),
      title: title,
      pointsCost: cost,
      redemptionCount: 0
    };

    rewards.push(newReward);
    syncState();
    closeAddRewardModal();
    if (titleInput) titleInput.value = '';
    if (costInput) costInput.value = String(MIN_REWARD_COST);
    playOfflineAudioChime('reward');
    showToast(title + ' (' + formatPoints(cost) + ' PTS)', 'success', 'Reward Added to Vault 🎁');
    return true;
  }

  function switchView(viewName) {
    playOfflineAudioChime('click');
    currentView = viewName;
    document.getElementById('view-tasks').style.display = viewName === 'tasks' ? 'block' : 'none';
    document.getElementById('view-shop').style.display = viewName === 'shop' ? 'block' : 'none';
    document.getElementById('view-analytics').style.display = viewName === 'analytics' ? 'block' : 'none';

    document.getElementById('tab-nav-tasks').className = 'tab-btn ' + (viewName === 'tasks' ? 'active' : '');
    document.getElementById('tab-nav-shop').className = 'tab-btn ' + (viewName === 'shop' ? 'active' : '');
    document.getElementById('tab-nav-analytics').className = 'tab-btn ' + (viewName === 'analytics' ? 'active' : '');

    ['tasks', 'shop', 'analytics'].forEach(function(n) {
      var btn = document.getElementById('mobile-nav-' + n);
      if (btn) {
        if (n === viewName) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });

    scheduleRender();
  }

  function setCategoryFilter(cat) {
    playOfflineAudioChime('click');
    activeCategoryFilter = cat;
    ['all', 'academic', 'household'].forEach(function(c) {
      var btn = document.getElementById('chip-filter-' + c);
      if (btn) btn.className = 'btn-chip ' + (c === cat ? 'active' : '');
    });
    renderTaskGrid();
  }

  // --- SINGLE-STAGE URGENCY TOAST (NO STACKING) ---
  var currentToastEl = null;
  var toastDismissTimeout = null;

  function showToast(msg, type, titleOverride) {
    if (settings && settings.enableToasts === false) return;
    var stack = document.getElementById('toast-stack');
    if (!stack) return;

    var resolvedType = type || 'info';
    if (toastDismissTimeout) {
      clearTimeout(toastDismissTimeout);
      toastDismissTimeout = null;
    }

    var getIconHtml = function(t) {
      if (t === 'success') return '✓';
      if (t === 'warning') return '⏰';
      if (t === 'alert') return '🔥';
      return '📘';
    };

    var defaultTitle = function(t) {
      if (t === 'success') return 'FocusForge Complete';
      if (t === 'warning') return 'Heads Up';
      if (t === 'alert') return 'Urgent Notice';
      return 'FocusForge';
    };

    var boldHeader = titleOverride != null ? String(titleOverride) : defaultTitle(resolvedType);
    var secondLine = String(msg == null ? '' : msg);

    var contentHtml =
      '<div class="toast-badge-icon" style="width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex-shrink: 0; margin-top: 1px;">' + getIconHtml(resolvedType) + '</div>' +
      '<div style="flex: 1; min-width: 0;">' +
        '<strong style="display: block; font-size: 13px; font-weight: 800; line-height: 1.25; color: #ffffff; word-break: break-word;">' + escapeHtml(boldHeader) + '</strong>' +
        '<span style="font-size: 11px; color: #cbd5e1; line-height: 1.35; display: block; margin-top: 2px; word-break: break-word;">' + escapeHtml(secondLine) + '</span>' +
      '</div>' +
      '<button type="button" aria-label="Dismiss alert" class="toast-close-btn">✕</button>';

    function dismissToast() {
      if (!currentToastEl) return;
      var el = currentToastEl;
      currentToastEl = null;
      if (toastDismissTimeout) {
        clearTimeout(toastDismissTimeout);
        toastDismissTimeout = null;
      }
      el.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px) scale(0.97)';
      setTimeout(function() {
        if (el.parentNode) el.remove();
      }, 200);
    }

    if (currentToastEl && stack.contains(currentToastEl)) {
      currentToastEl.style.transition = 'opacity 0.12s ease, transform 0.12s ease';
      currentToastEl.style.opacity = '0.3';
      currentToastEl.style.transform = 'scale(0.97)';

      setTimeout(function() {
        if (!currentToastEl) return;
        currentToastEl.className = 'toast-item ' + resolvedType;
        currentToastEl.innerHTML = contentHtml;

        var closeBtn = currentToastEl.querySelector('.toast-close-btn');
        if (closeBtn) closeBtn.onclick = dismissToast;

        currentToastEl.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        currentToastEl.style.opacity = '1';
        currentToastEl.style.transform = 'scale(1) translateY(0)';
      }, 110);
    } else {
      stack.innerHTML = '';
      var item = document.createElement('div');
      item.className = 'toast-item ' + resolvedType;
      item.style.opacity = '0';
      item.style.transform = 'translateY(8px) scale(0.98)';
      item.innerHTML = contentHtml;

      var closeBtnNew = item.querySelector('.toast-close-btn');
      if (closeBtnNew) closeBtnNew.onclick = dismissToast;

      stack.appendChild(item);
      currentToastEl = item;

      requestAnimationFrame(function() {
        item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
      });
    }

    toastDismissTimeout = setTimeout(dismissToast, 4000);
  }

  function openSettingsModal() {
    Object.keys(DEFAULT_SETTINGS).forEach(function(key) {
      var input = document.getElementById('set-' + key);
      if (input && input.type === 'checkbox') input.checked = !!settings[key];
    });
    var modal = document.getElementById('modal-settings');
    var timeInput = document.getElementById('set-dailyNotifTime');
    if (timeInput && settings.dailyNotifTime) timeInput.value = settings.dailyNotifTime;
    updateNotificationPermissionUI();
    if (modal) {
      modal.classList.add('active');
      window.lucide.createIcons(modal);
    }
  }

  function closeSettingsModal() {
    var modal = document.getElementById('modal-settings');
    if (modal) modal.classList.remove('active');
  }

  function handleDailyNotifTimeUpdated(rawTimeVal) {
    var parts = getDailyCheckInTimeParts(rawTimeVal);
    var normalizedTime = parts.formatted;
    var now = new Date();
    var todayDateStr = toLocalDateStr(now);
    var currentTimeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    settings.dailyNotifTime = normalizedTime;
    stats.lastDailyNotifKey = '';
    stats.lastDailyNotifDate = '';
    stats.dailyNotifUserEditedDate = todayDateStr;
    syncState();

    reconcileAllNativeNotifications();

    if (currentTimeStr >= normalizedTime) {
      deliverDailyCheckInReminder(todayDateStr, normalizedTime, true);
    } else {
      showToast('Daily check-in scheduled for ' + normalizedTime, 'info', 'Preferences Saved');
    }
  }

  function toggleSetting(key, val) {
    if (key === 'dailyNotifTime') {
      if (!val) return;
      handleDailyNotifTimeUpdated(val);
      return;
    }

    settings[key] = val;
    if (key === 'afkProtection') {
      lastUserActivityMs = Date.now();
    }
    syncState();

    if (key === 'deadlineReminders') {
      if (val) {
        reconcileAllNativeNotifications();
      } else {
        tasks.forEach(function(t) { cancelTaskDeadlineNotifications(t.id); });
      }
    }

    showToast('Setting ' + (val ? 'updated' : 'disabled'), 'info', 'Preferences Saved');
  }

  function resetDefaultSettings() {
    settings = Object.assign({}, DEFAULT_SETTINGS);
    stats.lastDailyNotifKey = '';
    stats.lastDailyNotifDate = '';
    lastUserActivityMs = Date.now();
    syncState();
    openSettingsModal();
    reconcileAllNativeNotifications();
    showToast('Default settings restored', 'info', 'Settings Reset');
  }

  // Expose handlers on window for static UI inline callbacks & Capacitor/Electron bridge compatibility
  window.switchView = switchView;
  window.openPomoModal = openPomoModal;
  window.closePomoModal = closePomoModal;
  window.togglePomoTimer = togglePomoTimer;
  window.resetPomoTimer = resetPomoTimer;
  window.setPomoPreset = setPomoPreset;
  window.setPomoLinkedTask = setPomoLinkedTask;
  window.togglePomoAudio = togglePomoAudio;
  window.openTaskModal = openTaskModal;
  window.closeTaskModal = closeTaskModal;
  window.handleTaskSubmit = handleTaskSubmit;
  window.selectFormCategory = selectFormCategory;
  window.openGoalModal = openGoalModal;
  window.closeGoalModal = closeGoalModal;
  window.handleGoalSubmit = handleGoalSubmit;
  window.removeDailyGoal = removeDailyGoal;
  window.openAddRewardModal = openAddRewardModal;
  window.closeAddRewardModal = closeAddRewardModal;
  window.handleRewardSubmit = handleRewardSubmit;
  window.redeemReward = redeemReward;
  window.removeRewardWithAnimation = removeRewardWithAnimation;
  window.openResetModal = openResetModal;
  window.closeResetModal = closeResetModal;
  window.confirmResetAppData = confirmResetAppData;
  window.openTutorialModal = openTutorialModal;
  window.closeTutorialModal = closeTutorialModal;
  window.navigateTutorial = navigateTutorial;
  window.goToTutorialStep = goToTutorialStep;
  window.openSettingsModal = openSettingsModal;
  window.closeSettingsModal = closeSettingsModal;
  window.toggleSetting = toggleSetting;
  window.resetDefaultSettings = resetDefaultSettings;
  window.handleDeviceNotifToggle = handleDeviceNotifToggle;
  window.sendTestDeviceNotification = sendTestDeviceNotification;
  window.promptDeleteTask = promptDeleteTask;
  window.closeDeleteTaskModal = closeDeleteTaskModal;
  window.confirmDeleteCurrentTask = confirmDeleteCurrentTask;
  window.startTaskTimer = startTaskTimer;
  window.pauseTaskTimer = pauseTaskTimer;
  window.completeTaskWithAnimation = completeTaskWithAnimation;
  window.removeTaskWithAnimation = removeTaskWithAnimation;
  window.setCategoryFilter = setCategoryFilter;
  window.dismissReminderBanner = dismissReminderBanner;
  window.triggerAutomatic100PercentTicket = triggerAutomatic100PercentTicket;
  window.closeCelebrationModal = closeCelebrationModal;
  window.openCelebrationModal = openCelebrationModal;
  window.scheduleDailyCheckInAlarm = scheduleDailyCheckInAlarm;
  window.scheduleTaskDeadlineNotifications = scheduleTaskDeadlineNotifications;
  window.cancelTaskDeadlineNotifications = cancelTaskDeadlineNotifications;

  // Testability hook exposing pure & core state functions for automated verification
  window.__FOCUSFORGE_TEST__ = {
    CYCLE_TARGET_SECS: CYCLE_TARGET_SECS,
    CYCLE_BONUS_PTS: CYCLE_BONUS_PTS,
    POINTS_PER_FOCUS_SEC: POINTS_PER_FOCUS_SEC,
    MIN_REWARD_COST: MIN_REWARD_COST,
    STORAGE_KEYS: STORAGE_KEYS,
    DEFAULT_REWARDS: DEFAULT_REWARDS,
    DEFAULT_STATS: DEFAULT_STATS,
    DEFAULT_SETTINGS: DEFAULT_SETTINGS,
    DEFAULT_POMO_STATE: DEFAULT_POMO_STATE,
    creditFocus: creditFocus,
    evaluateCycles: evaluateCycles,
    migrateStats: migrateStats,
    migrateRewards: migrateRewards,
    resetPomo: resetPomo,
    runTimerTick: runTimerTick,
    updateProgressBarOnly: updateProgressBarOnly,
    fullRender: fullRender,
    completeTaskWithAnimation: completeTaskWithAnimation,
    removeTaskWithAnimation: removeTaskWithAnimation,
    redeemReward: redeemReward,
    handleRewardSubmit: handleRewardSubmit,
    confirmResetAppData: confirmResetAppData,
    startTaskTimer: startTaskTimer,
    pauseTaskTimer: pauseTaskTimer,
    togglePomoTimer: togglePomoTimer,
    setPomoPreset: setPomoPreset,
    setPomoLinkedTask: setPomoLinkedTask,
    getDisplayedPoints: getDisplayedPoints,
    formatPoints: formatPoints,
    normalizePointsCenti: normalizePointsCenti,
    syncStateImmediate: syncStateImmediate,
    getState: function() {
      return {
        tasks: tasks,
        rewards: rewards,
        stats: stats,
        tickets: tickets,
        settings: settings,
        pomoState: pomoState,
        activeTaskId: activeTaskId,
        lastUserActivityMs: lastUserActivityMs,
        lastTimerTickMs: lastTimerTickMs
      };
    },
    setState: function(patch) {
      if (!patch || typeof patch !== 'object') return;
      if ('tasks' in patch) tasks = patch.tasks;
      if ('rewards' in patch) rewards = patch.rewards;
      if ('stats' in patch) stats = patch.stats;
      if ('tickets' in patch) tickets = patch.tickets;
      if ('settings' in patch) settings = patch.settings;
      if ('pomoState' in patch) pomoState = patch.pomoState;
      if ('activeTaskId' in patch) activeTaskId = patch.activeTaskId;
      if ('lastUserActivityMs' in patch) lastUserActivityMs = patch.lastUserActivityMs;
      if ('lastTimerTickMs' in patch) lastTimerTickMs = patch.lastTimerTickMs;
    }
  };

  // --- STARTUP INITIALIZATION ---
  function initApp() {
    bindLogoImages();
    renderIcons(document);
    pruneSentDeadlineSlots();

    // Copy protection guards: block contextmenu, selectstart, copy, and cut on UI chrome,
    // allow inside inputs, textareas, contenteditable, and explicit selectable zones
    function isSelectableField(target) {
      return !!(target && target.closest && target.closest('input, textarea, [contenteditable="true"], .selectable-text, .allow-select'));
    }
    ['contextmenu', 'selectstart', 'copy', 'cut'].forEach(function(evtName) {
      document.addEventListener(evtName, function(e) {
        var activeEl = document.activeElement;
        if (isSelectableField(e.target) || (evtName !== 'contextmenu' && isSelectableField(activeEl))) {
          return;
        }
        e.preventDefault();
      });
    });

    // Touch swipe navigation on Starter Guide
    var tutCard = document.getElementById('tutorial-modal-card');
    if (tutCard) {
      var touchStartX = 0;
      var touchStartY = 0;
      tutCard.addEventListener('touchstart', function(e) {
        if (e.changedTouches && e.changedTouches.length > 0) {
          touchStartX = e.changedTouches[0].clientX;
          touchStartY = e.changedTouches[0].clientY;
        }
      }, { passive: true });
      tutCard.addEventListener('touchend', function(e) {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          if (dx < 0) {
            navigateTutorial(1);
          } else if (currentTutorialStep > 1) {
            navigateTutorial(-1);
          }
        }
      }, { passive: true });
    }

    // Close modals when tapping directly on dark backdrop overlay
    document.querySelectorAll('.modal-backdrop').forEach(function(backdrop) {
      backdrop.addEventListener('click', function(e) {
        if (e.target !== backdrop) return;
        if (backdrop.id === 'modal-tutorial') closeTutorialModal();
        else if (backdrop.id === 'modal-task') closeTaskModal();
        else if (backdrop.id === 'modal-goal') closeGoalModal();
        else if (backdrop.id === 'modal-reset') closeResetModal();
        else if (backdrop.id === 'modal-reward') closeAddRewardModal();
        else if (backdrop.id === 'modal-celebration') closeCelebrationModal();
        else if (backdrop.id === 'modal-pomo-timer') closePomoModal();
        else if (backdrop.id === 'modal-settings') closeSettingsModal();
        else if (backdrop.id === 'modal-delete-task') closeDeleteTaskModal();
      });
    });

    // Single delegated listener on #task-cards-grid
    var taskGrid = document.getElementById('task-cards-grid');
    if (taskGrid) {
      taskGrid.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        var taskId = btn.getAttribute('data-task-id');
        if (!action || !taskId) return;
        if (action === 'start') startTaskTimer(taskId);
        else if (action === 'pause') pauseTaskTimer(taskId);
        else if (action === 'edit') openTaskModal(taskId);
        else if (action === 'complete') completeTaskWithAnimation(taskId);
        else if (action === 'delete') promptDeleteTask(taskId);
      });
    }

    // Single delegated listener on #rewards-grid-container
    var rewardsGrid = document.getElementById('rewards-grid-container');
    if (rewardsGrid) {
      rewardsGrid.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-reward-action]');
        if (!btn) return;
        var action = btn.getAttribute('data-reward-action');
        var rewardId = btn.getAttribute('data-reward-id');
        if (!action || !rewardId) return;
        if (action === 'remove') {
          removeRewardWithAnimation(rewardId);
        } else if (action === 'redeem') {
          var cost = Number(btn.getAttribute('data-reward-cost')) || 0;
          redeemReward(rewardId, cost);
        }
      });
    }

    // Capacitor App plugin foreground resume listener (when available)
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App && typeof window.Capacitor.Plugins.App.addListener === 'function') {
      try {
        window.Capacitor.Plugins.App.addListener('appStateChange', function(state) {
          if (state && state.isActive) {
            handleAppResume();
          } else {
            syncStateImmediate();
          }
        });
      } catch (e) {}
    }

    fullRender();
    updatePomoUI();
    updateNotificationPermissionUI();

    // Reconcile native alarms & check due alerts once on startup
    setTimeout(function() {
      reconcileAllNativeNotifications();
      checkOfflineScheduledNotifications();
    }, 900);

    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('/sw.js').then(function(reg) {
        console.log('FocusForge Offline SW Registered:', reg.scope);
      }).catch(function(err) {
        console.log('Offline SW Registration failed:', err);
      });
    }

    setTimeout(function() {
      var loaderScreen = document.getElementById('loading-screen');
      if (loaderScreen) loaderScreen.classList.add('fade-out');

      var seenTutorial = localStorage.getItem(STORAGE_KEYS.TUTORIAL_SEEN);
      if (!seenTutorial) {
        setTimeout(function() {
          openTutorialModal(1);
        }, 250);
      }
    }, 650);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
