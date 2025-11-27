import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import "./HeaderUser.css";
import logo from "../../../assets/pr_ai_logo.svg";
import AuthDialog from "../../AuthDialog/AuthDialog";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
import trialStar from "../../../assets/trialStar.svg";
const Header: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="left-block">
            <Link to="/" className="logo">
              <img className="logo_img" src={logo} alt="logo_pr_ai" />
            </Link>

            <nav className="nav">
              <Link to="/presentations" className="nav-link">
                Шаблоны
              </Link>
            </nav>
          </div>
          
       
          <div className="right-block">
               <div className="trial_container"
                onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}>
            <p className="trial_count">{user?.trial_generations.toString()}</p>
            <img className="trial_img" src={trialStar} alt="" />
             {showTooltip && (
        <div className="trial_tooltip">
          Количество доступных генераций
        </div>
      )}
          </div>
              <HeaderProfile />
         
          </div>
        </div>
      </header>
      
      <AuthDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default Header;
