import fs from 'node:fs';
import path from 'node:path';
import moment from 'moment-timezone';
import { Canvas } from 'kyzz-canvas';

try {
	if (Canvas.fonts && typeof Canvas.fonts.google === 'function') {
		Canvas.fonts.google('Cinzel').catch(() => {});
	}
} catch (_) {}

const DEFAULT_CHARACTER_SVG = `<svg viewBox="0 0 1000 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="haloGlow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#F0A6FF" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#8B5CF6" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#120824" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE7F3"/>
      <stop offset="30%" stop-color="#F472B6"/>
      <stop offset="70%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#7E22CE"/>
    </linearGradient>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF7F2"/>
      <stop offset="100%" stop-color="#FED7AA"/>
    </linearGradient>
    <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#581C87"/>
      <stop offset="40%" stop-color="#3B0764"/>
      <stop offset="100%" stop-color="#17052E"/>
    </linearGradient>
    <linearGradient id="sleeveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7E22CE"/>
      <stop offset="60%" stop-color="#4C1D95"/>
      <stop offset="100%" stop-color="#1E073A"/>
    </linearGradient>
    <linearGradient id="trimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F0A6FF"/>
      <stop offset="100%" stop-color="#79D7FF"/>
    </linearGradient>
    <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#79D7FF"/>
      <stop offset="65%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#3B0764"/>
    </radialGradient>
  </defs>

  <circle cx="520" cy="440" r="360" fill="url(#haloGlow)"/>
  <circle cx="520" cy="440" r="290" stroke="#F0A6FF" stroke-width="1.5" stroke-dasharray="10 18" opacity="0.4"/>
  <circle cx="520" cy="440" r="250" stroke="#8B5CF6" stroke-width="1" opacity="0.3"/>

  <path d="M370 360 Q250 560 280 860 Q300 1000 370 1080 L460 1080 Q400 890 410 580 Z" fill="url(#hairGrad)" opacity="0.88"/>
  <path d="M670 360 Q790 560 760 860 Q740 1000 670 1080 L580 1080 Q640 890 630 580 Z" fill="url(#hairGrad)" opacity="0.88"/>

  <path d="M440 460 Q520 430 600 460 L720 1080 L320 1080 Z" fill="url(#robeGrad)"/>
  <path d="M480 500 L560 500 L590 1080 L450 1080 Z" fill="#220A45"/>
  <line x1="520" y1="510" x2="520" y2="1080" stroke="url(#trimGrad)" stroke-width="3" opacity="0.6"/>

  <path d="M440 460 Q330 520 280 660 Q250 820 270 930 Q310 950 360 890 Q400 730 450 580 Z" fill="url(#sleeveGrad)"/>
  <path d="M600 460 Q710 520 760 660 Q790 820 770 930 Q730 950 680 890 Q640 730 590 580 Z" fill="url(#sleeveGrad)"/>
  <path d="M270 930 Q310 950 360 890" stroke="url(#trimGrad)" stroke-width="4" fill="none" opacity="0.8"/>
  <path d="M770 930 Q730 950 680 890" stroke="url(#trimGrad)" stroke-width="4" fill="none" opacity="0.8"/>

  <path d="M430 560 Q380 640 360 720 Q350 750 370 770" stroke="url(#skinGrad)" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M610 560 Q660 640 680 720 Q690 750 670 770" stroke="url(#skinGrad)" stroke-width="14" stroke-linecap="round" fill="none"/>
  <circle cx="370" cy="770" r="26" fill="#F0A6FF" opacity="0.4"/>
  <circle cx="370" cy="770" r="10" fill="#FFFFFF" opacity="0.95"/>
  <circle cx="670" cy="770" r="26" fill="#79D7FF" opacity="0.4"/>
  <circle cx="670" cy="770" r="10" fill="#FFFFFF" opacity="0.95"/>

  <path d="M485 410 Q520 440 555 410 L565 465 Q520 495 475 465 Z" fill="#3B0764" stroke="url(#trimGrad)" stroke-width="2"/>
  <polygon points="520,455 534,473 520,489 506,473" fill="#F0A6FF" stroke="#FFFFFF" stroke-width="1.5"/>
  <circle cx="520" cy="473" r="3" fill="#79D7FF"/>

  <path d="M465 290 Q465 375 520 420 Q575 375 575 290 Q575 210 520 210 Q465 210 465 290 Z" fill="url(#skinGrad)"/>

  <path d="M480 325 Q494 313 508 325" stroke="#240B4D" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="494" cy="336" rx="10" ry="13" fill="url(#eyeGlow)"/>
  <ellipse cx="494" cy="336" rx="5.5" ry="7.5" fill="#15052D"/>
  <circle cx="491" cy="331" r="3.2" fill="#FFFFFF"/>
  <circle cx="497" cy="340" r="1.6" fill="#79D7FF"/>

  <path d="M532 325 Q546 313 560 325" stroke="#240B4D" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="546" cy="336" rx="10" ry="13" fill="url(#eyeGlow)"/>
  <ellipse cx="546" cy="336" rx="5.5" ry="7.5" fill="#15052D"/>
  <circle cx="543" cy="331" r="3.2" fill="#FFFFFF"/>
  <circle cx="549" cy="340" r="1.6" fill="#79D7FF"/>

  <ellipse cx="480" cy="354" rx="11" ry="5" fill="#F43F5E" opacity="0.28"/>
  <ellipse cx="560" cy="354" rx="11" ry="5" fill="#F43F5E" opacity="0.28"/>
  <path d="M515 362 Q520 367 525 362" stroke="#9333EA" stroke-width="2.2" stroke-linecap="round" fill="none"/>

  <path d="M450 230 Q420 140 475 155 Q490 190 480 230 Z" fill="url(#hairGrad)"/>
  <path d="M454 220 Q435 160 470 170 Q482 193 477 223 Z" fill="#FED7AA" opacity="0.85"/>
  <path d="M590 230 Q620 140 565 155 Q550 190 560 230 Z" fill="url(#hairGrad)"/>
  <path d="M586 220 Q605 160 570 170 Q558 193 563 223 Z" fill="#FED7AA" opacity="0.85"/>

  <path d="M450 270 Q485 200 520 195 Q555 200 590 270 Q575 265 565 315 Q545 265 520 315 Q495 265 475 315 Q465 265 450 270 Z" fill="url(#hairGrad)"/>
  <path d="M455 270 Q440 350 455 430 Q465 460 472 440 Q460 370 475 310 Z" fill="#C084FC" opacity="0.95"/>
  <path d="M585 270 Q600 350 585 430 Q575 460 568 440 Q580 370 565 310 Z" fill="#C084FC" opacity="0.95"/>

  <polygon points="520,180 528,205 520,215 512,205" fill="#F0A6FF" stroke="#FFFFFF" stroke-width="1"/>
  <circle cx="520" cy="198" r="3.5" fill="#79D7FF"/>
</svg>`;

