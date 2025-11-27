import React from "react";
import "./MainPage.css";
import maincard from "../../assets/maincard.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/FooterMain/FooterMain";
import SampleCard from "../../components/SampleCard/SampleCard";
import cardImage1 from "../../assets/card1.png";
import cardImage2 from "../../assets/card2.png";
import cardImage3 from "../../assets/card3.png";
import { useToast } from "../../components/ToastProvider/ToastProvider";
const MainPage: React.FC = () => {
  const { showToast } = useToast();
  return (
    <div className="page-wrapper ">
      <Header />
      <main className="main">
        <div className="main-container">
          <h1 className="main-title">
            <span className="highlight">Создавай</span> презентации
            <br />
            за считанные минуты
          </h1>
          <img className="main-title-image" src={maincard} alt="maincard" />
          <div  id="how-it-works" className="square-menu">
            <div className="square">1</div>
            <p className="square-menu-text">Выбери шаблон</p>
            <hr className="hr_square" />
            <div className="square">2</div>
            <p className="square-menu-text">Настрой презентацию и введи тему</p>
            <hr className="hr_square" />
            <div className="square">3</div>
            <p className="square-menu-text">Скачай результат</p>
          </div>
          <h2 id="templates" className="main-title2">Шаблоны</h2>
          <div className="sample-cards" >
            <SampleCard
              image={cardImage1}
              title="Квант"
              text="Футуристичный и технологичный шаблон
для IT-компаний, стартапов, презентаций инновационных продуктов и научных докладов. Создает ощущение прорыва, точности и движения вперед"
            />
            <SampleCard
              image={cardImage2}
              title="Терра"
              text="Органичный, спокойный и эко-ориентированный шаблон. Идеален для брендов, связанных с природой, устойчивым развитием, туризмом. Передает чувство гармонии и надежности"
            />
            <SampleCard
              image={cardImage3}
              title="Импульс"
              text="Динамичный, яркий и смелый шаблон для креативных агентств, ивентов, спортивных брендов и молодежной аудитории. Полон энергии, использует смелые типографические решения и геометрию"
            />
          </div>
          <div className="trial_card"> <p className="trial_card-text">3 бесплатных попытки за регистрацию</p></div>

          <h2 className="main-title3">Попробуй <span className="highlight">бесплатно</span> 
          <br />
          уже сейчас
          </h2>
           <button className="btn btn-primary" onClick={() => showToast('Сначала нужно зарегестрироваться', 'error')}>Создать презентацию</button>

        </div>
                       
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
