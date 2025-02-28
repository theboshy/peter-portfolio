import React, { useRef, useEffect } from "react";
import {
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Rocket,
  Trophy,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { TimelineEntry } from "../../commons/types/common.ts";
import { useTimelineScroll } from "./useTimelineScroll";
import {
  timelineStyles,
  headerStyles,
  timelineCardStyles,
  cardContentStyles,
} from "./HorizontalTimeline.styles";

const HorizontalTimeline: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleDragMove,
    cleanup,
    isMobile,
  } = useTimelineScroll(containerRef, scrollContainerRef);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const timelineEntries = [
    "award2025",
    "project2024Sep",
    "career2024Jun",
    "education2024Mar",
  ];

  const timelineData: TimelineEntry[] = timelineEntries.map((entryKey) => ({
    date: t(`timeline:entries.${entryKey}.date`),
    title: t(`timeline:entries.${entryKey}.title`),
    description: t(`timeline:entries.${entryKey}.description`),
    type: entryKey.replace(/\d+.*$/, "") as TimelineEntry["type"],
    achievements: t(`timeline:entries.${entryKey}.achievements`, {
      returnObjects: true,
    }) as string[],
  }));

  return (
    <section className={timelineStyles()}>
      <div className="container mx-auto px-4">
        <div className={headerStyles()}>
          <h2 className="text-4xl font-bold mb-6">{t("timeline:title")}</h2>
          <p className="text-xl text-gray-400">{t("timeline:subtitle")}</p>
        </div>

        <div
          ref={containerRef}
          className={`relative ${isMobile ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseOut={handleMouseUp}
        >
          <div
            ref={scrollContainerRef}
            className="overflow-x-hidden relative"
            onMouseMove={isMobile ? handleDragMove : undefined}
          >
            <div className="flex items-start gap-8 p-4 min-w-max">
              {timelineData.map((entry, index) => (
                <TimelineCard key={index} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineCard: React.FC<{ entry: TimelineEntry }> = ({ entry }) => (
  <div className={timelineCardStyles()}>
    <TimelineNode type={entry.type} />
    <CardContent entry={entry} />
  </div>
);

const TimelineNode: React.FC<{ type: string }> = ({ type }) => {
  const nodeColors: Record<string, string> = {
    achievement: "bg-purple-500",
    education: "bg-blue-500",
    career: "bg-neon-green",
    project: "bg-amber-500",
    award: "bg-rose-500",
  };

  return (
    <>
      <div className="absolute top-8 left-0 w-full h-0.5 bg-tech-gray" />
      <div
        className={`relative z-10 w-4 h-4 rounded-full ${nodeColors[type]} mb-8 mx-auto
                  shadow-[0_0_20px_rgba(35,134,54,0.5)] transition-transform duration-300
                  group-hover/card:scale-150 group-hover/card:shadow-[0_0_30px_rgba(35,134,54,0.8)]`}
      />
    </>
  );
};

const CardContent: React.FC<{ entry: TimelineEntry }> = ({ entry }) => {
  const icons = {
    achievement: Trophy,
    education: GraduationCap,
    career: Briefcase,
    project: Rocket,
    award: Award,
  };

  const IconComponent = icons[entry.type as keyof typeof icons] || Calendar;

  return (
    <div className={cardContentStyles()}>
      <div className="flex items-center gap-2 mb-4">
        <IconComponent className={getTypeColor(entry.type)} size={20} />
        <span className="font-mono text-sm">{entry.date}</span>
      </div>

      <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
      <p className="text-gray-400 mb-4">{entry.description}</p>

      {Array.isArray(entry.achievements) && entry.achievements.length > 0 && (
        <div className="space-y-2">
          {entry.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
              </div>
              <p className="text-sm text-gray-400">{achievement}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    achievement: "text-purple-500",
    education: "text-blue-500",
    career: "text-neon-green",
    project: "text-amber-500",
    award: "text-rose-500",
  };
  return colors[type] || "text-neon-green";
};

export default React.memo(HorizontalTimeline);
