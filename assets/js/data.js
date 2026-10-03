/**
 * Enlyst Recruitment Platform Data Engine
 * Mock data for jobs, talent profiles, salary benchmarks, and case studies
 */

const ENLYST_DATA = {
  stats: {
    retentionRate: "98.4%",
    avgHireDays: "14 Days",
    talentNetworkCount: "45,000+",
    clientCount: "500+",
    salaryBenchmarked: "$180M+"
  },

  jobs: [
    {
      id: "job-101",
      title: "Staff AI Research Engineer (LLMs)",
      company: "CognitiveScale AI",
      department: "AI / Machine Learning",
      category: "tech",
      location: "San Francisco, CA (Hybrid / Remote Option)",
      type: "Full-Time",
      salary: "$240,000 - $310,000",
      equity: "0.25% - 0.75%",
      experience: "8+ Years",
      tags: ["PyTorch", "vLLM", "Distributed Training", "CUDA", "LangChain"],
      featured: true,
      postedDaysAgo: 1,
      matchScore: 98,
      description: "Leading the pre-training and fine-tuning architecture for multi-modal reasoning models with over 70B parameters.",
      perks: ["$10,000 Home Office Stipend", "Unlimited PTO", "Full Premium Healthcare", "Annual Tech Retreat in Aspen"],
      responsibilities: [
        "Design scalable distributed pre-training clusters using Ray and Megatron-LM",
        "Implement innovative alignment techniques (RLHF / DPO / Constitutional AI)",
        "Collaborate directly with the CTO and founding research team to deliver production foundation models"
      ]
    },
    {
      id: "job-102",
      title: "VP of Product Engineering",
      company: "Aether FinTech",
      department: "Executive & Leadership",
      category: "executive",
      location: "New York, NY (Hybrid)",
      type: "Full-Time",
      salary: "$280,000 - $360,000",
      equity: "1.0% - 2.2%",
      experience: "12+ Years",
      tags: ["Executive", "Fintech", "Org Scaling", "Architecture", "SOC2"],
      featured: true,
      postedDaysAgo: 2,
      matchScore: 96,
      description: "Scale a high-velocity engineering organization from 35 to 110+ engineers while maintaining 99.999% uptime for core banking rails.",
      perks: ["Executive Car Allowance", "Full Family Medical/Dental/Vision", "401k 6% Match", "Equity Acceleration"],
      responsibilities: [
        "Oversee core infrastructure, payment ledger systems, and customer-facing mobile apps",
        "Institute rigorous engineering career ladders, mentorship, and OKR frameworks",
        "Direct annual tech budgeting and cloud architecture strategy with AWS and Snowflake"
      ]
    },
    {
      id: "job-103",
      title: "Principal Distributed Systems Architect",
      company: "HyperMesh Cloud",
      department: "Cloud & Infrastructure",
      category: "tech",
      location: "Remote (Global)",
      type: "Full-Time",
      salary: "$220,000 - $290,000",
      equity: "0.4% - 0.9%",
      experience: "10+ Years",
      tags: ["Rust", "Go", "Kubernetes", "eBPF", "Kafka"],
      featured: false,
      postedDaysAgo: 3,
      matchScore: 95,
      description: "Architecting the next-generation global edge-routing mesh processing over 12 million transactions per second.",
      perks: ["Work from Anywhere", "$3,500 Learning Budget", "Wellness Reimbursement", "Quarterly Bonuses"],
      responsibilities: [
        "Author low-latency data ingestion engines in Rust and Go with sub-millisecond p99 guarantees",
        "Pioneer zero-trust networking topology across multi-cloud regions",
        "Conduct architectural review councils across 6 cross-functional squads"
      ]
    },
    {
      id: "job-104",
      title: "Head of Growth & Performance Marketing",
      company: "Lumina Health",
      department: "Product & Growth",
      category: "marketing",
      location: "Austin, TX (Remote Eligible)",
      type: "Full-Time",
      salary: "$190,000 - $250,000",
      equity: "0.5% - 1.2%",
      experience: "7+ Years",
      tags: ["Growth Marketing", "B2B SaaS", "Attribution", "PLG", "Analytics"],
      featured: false,
      postedDaysAgo: 2,
      matchScore: 93,
      description: "Drive customer acquisition, lifecycle retention, and viral loops for an AI-powered preventative healthcare suite.",
      perks: ["Comprehensive Health Concierge", "Flexible Hours", "Parental Leave 16 Weeks", "Annual Performance Bonus"],
      responsibilities: [
        "Manage a $1.5M/quarter omni-channel acquisition budget with strict CAC/LTV targets",
        "Deploy advanced data attribution pipelines linking paid channels to customer lifetime value",
        "Build and mentor a high-energy team of performance marketers and growth copywriters"
      ]
    },
    {
      id: "job-105",
      title: "Senior Quantitative Developer (Low Latency)",
      company: "Apex Citadel Capital",
      department: "Quantitative Finance",
      category: "finance",
      location: "Chicago, IL (On-site)",
      type: "Full-Time",
      salary: "$260,000 - $350,000 + Bonus",
      equity: "Discretionary PnL Bonus (up to 150%)",
      experience: "6+ Years",
      tags: ["C++20", "FPGA", "Kernel Bypass", "Market Data", "Linux"],
      featured: true,
      postedDaysAgo: 4,
      matchScore: 97,
      description: "Engineered ultra-low latency exchange gateways and market feed handlers operating at sub-microsecond intervals.",
      perks: ["On-site Gourmet Chef", "Top-tier Performance Bonuses", "State-of-the-Art Dual 4K Workstations", "Comprehensive Relocation Package"],
      responsibilities: [
        "Optimize C++20 execution algorithms with lockless data structures and cache-conscious design",
        "Profile kernel bypass frameworks (Solarflare OpenOnload, DPDK)",
        "Collaborate with quant researchers to backtest and deploy alpha strategies in real time"
      ]
    },
    {
      id: "job-106",
      title: "Director of Brand & Product Design",
      company: "Veritas Creative Labs",
      department: "Product & Design",
      category: "design",
      location: "San Francisco / Hybrid",
      type: "Full-Time",
      salary: "$195,000 - $245,000",
      equity: "0.3% - 0.8%",
      experience: "8+ Years",
      tags: ["Figma", "Design Systems", "Brand Strategy", "Motion UI", "User Research"],
      featured: false,
      postedDaysAgo: 5,
      matchScore: 92,
      description: "Harmonize the digital product experience and holistic brand identity for an enterprise software platform with 2M DAU.",
      perks: ["Art & Innovation Fund", "Annual Design Conference Passes", "Equinox Gym Membership", "Flexible Work"],
      responsibilities: [
        "Unify cross-platform design languages spanning Web, iOS, macOS, and Android",
        "Lead a boutique design studio within the company composed of 8 senior product designers",
        "Evangelize human-centered accessibility and emotive micro-interactions"
      ]
    }
  ],

  vettedTalent: [
    {
      id: "cand-701",
      codeName: "Candidate #E-892",
      role: "Lead Machine Learning Architect",
      seniority: "Staff / Principal Level",
      background: "Ex-Google Brain, Stanford MS in CS",
      experience: "9 Years Experience",
      domain: "Generative AI, Distributed LLM Inference",
      location: "San Francisco, CA (Open to Remote)",
      status: "Available in 2 Weeks",
      verified: true,
      skills: ["PyTorch", "Triton", "CUDA Optimization", "Megatron-LM", "Python"],
      vettedSummary: "Built and open-sourced an inference engine saving 40% memory latency. Successfully led a team of 7 ML researchers. Stellar references.",
      targetCompensation: "$300K - $360K total comp"
    },
    {
      id: "cand-702",
      codeName: "Candidate #E-744",
      role: "Chief Technology Officer / VP Eng",
      seniority: "Executive C-Level",
      background: "Scaled Series A to Unicorn Exit ($1.2B)",
      experience: "16 Years Experience",
      domain: "Enterprise SaaS, FinTech, High-Availability Systems",
      location: "New York, NY",
      status: "Actively Reviewing Opportunities",
      verified: true,
      skills: ["Executive Strategy", "P&L Management", "Kubernetes", "AWS Architecture", "Culture"],
      vettedSummary: "Seasoned engineering leader with 2 proven exits. Re-architected monolithic legacy systems to microservices while doubling engineering headcount.",
      targetCompensation: "$350K - $420K base + equity"
    },
    {
      id: "cand-703",
      codeName: "Candidate #E-618",
      role: "Principal High-Frequency C++ Developer",
      seniority: "Principal Quant Engineer",
      background: "Tier-1 Proprietary Trading Firm",
      experience: "11 Years Experience",
      domain: "Low Latency Execution, Linux Kernel Tuning, Market Feeds",
      location: "Chicago / New York / Remote",
      status: "Discreet Search",
      verified: true,
      skills: ["Modern C++ (20/23)", "FPGA", "Network Sockets", "Lock-free", "Optimization"],
      vettedSummary: "Specialized in ultra-low latency routing. Reduced order latency from 3.2μs to 820ns. Strong mathematical intuition and flawless track record.",
      targetCompensation: "$380K - $500K package"
    },
    {
      id: "cand-704",
      codeName: "Candidate #E-512",
      role: "Head of Growth & Product Marketing",
      seniority: "Director / VP Level",
      background: "Led Growth at 2 YC Top 100 Companies",
      experience: "8 Years Experience",
      domain: "B2B SaaS, Product-Led Growth, Enterprise Conversion",
      location: "Austin, TX (Remote)",
      status: "Ready for Q4 Transition",
      verified: true,
      skills: ["PLG Loops", "Revenue Operations", "Mixpanel", "Cohort Analysis", "Campaign Strategy"],
      vettedSummary: "Spearheaded 0 to $22M ARR growth trajectory within 3 years. Expert in balancing organic inbound funnels with high-touch enterprise outbound.",
      targetCompensation: "$220K - $275K base + equity"
    }
  ],

  caseStudies: [
    {
      client: "HyperScale AI",
      badge: "Series B • Generative AI",
      headline: "Assembling a World-Class AI Research Team in 21 Days",
      challenge: "HyperScale was bottlenecked by a 4-month inability to hire specialized PhD-level LLM alignment researchers in the Bay Area competitive market.",
      solution: "Enlyst leveraged proprietary passive talent mapping and technical peer-vetting to screen 140 specialists, shortlisting 8 hyper-qualified finalists in 6 days.",
      outcome: "6 offers made, 6 offers accepted. Time-to-fill compressed by 78%. Zero counter-offer dropouts.",
      metrics: [
        { label: "Days to First Shortlist", value: "6 Days" },
        { label: "Acceptance Rate", value: "100%" },
        { label: "Positions Closed", value: "6 PhD Hires" }
      ]
    },
    {
      client: "Strata Global FinTech",
      badge: "Public Tech • $4B Market Cap",
      headline: "Recruiting an Elite VP of Engineering for Core Infrastructure",
      challenge: "Required a confidential executive search for an engineering head to lead 120 developers across 3 international time zones with strict regulatory compliance.",
      solution: "Conducted discreet headhunting targeting proven leaders across Tier-1 institutions, handling all NDA vetting and cultural compatibility scoring.",
      outcome: "Identified and secured the ideal candidate within 28 days. Retention intact after 24 months with 0 executive attrition.",
      metrics: [
        { label: "Search Duration", value: "28 Days" },
        { label: "Candidate Retention", value: "100% (2+ Yrs)" },
        { label: "Org Growth", value: "+45 Engineers" }
      ]
    },
    {
      client: "Quantum Data Systems",
      badge: "Early Stage • Seed to Series A",
      headline: "Building the Entire Founding Engineering Core",
      challenge: "Founder needed to hire their first 4 core engineers (Frontend, Distributed Backend, DevOps, Product Lead) to ship MVP within 90 days.",
      solution: "Enlyst acted as an embedded fractional talent partner, calibrating compensation packages, equity structuring, and technical interview stages.",
      outcome: "All 4 founding hires deployed in 40 days. MVP launched on schedule, securing an oversubscribed $14M Series A round.",
      metrics: [
        { label: "Total Hires", value: "4 Founding Engineers" },
        { label: "Series A Secured", value: "$14 Million" },
        { label: "Founding Velocity", value: "40 Days Total" }
      ]
    }
  ],

  marketTrends: [
    { skill: "Large Language Models & Fine-Tuning", growth: "+168%", avgSalary: "$265,000", urgency: "Critical" },
    { skill: "Distributed Systems (Rust / Go)", growth: "+84%", avgSalary: "$235,000", urgency: "High" },
    { skill: "AI Safety, Eval & Alignment", growth: "+210%", avgSalary: "$280,000", urgency: "Extreme" },
    { skill: "Low-Latency C++ / Kernel Optimization", growth: "+62%", avgSalary: "$310,000", urgency: "High" },
    { skill: "Product-Led Growth (B2B SaaS)", growth: "+49%", avgSalary: "$210,000", urgency: "Moderate" }
  ],

  testimonials: [
    {
      quote: "Enlyst is unlike any recruiting agency we've ever engaged with. They didn't spam us with hundreds of resumes. They presented four candidates; all four were so exceptional that we ended up hiring two.",
      author: "Elena Rostova",
      title: "Co-Founder & Chief Technology Officer",
      company: "Synthetix Labs",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "As a candidate, Enlyst gave me the most transparent, respectful experience of my entire career. They negotiated a 35% higher equity package than I anticipated and stayed in touch long after I started.",
      author: "Marcus Vance",
      title: "Staff Distributed Systems Engineer",
      company: "Placed at CloudVector",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Their precision vetting saved our engineering managers over 60 hours of wasted screening calls. If you're building a tier-one engineering team, Enlyst is the only recruiting partner worth calling.",
      author: "David Chen",
      title: "VP of People & Talent",
      company: "Nexus FinTech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  ]
};
