import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Project } from "#commons/types/common.ts";
import {
  sectionStyles,
  headerStyles,
  projectCardStyles,
  imageContainerStyles,
  imageStyles,
  linkStyles,
} from "./ProjectsSection.styles";

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      title: t("-"),
      description: t("-"),
      image: "",
      tech: t("-", {
        returnObjects: true,
      }) as string[],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className={sectionStyles()}>
      <div className="container mx-auto px-4">
        <SectionHeader />
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
};

const SectionHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={headerStyles()}>
      <h2 className="text-4xl font-bold mb-6">{t("projects:title")}</h2>
      <p className="text-xl text-gray-400">{t("projects:subtitle")}</p>
    </div>
  );
};

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, index) => (
      <ProjectCard key={index} project={project} />
    ))}
  </div>
);

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className={projectCardStyles()}>
    <ProjectImage image={project.image} title={project.title} />
    <ProjectContent project={project} />
  </div>
);

interface ProjectImageProps {
  image: string;
  title: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ image, title }) => (
  <div className={imageContainerStyles()}>
    <img src={image} alt={title} className={imageStyles()} />
    <div className="absolute inset-0 bg-gradient-to-t from-space-black to-transparent opacity-60" />
  </div>
);

const ProjectContent: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
    <p className="text-gray-400 mb-4">{project.description}</p>
    <TechStack technologies={project.tech} />
    <ProjectLinks liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
  </div>
);

interface TechStackProps {
  technologies: string[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {technologies.map((tech, i) => (
      <span
        key={i}
        className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10"
      >
        {tech}
      </span>
    ))}
  </div>
);

interface ProjectLinksProps {
  liveUrl: string;
  githubUrl: string;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ liveUrl, githubUrl }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <a
        href={liveUrl}
        className={linkStyles()}
        aria-label={t("projects:links.liveDemo")}
      >
        <ExternalLink size={16} className="mr-1" />
        {t("projects:links.liveDemo")}
      </a>
      <a
        href={githubUrl}
        className={linkStyles()}
        aria-label={t("projects:links.sourceCode")}
      >
        <Github size={16} className="mr-1" />
        {t("projects:links.sourceCode")}
      </a>
    </div>
  );
};

export default React.memo(ProjectsSection);
