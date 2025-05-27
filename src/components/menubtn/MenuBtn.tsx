import "./MenuBtn.css";

interface MenuBtnProps {
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}

function MenuBtn({ onClick, isOpen, className }: MenuBtnProps) {
  return (
    <div
      className={`menu-btn ${isOpen ? "open" : ""} ${className || ""}`}
      onClick={onClick}
    >
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
}

export default MenuBtn;