export async function renderCard(options = {}) {
	const isGoodbye = options.type === 'goodbye';
	const W = options.width || 1920;
	const H = options.height || 1080;
	const canvas = new Canvas(W, H);

	const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <radialGradient id="bgGlow1" cx="74%" cy="48%" r="65%">
        <stop offset="0%" stop-color="#31145e" stop-opacity="0.95"/>
        <stop offset="45%" stop-color="#180a32" stop-opacity="0.98"/>
        <stop offset="100%" stop-color="#0a0316" stop-opacity="1"/>
      </radialGradient>
      <radialGradient id="bgGlow2" cx="18%" cy="72%" r="55%">
        <stop offset="0%" stop-color="#220e48" stop-opacity="0.7"/>
        <stop offset="65%" stop-color="#220e48" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="bgGlow3" cx="50%" cy="15%" r="45%">
        <stop offset="0%" stop-color="#2a1455" stop-opacity="0.5"/>
        <stop offset="60%" stop-color="#2a1455" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="40%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#0e051e"/>
    <rect width="${W}" height="${H}" fill="url(#bgGlow1)"/>
    <rect width="${W}" height="${H}" fill="url(#bgGlow2)"/>
    <rect width="${W}" height="${H}" fill="url(#bgGlow3)"/>
    <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  </svg>`;
	canvas.svg(bgSvg, { x: 0, y: 0, width: W, height: H });

	const raysSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <line x1="1150" y1="-80" x2="1550" y2="1160" stroke="#F0A6FF" stroke-width="6" stroke-opacity="0.05" stroke-dasharray="350 200"/>
    <line x1="1380" y1="-80" x2="1780" y2="1160" stroke="#8B5CF6" stroke-width="12" stroke-opacity="0.04"/>
    <line x1="980" y1="-80" x2="1380" y2="1160" stroke="#79D7FF" stroke-width="4" stroke-opacity="0.04"/>
  </svg>`;
	canvas.svg(raysSvg, { x: 0, y: 0, width: W, height: H });

	const sigilSvg = `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" width="920" height="920">
    <defs>
      <radialGradient id="sigilAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.2"/>
        <stop offset="80%" stop-color="#8B5CF6" stop-opacity="0.03"/>
        <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="500" cy="500" r="460" fill="url(#sigilAura)"/>
    <circle cx="500" cy="500" r="450" stroke="#8B5CF6" stroke-width="1.5" opacity="0.35"/>
    <circle cx="500" cy="500" r="420" stroke="#F0A6FF" stroke-width="0.8" opacity="0.25" stroke-dasharray="14 20"/>
    <circle cx="500" cy="500" r="380" stroke="#8B5CF6" stroke-width="2" opacity="0.3"/>
    <circle cx="500" cy="500" r="340" stroke="#79D7FF" stroke-width="0.6" opacity="0.2" stroke-dasharray="8 24"/>
    <circle cx="500" cy="500" r="290" stroke="#F0A6FF" stroke-width="1" opacity="0.25"/>
    <rect x="235" y="235" width="530" height="530" stroke="#8B5CF6" stroke-width="1" opacity="0.22" fill="none"/>
    <rect x="235" y="235" width="530" height="530" transform="rotate(45 500 500)" stroke="#F0A6FF" stroke-width="0.8" opacity="0.2" fill="none"/>
    <rect x="270" y="270" width="460" height="460" transform="rotate(22.5 500 500)" stroke="#79D7FF" stroke-width="0.5" opacity="0.15" stroke-dasharray="4 14" fill="none"/>
    <rect x="270" y="270" width="460" height="460" transform="rotate(67.5 500 500)" stroke="#79D7FF" stroke-width="0.5" opacity="0.15" stroke-dasharray="4 14" fill="none"/>
  </svg>`;
	canvas.svg(sigilSvg, { x: 990, y: 80, width: 920, height: 920 });

	const typoWord = isGoodbye ? 'GOODBYE' : 'WELCOME';
	const typoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="DejaVu Sans, sans-serif" font-weight="900" font-size="460" fill="none" stroke="#8B5CF6" stroke-width="1.5" opacity="0.03" letter-spacing="45">${typoWord}</text>
  </svg>`;
	canvas.svg(typoSvg, { x: 0, y: 0, width: W, height: H });

	if (options.characterImage) {
		await canvas.image(options.characterImage, {
			x: 970,
			y: 0,
			width: 980,
			height: 1080,
			fit: 'contain',
			fallback: true
		});
	} else {
		canvas.svg(DEFAULT_CHARACTER_SVG, { x: 970, y: 0, width: 980, height: 1080 });
	}

	const crystalsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect x="920" y="160" width="18" height="18" transform="rotate(45 920 160)" fill="#F0A6FF" fill-opacity="0.35" stroke="#F0A6FF" stroke-opacity="0.6" stroke-width="1"/>
    <rect x="750" y="720" width="14" height="14" transform="rotate(25 750 720)" fill="#79D7FF" fill-opacity="0.3" stroke="#79D7FF" stroke-opacity="0.5" stroke-width="1"/>
    <rect x="1750" y="380" width="20" height="20" transform="rotate(60 1750 380)" fill="#F0A6FF" fill-opacity="0.2" stroke="#F0A6FF" stroke-opacity="0.4" stroke-width="1"/>
    <rect x="1080" y="880" width="12" height="12" transform="rotate(15 1080 880)" fill="#8B5CF6" fill-opacity="0.3" stroke="#8B5CF6" stroke-width="1"/>
    <circle cx="1050" cy="240" r="3" fill="#F5F0FF" opacity="0.8"/>
    <circle cx="720" cy="640" r="3.5" fill="#79D7FF" opacity="0.8"/>
    <circle cx="120" cy="480" r="2" fill="#F0A6FF" opacity="0.6"/>
    <circle cx="880" cy="520" r="4" fill="#F0A6FF" opacity="0.7"/>
  </svg>`;
	canvas.svg(crystalsSvg, { x: 0, y: 0, width: W, height: H });

	const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="none" stroke="#8B5CF6" stroke-opacity="0.25" stroke-width="1"/>
    <path d="M26 96 L26 26 L96 26" fill="none" stroke="#F0A6FF" stroke-width="2.5" opacity="0.75"/>
    <path d="M${W - 96} 26 L${W - 26} 26 L${W - 26} 96" fill="none" stroke="#F0A6FF" stroke-width="2.5" opacity="0.75"/>
    <path d="M26 ${H - 96} L26 ${H - 26} L96 ${H - 26}" fill="none" stroke="#F0A6FF" stroke-width="2.5" opacity="0.75"/>
    <path d="M${W - 96} ${H - 26} L${W - 26} ${H - 26} L${W - 26} ${H - 96}" fill="none" stroke="#F0A6FF" stroke-width="2.5" opacity="0.75"/>
  </svg>`;
	canvas.svg(frameSvg, { x: 0, y: 0, width: W, height: H });

	canvas.text('ARCANE BLOOM // 01', { x: 120, y: 68, size: 12, color: '#8B5CF6', weight: 600 });
	canvas.text('MYSTIC ANIME', { x: W - 120, y: 68, size: 12, color: '#8B5CF6', weight: 600, align: 'right' });
	canvas.text('SYS.VER 2.4.1', { x: 120, y: 1022, size: 12, color: '#8B5CF6', weight: 600 });
	const gateText = isGoodbye ? 'DEPARTURE GATE' : (options.groupName ? `GATE // ${options.groupName.slice(0, 16).toUpperCase()}` : 'REALM GATE');
	canvas.text(gateText, { x: W - 120, y: 1022, size: 12, color: '#8B5CF6', weight: 600, align: 'right' });

	const avatarSize = 150;
	const avatarX = 120;
	const avatarY = 150;
	const avatarSource = options.profileImage || (fs.existsSync('./src/avatar_contact.png') ? './src/avatar_contact.png' : null);

	await canvas.image(avatarSource, {
		x: avatarX,
		y: avatarY,
		width: avatarSize,
		height: avatarSize,
		radius: avatarSize / 2,
		fallback: true
	});

	const ppRingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${avatarSize + 24}" height="${avatarSize + 24}" viewBox="0 0 ${avatarSize + 24} ${avatarSize + 24}">
    <circle cx="${(avatarSize + 24) / 2}" cy="${(avatarSize + 24) / 2}" r="${avatarSize / 2 + 8}" fill="none" stroke="#8B5CF6" stroke-width="1.5" stroke-dasharray="6 12" opacity="0.7"/>
    <circle cx="${(avatarSize + 24) / 2}" cy="${(avatarSize + 24) / 2}" r="${avatarSize / 2 + 2}" fill="none" stroke="#F0A6FF" stroke-width="3" opacity="0.9"/>
  </svg>`;
	canvas.svg(ppRingSvg, { x: avatarX - 12, y: avatarY - 12, width: avatarSize + 24, height: avatarSize + 24 });

	const labelText = isGoodbye ? '✦  DEPARTURE PROTOCOL ────────────' : '✦  SYSTEM INITIALIZED ────────────';
	canvas.text(labelText, {
		x: 305,
		y: 190,
		size: 14,
		weight: 'bold',
		color: '#F0A6FF'
	});

	const username = (options.username || 'TRAVELER').toString();
	canvas.rect(305, 215, 430, 54, { fill: '#230C4D', radius: 27, stroke: '#79D7FF', strokeWidth: 1.5 });
	const userTagSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" fill="#79D7FF"/>
  </svg>`;
	canvas.svg(userTagSvg, { x: 320, y: 230, width: 24, height: 24 });
	canvas.text(`@${username}`, {
		x: 355,
		y: 250,
		size: 26,
		weight: 800,
		color: '#FFFFFF',
		maxWidth: 360
	});

	const headlineText = isGoodbye ? 'GOODBYE' : 'WELCOME';
	canvas.text(headlineText, {
		x: 120,
		y: 415,
		size: 140,
		weight: 900,
		color: '#FFFFFF'
	});

	canvas.text('TRAVELER', {
		x: 120,
		y: 535,
		size: 130,
		weight: 900,
		color: '#F0A6FF'
	});

	const defaultDesc = isGoodbye ? 'A soul has departed from the realm.' : 'A new soul has entered the realm.';
	const descText = options.description || defaultDesc;
	canvas.text(descText, {
		x: 120,
		y: 615,
		size: 24,
		color: '#E0D6F4',
		maxWidth: 750
	});

	const divSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="650" height="3" viewBox="0 0 650 3">
    <line x1="0" y1="1.5" x2="650" y2="1.5" stroke="#8B5CF6" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="400 200"/>
  </svg>`;
	canvas.svg(divSvg, { x: 120, y: 665, width: 650, height: 3 });

	const botName = (options.botName || global.botName || 'RUBBY MULTI DEVICE').toUpperCase();
	const version = options.version || global.botVersion || 'V1.0';
	const botDot = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="6" fill="#F0A6FF" opacity="0.4"/>
    <circle cx="10" cy="10" r="3" fill="#F0A6FF"/>
  </svg>`;
	canvas.svg(botDot, { x: 116, y: 700, width: 20, height: 20 });
	canvas.text(`${botName}  ·  ${version}`, {
		x: 145,
		y: 714,
		size: 16,
		weight: 600,
		color: '#C084FC'
	});

	const dateText = options.date || moment().tz('Asia/Jakarta').format('MMMM DD, YYYY').toUpperCase();
	canvas.text(dateText, {
		x: 120,
		y: 755,
		size: 14,
		color: '#9382B2'
	});

	return await canvas.render(options.format || 'png', { quality: options.quality || 90 });
}

export async function renderWelcome(options = {}) {
	return await renderCard({
		type: 'welcome',
		...options
	});
}

export async function renderGoodbye(options = {}) {
	return await renderCard({
		type: 'goodbye',
		...options
	});
}

export function buildCanvasHtml() {
	return '';
}

export function resolveImageDataUri() {
	return '';
}

export default {
	renderCard,
	renderWelcome,
	renderGoodbye,
	buildCanvasHtml,
	resolveImageDataUri
};
