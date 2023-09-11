import Link from "next/link";
import classes from "./header.module.css";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className={classes.root}>
      <div className={classes.headerContainer}>
        <Link href="/">
          <Image alt="logo" height={50} width={50} src="/sw.png" />
        </Link>
        <Link href="/">Characters</Link>
      </div>
    </header>
  );
};

export default Header;
