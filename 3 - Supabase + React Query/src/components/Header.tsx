import { ReactElement } from "react";

interface HeaderProps {
  children: ReactElement[];
}

export default function Header(props: HeaderProps) {
  return <header className="px-24 pt-8 pb-23">{props.children}</header>;
}
