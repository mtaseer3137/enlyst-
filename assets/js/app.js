/**
 * Enlyst Recruitment Platform - Master Interactive Engine
 * Handles interactive particles, filtering, calculators, quiz, modals, and UX polish
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initThemeToggle();
  initPersonaToggle();
  initInteractiveQuiz();
  initJobAndTalentEngine();
  initCalculators();
  initModalSystem();
  initLiveTicker();
  initMobileMenu();
  initSmoothScroll();
});

/* ==========================================================================
   1. HERO PARTICLE NETWORK CANVAS (Interactive & High Performance)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 75);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2 + 1.2,
        color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(99, 102, 241, '
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse gentle repulsion / pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(45, 91, 227, 0.45)' : (p.color + '0.7)');
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = isLight ? `rgba(45, 91, 227, ${alpha * 0.9})` : `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. THEME SWITCHER (Dark & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const logo = document.getElementById('nav-brand-logo');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('enlyst_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  updateLogo(currentTheme);

  themeBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const newTheme = active === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('enlyst_theme', newTheme);
    updateThemeIcon(newTheme);
    updateLogo(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
  });

  function updateLogo(theme) {
    const logos = document.querySelectorAll('img[src*="enlyst-primary-"], #nav-brand-logo');
    logos.forEach(img => {
      if (theme === 'light') {
        img.src = 'assets/images/logo/enlyst-primary-light.svg';
      } else {
        img.src = 'assets/images/logo/enlyst-primary-dark.svg';
      }
    });
  }

  function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-moon text-amber-400';
    } else {
      icon.className = 'fa-solid fa-sun text-amber-500';
    }
  }
}

/* ==========================================================================
   3. PERSONA TOGGLE (For Employers vs For Candidates)
   ========================================================================== */
function initPersonaToggle() {
  const btnEmployer = document.getElementById('persona-employer-btn');
  const btnCandidate = document.getElementById('persona-candidate-btn');
  const headline = document.getElementById('hero-headline');
  const subtitle = document.getElementById('hero-subtitle');
  const ctaPrimary = document.getElementById('hero-primary-cta');

  if (!btnEmployer || !btnCandidate) return;

  btnEmployer.addEventListener('click', () => {
    setPersona('employer');
  });

  btnCandidate.addEventListener('click', () => {
    setPersona('candidate');
  });

  function setPersona(type) {
    if (type === 'employer') {
      btnEmployer.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btnEmployer.classList.remove('text-slate-400');
      btnCandidate.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      btnCandidate.classList.add('text-slate-400');

      if (headline) {
        headline.innerHTML = `Hire <span class="gradient-text">Top 1% Talent</span> In Days, Not Quarters.`;
      }
      if (subtitle) {
        subtitle.textContent = `Enlyst is the executive talent acquisition firm trusted by hypergrowth tech leaders. We match pre-vetted engineers, AI scientists, and C-suite innovators in under 14 days.`;
      }
      if (ctaPrimary) {
        ctaPrimary.innerHTML = `<span>Hire Elite Talent</span> <i class="fa-solid fa-arrow-right text-xs"></i>`;
        ctaPrimary.setAttribute('onclick', "openModal('consultation-modal')");
      }
      showToast("Viewing experience tailored for Hiring Teams & Founders");
    } else {
      btnCandidate.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btnCandidate.classList.remove('text-slate-400');
      btnEmployer.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      btnEmployer.classList.add('text-slate-400');

      if (headline) {
        headline.innerHTML = `Fast-Track Your Career To <span class="gradient-text">Category Leaders</span>.`;
      }
      if (subtitle) {
        subtitle.textContent = `Get represented by elite talent agents. Access unlisted $200k-$500k+ executive and engineering roles with venture-backed AI startups and market leaders.`;
      }
      if (ctaPrimary) {
        ctaPrimary.innerHTML = `<span>Explore Unlisted Roles</span> <i class="fa-solid fa-arrow-right text-xs"></i>`;
        ctaPrimary.setAttribute('onclick', "scrollToSection('opportunities')");
      }
      showToast("Viewing experience tailored for Candidates & Leaders");
    }
  }
}

