import type { BlockNode, ParagraphChild, ParsedBody } from './types'

const ARABIC_CHAR_RE = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/
const NUMBERED_LIST_RE = /^\s*[\d٠-٩۰-۹]+[\.)]\s+/
const BULLET_LIST_RE = /^\s*[-•·●]\s+/
const CITATION_RE = /^\s*[\(\[]\s*[^()]*\s*[\)\]]\s*$/

const isLatinAlpha = (ch: string): boolean => /[A-Za-z]/.test(ch)
const isArabic = (ch: string): boolean => ARABIC_CHAR_RE.test(ch)

const arabicRatio = (text: string): number => {
  let arabic = 0
  let total = 0
  for (const ch of text) {
    if (/\s/.test(ch)) continue
    if (/[\d\.\,\:\-\—\(\)\[\]،؛؟]/.test(ch)) continue
    total += 1
    if (isArabic(ch)) arabic += 1
  }
  if (total === 0) return 0
  return arabic / total
}

const isHeadingLine = (line: string): boolean => {
  const trimmed = line.trim()
  if (trimmed.length === 0) return false
  if (!trimmed.endsWith(':')) return false
  const without = trimmed.slice(0, -1)
  if (/[a-z]/.test(without)) return false
  if (NUMBERED_LIST_RE.test(without)) return false
  return /[A-Z]/.test(without) || isArabic(without)
}

const slugify = (text: string, fallbackIndex: number): string => {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  if (!base) return `section-${fallbackIndex}`
  return base.length > 40 ? base.slice(0, 40) : base
}

const splitParagraphIntoChildren = (raw: string): ParagraphChild[] => {
  const text = raw.replace(/\s+/g, ' ').trim()
  if (!text) return []

  const children: ParagraphChild[] = []
  let buffer = ''
  let bufferKind: 'text' | 'arabic' | null = null

  const flush = () => {
    const value = buffer.trim()
    if (!value) {
      buffer = ''
      bufferKind = null
      return
    }
    if (bufferKind === 'arabic') {
      children.push({ kind: 'arabic', text: value })
    } else {
      children.push({ kind: 'text', text: buffer })
    }
    buffer = ''
    bufferKind = null
  }

  for (const ch of text) {
    if (isArabic(ch)) {
      if (bufferKind === 'text') flush()
      bufferKind = 'arabic'
      buffer += ch
    } else if (isLatinAlpha(ch)) {
      if (bufferKind === 'arabic') flush()
      bufferKind = 'text'
      buffer += ch
    } else {
      buffer += ch
    }
  }
  flush()

  return children.length > 0 ? children : [{ kind: 'text', text }]
}

interface RawBlock {
  lines: string[]
}

const splitIntoRawBlocks = (body: string): RawBlock[] => {
  const blocks: RawBlock[] = []
  const paragraphs = body.replace(/\r\n/g, '\n').split(/\n\s*\n/)
  for (const paragraph of paragraphs) {
    const lines = paragraph.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length > 0) blocks.push({ lines })
  }
  return blocks
}

const classifyBlock = (
  lines: string[],
  headingIndexRef: { current: number },
  usedIds: Set<string>,
): BlockNode[] => {
  if (lines.length === 0) return []
  const out: BlockNode[] = []

  if (isHeadingLine(lines[0]) && lines.length > 1) {
    const headingText = lines[0].replace(/:\s*$/, '').trim()
    const id = uniqueId(slugify(headingText, headingIndexRef.current), usedIds)
    headingIndexRef.current += 1
    out.push({ type: 'heading', id, text: headingText })
    return out.concat(classifyBlock(lines.slice(1), headingIndexRef, usedIds))
  }

  if (lines.length === 1 && isHeadingLine(lines[0])) {
    const headingText = lines[0].replace(/:\s*$/, '').trim()
    const id = uniqueId(slugify(headingText, headingIndexRef.current), usedIds)
    headingIndexRef.current += 1
    out.push({ type: 'heading', id, text: headingText })
    return out
  }

  if (lines.every((l) => NUMBERED_LIST_RE.test(l))) {
    const items = lines.map((l) =>
      splitParagraphIntoChildren(l.replace(NUMBERED_LIST_RE, '')),
    )
    out.push({ type: 'numberedList', items })
    return out
  }

  if (lines.every((l) => BULLET_LIST_RE.test(l))) {
    const items = lines.map((l) =>
      splitParagraphIntoChildren(l.replace(BULLET_LIST_RE, '')),
    )
    out.push({ type: 'bulletList', items })
    return out
  }

  const joined = lines.join(' ')
  if (arabicRatio(joined) >= 0.6) {
    const last = lines[lines.length - 1]
    let citation: string | undefined
    let bodyLines = lines
    if (CITATION_RE.test(last) && lines.length > 1) {
      citation = last.trim()
      bodyLines = lines.slice(0, -1)
    }
    out.push({
      type: 'arabicBlock',
      text: bodyLines.join('\n'),
      citation,
    })
    return out
  }

  out.push({
    type: 'paragraph',
    children: splitParagraphIntoChildren(joined),
  })
  return out
}

const uniqueId = (base: string, used: Set<string>): string => {
  let candidate = base
  let i = 2
  while (used.has(candidate)) {
    candidate = `${base}-${i}`
    i += 1
  }
  used.add(candidate)
  return candidate
}

const mergeAdjacentLists = (blocks: BlockNode[]): BlockNode[] => {
  const out: BlockNode[] = []
  for (const block of blocks) {
    const prev = out[out.length - 1]
    if (
      prev &&
      (block.type === 'numberedList' || block.type === 'bulletList') &&
      prev.type === block.type
    ) {
      prev.items = prev.items.concat(block.items)
      continue
    }
    out.push(block)
  }
  return out
}

export const parseLessonBody = (body: string): ParsedBody => {
  const blocks: BlockNode[] = []
  const usedIds = new Set<string>()
  const headingIndexRef = { current: 1 }
  const rawBlocks = splitIntoRawBlocks(body ?? '')
  for (const raw of rawBlocks) {
    blocks.push(...classifyBlock(raw.lines, headingIndexRef, usedIds))
  }
  const merged = mergeAdjacentLists(blocks)
  const headings = merged
    .filter((b): b is Extract<BlockNode, { type: 'heading' }> => b.type === 'heading')
    .map((b) => ({ id: b.id, text: b.text }))
  return { blocks: merged, headings }
}
