// =============================================================================
// SITE DATA & PAGE COMPOSITION
//
// HOW TO MAINTAIN
// ---------------
//   - To add or remove a publication / talk / project: edit the `publications`
//     array. Each entry is an independent object. Fields are open - add new
//     ones freely; views render what they recognize and ignore the rest.
//
//   - To add or remove a non-publication record (honour, scholarship, teaching
//     stint, service role, ...): edit the `entries` array. Same open-field
//     contract as publications.
//
//   - To change which views appear and in what order: edit the `sections`
//     array. Each entry is `{ view, config }`. Multiple instances of the
//     same view are fine (e.g. two simple lists for Publications and Talks).
//
//   - To add a brand-new view type: drop a module in `scripts/views/` and
//     register it in `scripts/app.js`. Then reference it from `sections`.
//
//   - To change the profile / hero content: edit `profile`.
// =============================================================================

// Profile fields: `name`, `intro`, `photo`, and `links` are required.
// Everything else (`affiliation`, `email`) is optional and defaults to null -
// when null/undefined, the hero simply doesn't render that line.
//
// Naming convention: the hero / topbar / footer use `Yang Pei` (set here as
// `profile.name`). Every author list in publications below uses `Pei Yang`.
export const profile = {
  name: 'Yang Pei',
  // Inline links use markdown-style [label](url); they're parsed in hero.js.
  intro: `I'm a third-year PhD student at [Show Lab](https://sites.google.com/view/showlab), National University of Singapore, advised by [Prof. Mike Shou](https://scholar.google.com/citations?user=h1-3lSoAAAAJ). Before NUS, I did my undergraduate studies at [Glasgow College, UESTC](https://www.gla.uestc.edu.cn/english/Home.htm), majoring in Electrical and Electronic Engineering. I've been working on GenAI safety and watermarking, GUI agents, and video post-training, and more recently on embodied AI.`,
  photo: 'assets/portrait.jpg',

  // Optional - set to null to omit.
  affiliation: 'PhD Student, School of Computing, National University of Singapore',
  email: 'yangpei@u.nus.edu',

  // Buttons rendered in the hero. Email is intentionally NOT in here - it's
  // shown above as plain text. Drop `kind: 'primary'` to make a link a ghost.
  links: [
    { label: 'CV',             href: 'assets/cv.pdf',                                          kind: 'primary' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=eBvav_0AAAAJ', kind: 'ghost'   },
  ],
};

// -----------------------------------------------------------------------------
// Recognized publication fields (any may be omitted):
//   id        unique string for in-page anchors
//   title     string
//   authors   [{ name, self?, coFirst? }]
//   tldr      single-sentence summary
//   abstract  multi-sentence summary
//   keywords  [string]   - drives the Topic Atlas
//   venue     short string like "NeurIPS 2025"
//   figure    path to image (used by the complex view)
//   links     [{ label, href }]
//   sections  [string]   - used by section filters in `sections` below
//
// Listed in forward chronological order (oldest first).
// Any extra keys are preserved and available to custom views.
// -----------------------------------------------------------------------------
export const publications = [
  // ============================== 2024 ==============================
  {
    id: 'ringid',
    title: 'RingID: Rethinking Tree-Ring Watermarking for Enhanced Multi-Key Identification',
    authors: [
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Yiren Song',                   coFirst: true },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: "Theoretically unveiling diffusion latent watermarking's vulnerability, with simple fixes.",
    keywords: ['Watermarking', 'Diffusion', 'Signal Analysis'],
    venue: 'ECCV 2024',
    figure: 'assets/fig-01.svg',
    links: [
      { label: 'Paper',        href: 'https://arxiv.org/abs/2404.14055' },
      { label: 'Project Page', href: 'https://sites.google.com/view/ringid2?usp=sharing' },
      { label: 'Code',         href: 'https://github.com/showlab/RingID' },
    ],
    sections: ['publications'],
  },
  {
    id: 'simple-averaging',
    title: 'Can Simple Averaging Defeat Modern Watermarks?',
    authors: [
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Yiren Song'                                  },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: 'Yes, it can, and even for diffusion latent domain watermarking methods.',
    keywords: ['Watermarking', 'Diffusion'],
    venue: 'NeurIPS 2024',
    links: [
      { label: 'Paper',        href: 'https://proceedings.neurips.cc/paper_files/paper/2024/file/67b2e2e895380fa6acd537c2894e490e-Paper-Conference.pdf' },
      { label: 'Presentation', href: 'https://neurips.cc/virtual/2024/poster/94798' },
      { label: 'Code',         href: 'https://github.com/showlab/watermark-steganalysis' },
    ],
    sections: ['publications'],
  },

  // ============================== 2025 ==============================
  {
    id: 'idprotector',
    title: 'IDProtector: An Adversarial Noise Encoder to Protect Against ID-Preserving Image Generation',
    authors: [
      { name: 'Yiren Song',                   coFirst: true },
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Hai Ci'                                      },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: 'A model that imperceptibly perturbs an image within 1 second, robustly protecting the portrait from being used for identity-preserving re-generation.',
    keywords: ['ID-Preserving Generation', 'Diffusion', 'Adversarial Attacks', 'ViT Pretraining'],
    venue: 'CVPR 2025',
    links: [
      { label: 'Paper', href: 'https://openaccess.thecvf.com/content/CVPR2025/papers/Song_IDProtector_An_Adversarial_Noise_Encoder_to_Protect_Against_ID-Preserving_Image_CVPR_2025_paper.pdf' },
      { label: 'Code',  href: 'https://github.com/showlab/IDProtector' },
    ],
    sections: ['publications'],
  },
  {
    id: 'rethinking-defense',
    title: 'Rethinking Defense for Computer-Use Agents: Context Deception Attacks are Simple to Defend',
    authors: [
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Mike Zheng Shou'                             },
    ],
    keywords: ['GUI Agent', 'Safety'],
    venue: '2025',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2503.09241' },
    ],
    sections: ['publications'],
  },
  {
    id: 'macosworld',
    title: 'macOSWorld: A Multilingual Interactive Benchmark for GUI Agents',
    authors: [
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: 'Facilitates realistic computer-use agent benchmarking and rewarding, already deployed by Tencent Singapore.',
    keywords: ['Computer-Use Agent', 'AWS EC2', 'VMware', 'AppleScript', 'Safety'],
    venue: 'NeurIPS 2025',
    figure: 'assets/fig-02.svg',
    links: [
      { label: 'Paper',        href: 'https://arxiv.org/abs/2506.04135' },
      { label: 'Presentation', href: 'https://neurips.cc/virtual/2025/loc/san-diego/poster/117427' },
      { label: 'Project Page', href: 'https://macos-world.github.io/' },
      { label: 'Code',         href: 'https://github.com/showlab/macosworld' },
    ],
    sections: ['publications'],
  },
  {
    id: 'wmadapter',
    title: 'WmAdapter: Adding Watermark Control to Latent Diffusion Models',
    authors: [
      { name: 'Hai Ci'                       },
      { name: 'Yiren Song'                   },
      { name: 'Pei Yang',        self: true  },
      { name: 'Jinheng Xie'                  },
      { name: 'Mike Zheng Shou'              },
    ],
    tldr: 'Add various watermarks during VAE decoding by inserting a LoRA into the VAE.',
    keywords: ['Watermarking', 'Diffusion'],
    venue: 'ICML 2025',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2406.08337' },
    ],
    sections: ['publications'],
  },
  {
    id: 'x-humanoid',
    title: 'X-Humanoid: Robotize Human Videos to Generate Humanoid Videos at Scale',
    authors: [
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Yiren Song'                                  },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: 'Human video input, humanoid video output, with consistent actions and background.',
    keywords: ['Video Post-Training', 'Unreal Engine'],
    venue: '2025',
    figure: 'assets/fig-03.svg',
    links: [
      { label: 'Paper',        href: 'https://www.arxiv.org/abs/2512.04537' },
      { label: 'Project Page', href: 'https://showlab.github.io/X-Humanoid/' },
      { label: 'Presentation', href: 'https://www.youtube.com/watch?v=oHkZOMZamGY' },
      { label: 'Post',         href: 'https://x.com/MikeShou1/status/1999332606966661202' },
    ],
    sections: ['publications'],
  },
  {
    id: 'h2r-grounder',
    title: 'H2R-Grounder: A Paired-Data-Free Paradigm for Translating Human Interaction Videos into Physically Grounded Robot Videos',
    authors: [
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Xiaokang Liu',                 coFirst: true },
      { name: 'Pei Yang',         self: true                },
      { name: 'Yiren Song'                                  },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: 'Human arm video → robot arm video; trained without paired data.',
    keywords: ['Video Post-Training', 'Robotics'],
    venue: '2025',
    links: [
      { label: 'Paper',        href: 'https://www.arxiv.org/abs/2512.09406' },
      { label: 'Project Page', href: 'https://showlab.github.io/H2R-Grounder/' },
    ],
    sections: ['publications'],
  },

  // ============================== 2026 ==============================
  {
    id: 'diffseg30k',
    title: 'DiffSeg30k: A Multi-Turn Diffusion Editing Benchmark for Localized AIGC Detection',
    authors: [
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Ziheng Peng',                  coFirst: true },
      { name: 'Pei Yang',         self: true                },
      { name: 'Yingxin Xuan'                                },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: "A segmentation formulation greatly facilitates AIGC detector's generalisation capability.",
    keywords: ['AIGC Detection', 'Diffusion', 'Forensics'],
    venue: '2026',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2511.19111' },
    ],
    sections: ['publications'],
  },
  {
    id: 'omnihumanoid',
    title: 'OmniHumanoid: Decoupled Human-to-Robot Video Generation with Paired-Free Adaptation',
    authors: [
      { name: 'Yiren Song',                   coFirst: true },
      { name: 'Xiyao Deng',                   coFirst: true },
      { name: 'Pei Yang',         self: true                },
      { name: 'Yihan Wang'                                  },
      { name: 'Mike Zheng Shou'                             },
    ],
    keywords: ['Video Post-Training', 'Robotics'],
    venue: '2026',
    links: [],
    sections: ['publications'],
  },
  {
    id: 'uenr-600k',
    title: 'UENR-600K: A Large-Scale Physically Grounded Dataset for Nighttime Video Deraining',
    authors: [
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Beibei Lin'                                  },
      { name: 'Yiren Song'                                  },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: 'A new video nightrain dataset; a new SOTA method based on Wan 2.2 in-context.',
    keywords: ['Video Post-Training', 'Robotics', 'Unreal Engine'],
    venue: '2026',
    links: [
      { label: 'Paper',        href: 'https://arxiv.org/abs/2604.04402' },
      { label: 'Project Page', href: 'https://showlab.github.io/UENR-600K/' },
    ],
    sections: ['publications'],
  },
  {
    id: 'actionmap',
    title: 'ActionMap: Robot Policy Learning via Voxel Action Heatmap',
    authors: [
      { name: 'Pei Yang',         self: true, coFirst: true },
      { name: 'Hai Ci',                       coFirst: true },
      { name: 'Yanzhe Chen'                                 },
      { name: 'Qi Lv'                                       },
      { name: 'Han Cai'                                     },
      { name: 'Mike Zheng Shou'                             },
    ],
    tldr: 'Using probability heatmaps at VLA outputs brings free-lunch data efficiency and performance improvement.',
    keywords: ['Robotic Manipulation', 'VLA', 'Franka'],
    venue: '2026',
    links: [],
    sections: ['publications'],
  },

  // ============================== Talks ==============================
  {
    id: 'tutorial-video-diffusion',
    title: 'Tutorial: Video Diffusion Models',
    authors: [
      { name: 'Mike Zheng Shou'              },
      { name: 'Pei Yang',         self: true },
      { name: 'Jay Wu'                       },
    ],
    venue: 'Tutorial\nNov 2023',
    links: [
      { label: 'Video',  href: 'https://www.youtube.com/watch?v=0K56LA821ys' },
      { label: 'Slides', href: 'https://www.dropbox.com/scl/fi/u7jgodz3tz01bzd5uftog/Video-Diffusion-Tutorial-Prof-Mike-Shou-NUS-2023-Dec-15.pdf?rlkey=de6axl9dnjhz1ub0wmpwmpq4f&e=1&dl=0' },
    ],
    sections: ['talks'],
  },
  {
    id: 'talk-watermarking',
    title: 'Digital Watermarking in the Diffusion Era',
    authors: [{ name: 'Pei Yang', self: true }],
    venue: 'NUS School of Computing Media Lunch Talk\nSep 2024',
    links: [
      { label: 'Slides', href: 'https://drive.google.com/file/d/1qq7vkG7wjLkEWTUKrDtYCbJjs0hGqrND/view?usp=drive_link' },
    ],
    sections: ['talks'],
  },
  {
    id: 'talk-tencent-macosworld',
    title: 'macOSWorld and Rewarding Environment for Computer-Use Agents',
    authors: [{ name: 'Pei Yang', self: true }],
    venue: 'Tencent Singapore\nApr 2026',
    links: [],
    sections: ['talks'],
  },
];

// -----------------------------------------------------------------------------
// Recognized entry fields (any may be omitted):
//   text     bold main text         e.g. "Wuliangye Scholarship"
//   comment  italic gray subtext    e.g. "UESTC (0.25%)"
//   year     right-aligned tag      number or string, rendered like a venue
//   sections [string]   - used by section filters in `sections` below
//
// Listed in forward chronological order (oldest first), like publications.
// Any extra keys are preserved and available to custom views.
// -----------------------------------------------------------------------------
export const entries = [
  // ============================== Honours & Scholarships ==============================
  // 2020
  { text: 'Wuliangye Scholarship',                       comment: 'UESTC (0.25%)',               year: 2020, sections: ['honours'] },
  { text: 'Academic (Half-Tuition) Scholarship',         comment: 'Glasgow College UESTC (6%)',  year: 2020, sections: ['honours'] },
  { text: 'Outstanding Student Scholarship (1st Class)', comment: 'UESTC (10%)',                 year: 2020, sections: ['honours'] },
  { text: 'James Watt Scholarship of Innovation',        comment: 'Glasgow College UESTC (6%)',  year: 2020, sections: ['honours'] },
  // 2021
  { text: 'Academic (Half-Tuition) Scholarship',         comment: 'Glasgow College UESTC (6%)',  year: 2021, sections: ['honours'] },
  { text: 'Outstanding Student Scholarship (1st Class)', comment: 'UESTC (10%)',                 year: 2021, sections: ['honours'] },
  // 2022
  { text: 'Academic (Half-Tuition) Scholarship',         comment: 'Glasgow College UESTC (6%)',  year: 2022, sections: ['honours'] },
  { text: 'Outstanding Student Scholarship (1st Class)', comment: 'UESTC (10%)',                 year: 2022, sections: ['honours'] },
  { text: 'Suzhou Industrial Zone Scholarship',          comment: 'UESTC (1%)',                  year: 2022, sections: ['honours'] },
  { text: 'James Watt Scholarship of Innovation',        comment: 'Glasgow College UESTC (6%)',  year: 2022, sections: ['honours'] },
  // 2023
  { text: 'Sichuan Provincial Outstanding Graduate (四川省优秀本科毕业生)',                         year: 2023, sections: ['honours'] },
  // 2025
  { text: 'NeurIPS 2025 Top Reviewer',                                                            year: 2025, sections: ['honours'] },

  // ============================== Teaching ==============================
  { text: 'UESTC1005 Introductory Programming',           comment: 'Prof Ahmed Zoha',                            year: 2022, sections: ['teaching'] },
  { text: 'UESTC3010 Team Design Project and Skills',     comment: 'Prof Wasim Ahmad',                           year: 2023, sections: ['teaching'] },
  { text: 'CS1010 Programming Methodology',               comment: 'Prof Zhao Jin, 20h lecturing',               year: 2024, sections: ['teaching'] },
  { text: 'GEI1000 Computational Thinking',               comment: 'Prof Leow Wee Kheng, 72h lecturing',         year: 2024, sections: ['teaching'] },
  { text: 'CS4243 Computer Vision & Pattern Recognition', comment: 'Prof Amirhassan Monajemi, 40h lecturing',    year: 2025, sections: ['teaching'] },
];

// -----------------------------------------------------------------------------
// PAGE COMPOSITION
// The page is rendered by walking this list. Reorder entries to reorder
// the page; add multiple instances of the same view if useful.
// -----------------------------------------------------------------------------
export const sections = [
  { view: 'hero', config: {} },

  {
    view: 'publication-list-simple',
    config: {
      id: 'publications',
      title: 'Publications',
      filter: (p) => p.sections?.includes('publications'),
    },
  },

  {
    view: 'publication-list-simple',
    config: {
      id: 'talks',
      title: 'Talks',
      filter: (p) => p.sections?.includes('talks'),
      density: 'compact',
    },
  },

  {
    view: 'entry-list',
    config: {
      id: 'teaching',
      title: 'Teaching',
      filter: (e) => e.sections?.includes('teaching'),
    },
  },

  {
    view: 'entry-list',
    config: {
      id: 'honours',
      title: 'Honours & Scholarships',
      filter: (e) => e.sections?.includes('honours'),
    },
  },

  {
    view: 'footer',
    config: {
      lastUpdated: '2026-05-09',
    },
  },
];
