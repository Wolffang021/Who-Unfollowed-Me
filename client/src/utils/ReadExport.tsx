import JSZip from "jszip";

export interface ExportData {
  following: unknown;
  followers: unknown[];
}

const FOLLOWERS_RE = /(^|\/)followers(_\d+)?\.json$/;
const FOLLOWING_RE = /(^|\/)following\.json$/;

async function parseEntry(entry: JSZip.JSZipObject): Promise<unknown> {
  const text = await entry.async("string");
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${entry.name} is not valid JSON. Make sure you exported in JSON format.`);
  }
}

export async function readExport(file: File): Promise<ExportData> {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(file);
  } catch {
    throw new Error("Could not read this file as a zip archive.");
  }

  const followersEntries = zip.file(FOLLOWERS_RE);
  const followingEntries = zip.file(FOLLOWING_RE);

  if (followersEntries.length === 0)
    throw new Error("No followers JSON file found. Check that you exported Followers and following in JSON format.");
  
  if (followingEntries.length === 0)
    throw new Error("following.json not found. Check that you exported Followers and following in JSON format.");

  followersEntries.sort((a: any, b: any) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const followerParts = await Promise.all(followersEntries.map(parseEntry));

  const followers: unknown[] = [];
  for (const part of followerParts) {
    if (!Array.isArray(part))
      throw new Error("Unexpected followers file format (expected a list).");

    followers.push(...part);
  }

  const following = await parseEntry(followingEntries[0]);

  return { following, followers };
}