/* ==========================================================================
   4. INTERACTIVE "FIND YOUR MATCH" QUIZ / ASSESSMENT
   ========================================================================== */
function initInteractiveQuiz() {
  const container = document.getElementById('quiz-widget');
  if (!container) return;

  const quizState = {
    roleType: 'hire',
    domain: 'ai',
    urgency: 'urgent'
  };

  const roleCards = container.querySelectorAll('.quiz-role-card');
  const domainCards = container.querySelectorAll('.quiz-domain-card');
  const urgencyCards = container.querySelectorAll('.quiz-urgency-card');
  const btnCalculate = document.getElementById('quiz-calculate-btn');
  const resultPanel = document.getElementById('quiz-result-panel');

  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      quizState.roleType = card.dataset.value;
    });
  });

  domainCards.forEach(card => {
    card.addEventListener('click', () => {
      domainCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      quizState.domain = card.dataset.value;
    });
  });

  urgencyCards.forEach(card => {
    card.addEventListener('click', () => {
      urgencyCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      quizState.urgency = card.dataset.value;
    });
  });

  if (btnCalculate && resultPanel) {
    btnCalculate.addEventListener('click', () => {
      btnCalculate.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Calculating Match Intelligence...`;
      btnCalculate.disabled = true;

      setTimeout(() => {
        btnCalculate.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Recalculate Blueprint`;
        btnCalculate.disabled = false;
        resultPanel.classList.remove('hidden');

        // Dynamic result values based on selection
        const domainNames = {
          'ai': 'AI / Machine Learning & Foundation Models',
          'systems': 'Distributed Systems & High-Perf Infra',
          'executive': 'Executive & Engineering Leadership',
          'fintech': 'Low-Latency FinTech & Quantitative Core',
          'product': 'Product Strategy & Design Systems'
        };

        const matchCandidatesCount = quizState.domain === 'ai' ? 42 : quizState.domain === 'executive' ? 18 : 34;
        const avgDays = quizState.urgency === 'urgent' ? '9 to 14 Days' : '14 to 21 Days';
        const retentionRate = '99.1%';

        document.getElementById('result-domain-text').textContent = domainNames[quizState.domain] || 'Elite Technology';
        document.getElementById('result-candidate-count').textContent = `${matchCandidatesCount} Vetted Candidates`;
        document.getElementById('result-timeframe').textContent = avgDays;
        document.getElementById('result-retention').textContent = retentionRate;

        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showToast("✨ Custom Talent Intelligence Blueprint Generated!");
      }, 700);
    });
  }
}

/* ==========================================================================
   5. JOB BOARD & TALENT SHOWCASE ENGINE
   ========================================================================== */
