/**
 * Compile resume.tex → public/Atta_Navaid_Resume.pdf for the site download button.
 * Requires a LaTeX distribution with pdflatex (TeX Live, MiKTeX, etc.).
 *
 * Usage: npm run resume:build
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  unlinkSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const texPath = join(root, "resume.tex");
const buildDir = join(root, ".resume-build");
const builtPdf = join(buildDir, "resume.pdf");
const publicPdf = join(root, "public", "Atta_Navaid_Resume.pdf");

function fail(message) {
  console.error(`\nresume:build — ${message}\n`);
  process.exit(1);
}

function hasPdflatex() {
  const probe = spawnSync("pdflatex", ["--version"], {
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  return probe.status === 0;
}

function runPdflatex() {
  const result = spawnSync(
    "pdflatex",
    [
      "-interaction=nonstopmode",
      "-halt-on-error",
      "-output-directory=.resume-build",
      "resume.tex",
    ],
    {
      cwd: root,
      encoding: "utf8",
      shell: process.platform === "win32",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  return result.status === 0;
}

if (!existsSync(texPath)) {
  fail(`Missing source file: ${texPath}`);
}

if (!hasPdflatex()) {
  fail(
    "pdflatex not found. Install TeX Live (https://tug.org/texlive/) or MiKTeX (https://miktex.org/), then ensure pdflatex is on your PATH.",
  );
}

mkdirSync(buildDir, { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

console.log("Compiling resume.tex (2 passes)…\n");

const pass1 = runPdflatex();
const pass2 = runPdflatex();

if (!pass1 || !pass2) {
  fail("pdflatex failed. See output above for errors in resume.tex.");
}

if (!existsSync(builtPdf)) {
  fail(`Expected output not found: ${builtPdf}`);
}

copyFileSync(builtPdf, publicPdf);
console.log(`\nWrote ${publicPdf}`);

// Remove auxiliary files from the build directory.
for (const name of readdirSync(buildDir)) {
  unlinkSync(join(buildDir, name));
}
rmSync(buildDir, { recursive: true, force: true });

console.log("Done. Refresh the site to test /Atta_Navaid_Resume.pdf\n");
