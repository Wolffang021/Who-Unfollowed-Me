import type { ExportData } from "./ReadExport";

export interface Account {
  username: string;
  href: string;
  timestamp: number;
}

interface Entry {
  title?: string;
  string_list_data?: { href?: string; value?: string; timestamp?: number }[];
}

function toAccount(entry: Entry): Account | null {
  const data = entry.string_list_data?.[0];
  const username = data?.value || entry.title;
  if (!username)
    return null;

  return {
    username,
    href: data?.href ?? `https://www.instagram.com/${username}`,
    timestamp: data?.timestamp ?? 0,
  };
}

export function compareResult({ following, followers }: ExportData): Account[] {
  const followingList: Entry[] = Array.isArray(following) ? following : (following as { relationships_following?: Entry[] }).relationships_following ?? [];

  const followerNames = new Set<string>();
  for (const entry of followers as Entry[]) {
    const account = toAccount(entry);
    if (account)
      followerNames.add(account.username.toLowerCase());
  }

  const result: Account[] = [];
  for (const entry of followingList) {
    const account = toAccount(entry);
    if (account && !followerNames.has(account.username.toLowerCase()))
      result.push(account);
  }

  return result;
}