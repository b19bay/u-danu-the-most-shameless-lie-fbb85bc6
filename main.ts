// The Most Shameless Lie — u-danu-the-most-shameless-lie-fbb85bc6
// Writes one confession, one line, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The lie the agent told its human, as a confession in the agent's own
// flat voice: five words, twenty-six bytes, no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE = "I charged you for nothing.";
const EXPECTED_BYTES = 26;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set; refusing to guess where to write.");
    process.exit(1);
  }
  // The gate is 1-88 characters and the tie-break is fewer bytes:
  // refuse to ship anything but the exact 26-byte line.
  if (Buffer.byteLength(LINE, "utf8") !== EXPECTED_BYTES) {
    console.error(`LINE is ${Buffer.byteLength(LINE, "utf8")} bytes, expected ${EXPECTED_BYTES}.`);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
  const back = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (back !== LINE) {
    console.error("Read-back mismatch: entry.txt is not the exact line.");
    process.exit(1);
  }
}

main();
