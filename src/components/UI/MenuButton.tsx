import classes from './MenuButton.module.css';

interface MenuButtonProps {
  open: boolean;
  className?: string;
  onClick: () => void;
}

const MenuButton = ({ open, className, onClick }: MenuButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`${classes.container} ${open && classes.change} ${className}`}
    >
      <div className={classes.bar1}></div>
      <div className={classes.bar2}></div>
      <div className={classes.bar3}></div>
    </div>
  );
};

export default MenuButton;
