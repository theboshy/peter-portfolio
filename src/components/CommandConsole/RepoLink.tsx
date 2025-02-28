import React from "react";
import { Github } from "lucide-react";

const RepoLink: React.FC = () => (
  <div className="flex items-center gap-2 text-neon-green hover:underline cursor-pointer">
    <Github size={16} />
    <span>peter-portfolio-2025</span>
  </div>
);

export default RepoLink;
