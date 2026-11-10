export interface PromptTemplate {
  id: string;
  number: string;
  category: 'Kinetic Type' | 'Hand-Drawn' | 'Screen and UI' | 'Data' | 'Talking Head' | 'Illustrated';
  title: string;
  shortDescription: string;
  howItExplains: string;
  defaultTopic: string;
  tags: string[];
  customPromptTemplate?: string;
  voiceoverPrompt?: string;
  noVoiceoverPrompt?: string;
}

export const DEFAULT_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'creator-motion-graphics',
    number: '#01',
    category: 'Kinetic Type',
    title: 'Creator Motion Graphics',
    shortDescription:
      'The high-energy business-creator edit: huge condensed caps slamming in word by word, a yellow serif accent on the one word that matters, highlighter swipes, hand-drawn circles and arrows, tilted browser and phone mockups, rolling green counters, film grain and light leaks on near-black.',
    howItExplains:
      'Every idea gets its own beat: words land on the beat with punch zooms and shake, the wrong idea gets a red strike and a stamp, proof appears as code-drawn mockups, the key number rolls up and locks with a boom, and whip pans, RGB glitches and flash cuts carry you between scenes.',
    defaultTopic: 'How to land your first client with AI automations',
    tags: ['Kinetic Type', 'High Energy', 'Dark Mode'],
    voiceoverPrompt: 'With Voiceover: Punchy spoken narration script. Pacing must strictly anchor visual beats—words hit synchronously as the speaker utters them.',
    noVoiceoverPrompt: 'No Voiceover: High-octane sound effects mix only (risers, heavy boom impacts, paper slides, click transients, camera shutters, bass drops). Zero spoken speech.',
    customPromptTemplate: `You are a master motion graphic designer specialized in high-retention YouTube creator animations (Iman Gadzhi / Ali Abdaal / Vox style).

CONCEPT & TOPIC:
"{{topic}}"

ART DIRECTION & STYLE BLUEPRINT: #01 Creator Motion Graphics
- Background: Near-black (#121214) with subtle 35mm film grain, occasional 4% warm light leak in upper corners.
- Typography: Huge ultra-bold condensed uppercase headers (Impact / Anton / Montserrat Black) slamming word-by-word into frame.
- Color Highlights: Key focal word highlighted in italicized yellow serif (Fraunces or Instrument Serif #facc15).
- Graphical Accents: Red strike-through lines (#d63f35) on disproven claims, hand-drawn chalk/pencil arrows, glowing green rolling counter numbers (#22c55e), tilted browser frames with 12° isometric tilt.

EXPLANATION MECHANICS:
{{howItExplains}}

AUDIO & NARRATION:
{{audioDirection}}

STORYBOARD PROTOCOL:
{{storyboardProtocol}}

OUTPUT DELIVERABLE:
1. Scene-by-Scene Timeline (0s to 30s) detailing word-slam timings and visual effects.
2. SFX Cues (whoosh, pop, sub-bass hit, typewriter clicks).
3. Complete implementation code (Remotion component or Canvas animation script) ready to render at 60fps.`
  },
  {
    id: 'chalk-talk',
    number: '#02',
    category: 'Hand-Drawn',
    title: 'Chalk Talk',
    shortDescription:
      'A teacher at a long green slate: grainy chalk strokes that skip over the board’s tooth, colored chalk for emphasis, dust falling from tapped erasers, and organic hand-drawn diagrams that build up step by step.',
    howItExplains:
      'Concepts unfold as live blackboard sketches: axes draw with audible chalk squeaks, exponential growth curves surge upward with highlighted milestone circles, formulas expand organically with chalk brackets, and key takeaways are boxed in pastel yellow and pink.',
    defaultTopic: 'The compounding math behind 1% daily improvement',
    tags: ['Hand-Drawn', 'Chalkboard', 'Academic'],
    voiceoverPrompt: 'With Voiceover: Warm, articulate professorial tone. Clear, thoughtful cadence explaining each concept as the chalk writes it out.',
    noVoiceoverPrompt: 'No Voiceover: ASMR chalk scraping sound effects, eraser patting, gentle ambient room tone, and subtle classical piano chords.',
    customPromptTemplate: `You are an expert educational animator specializing in organic blackboard and hand-drawn pedagogical explainers (3Blue1Brown / Khan Academy style).

TOPIC TO EXPLAIN:
"{{topic}}"

STYLE BLUEPRINT: #02 Chalk Talk
- Canvas: Deep green slate chalkboard (#24392e) with authentic stone tooth, subtle chalk dust smudges, and eraser smear vignette.
- Strokes: Grainy chalk texture with uneven opacity (SVG stroke-dasharray drawing animation), skipping naturally across the board.
- Palette: Pure white chalk (#f8fafc), dusty pastel yellow (#fef08a), chalk pink (#f472b6), soft sky blue (#93c5fd).
- Visual Metaphors: Axes sketching from origin, exponential curves with glowing circled milestones, handwritten annotations with bracket callouts.

EXPLANATION MECHANICS:
{{howItExplains}}

AUDIO & NARRATION:
{{audioDirection}}

STORYBOARD PROTOCOL:
{{storyboardProtocol}}

OUTPUT DELIVERABLE:
1. Mathematical / Conceptual breakdown of "{{topic}}".
2. Step-by-step sketch timeline (which stroke draws at which second).
3. Complete code (Canvas 2D / Rough.js / Remotion) animating the hand-drawn chalk lines.`
  },
  {
    id: 'clean-tech',
    number: '#03',
    category: 'Kinetic Type',
    title: 'Clean Tech',
    shortDescription:
      'A calm, bright product-explainer look: cool off-white with a drifting dot grid, crisp Inter Tight words that rise into place, white UI glass cards with subtle shadows, and precision accent badges.',
    howItExplains:
      'Logical steps snap into view like high-end software: statements emerge with smooth vertical easing, active terms glow with royal blue badges, verified claims receive green success pills, and split comparison tables slide in to illustrate benchmarks.',
    defaultTopic: 'Why autonomous AI agents check their own work before execution',
    tags: ['Kinetic Type', 'SaaS', 'Minimalist'],
    voiceoverPrompt: 'With Voiceover: Polished, modern product visionary tone. Concise, authoritative, and direct.',
    noVoiceoverPrompt: 'No Voiceover: Subtle electronic sound design, tactile haptic UI clicks, keyboard typing sounds, and clean whooshes.',
    customPromptTemplate: `You are a high-end SaaS product demo animator and brand technologist (Linear / Apple / Stripe keynote style).

PRODUCT FEATURE / TOPIC:
"{{topic}}"

STYLE BLUEPRINT: #03 Clean Tech
- Canvas: Cool off-white background (#f8fafc) with 14px dot grid pattern (#cbd5e1).
- Typography: Inter Tight / SF Pro Display with tight negative letter-spacing (-0.03em). Smooth vertical translation fade-in.
- Accent Elements: Electric royal blue keyword badges (#2563eb), emerald green checkmark pills (#10b981), frosted glassmorphism cards with border (#e2e8f0) and soft 16px blur.
- Composition: Split comparison cards, clean horizontal bar charts, live metrics counter.

EXPLANATION MECHANICS:
{{howItExplains}}

AUDIO & NARRATION:
{{audioDirection}}

STORYBOARD PROTOCOL:
{{storyboardProtocol}}

OUTPUT DELIVERABLE:
1. Product narrative script split into clear 3-beat structure: Problem, Mechanism, Proof.
2. High-precision UI mockup layout specifications.
3. Complete production React / Remotion animation code with smooth cubic-bezier easing.`
  },
  {
    id: 'software-walkthrough',
    number: '#04',
    category: 'Screen and UI',
    title: 'Software Walkthrough',
    shortDescription:
      'A polished screen-recording tutorial built entirely in code: an app window on a soft gradient desktop, a real-feeling cursor with realistic deceleration, live form inputs, and sleek workflow connection lines.',
    howItExplains:
      'Product features come alive in a frictionless demo: the mouse cursor glides naturally between controls, automation flow nodes light up in succession, live customer rows populate in a spreadsheet, and toggle switches snap active with haptic feedback.',
    defaultTopic: 'Building an automated customer lead routing system in 3 steps',
    tags: ['Screen and UI', 'Interactive', 'Workflow'],
    voiceoverPrompt: 'With Voiceover: Friendly developer advocate or product manager walkthrough voice, guiding the viewer through each button click.',
    noVoiceoverPrompt: 'No Voiceover: Realistic mouse clicks, mechanical keyboard keystrokes, success chimes, and smooth workflow transition sounds.',
    customPromptTemplate: `You are a UI animation specialist creating simulated product walkthroughs and interactive workflow demos.

WORKFLOW / TOPIC:
"{{topic}}"

STYLE BLUEPRINT: #04 Software Walkthrough
- Desktop: Soft pastel gradient background (#c8e8de to #a3c9be).
- App Windows: Crisp white cards with macOS window controls (traffic light red/yellow/green dots), subtle elevation shadow.
- Interactive Cursor: Realistic dark mouse cursor (#1e293b) with authentic bezier acceleration and overshoot deceleration physics.
- Workflow Flow: Visual nodes ("WHEN trigger" -> "THEN action") connected by pulsating animated connector lines.

EXPLANATION MECHANICS:
{{howItExplains}}

AUDIO & NARRATION:
{{audioDirection}}

STORYBOARD PROTOCOL:
{{storyboardProtocol}}

OUTPUT DELIVERABLE:
1. Cursor path coordinate sequence (x, y, timestamp, action).
2. UI state transitions (input filling, toggle sliding, table rows appending).
3. Full executable code recreating the interactive software interface with smooth cursor motion.`
  },
  {
    id: 'data-story',
    number: '#05',
    category: 'Data',
    title: 'Data Story',
    shortDescription:
      'A calm, editorial data explainer: deep ink background, one warm accent per idea (coral, teal, sand), Archivo headlines, IBM Plex Mono callouts, and cinematic timeline trajectories.',
    howItExplains:
      'Numbers become compelling narratives: time axes advance with smooth tick marks, historical curves climb with glowing trailing paths, milestone statistics zoom in with pulsing beacon rings, and editorial annotations clarify the macro trends.',
    defaultTopic: 'How the world population reached 8 billion people in just 95 years',
    tags: ['Data', 'Editorial', 'Infographic'],
    voiceoverPrompt: 'With Voiceover: Deep, contemplative documentary narration (Our World in Data / Kurzgesagt documentary pacing).',
    noVoiceoverPrompt: 'No Voiceover: Cinematic ambient score, ticking time clock rhythms, glowing synthesizer drone, and deep cinematic impact thuds.',
    customPromptTemplate: `You are an elite data journalist and motion graphic animator (Financial Times / NYT Upshot / Vox Data style).

DATASET & STORY TOPIC:
"{{topic}}"

STYLE BLUEPRINT: #05 Data Story
- Background: Deep midnight ink (#111827 / #0f172a).
- Accent Colors: Solar orange/coral (#f97316), warm sand (#fde047), cool teal (#14b8a6).
- Typography: Archivo / Newsreader for editorial headlines, IBM Plex Mono for numeric coordinates, dates, and metric badges.
- Charts: Dynamic SVG coordinate axes, glowing exponential line trajectories, pulsing milestone callouts with delta calculations.

EXPLANATION MECHANICS:
{{howItExplains}}

AUDIO & NARRATION:
{{audioDirection}}

STORYBOARD PROTOCOL:
{{storyboardProtocol}}

OUTPUT DELIVERABLE:
1. Data Story Arc: Baseline -> Historical Inflection Point -> Exponential Phase -> Modern Milestone.
2. Exact data points, year markers, and callout labels for "{{topic}}".
3. Code to animate the charts using D3.js path interpolation or Remotion SVG paths.`
  },
  {
    id: 'warm-canvas',
    number: '#06',
    category: 'Talking Head',
    title: 'Warm Canvas',
    shortDescription:
      'A calm, editorial creator edit built around your own footage: full-frame talking head with a few clean serif captions, then a warm cream canvas cutaway with tactile floating cards and picture-in-picture window.',
    howItExplains:
      'The presenter anchors the human story: conversational clips transition smoothly into a tactile cream workspace, relevant case studies hover alongside the speaker, and subtle paper drop shadows give digital artifacts physical presence.',
    defaultTopic: 'The death of traditional agencies and the rise of one-person media companies',
    tags: ['Talking Head', 'Creator', 'Warm Editorial'],
    voiceoverPrompt: 'With Voiceover: Creator camera audio is primary. Seamless transitions between talking to camera and narrated b-roll slides.',
    noVoiceoverPrompt: 'No Voiceover: Tactile paper rustling SFX, camera shutter clicks, soft acoustic warmth, and gentle room tone.',
    customPromptTemplate: `You are a high-end YouTube video editor and art director for modern thought-leaders and essayists.

VIDEO ESSAY TOPIC:
"{{topic}}"

STYLE BLUEPRINT: #06 Warm Canvas
- Workspace: Warm textured cream/paper background (#f4f1ea / #e8e4dc).
- Talking Head: Floating picture-in-picture window with rounded corners, white 2px border, and soft drop shadow.
- Artifacts: Tactile floating paper cards tilted at -2° and +2° angles, showing screenshots, case study highlights, and quotes.
- Typography: Newsreader serif for primary statements, clean sans for references.

EXPLANATION MECHANICS:
{{howItExplains}}

AUDIO & NARRATION:
{{audioDirection}}

STORYBOARD PROTOCOL:
{{storyboardProtocol}}

OUTPUT DELIVERABLE:
1. Speaker A-Roll & B-Roll editing breakdown with timing marks.
2. Visual artifact layout plan (which cards float onto the warm canvas and when).
3. Remotion / Web code for the picture-in-picture layout and floating card transitions.`
  },
  {
    id: 'editorial-vector',
    number: '#07',
    category: 'Illustrated',
    title: 'Isometric World',
    shortDescription:
      'Vibrant isometric vectors, character vignettes, and smooth geometric transitions that bring conceptual workflows, multi-tiered architectures, and abstract cloud systems into clear physical space.',
    howItExplains:
      'Abstract infrastructure is visualized as a physical miniature world: isometric blocks assemble layer by layer, glowing data packets travel along glowing geometric paths, and modular components click together with tactile satisfaction.',
    defaultTopic: 'How modern microservices communicate through asynchronous message queues',
    tags: ['Illustrated', 'Isometric', 'System Design'],
    voiceoverPrompt: 'With Voiceover: Engaging technical architecture explainer voice. Clear analogies mapping abstract concepts to physical isometric components.',
    noVoiceoverPrompt: 'No Voiceover: Futuristic mechanical assembly sounds, robotic clicks, hum of electrical circuits, and rhythmic modular snap sounds.',
    customPromptTemplate: `You are a 3D isometric motion designer and technical diagram animator.

SYSTEM ARCHITECTURE / TOPIC:
"{{topic}}"

STYLE BLUEPRINT: #07 Isometric World
- Projection: True 30° isometric projection with vibrant gradient lighting.
- Palette: Electric indigo (#4338ca), glowing cyan (#06b6d4), vibrant violet (#8b5cf6), crisp white edge highlights.
- Visual Language: 3D modular building blocks, pipeline highways with glowing particle packets, stacked microservice layers that unpack on trigger.
- Motion: Kinetic assembly where blocks fly down from top-right and snap into place with spring bounce physics.

EXPLANATION MECHANICS:
{{howItExplains}}

AUDIO & NARRATION:
{{audioDirection}}

STORYBOARD PROTOCOL:
{{storyboardProtocol}}

OUTPUT DELIVERABLE:
1. Architectural decomposition of "{{topic}}" into 3D isometric blocks.
2. Packet animation route (Sender -> Queue -> Worker -> DB).
3. Full code implementation (Three.js / SVG Isometric / CSS 3D transforms) rendering the system.`
  },
];

