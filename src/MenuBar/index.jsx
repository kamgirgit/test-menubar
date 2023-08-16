import { useState, useEffect } from "react";
import { DATA } from "./data";

const MenuBar = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const topLevelElement = getTopLevelMenu();
    topLevelElement.forEach((link) => {
      addChildToElements(link);
    });
    setMenu(topLevelElement);
  }, []);

  const getTopLevelMenu = () => {
    return DATA.filter((item) => item.parent === "0");
  };

  const addChildToElements = (link) => {
    const childs = DATA.filter((element) => {
      return element.parent == link.ID;
    });
    link.child = [];
    if (childs.length) {
      link.child = childs;
      childs.forEach((link) => {
        addChildToElements(link);
      });
    }
  };
  console.log(menu);
  return (
    <ul>
      {menu?.map((link) => (
        <Link link={link} key={link.ID} />
      ))}
    </ul>
  );
};
export default MenuBar;

const Link = ({ link }) => {
  const [isChildOpen, setIsChildOpen] = useState(false);
  const onClickLink = (e) => {
    e.stopPropagation();
    if (!link.child?.length) return;
    setIsChildOpen(!isChildOpen);
  };

  return (
    <li onClick={onClickLink}>
      {link.name}
      {isChildOpen && link.child?.length > 0 && (
        <ul>
          {link.child.map((subChild) => (
            <Link link={subChild} key={subChild.ID} />
          ))}
        </ul>
      )}
    </li>
  );
};
