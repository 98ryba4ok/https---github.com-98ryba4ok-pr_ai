import React, { useEffect, useState } from "react";
import "./PresentationsPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PresentationCard from "../../components/PresentationCard/PresentationCard";
import { fetchPresentationTemplates} from "../../api/presentations";
import type { PresentationTemplate } from "../../types/presentation";
import { useNavigate } from "react-router-dom";

const PresentationsPage: React.FC = () => {
  const [templates, setTemplates] = useState<PresentationTemplate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPresentationTemplates().then(setTemplates).catch(console.error);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main presentations-grid">
        {templates.map((template) => (
          <PresentationCard
            key={template.id}
            image={template.images[0]?.image}
            title={template.title}
            text={template.description}
            onSelect={() => navigate(`/presentations/${template.id}`)}
          />
        ))}
        
      </main>
      <Footer />
    </div>
  );
};

export default PresentationsPage;