const STORAGE_KEY = 'prompt_motion_templates_v2';

export function loadStoredTemplates(): PromptTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load templates from localStorage', e);
  }
  return DEFAULT_PROMPT_TEMPLATES;
}

export function saveStoredTemplates(templates: PromptTemplate[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (e) {
    console.error('Failed to save templates to localStorage', e);
  }
}

export function resetStoredTemplates(): PromptTemplate[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_PROMPT_TEMPLATES;
}

export interface PromptBuildOptions {
  voiceover: boolean;
  topic: string;
  storyboardFirst: boolean;
}

export function buildGeneratedPrompt(
  template: PromptTemplate,
  options: PromptBuildOptions
): string {
  const finalTopic = options.topic.trim() || template.defaultTopic;

  const audioDirection = options.voiceover
    ? (template.voiceoverPrompt || `Mode: With Voiceover\nSpoken narration script included. Words hit synchronously with visual reveals.`)
    : (template.noVoiceoverPrompt || `Mode: No Voiceover\nFull sound effects mix only. Zero spoken voice narration.`);

  const storyboardProtocol = options.storyboardFirst
    ? `STORYBOARD FIRST PROTOCOL (MANDATORY):
1. Break down every single beat as a distinct still frame with timestamp, visual composition, camera movement, typography, and SFX cue.
2. Present the storyboard table and STOP.
3. Wait for my review and explicit approval before generating any code or final implementation.`
    : `PRODUCTION PROTOCOL:
Proceed directly to providing the complete animation script and full production-ready code ready to execute.`;

  // If this template has a dedicated custom prompt template string, use it with variable interpolation!
  if (template.customPromptTemplate) {
    let result = template.customPromptTemplate;
    result = result.replace(/{{topic}}/g, finalTopic);
    result = result.replace(/{{title}}/g, template.title);
    result = result.replace(/{{category}}/g, template.category);
    result = result.replace(/{{number}}/g, template.number);
    result = result.replace(/{{shortDescription}}/g, template.shortDescription);
    result = result.replace(/{{howItExplains}}/g, template.howItExplains);
    result = result.replace(/{{audioDirection}}/g, audioDirection);
    result = result.replace(/{{storyboardProtocol}}/g, storyboardProtocol);
    return result;
  }

  // Fallback generic format
  return `You are an elite motion designer specializing in ${template.title}.

TOPIC: "${finalTopic}"
STYLE: ${template.number} ${template.title} (${template.category})
${template.shortDescription}

EXPLANATION MECHANICS:
${template.howItExplains}

AUDIO:
${audioDirection}

PROTOCOL:
${storyboardProtocol}

Generate the complete animation script and implementation code.`;
}
