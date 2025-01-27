import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

interface ItemProps {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ title, path, icon }) => {
  const location = useLocation();

  return (
    <MenuItem
      component={<Link to={path} />}
      icon={icon}
      rootStyles={{
        color: path === location.pathname ? "#157bf8" : undefined,
        background:
          path === location.pathname ? "rgba(21, 123, 248, 0.1)" : undefined,
        borderRadius: "15px",
      }}
    >
      {title}
    </MenuItem>
  );
};

export default Item;
