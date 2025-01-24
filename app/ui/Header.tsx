interface HeaderProps {
  matchingId: number;
}

export function Header({ matchingId }: HeaderProps) {
  return <header className="min-h-[80px] border-b-2 border-[#E6EFF5]"></header>;
}
