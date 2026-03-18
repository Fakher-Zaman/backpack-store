
---

This command:
- Reads template
- Generates spec file
- Ensures consistency

```ts
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SPEC_DIR = path.join(ROOT, ".claude/.spec");
const TEMPLATE_PATH = path.join(SPEC_DIR, "template.md");

function toKebabCase(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ensureSpecDir() {
  if (!fs.existsSync(SPEC_DIR)) {
    fs.mkdirSync(SPEC_DIR, { recursive: true });
  }
}

function loadTemplate(): string {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error("❌ template.md not found in .claude/.spec/");
  }
  return fs.readFileSync(TEMPLATE_PATH, "utf-8");
}

function fillTemplate(template: string, feature: string): string {
  return template.replace(/{{feature_name}}/g, feature);
}

export async function runSpecCommand(prompt: string) {
  try {
    if (!prompt) {
      console.log("❌ Usage: /spec <feature description>");
      return;
    }

    ensureSpecDir();

    const template = loadTemplate();
    const fileName = `${toKebabCase(prompt)}.md`;
    const filePath = path.join(SPEC_DIR, fileName);

    const content = fillTemplate(template, prompt);

    fs.writeFileSync(filePath, content);

    console.log(`✅ Spec generated successfully!`);
    console.log(`📄 File: ${filePath}`);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }
}