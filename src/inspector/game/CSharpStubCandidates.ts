import type { GameProjectReport } from "../../domain/gameProject.js";

type Candidate = GameProjectReport["inferences"]["stub_candidates"][number];

const literalEnd = (
  source: string,
  start: number,
): { end: number; closed: boolean } => {
  const quote = source[start],
    verbatim = source[start - 1] === "@";
  let end = start + 1;
  while (end < source.length) {
    if (source[end] === quote) {
      if (verbatim && source[end + 1] === quote) {
        end += 2;
        continue;
      }
      return { end: end + 1, closed: true };
    }
    end += !verbatim && source[end] === "\\" ? 2 : 1;
  }
  return { end: Math.min(end, source.length), closed: false };
};

/** Remove comments/literals while preserving source positions and line endings. */
const maskTrivia = (source: string): { text: string; uncertain: boolean } => {
  const output = source.split("");
  let uncertain = false;
  const blank = (start: number, end: number, literal = false) => {
    for (let i = start; i < end; i++)
      if (output[i] !== "\n" && output[i] !== "\r") output[i] = " ";
    if (literal) output[start] = "?";
  };
  for (let i = 0; i < source.length;) {
    const start = i;
    if (source.startsWith("//", i)) {
      const next = source.indexOf("\n", i);
      i = next < 0 ? source.length : next;
      blank(start, i);
    } else if (source.startsWith("/*", i)) {
      const next = source.indexOf("*/", i + 2);
      uncertain ||= next < 0;
      i = next < 0 ? source.length : next + 2;
      blank(start, i);
    } else if (source[i] === '"' || source[i] === "'") {
      if (source.startsWith('"""', i)) {
        uncertain = true;
        return { text: "", uncertain };
      }
      const literal = literalEnd(source, i);
      i = literal.end;
      uncertain ||= !literal.closed;
      blank(start, i, true);
    } else i++;
  }
  return { text: output.join(""), uncertain };
};

const classify = (body: string): Candidate["body"] | undefined => {
  const compact = body.replace(/\s+/gu, "");
  if (compact === "") return "empty";
  if (/^return(?:false|null|0[fFdDmM]?|default(?:\([^;]*\))?);$/u.test(compact))
    return "default-return";
  if (compact === "thrownull;") return "throw-null";
  return undefined;
};

/** Find inert-looking method bodies; candidates are never proof of missing code. */
export const inspectCSharpStubCandidates = (
  path: string,
  source: string,
): {
  candidates: Candidate[];
  uncertain: boolean;
} => {
  const masked = maskTrivia(source);
  const candidates: Candidate[] = [];
  let examinedUntil = 0;
  let lineOffset = 0;
  let line = 1;
  // Declaration-shaped methods only; arbitrary calls and control-flow blocks are excluded.
  const declarations =
    /\b(?:public|private|protected|internal)\s+(?:(?:static|virtual|override|sealed|async|new|unsafe|extern|partial)\s+)*(?:[\w.<>,?[\]]+\s+)?([\w]+)\s*(?:<[^;{}()]*>)?\s*\([^;{}]*\)\s*(?:where\s+[^{};=>]+)?\s*(\{|=>)/gu;
  for (const match of masked.text.matchAll(declarations)) {
    const name = match[1];
    if (name === undefined || match.index === undefined) continue;
    if (match.index < examinedUntil) continue;
    while (lineOffset < match.index) {
      if (source[lineOffset] === "\n") line++;
      lineOffset++;
    }
    const start = match.index + match[0].length;
    let end = start;
    if (match[2] === "=>") {
      const semicolon = masked.text.indexOf(";", start);
      if (semicolon < 0) {
        masked.uncertain = true;
        continue;
      }
      examinedUntil = semicolon + 1;
      const body = classify(
        "return " + masked.text.slice(start, semicolon + 1),
      );
      if (body)
        candidates.push({
          path,
          line,
          name,
          body,
        });
      continue;
    }
    let depth = 1;
    while (end < masked.text.length && depth > 0) {
      const char = masked.text[end];
      depth += char === "{" ? 1 : char === "}" ? -1 : 0;
      end++;
    }
    if (depth !== 0) {
      masked.uncertain = true;
      continue;
    }
    examinedUntil = end;
    const body = classify(masked.text.slice(start, end - 1));
    if (body)
      candidates.push({
        path,
        line,
        name,
        body,
      });
  }
  return { candidates, uncertain: masked.uncertain };
};
