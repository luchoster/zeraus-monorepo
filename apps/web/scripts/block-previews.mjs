/**
 * Generates the thumbnails used by the Studio's page-builder insert menu
 * (apps/studio/schemas/web/sections/pageBuilder.ts → /static/block-previews/<type>.png).
 *
 * Screenshots the real sections from the running site, so run `pnpm dev:web` first:
 *   pnpm --filter @zeraus/web block-previews            # BASE_URL defaults to http://localhost:3000
 *
 * Uses the locally installed Chrome through playwright-core (no browser download).
 */
import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT_DIR = fileURLToPath(new URL('../../studio/static/block-previews/', import.meta.url))
const THUMB_WIDTH = 800
const VIEWPORT = { width: 1440, height: 900 }

/** Fixed overlays that would otherwise bleed into every element screenshot. */
const HIDE_CSS = `
  .mxd-header, .mxd-nav__wrap, .mxd-menu__wrapper, .mxd-cursor, #to-top, .to-top,
  .mxd-preloader, .loader, nextjs-portal { display: none !important; visibility: hidden !important; }
`

const home = (n) => ['/', `main#mxd-page-content > .mxd-section:nth-child(${n})`]

/** schemaTypeName → [path, selector] (Rayo components as rendered today) */
const SHOTS = {
  heroSection: home(1),
  marqueeSection: home(2),
  servicesSection: home(3),
  aboutSection: home(4),
  imageDividerSection: home(5),
  capabilitiesSection: home(6),
  caseStudiesSection: home(7),
  techStackSection: home(8),
  statsSection: home(10),
  ctaSection: home(12),
  partnersSection: ['/pricing', '.mxd-section:has(.marquee__item.item-partners)'],
  testimonialsSection: ['/works-simple', '#testimonials'],
  latestPostsSection: ['/about-us', '.mxd-section.padding-blog'],
  faqSection: ['/faq', '.mxd-section.mxd-section-inner-form'],
  formSection: ['/contact', '.mxd-section.mxd-section-inner-form'],
  richTextSection: ['/blog-article', '#chapter-01'],
}

/** Blocks with no Rayo equivalent get a rendered placeholder. */
const PLACEHOLDERS = {
  innerHeroSection: `
    <div style="padding:48px 64px">
      <p style="opacity:.6;margin:0 0 12px;font-size:14px">✦ Services</p>
      <h1 style="margin:0;font-size:64px;letter-spacing:-.03em;max-width:18ch">New standards in digital excellence</h1>
    </div>`,
  creditsSection: `
    <h2>Credits</h2>
    <ul>
      <li><span>Photography</span><a>studio-name.com</a></li>
      <li><span>Type design</span><a>foundry.com</a></li>
      <li><span>Illustrations</span><a>artist.com</a></li>
    </ul>`,
}

const PLACEHOLDER_CSS = `
  html,body{margin:0;background:#191919;color:#fff;font:16px/1.4 -apple-system,Helvetica,Arial,sans-serif}
  .wrap{width:1440px;height:420px;box-sizing:border-box;padding:64px 96px;display:flex;gap:80px;align-items:flex-start}
  h2{font-size:56px;margin:0;width:420px;letter-spacing:-.02em}
  ul{list-style:none;margin:0;padding:0;flex:1}
  li{display:flex;justify-content:space-between;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.15);font-size:22px}
  li a{color:#0097d6}
`

async function settle(page) {
  // Trigger Rayo's scroll animations (anim-uni-in-up etc.) by walking the page once.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(500)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  await page.addInitScript(() => {
    try { localStorage.setItem('color-scheme', 'dark') } catch {}
  })

  const written = []
  let currentPath = null

  for (const [name, [path, selector]] of Object.entries(SHOTS)) {
    const file = `${OUT_DIR}${name}.png`
    try {
      if (currentPath !== path) {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load', timeout: 60_000 })
        await page.waitForTimeout(2500) // preloader
        await page.addStyleTag({ content: HIDE_CSS })
        await settle(page)
        currentPath = path
      }
      const el = page.locator(selector).first()
      // Put the section's top edge at the top of the viewport and capture at most one screen of it.
      await el.evaluate((node) => node.scrollIntoView({ block: 'start', behavior: 'instant' }))
      await page.waitForTimeout(1200)
      const box = await el.boundingBox()
      if (!box) throw new Error('element has no bounding box')
      const top = Math.max(0, box.y)
      const height = Math.max(80, Math.min(box.height - (top - box.y), VIEWPORT.height - top))
      await page.screenshot({
        path: file,
        animations: 'disabled',
        clip: { x: 0, y: top, width: VIEWPORT.width, height },
      })
      written.push(file)
      console.log(`✔ ${name}  ←  ${path} ${selector}`)
    } catch (err) {
      console.error(`✖ ${name}: ${err.message.split('\n')[0]}`)
    }
  }

  for (const [name, html] of Object.entries(PLACEHOLDERS)) {
    const file = `${OUT_DIR}${name}.png`
    await page.setContent(`<style>${PLACEHOLDER_CSS}</style><div class="wrap">${html}</div>`)
    await page.locator('.wrap').screenshot({ path: file })
    written.push(file)
    console.log(`✔ ${name}  ←  placeholder`)
  }

  await browser.close()

  // Downscale for the Studio (keeps the repo small).
  for (const file of written) {
    try {
      execFileSync('sips', ['--resampleWidth', String(THUMB_WIDTH), file], { stdio: 'ignore' })
    } catch {
      /* sips is macOS-only; full-size PNGs are fine too */
    }
  }
  console.log(`\n${written.length} thumbnails in ${OUT_DIR}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
