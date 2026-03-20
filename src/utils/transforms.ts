// ─── Line Break ───────────────────────────────────────────────────────────────
export type LineBreakMode = 'single' | 'remove-all' | 'to-space' | 'normalize';

export function transformLineBreak(text: string, mode: LineBreakMode): string {
  switch (mode) {
    case 'single':     return text.replace(/\n{2,}/g, '\n');
    case 'remove-all': return text.replace(/\n+/g, '');
    case 'to-space':   return text.replace(/\n+/g, ' ');
    case 'normalize':  return text.replace(/\n{3,}/g, '\n\n');
    default:           return text;
  }
}

// ─── Whitespace ───────────────────────────────────────────────────────────────
export interface WhitespaceOptions {
  trim: boolean;
  tabs: boolean;
  multi: boolean;
}

export function transformWhitespace(text: string, opts: WhitespaceOptions): string {
  let result = text;
  if (opts.trim)  result = result.split('\n').map(l => l.trim()).join('\n');
  if (opts.tabs)  result = result.replace(/\t/g, ' ');
  if (opts.multi) result = result.replace(/ {2,}/g, ' ');
  return result;
}

// ─── Special Chars ────────────────────────────────────────────────────────────
export interface SpecialCharsOptions {
  emoji: boolean;
  punct: boolean;
  brackets: boolean;
  numbers: boolean;
}

export function transformSpecialChars(text: string, opts: SpecialCharsOptions): string {
  let result = text;
  if (opts.emoji)    result = result.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/gu, '');
  if (opts.punct)    result = result.replace(/[!@#$%^&*_+\-=;':"\\|,.<>/?`~]/g, '');
  if (opts.brackets) result = result.replace(/[[\](){}<>]/g, '');
  if (opts.numbers)  result = result.replace(/[0-9]/g, '');
  return result;
}

// ─── HTML Tags ────────────────────────────────────────────────────────────────
export interface HtmlTagsOptions {
  decode: boolean;
  brToLn: boolean;
}

export function transformHtmlTags(text: string, opts: HtmlTagsOptions): string {
  let result = text;
  if (opts.decode) {
    result = result
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"');
  }
  result = result.replace(/<br\s*\/?>/gi, opts.brToLn ? '\n' : '');
  result = result.replace(/<[^>]+>/g, '');
  return result;
}

// ─── Case Convert ─────────────────────────────────────────────────────────────
export type CaseMode = 'lower' | 'upper' | 'title' | 'sentence' | 'camel';

export function transformCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    case 'title':
      return text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    case 'camel':
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase())
        .replace(/\s+/g, '');
    default:
      return text;
  }
}

// ─── Word Count ───────────────────────────────────────────────────────────────
export interface WordCountStats {
  charsAll: number;
  charsNoSpace: number;
  words: number;
  sentences: number;
  lines: number;
  bytes: number;
  paragraphs: number;
}

export function getWordCount(text: string): WordCountStats {
  return {
    charsAll:     text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words:        text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences:    text.split(/[.!?]+/).filter(Boolean).length,
    lines:        text ? text.split('\n').length : 0,
    bytes:        new TextEncoder().encode(text).length,
    paragraphs:   text.split(/\n{2,}/).filter(p => p.trim()).length,
  };
}

// ─── Duplicate Lines ──────────────────────────────────────────────────────────
export interface DuplicateOptions {
  ignoreCase: boolean;
  keepEmpty: boolean;
}

export function transformDuplicate(text: string, opts: DuplicateOptions): string {
  const seen = new Set<string>();
  return text
    .split('\n')
    .filter(line => {
      const key = opts.ignoreCase ? line.toLowerCase().trim() : line.trim();
      if (!opts.keepEmpty && key === '') return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join('\n');
}

// ─── Find & Replace ───────────────────────────────────────────────────────────
export interface FindReplaceOptions {
  find: string;
  replace: string;
  regex: boolean;
  ignoreCase: boolean;
}

export function transformFindReplace(text: string, opts: FindReplaceOptions): string {
  if (!opts.find) return text;
  try {
    const flags = opts.ignoreCase ? 'gi' : 'g';
    if (opts.regex) {
      return text.replace(new RegExp(opts.find, flags), opts.replace);
    }
    const escaped = opts.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(escaped, flags), opts.replace);
  } catch {
    return text;
  }
}

// ─── Sort Lines ───────────────────────────────────────────────────────────────
export type SortMode = 'asc' | 'desc' | 'reverse' | 'length' | 'shuffle';

export function transformSortLines(text: string, mode: SortMode): string {
  const lines = text.split('\n');
  switch (mode) {
    case 'asc':     return [...lines].sort((a, b) => a.localeCompare(b, 'ko')).join('\n');
    case 'desc':    return [...lines].sort((a, b) => b.localeCompare(a, 'ko')).join('\n');
    case 'reverse': return [...lines].reverse().join('\n');
    case 'length':  return [...lines].sort((a, b) => a.length - b.length).join('\n');
    case 'shuffle': return [...lines].sort(() => Math.random() - 0.5).join('\n');
    default:        return text;
  }
}

// ─── JSON / CSV ───────────────────────────────────────────────────────────────
export type JsonCsvMode = 'json-array' | 'csv-row' | 'csv-col' | 'numbered';

export function transformJsonCsv(text: string, mode: JsonCsvMode, pretty: boolean): string {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  switch (mode) {
    case 'json-array': return JSON.stringify(lines, null, pretty ? 2 : 0);
    case 'csv-row':    return lines.map(l => `"${l.replace(/"/g, '""')}"`).join(',');
    case 'csv-col':    return lines.map(l => `"${l.replace(/"/g, '""')}"`).join('\n');
    case 'numbered':   return lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
    default:           return text;
  }
}