function initJobAndTalentEngine() {
  const jobListContainer = document.getElementById('jobs-list-grid');
  const talentContainer = document.getElementById('talent-list-grid');
  const filterBtns = document.querySelectorAll('.job-filter-btn');
  const searchInput = document.getElementById('job-search-input');
  const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
  const jobsSection = document.getElementById('jobs-container');
  const talentSection = document.getElementById('talent-container');

  let currentCategory = 'all';
  let searchQuery = '';

  // Render Initial Jobs
  renderJobs();
  renderTalent();

  // Category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-800/60', 'text-slate-300');
      });
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300');

      currentCategory = btn.dataset.category;
      renderJobs();
    });
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderJobs();
    });
  }

  // Toggle between Jobs (for candidates) and Vetted Talent Profiles (for employers)
  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewToggleBtns.forEach(b => {
        b.classList.remove('border-blue-500', 'text-blue-400', 'bg-blue-500/10');
        b.classList.add('border-transparent', 'text-slate-400');
      });
      btn.classList.add('border-blue-500', 'text-blue-400', 'bg-blue-500/10');
      btn.classList.remove('border-transparent', 'text-slate-400');

      const view = btn.dataset.view;
      if (view === 'jobs') {
        jobsSection.classList.remove('hidden');
        talentSection.classList.add('hidden');
      } else {
        jobsSection.classList.add('hidden');
        talentSection.classList.remove('hidden');
      }
    });
  });

  function renderJobs() {
    if (!jobListContainer) return;

    let filtered = ENLYST_DATA.jobs.filter(job => {
      const matchCat = currentCategory === 'all' || job.category === currentCategory;
      const matchSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery) ||
        job.company.toLowerCase().includes(searchQuery) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery)) ||
        job.location.toLowerCase().includes(searchQuery);

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      jobListContainer.innerHTML = `
        <div class="col-span-full text-center py-12 glass-panel p-8">
          <i class="fa-solid fa-magnifying-glass text-4xl text-slate-500 mb-3"></i>
          <h4 class="text-xl font-bold text-slate-200">No matching positions found</h4>
          <p class="text-slate-400 text-sm mt-1">Try refining your search terms or view our confidential executive pipeline.</p>
          <button onclick="resetJobFilters()" class="mt-4 px-4 py-2 bg-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-sm transition">Reset All Filters</button>
        </div>
      `;
      return;
    }

    jobListContainer.innerHTML = filtered.map(job => `
      <div class="glass-card-interactive p-6 flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-4 mb-3">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                  ${job.department}
                </span>
                ${job.featured ? `<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1"><i class="fa-solid fa-star text-[10px]"></i> Priority</span>` : ''}
              </div>
              <h3 class="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors cursor-pointer" onclick="openJobDetailModal('${job.id}')">
                ${job.title}
              </h3>
              <p class="text-sm text-slate-400 font-medium flex items-center gap-2 mt-0.5">
                <span>${job.company}</span>
                <span>•</span>
                <span class="flex items-center gap-1"><i class="fa-solid fa-location-dot text-xs text-slate-500"></i> ${job.location}</span>
              </p>
            </div>
            <div class="text-right">
              <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 inline-block">
                ${job.matchScore}% Match Index
              </span>
            </div>
          </div>

          <p class="text-slate-300 text-sm mb-4 line-clamp-2">
            ${job.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mb-5">
            ${job.tags.map(t => `<span class="text-xs bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/50">${t}</span>`).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800/70 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 block font-medium">Compensation Package</span>
            <span class="text-sm font-bold text-slate-100">${job.salary}</span>
            <span class="text-xs text-slate-400 ml-1">(${job.equity})</span>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="openJobDetailModal('${job.id}')" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
              Quick View
            </button>
            <button onclick="openApplyModal('${job.id}')" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1">
              Apply <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderTalent() {
    if (!talentContainer) return;

    talentContainer.innerHTML = ENLYST_DATA.vettedTalent.map(talent => `
      <div class="glass-card-interactive p-6 flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-4 mb-3">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <i class="fa-solid fa-shield-check"></i> Enlyst Verified
                </span>
                <span class="text-xs text-slate-400">${talent.codeName}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                ${talent.role}
              </h3>
              <p class="text-sm text-cyan-400 font-medium mt-0.5">
                ${talent.background} • ${talent.experience}
              </p>
            </div>
            <span class="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              ${talent.status}
            </span>
          </div>

          <p class="text-slate-300 text-sm mb-4">
            "${talent.vettedSummary}"
          </p>

          <div class="flex flex-wrap gap-1.5 mb-5">
            ${talent.skills.map(s => `<span class="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/60">${s}</span>`).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 block font-medium">Target Bracket</span>
            <span class="text-sm font-bold text-slate-100">${talent.targetCompensation}</span>
          </div>

          <button onclick="openCandidateIntroModal('${talent.id}')" class="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md transition flex items-center gap-1.5">
            Request Intro <i class="fa-solid fa-lock text-[10px]"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  window.resetJobFilters = function() {
    currentCategory = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    filterBtns.forEach(b => {
      if (b.dataset.category === 'all') {
        b.classList.add('bg-blue-600', 'text-white');
        b.classList.remove('bg-slate-800/60', 'text-slate-300');
      } else {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-800/60', 'text-slate-300');
      }
    });
    renderJobs();
  };
}

/* ==========================================================================
   6. INTERACTIVE HIRING ROI & COMPENSATION CALCULATOR
   ========================================================================== */
function initCalculators() {
  const hiresSlider = document.getElementById('calc-hires-slider');
  const salarySlider = document.getElementById('calc-salary-slider');
  const daysSlider = document.getElementById('calc-days-slider');

  const hiresVal = document.getElementById('calc-hires-val');
  const salaryVal = document.getElementById('calc-salary-val');
  const daysVal = document.getElementById('calc-days-val');

  const outputSavings = document.getElementById('calc-output-savings');
  const outputDays = document.getElementById('calc-output-days');
  const outputHours = document.getElementById('calc-output-hours');

  if (!hiresSlider || !salarySlider || !daysSlider) return;

  function updateCalculator() {
    const hires = parseInt(hiresSlider.value, 10);
    const avgSalary = parseInt(salarySlider.value, 10);
    const currentDays = parseInt(daysSlider.value, 10);

    hiresVal.textContent = `${hires} ${hires === 1 ? 'Hire' : 'Hires'}`;
    salaryVal.textContent = `$${(avgSalary / 1000).toFixed(0)}k`;
    daysVal.textContent = `${currentDays} Days`;

    // Calculation logic:
    // Vacancy Cost per day ~ (Annual Salary * 1.5 multiplier) / 250 working days
    // Enlyst average time is 14 days
    const dailyVacancyLoss = (avgSalary * 1.4) / 250;
    const daysReduced = Math.max(currentDays - 14, 5);
    const totalSavings = Math.round(dailyVacancyLoss * daysReduced * hires * 0.65);
    const engHoursSaved = Math.round(hires * 28); // 28 interview hours saved per role

    if (outputSavings) outputSavings.textContent = `$${totalSavings.toLocaleString()}`;
    if (outputDays) outputDays.textContent = `${daysReduced} Days`;
    if (outputHours) outputHours.textContent = `${engHoursSaved} hrs`;
  }

  hiresSlider.addEventListener('input', updateCalculator);
  salarySlider.addEventListener('input', updateCalculator);
  daysSlider.addEventListener('input', updateCalculator);

  updateCalculator();

  // Calculator Mode Switcher (Employer ROI vs Candidate Benchmark)
  const modeEmployerBtn = document.getElementById('calc-mode-employer');
  const modeCandidateBtn = document.getElementById('calc-mode-candidate');
  const employerView = document.getElementById('calc-view-employer');
  const candidateView = document.getElementById('calc-view-candidate');

  if (modeEmployerBtn && modeCandidateBtn && employerView && candidateView) {
    modeEmployerBtn.addEventListener('click', () => {
      modeEmployerBtn.classList.add('bg-blue-600', 'text-white');
      modeEmployerBtn.classList.remove('bg-slate-800', 'text-slate-300');
      modeCandidateBtn.classList.remove('bg-blue-600', 'text-white');
      modeCandidateBtn.classList.add('bg-slate-800', 'text-slate-300');

      employerView.classList.remove('hidden');
      candidateView.classList.add('hidden');
    });

    modeCandidateBtn.addEventListener('click', () => {
      modeCandidateBtn.classList.add('bg-blue-600', 'text-white');
      modeCandidateBtn.classList.remove('bg-slate-800', 'text-slate-300');
      modeEmployerBtn.classList.remove('bg-blue-600', 'text-white');
      modeEmployerBtn.classList.add('bg-slate-800', 'text-slate-300');

      candidateView.classList.remove('hidden');
      employerView.classList.add('hidden');
    });
  }

  // Candidate Benchmark Dropdown logic
  const benchmarkSelect = document.getElementById('benchmark-role-select');
  if (benchmarkSelect) {
    benchmarkSelect.addEventListener('change', (e) => {
      updateBenchmarkChart(e.target.value);
    });
  }

  function updateBenchmarkChart(roleKey) {
    const dataMap = {
      'ai-staff': { p25: '$230k', p50: '$275k', p75: '$320k', p90: '$380k', equity: '0.35% - 0.90%' },
      'eng-vp': { p25: '$260k', p50: '$310k', p75: '$370k', p90: '$450k', equity: '0.80% - 2.00%' },
      'rust-principal': { p25: '$210k', p50: '$255k', p75: '$295k', p90: '$345k', equity: '0.25% - 0.65%' },
      'quant-dev': { p25: '$250k', p50: '$320k', p75: '$400k', p90: '$520k', equity: 'Discretionary 100%+' }
    };

    const d = dataMap[roleKey] || dataMap['ai-staff'];
    document.getElementById('bench-p25').textContent = d.p25;
    document.getElementById('bench-p50').textContent = d.p50;
    document.getElementById('bench-p75').textContent = d.p75;
    document.getElementById('bench-p90').textContent = d.p90;
    document.getElementById('bench-equity').textContent = d.equity;
    showToast("Compensation benchmarks updated for 2026 tech market");
  }
}

/* ==========================================================================
   7. MODAL & DRAWER SYSTEM
   ========================================================================== */
function initModalSystem() {
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close when clicking on backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });

  // Open Job Detail Modal
  window.openJobDetailModal = function(jobId) {
    const job = ENLYST_DATA.jobs.find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('job-detail-modal');
    if (!modal) return;

    document.getElementById('modal-job-title').textContent = job.title;
    document.getElementById('modal-job-company').textContent = job.company;
    document.getElementById('modal-job-location').textContent = job.location;
    document.getElementById('modal-job-salary').textContent = `${job.salary} • ${job.equity}`;
    document.getElementById('modal-job-desc').textContent = job.description;

    const respContainer = document.getElementById('modal-job-responsibilities');
    if (respContainer) {
      respContainer.innerHTML = job.responsibilities.map(r => `
        <li class="flex items-start gap-2 text-sm text-slate-300 mb-2">
          <i class="fa-solid fa-check text-cyan-400 mt-1 text-xs"></i>
          <span>${r}</span>
        </li>
      `).join('');
    }

    const perksContainer = document.getElementById('modal-job-perks');
    if (perksContainer) {
      perksContainer.innerHTML = job.perks.map(p => `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-200 border border-slate-700">
          <i class="fa-solid fa-sparkles text-amber-400 text-[10px]"></i> ${p}
        </span>
      `).join('');
    }

    const applyBtn = document.getElementById('modal-job-apply-btn');
    if (applyBtn) {
      applyBtn.setAttribute('onclick', `closeModal('job-detail-modal'); openApplyModal('${job.id}')`);
    }

    openModal('job-detail-modal');
  };

  // Open Apply Modal
  window.openApplyModal = function(jobId) {
    const job = ENLYST_DATA.jobs.find(j => j.id === jobId);
    const applyModal = document.getElementById('apply-modal');
    if (!applyModal) return;

    if (job) {
      document.getElementById('apply-modal-target-job').textContent = `Applying for: ${job.title} at ${job.company}`;
    }

    openModal('apply-modal');
  };

  // Open Candidate Intro Modal
  window.openCandidateIntroModal = function(candId) {
    const talent = ENLYST_DATA.vettedTalent.find(t => t.id === candId);
    if (!talent) return;

    const introModal = document.getElementById('intro-modal');
    if (!introModal) return;

    document.getElementById('intro-modal-candidate-name').textContent = `${talent.codeName} - ${talent.role}`;
    document.getElementById('intro-modal-skills').textContent = talent.skills.join(', ');

    openModal('intro-modal');
  };

  // Simulated Resume Upload Dropzone
  const dropzone = document.getElementById('resume-dropzone');
  const fileInput = document.getElementById('resume-file-input');
  const dropzoneText = document.getElementById('resume-dropzone-text');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('border-blue-500', 'bg-blue-500/10');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('border-blue-500', 'bg-blue-500/10');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-blue-500', 'bg-blue-500/10');
      if (e.dataTransfer.files.length) {
        handleFileUpload(e.dataTransfer.files[0].name);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        handleFileUpload(e.target.files[0].name);
      }
    });

    function handleFileUpload(fileName) {
      if (dropzoneText) {
        dropzoneText.innerHTML = `
          <i class="fa-solid fa-file-circle-check text-emerald-400 text-3xl mb-2"></i>
          <p class="text-sm font-semibold text-slate-100">${fileName}</p>
          <span class="text-xs text-emerald-400">Ready for instant confidential AI parsing</span>
        `;
      }
      showToast(`Resume attached: ${fileName}`);
    }
  }

  // Handle Form Submissions with Toast Feedback
  const applyForm = document.getElementById('job-apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('apply-modal');
      showToast("🚀 Application submitted successfully! An Enlyst talent partner will connect in < 24 hours.");
      applyForm.reset();
    });
  }

  const consultForm = document.getElementById('consultation-form');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('consultation-modal');
      showToast("📅 Briefing booked! Executive invitation dispatched to your calendar.");
      consultForm.reset();
    });
  }

  const introForm = document.getElementById('intro-request-form');
  if (introForm) {
    introForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('intro-modal');
      showToast("🔒 Candidate introduction dossier sent under bilateral confidentiality.");
      introForm.reset();
    });
  }
}

/* ==========================================================================
   8. LIVE TICKER
   ========================================================================== */
function initLiveTicker() {
  const tickerContainer = document.getElementById('live-ticker-items');
  if (!tickerContainer) return;

  const events = [
    "🚀 Staff AI Scientist placed at Series B AI Leader • $310k + Equity",
    "🎯 VP of Engineering accepted offer in NYC • 12 Days to Close",
    "⚡ Principal Rust Systems Architect matched at Global Mesh • Remote",
    "💼 Head of Product Design secured with Tier-1 Venture Fund portfolio",
    "🏆 98.4% 2-Year Placement Retention benchmark maintained",
    "🛡️ 14 Confidential Executive Searches initiated this week"
  ];

  // Repeat items for smooth infinite loop
  const html = [...events, ...events].map(item => `
    <span class="inline-flex items-center gap-2 mx-6 text-xs text-slate-300 font-medium">
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
      ${item}
    </span>
  `).join('');

  tickerContainer.innerHTML = html;
}

/* ==========================================================================
   9. MOBILE NAVIGATION & DRAWER
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileToggle.innerHTML = `<i class="fa-solid fa-bars text-xl"></i>`;
      } else {
        mobileMenu.classList.remove('hidden');
        mobileToggle.innerHTML = `<i class="fa-solid fa-xmark text-xl"></i>`;
      }
    });

    // Close when clicking nav links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.innerHTML = `<i class="fa-solid fa-bars text-xl"></i>`;
      });
    });
  }
}

/* ==========================================================================
   10. SMOOTH SCROLLING HELPER
   ========================================================================== */
function initSmoothScroll() {
  window.scrollToSection = function(sectionId) {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hero Quick Search function
  window.executeHeroSearch = function() {
    const roleInput = document.getElementById('hero-search-role');
    const deptSelect = document.getElementById('hero-search-dept');
    const query = roleInput ? roleInput.value : '';

    scrollToSection('opportunities');

    setTimeout(() => {
      const jobInput = document.getElementById('job-search-input');
      if (jobInput) {
        jobInput.value = query;
        jobInput.dispatchEvent(new Event('input'));
      }
    }, 400);
  };
}

/* ==========================================================================
   11. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-cyan-400 text-lg"></i>
    <span class="text-sm font-medium text-slate-100">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
