import Header from "@/components/Header/Header";
import { ReactElement } from "react";

type LayoutProps = {
  children: ReactElement;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
