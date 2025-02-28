import React from "react";
import { Code2, Database, Layers, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  sectionStyles,
  headerStyles,
  cardStyles,
  iconContainerStyles,
  skillTagStyles,
} from "./ExpertiseSection.styles";
import { ExpertiseItem, SkillTagsProps } from "../../commons/types/common.ts";

const ExpertiseSection: React.FC = () => {
  const { t } = useTranslation();

  const expertiseItems: ExpertiseItem[] = [
    {
      icon: Code2,
      title: t("expertise:areas.frontend.title"),
      description: t("expertise:areas.frontend.description"),
      skills: t("expertise:areas.frontend.skills", {
        returnObjects: true,
      }) as string[],
    },
    {
      icon: Database,
      title: t("expertise:areas.backend.title"),
      description: t("expertise:areas.backend.description"),
      skills: t("expertise:areas.backend.skills", {
        returnObjects: true,
      }) as string[],
    },
    {
      icon: Layers,
      title: t("expertise:areas.devops.title"),
      description: t("expertise:areas.devops.description"),
      skills: t("expertise:areas.devops.skills", {
        returnObjects: true,
      }) as string[],
    },
    {
      icon: Globe,
      title: t("expertise:areas.api.title"),
      description: t("expertise:areas.api.description"),
      skills: t("expertise:areas.api.skills", {
        returnObjects: true,
      }) as string[],
    },
  ];

  return (
    <section className={sectionStyles()}>
      <div className="container mx-auto px-4">
        <SectionHeader />
        <ExpertiseGrid items={expertiseItems} />
      </div>
    </section>
  );
};

const SectionHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={headerStyles()}>
      <h2 className="text-4xl font-bold mb-6">{t("expertise:title")}</h2>
      <p className="text-xl text-gray-400">{t("expertise:subtitle")}</p>
    </div>
  );
};

interface ExpertiseGridProps {
  items: ExpertiseItem[];
}

const ExpertiseGrid: React.FC<ExpertiseGridProps> = ({ items }) => (
  <div className="grid md:grid-cols-2 gap-8">
    {items.map((item, index) => (
      <ExpertiseCard key={index} {...item} />
    ))}
  </div>
);

const ExpertiseCard: React.FC<ExpertiseItem> = ({
  icon: Icon,
  title,
  description,
  skills,
}) => (
  <div className={cardStyles()}>
    <div className="flex items-start gap-6">
      <div className={iconContainerStyles()}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <SkillTags skills={skills} />
      </div>
    </div>
  </div>
);

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill, i) => (
      <span key={i} className={skillTagStyles()}>
        {skill}
      </span>
    ))}
  </div>
);

export default React.memo(ExpertiseSection);
