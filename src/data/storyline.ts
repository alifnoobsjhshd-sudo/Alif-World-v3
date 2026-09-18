export interface StoryScene {
  id: number;
  tag: string;
  title: string;
  bubble: string;
  bubblePlacement: 
    | 'beside-head'
    | 'above'
    | 'left-curving'
    | 'high-above'
    | 'opposite-telescope'
    | 'between-portal'
    | 'above-laptop'
    | 'above-behind'
    | 'behind-stretching'
    | 'wind-tilted'
    | 'high-contrast'
    | 'subtle-beside'
    | 'cinematic-large'
    | 'above-airplane'
    | 'wide-pointing-horizon'
    | 'direct-friendly';
  visual: string;
  depth: number;
  theme: 'sky' | 'electronics' | 'science' | 'cosmic' | 'explore' | 'portal' | 'web' | 'creative' | 'building' | 'storm' | 'breakthrough' | 'sunset' | 'unforgettable' | 'flight' | 'horizon' | 'reveal';
}

export const SCENE_STEP = 3800;

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    tag: 'Scene 01',
    title: 'The Beginning',
    bubble: '“Every journey begins with a question.”',
    bubblePlacement: 'beside-head',
    visual: 'A huge soft white cloud floats across the lower-middle of a vast blue sky. The anime scientist character sits casually on the edge of the cloud, one leg hanging down, quietly looking toward the distant horizon. His white scientist coat moves gently in the wind. A small airplane flies far in the background while tiny clouds and colorful kites are scattered across the sky.',
    depth: 0,
    theme: 'sky',
  },
  {
    id: 2,
    tag: 'Scene 02',
    title: 'The Question',
    bubble: '“Mine began with one simple question: how does everything work?”',
    bubblePlacement: 'above',
    visual: 'The scientist character lies on his stomach across a wide fluffy cloud, resting his chin on his hands while examining a small homemade electronic device. Tiny wires, batteries, circuit pieces, and components are scattered around him. His expression is deeply curious and focused.',
    depth: SCENE_STEP * 1,
    theme: 'electronics',
  },
  {
    id: 3,
    tag: 'Scene 03',
    title: 'Curiosity',
    bubble: '“That question pulled me toward science, experiments, and electronics.”',
    bubblePlacement: 'left-curving',
    visual: 'The anime scientist sits cross-legged on a large rounded cloud surrounded by floating circuit boards, gears, wires, a glowing light bulb, small laboratory objects, and electronic components. He holds a tiny electronic component in one hand and examines it with excitement.',
    depth: SCENE_STEP * 2,
    theme: 'science',
  },
  {
    id: 4,
    tag: 'Scene 04',
    title: 'More Questions',
    bubble: '“And the more I discovered, the more questions appeared.”',
    bubblePlacement: 'high-above',
    visual: 'The scientist stands on top of a tall dramatic cloud, looking upward into the enormous sky. Around him float glowing stars, gears, atoms, scientific symbols, circuit patterns, and abstract question-mark shapes. The scene feels larger and more mysterious than the previous ones.',
    depth: SCENE_STEP * 3,
    theme: 'cosmic',
  },
  {
    id: 5,
    tag: 'Scene 05',
    title: 'Exploring',
    bubble: '“So I kept exploring, always looking for something new to understand.”',
    bubblePlacement: 'opposite-telescope',
    visual: 'The scientist sits on the edge of a long horizontal cloud beside a small telescope. He looks through it toward a distant mysterious planet glowing softly in the sky. An airplane passes behind the cloud, creating a sense of movement and continuing the journey.',
    depth: SCENE_STEP * 4,
    theme: 'explore',
  },
  {
    id: 6,
    tag: 'Scene 06',
    title: 'A New World',
    bubble: '“Until one day, I discovered a world I could build myself.”',
    bubblePlacement: 'between-portal',
    visual: 'The scientist stands on a cloud facing a gigantic glowing portal suspended in the sky. The portal looks like a doorway made from light, digital particles, code fragments, interface elements, and glowing lines. Some of the digital elements flow toward the character as if inviting him inside.',
    depth: SCENE_STEP * 5,
    theme: 'portal',
  },
  {
    id: 7,
    tag: 'Scene 07',
    title: 'The Web',
    bubble: '“It was the web.”',
    bubblePlacement: 'above-laptop',
    visual: 'The scientist sits comfortably on a soft cloud with a laptop resting on his knees. Around him float website layouts, browser windows, buttons, images, menus, and glowing interface elements. The sky subtly begins mixing with digital elements, showing the transition from science and electronics into web development.',
    depth: SCENE_STEP * 6,
    theme: 'web',
  },
  {
    id: 8,
    tag: 'Scene 08',
    title: 'Creativity',
    bubble: '“And suddenly, my curiosity had a new way to speak.”',
    bubblePlacement: 'above-behind',
    visual: 'The scientist stands on a cloud and reaches toward a giant floating website interface. As his hand touches it, the interface transforms into creative shapes, layouts, animations, glowing UI elements, and colorful digital structures. An airplane moves through the background.',
    depth: SCENE_STEP * 7,
    theme: 'creative',
  },
  {
    id: 9,
    tag: 'Scene 09',
    title: 'Building',
    bubble: '“So I started turning ideas into things people could actually experience.”',
    bubblePlacement: 'behind-stretching',
    visual: 'The scientist sits at a futuristic workspace built on a cloud. His laptop is open while completed website screens float around him like digital creations. Different layouts, pages, interfaces, and interactive elements surround the workspace, showing that his ideas are becoming real experiences.',
    depth: SCENE_STEP * 8,
    theme: 'building',
  },
  {
    id: 10,
    tag: 'Scene 10',
    title: 'The Storm',
    bubble: '“Some took off. Some fell apart. But I kept building.”',
    bubblePlacement: 'wind-tilted',
    visual: 'The peaceful sky suddenly becomes darker and stormy. The scientist sits on a smaller cloud surrounded by broken website pieces, unfinished designs, scattered code fragments, and damaged digital elements. Strong wind pushes the cloud sideways. In the distance, the airplane struggles through the storm.',
    depth: SCENE_STEP * 9,
    theme: 'storm',
  },
  {
    id: 11,
    tag: 'Scene 11',
    title: 'Breaking Through',
    bubble: '“Because every failed attempt gave me another reason to try again.”',
    bubblePlacement: 'high-contrast',
    visual: 'The scientist stands firmly on top of a large cloud while breaking through the storm. Dark clouds and rain remain far below him, while brilliant sunlight appears above. Bright white clouds surround him. The airplane climbs upward behind him, passing from the storm toward the light.',
    depth: SCENE_STEP * 10,
    theme: 'breakthrough',
  },
  {
    id: 12,
    tag: 'Scene 12',
    title: 'The Realization',
    bubble: '“And somewhere along the way, I realized what I really wanted.”',
    bubblePlacement: 'subtle-beside',
    visual: 'Everything becomes peaceful again. The scientist sits alone on a small soft cloud with his legs crossed, quietly watching a massive orange-and-purple sunset stretching across the horizon. The airplane is barely visible in the distance.',
    depth: SCENE_STEP * 11,
    theme: 'sunset',
  },
  {
    id: 13,
    tag: 'Scene 13',
    title: 'Unforgettable',
    bubble: '“I don\'t just want to make websites. I want to make something unforgettable.”',
    bubblePlacement: 'cinematic-large',
    visual: 'The scientist stands confidently on the highest point of a huge majestic cloud. Behind him is a massive glowing sky containing subtle visual memories from his journey: electronics, stars, code, website interfaces, gears, scientific symbols, and distant planets. Everything feels connected into one world.',
    depth: SCENE_STEP * 12,
    theme: 'unforgettable',
  },
  {
    id: 14,
    tag: 'Scene 14',
    title: 'Still Exploring',
    bubble: '“That\'s what I\'m chasing today — creativity, ideas, and the next thing I haven\'t discovered yet.”',
    bubblePlacement: 'above-airplane',
    visual: 'The scientist sits on the wing of the airplane as it flies through an enormous open sky. His white scientist coat moves in the wind. He looks toward the distant horizon with curiosity rather than certainty. Huge clouds pass below and beside the airplane.',
    depth: SCENE_STEP * 13,
    theme: 'flight',
  },
  {
    id: 15,
    tag: 'Scene 15',
    title: 'The Horizon',
    bubble: '“Because the best part of a journey is knowing there\'s still somewhere left to go.”',
    bubblePlacement: 'wide-pointing-horizon',
    visual: 'The airplane flies toward a gigantic glowing horizon. In the foreground, the scientist stands on a small cloud watching it disappear into the distance. The sky is enormous and peaceful, with only a few clouds and colorful kites remaining.',
    depth: SCENE_STEP * 14,
    theme: 'horizon',
  },
  {
    id: 16,
    tag: 'Scene 16',
    title: 'The Reveal',
    bubble: '“Hello.”',
    bubblePlacement: 'direct-friendly',
    visual: 'The journey finally becomes calm and personal. The anime scientist sits casually on a beautiful soft cloud, facing directly toward the viewer for the first time. The airplane flies nearby, with small clouds behind him and a bright clean sky surrounding the character. His expression is friendly and confident.',
    depth: SCENE_STEP * 15,
    theme: 'reveal',
  },
];

export const TOTAL_STORY_CYCLE = SCENE_STEP * 16;
