import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'

/**
 * SKELETON — data-integrity tests for content collections (content-as-data projects,
 * e.g. Astro/MDX). Treats content frontmatter as DATA and guards the invariants the site
 * relies on: required fields, locale-matches-folder, unique (locale, slug) URLs,
 * translationKey paired across locales, and that referenced assets exist.
 *
 * Adjust COLLECTIONS, CONTENT, PUBLIC, and the required-field list to your project.
 */

const CWD = process.cwd()
const CONTENT = join(CWD, 'src/content')
const PUBLIC = join(CWD, 'public')
const COLLECTIONS = ['articles', 'use-cases', 'portfolio'] as const

interface Entry {
  rel: string
  locale: string
  data: Record<string, unknown>
  body: string
}

function loadEntries(collection: string): Entry[] {
  const base = join(CONTENT, collection)
  if (!existsSync(base)) return []
  const files = (readdirSync(base, { recursive: true }) as string[]).filter((f) =>
    f.endsWith('.mdx'),
  )
  return files.map((rel) => {
    const raw = readFileSync(join(base, rel), 'utf8')
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const data = (m ? parseYaml(m[1]) : {}) as Record<string, unknown>
    return { rel, locale: rel.split(/[\\/]/)[0], data, body: m ? raw.slice(m[0].length) : raw }
  })
}

const byCollection = Object.fromEntries(COLLECTIONS.map((c) => [c, loadEntries(c)])) as Record<
  string,
  Entry[]
>

describe('content collections are non-empty', () => {
  for (const c of COLLECTIONS) {
    it(`${c} has at least one entry`, () => expect(byCollection[c].length).toBeGreaterThan(0))
  }
})

describe.each(COLLECTIONS)('%s — integrity', (collection) => {
  const entries = byCollection[collection]

  it('required fields present', () => {
    for (const e of entries)
      for (const f of ['title', 'description', 'slug', 'locale', 'translationKey'])
        expect(e.data[f], `${e.rel} missing ${f}`).toBeTruthy()
  })

  it('locale matches folder', () => {
    for (const e of entries) expect(e.data.locale, e.rel).toBe(e.locale)
  })

  it('unique (locale, slug)', () => {
    const seen = new Set<string>()
    for (const e of entries) {
      const k = `${e.locale}:${String(e.data.slug)}`
      expect(seen.has(k), `dup ${k} (${e.rel})`).toBe(false)
      seen.add(k)
    }
  })

  it('translationKey paired across locales', () => {
    const byKey = new Map<string, string[]>()
    for (const e of entries)
      byKey.set(String(e.data.translationKey), [
        ...(byKey.get(String(e.data.translationKey)) ?? []),
        e.locale,
      ])
    for (const [k, locales] of byKey)
      expect([...locales].sort(), `translationKey ${k}`).toEqual(['en', 'id'])
  })

  it('referenced assets exist', () => {
    const patterns = [/!\[[^\]]*\]\((\/assets\/[^)]+)\)/g, /\bsrc=["'](\/assets\/[^"']+)["']/g]
    for (const e of entries) {
      const cover = e.data.cover as string | undefined
      if (cover) expect(existsSync(join(PUBLIC, cover)), `${e.rel} cover ${cover}`).toBe(true)
      for (const re of patterns)
        for (const m of e.body.matchAll(re))
          expect(existsSync(join(PUBLIC, m[1])), `${e.rel} asset ${m[1]}`).toBe(true)
    }
  })
})
