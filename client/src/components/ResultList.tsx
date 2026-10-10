import type { Account } from "../utils/CompareResult";

interface ResultListProps {
  accounts: Account[];
}

export default function ResultList({ accounts }: ResultListProps) {
  if (accounts.length === 0)
    return <p>Everyone you follow follows you back!</p>;

  return (
    <ul className="result-list">
      {accounts.map((account) => (
        <li key={account.username}>
          <a href={account.href} target="_blank" rel="noreferrer">
            {account.username}
          </a>
          {account.timestamp > 0 && (
            <span>Followed {new Date(account.timestamp * 1000).toLocaleDateString()}</span>
          )}
        </li>
      ))}
    </ul>
  );
}