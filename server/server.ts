// src/readExport.ts
import JSZip from "jszip";

export interface ExportFiles {
  followers: unknown[]; // one entry per followers file found
  following: unknown;
}

// Matches the file name at any folder depth inside the zip.
// Instagram usually names it followers_1.json, followers_2.json, ...
const FOLLOWERS_RE = /(^|\/)followers(_\d+)?\.json$/;
const FOLLOWING_RE = /(^|\/)following\.json$/;

export async function readExport(zipBuffer: Buffer): Promise<ExportFiles> {
  const zip = await JSZip.loadAsync(zipBuffer);

  const followersEntries = zip.file(FOLLOWERS_RE);
  const followingEntries = zip.file(FOLLOWING_RE);

  if (followersEntries.length === 0) {
    throw new Error("No followers JSON file found in the zip.");
  }
  if (followingEntries.length === 0) {
    throw new Error("following.json not found in the zip.");
  }

  const followers = await Promise.all(
    followersEntries.map(async (entry) => JSON.parse(await entry.async("string")))
  );
  const following = JSON.parse(await followingEntries[0].async("string"));

  return { followers, following };
}