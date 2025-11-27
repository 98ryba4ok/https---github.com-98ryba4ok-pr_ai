import React, { useState, useRef, useEffect } from "react";
import "./PresentationHelper.css";
import copyIcon from "../../assets/copy.png";
import help from "../../assets/help.png";
import { useToast } from "../../components/ToastProvider/ToastProvider";
const PresentationHelper: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const templateText = `Тема: [Тема]

- Слайд 1 (Заголовок): [Что должно быть на слайде?]
- Слайд 2 (Проблема): [Какую боль аудитории мы закрываем?]
- Слайд 3 (Решение): [Наше предложение]`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(templateText);
    showToast("Промт скопирован", "success");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
      <div className="ph-container">
    <div>
      <button className="ph-btn-open" onClick={() => setOpen(true)}>
        <img src={help} alt="" />
      </button>

      {open && (
        <div className="ph-overlay">
          <div className="ph-modal" ref={ref}>
              <h3 className="ph-title">1. Напишите только тему и система сама придумает содержание</h3>
              <div className="ph-example">Строительство</div>

              <h3 className="ph-block-title">
                2. Предоставь тему и подробный план для каждого слайда, чтобы система придерживалась идеи. Скопируй шаблон
              </h3>

              <div className="ph-template-wrapper">
  <div className="ph-template">{templateText}</div>

  <button className="ph-btn-copy" onClick={copyToClipboard}>
    <img src={copyIcon} alt="" />
  </button>
</div>

          
            </div>
          </div>
      )}
    </div>
    </div>
  );
};

export default PresentationHelper;
