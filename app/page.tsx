// @ts-nocheck
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const COMPETENCY_MAP = {
  "FK.SS.1": {
    label: "Governments",
    outcome: "FK",
    description:
      "You notice how public systems and institutions shape what people can do.",
  },
  "FK.SS.2": {
    label: "Politics",
    outcome: "FK",
    description:
      "You pay attention to power, influence, and the reasons people frame issues differently.",
  },
  "FK.SS.3": {
    label: "Economics",
    outcome: "FK",
    description:
      "You look for the resources, incentives, and tradeoffs underneath a situation.",
  },
  "FK.SS.4": {
    label: "Cultures",
    outcome: "FK",
    description:
      "You are curious about how culture, identity, and lived experience affect meaning.",
  },
  "FK.AC.1": {
    label: "Artistic Expression",
    outcome: "FK",
    description:
      "You use creative form, story, and visual language to make ideas more resonant.",
  },
  "FK.AC.2": {
    label: "Art Analysis",
    outcome: "FK",
    description:
      "You draw insight from art, design, media, and other creative references.",
  },
  "FL.ID.1": {
    label: "Making Meaning",
    outcome: "FL",
    description:
      "You work to understand what information is really saying before deciding what it means.",
  },
  "FL.ID.2": {
    label: "Persuasive Communication",
    outcome: "FL",
    description:
      "You shape evidence, language, and examples so an idea can land with an audience.",
  },
  "FL.ID.3": {
    label: "Critical Dialogue",
    outcome: "FL",
    description:
      "You use conversation to test understanding, surface assumptions, and build better ideas.",
  },
  "FL.MST.1": {
    label: "Computational Thinking",
    outcome: "FL",
    description:
      "You break complexity into smaller patterns, rules, and steps that can be tested.",
  },
  "FL.MST.2": {
    label: "Mathematical Modeling",
    outcome: "FL",
    description:
      "You use quantities, relationships, and models to make an unclear problem more workable.",
  },
  "FL.MST.3": {
    label: "Interpreting Data",
    outcome: "FL",
    description:
      "You look for patterns in evidence and use data to sharpen your next move.",
  },
  "FL.MST.4": {
    label: "Scientific Investigation",
    outcome: "FL",
    description:
      "You test ideas carefully and build from observation toward a stronger explanation.",
  },
  "OT.Creat.1": {
    label: "Creative Process",
    outcome: "OT",
    description:
      "You are willing to explore, prototype, revise, and stay open while an idea takes shape.",
  },
  "OT.Creat.2": {
    label: "Sharing Ideas",
    outcome: "OT",
    description:
      "You put ideas in front of others and use their reactions to make the work stronger.",
  },
  "OT.Crit.1": {
    label: "Interpreting Information",
    outcome: "OT",
    description:
      "You compare sources, context, and evidence before settling on a conclusion.",
  },
  "OT.Crit.2": {
    label: "Logical Thinking",
    outcome: "OT",
    description:
      "You examine assumptions, cause and effect, and whether an argument really holds together.",
  },
  "OT.Crit.3": {
    label: "Synthesis",
    outcome: "OT",
    description:
      "You combine competing ideas into clearer patterns or possibilities.",
  },
  "OT.PS.1": {
    label: "Problem Seeking",
    outcome: "OT",
    description:
      "You ask whether the obvious problem is actually the one worth solving.",
  },
  "OT.PS.2": {
    label: "Problem Solving",
    outcome: "OT",
    description:
      "You move from uncertainty into practical experiments, decisions, and next steps.",
  },
  "GC.SA.1": {
    label: "Diverse Perspectives",
    outcome: "GC",
    description:
      "You look for viewpoints that are missing, different, or easy to overlook.",
  },
  "GC.SA.2": {
    label: "Navigating Power",
    outcome: "GC",
    description:
      "You notice who has influence in a situation and whether participation is truly fair.",
  },
  "GC.IS.1": {
    label: "Healthy Relationships",
    outcome: "GC",
    description:
      "You care about trust, respect, and the conditions that help people work well together.",
  },
  "GC.IS.2": {
    label: "Negotiating Conflict",
    outcome: "GC",
    description:
      "You can stay with disagreement long enough to find a more constructive path forward.",
  },
  "GC.IS.3": {
    label: "Building Empathy",
    outcome: "GC",
    description:
      "You try to understand what others are feeling, needing, and seeing from their side.",
  },
  "GC.IS.4": {
    label: "Productive Collaboration",
    outcome: "GC",
    description:
      "You help groups move from good intentions into shared roles, action, and follow-through.",
  },
  "GC.SAg.1": {
    label: "Community Advocacy",
    outcome: "GC",
    description:
      "You look for ways to support people facing barriers and connect them with resources.",
  },
  "GC.SAg.2": {
    label: "Community Mobilization",
    outcome: "GC",
    description:
      "You think about how people can organize together when a challenge calls for collective action.",
  },
  "LL.SAw.1": {
    label: "Wellness",
    outcome: "LL",
    description:
      "You pay attention to energy, balance, and the conditions that help you stay well.",
  },
  "LL.SAw.2": {
    label: "Recognizing Conflict",
    outcome: "LL",
    description:
      "You notice when tension, resistance, or discomfort is signaling something important.",
  },
  "LL.SAw.3": {
    label: "Understanding Self",
    outcome: "LL",
    description:
      "You reflect on your own habits, assumptions, strengths, and growth edges.",
  },
  "LL.SM.1": {
    label: "Receiving Feedback",
    outcome: "LL",
    description:
      "You can take in outside perspective and decide what will genuinely improve the work.",
  },
  "LL.SM.2": {
    label: "Pursuing Goals",
    outcome: "LL",
    description:
      "You turn intentions into plans, milestones, and steady progress.",
  },
  "LL.SM.3": {
    label: "Self-Regulation",
    outcome: "LL",
    description:
      "You manage uncertainty, emotion, and momentum while staying oriented toward growth.",
  },
  "LL.SD.1": {
    label: "Self-Motivation",
    outcome: "LL",
    description:
      "You find your own reasons to begin, keep going, and deepen your learning.",
  },
  "LL.SD.2": {
    label: "Wayfinding",
    outcome: "LL",
    description:
      "You can chart a path through unfamiliar learning by naming what you know and what you need.",
  },
  "LL.SD.3": {
    label: "Self-Advocacy",
    outcome: "LL",
    description:
      "You know when to ask for help, clarity, access, or support to keep moving.",
  },
};

const QUESTIONS = [
  {
    id: 1,
    scenario:
      "You encounter two completely contradictory news articles on the same topic. What would you do first?",
    answers: [
      {
        text: "Check a few more sources before choosing a side.",
        competencies: ["OT.Crit.1", "OT.Crit.2", "FL.ID.1"],
      },
      {
        text: "Ask who wrote each one and what angle they might have.",
        competencies: ["OT.Crit.2", "FK.SS.2", "GC.SA.2"],
      },
      {
        text: "Send both to people I trust and compare reactions.",
        competencies: ["GC.IS.3", "OT.Creat.2", "GC.IS.4"],
      },
      {
        text: "Sit with the mess for a bit. Some topics are not simple.",
        competencies: ["OT.Creat.1", "LL.SAw.1", "LL.SM.3"],
      },
    ],
  },
  {
    id: 2,
    scenario:
      "You are part of a group working on a community project and things are going off track. Where would you start?",
    answers: [
      {
        text: "Pause the project and figure out what each person needs.",
        competencies: ["GC.IS.3", "GC.IS.1", "GC.SA.1"],
      },
      {
        text: "Look for the real reason things are breaking down.",
        competencies: ["OT.Crit.1", "FL.MST.3", "OT.PS.1"],
      },
      {
        text: "Ask if we are even solving the right problem.",
        competencies: ["OT.PS.1", "OT.Creat.1", "OT.PS.2"],
      },
      {
        text: "Make the next steps clear: roles, timing, action.",
        competencies: ["GC.IS.4", "LL.SM.2", "OT.PS.2"],
      },
    ],
  },
  {
    id: 3,
    scenario:
      "You have to learn something completely new on your own - no teacher, no class. Where would you start?",
    answers: [
      {
        text: "Start with what I know, then fill the gaps.",
        competencies: ["LL.SD.2", "LL.SAw.3", "LL.SD.1"],
      },
      {
        text: "Find the part that connects to something I already care about.",
        competencies: ["LL.SD.1", "FK.SS.4", "FL.ID.1"],
      },
      {
        text: "Try, mess up, adjust, and keep going.",
        competencies: ["OT.Creat.1", "LL.SM.3", "OT.PS.2"],
      },
      {
        text: "Talk to someone who already knows the terrain.",
        competencies: ["LL.SD.3", "GC.IS.3", "FL.ID.3"],
      },
    ],
  },
  {
    id: 4,
    scenario:
      "You are presenting to an audience that might disagree with your position. How would you begin preparing?",
    answers: [
      {
        text: "Learn their view so I can speak to it fairly.",
        competencies: ["FL.ID.2", "OT.Crit.2", "GC.IS.3"],
      },
      {
        text: "Use proof they are likely to trust.",
        competencies: ["FL.ID.3", "OT.Crit.1", "FL.ID.2"],
      },
      {
        text: "Begin with what we both care about.",
        competencies: ["GC.IS.2", "GC.SA.1", "GC.IS.1"],
      },
      {
        text: "Use visuals or stories so the idea clicks.",
        competencies: ["FL.ID.2", "FL.MST.3", "FK.AC.1"],
      },
    ],
  },
  {
    id: 5,
    scenario:
      "A friend or colleague is facing a situation that feels unfair. Where would you start supporting them?",
    answers: [
      {
        text: "Help them find out what is really going on.",
        competencies: ["FK.SS.1", "FK.SS.3", "OT.PS.1"],
      },
      {
        text: "Connect them with people who can help.",
        competencies: ["GC.SAg.1", "GC.IS.1", "LL.SD.3"],
      },
      {
        text: "See who else is affected and rally support.",
        competencies: ["GC.SAg.2", "GC.IS.4", "GC.SAg.1"],
      },
      {
        text: "Listen first, then help them choose a next move.",
        competencies: ["GC.IS.3", "LL.SAw.2", "GC.IS.2"],
      },
    ],
  },
  {
    id: 6,
    scenario:
      "You are given a creative challenge with no rules - just a blank page. Where would you start?",
    answers: [
      {
        text: "Make a lot of ideas before judging any of them.",
        competencies: ["OT.Creat.1", "OT.PS.2"],
      },
      {
        text: "Hunt for inspiration in unexpected places.",
        competencies: ["FK.AC.2", "FK.SS.4", "OT.Creat.1"],
      },
      {
        text: "Show an early version and let feedback shape it.",
        competencies: ["OT.Creat.2", "GC.IS.4", "LL.SM.1"],
      },
      {
        text: "Picture the audience and the feeling I want to create.",
        competencies: ["FK.AC.1", "FL.ID.2", "GC.IS.3"],
      },
    ],
  },
  {
    id: 7,
    scenario:
      "You get feedback on your work that you partly disagree with. What would you do first?",
    answers: [
      {
        text: "Keep the useful parts and let the rest go.",
        competencies: ["LL.SM.1", "OT.Crit.2", "LL.SAw.3"],
      },
      {
        text: "Ask questions until I understand their point.",
        competencies: ["GC.IS.3", "FL.ID.3", "GC.IS.2"],
      },
      {
        text: "Sit with it. The annoying part might matter.",
        competencies: ["LL.SM.3", "LL.SAw.2", "LL.SD.2"],
      },
      {
        text: "Revise, share again, and see what lands.",
        competencies: ["OT.Creat.2", "LL.SM.1", "OT.PS.2"],
      },
    ],
  },
  {
    id: 8,
    scenario:
      "You are at a community meeting where different groups have very different ideas about how to solve a local problem. What would you pay attention to first?",
    answers: [
      {
        text: "Look for what people actually agree on.",
        competencies: ["OT.Crit.3", "GC.SA.1", "GC.IS.2"],
      },
      {
        text: "Notice who has power and who is being missed.",
        competencies: ["GC.SA.2", "GC.SAg.1", "FK.SS.2"],
      },
      {
        text: "Remix the best parts into a new option.",
        competencies: ["OT.Crit.3", "OT.Creat.1", "OT.PS.2"],
      },
      {
        text: "Stay curious and leave knowing something new.",
        competencies: ["FK.SS.4", "FL.ID.1", "LL.SD.1"],
      },
    ],
  },
  {
    id: 9,
    scenario:
      "You have unstructured free time. What do you usually choose first?",
    answers: [
      {
        text: "Follow a curiosity: book, podcast, video, rabbit hole.",
        competencies: ["LL.SD.1", "FK.SS.4", "FK.AC.2"],
      },
      {
        text: "Make something: food, art, writing, whatever has a spark.",
        competencies: ["FK.AC.1", "OT.Creat.1", "OT.Creat.2"],
      },
      {
        text: "Spend time with people. Connection refuels me.",
        competencies: ["GC.IS.1", "GC.IS.3", "LL.SAw.1"],
      },
      {
        text: "Reflect, reset, and think about where I am headed.",
        competencies: ["LL.SAw.1", "LL.SAw.3", "LL.SM.2"],
      },
    ],
  },
  {
    id: 10,
    scenario:
      "You are working with numbers or data that do not immediately make sense to you. Where would you start?",
    answers: [
      {
        text: "Sketch it as a chart so the pattern pops.",
        competencies: ["FL.MST.3", "FL.MST.2", "FK.AC.1"],
      },
      {
        text: "Ask what question the numbers are answering.",
        competencies: ["OT.PS.1", "FL.ID.1", "OT.Crit.1"],
      },
      {
        text: "Check whether I am looking at it the wrong way.",
        competencies: ["OT.Crit.2", "FL.MST.1", "LL.SAw.3"],
      },
      {
        text: "Shrink the problem, solve that, then build up.",
        competencies: ["FL.MST.1", "OT.PS.2", "FL.MST.4"],
      },
    ],
  },
];

const OUTCOME_ORDER = ["FK", "FL", "OT", "GC", "LL"];

const OUTCOMES = {
  FK: {
    id: "FK",
    name: "Holders of Foundational Knowledge",
    shortName: "Foundational Knowledge",
    archetype: "Holders of Foundational Knowledge",
    chartLabel: "Foundational Knowledge",
    icon: "map",
    color: "#E8C832",
    pairColor: "#FFF38F",
    inkColor: "#0A0A0A",
    quickTake: "You spot the bigger story.",
    prompt: "Start with context.",
    description:
      "You connect people, culture, history, and systems. You make the present easier to understand by finding the story underneath it.",
    deeper:
      "You are at your best when a challenge needs context before action. You notice patterns across people, places, culture, and history, then turn that bigger picture into smarter choices.",
    careerPaths: [
      "Policy researcher",
      "Curator",
      "Journalist",
      "Civic strategist",
    ],
    growthMove:
      "Pair your context instincts with one fast experiment so your insight becomes visible.",
  },
  FL: {
    id: "FL",
    name: "Masters of All Fundamental Literacies",
    shortName: "Fundamental Literacies",
    archetype: "Masters of All Fundamental Literacies",
    chartLabel: "Fundamental Literacies",
    icon: "chart",
    color: "#6B5BEB",
    pairColor: "#B7ACE3",
    inkColor: "#FFFFFF",
    quickTake: "You make information click.",
    prompt: "Turn noise into meaning.",
    description:
      "You turn evidence, data, words, and models into something people can use. You help ideas become clear enough to question, share, and act on.",
    deeper:
      "You shine when information is messy and people need a clean signal. You can translate numbers, text, arguments, and models into something others can understand and use.",
    careerPaths: [
      "Data analyst",
      "Product researcher",
      "Science communicator",
      "UX writer",
    ],
    growthMove:
      "Bring your audience in earlier so your clear explanation answers the questions they actually have.",
  },
  OT: {
    id: "OT",
    name: "Original Thinkers for an Uncertain World",
    shortName: "Original Thinkers",
    archetype: "Original Thinkers for an Uncertain World",
    chartLabel: "Original Thinkers",
    icon: "spark",
    color: "#3DBFB8",
    pairColor: "#55B9DF",
    inkColor: "#0A0A0A",
    quickTake: "You move when things are unclear.",
    prompt: "Try the next version.",
    description:
      "You ask better questions, test new paths, and build from uncertainty. You are wired for fresh ideas and practical experiments.",
    deeper:
      "You are energized by blank pages, tangled problems, and ideas that do not have instructions yet. You spot possibilities, test assumptions, and learn by making the next version.",
    careerPaths: [
      "Designer",
      "Entrepreneur",
      "Creative technologist",
      "Innovation lead",
    ],
    growthMove:
      "Name the smallest testable version of your idea so others can join you sooner.",
  },
  GC: {
    id: "GC",
    name: "Generous Collaborators for Tough Problems",
    shortName: "Generous Collaborators",
    archetype: "Generous Collaborators for Tough Problems",
    chartLabel: "Generous Collaborators",
    icon: "people",
    color: "#E040A0",
    pairColor: "#E48AD1",
    inkColor: "#0A0A0A",
    quickTake: "You help people move together.",
    prompt: "Bring more voices in.",
    description:
      "You notice people, power, trust, and teamwork. You help groups listen better and act together on things that matter.",
    deeper:
      "You are powerful in rooms where different people need to move together. You notice trust, conflict, power, and participation, then help the group find a fairer path forward.",
    careerPaths: [
      "Community organizer",
      "Facilitator",
      "People operations",
      "Social impact lead",
    ],
    growthMove:
      "Protect your own energy while you are holding space for everyone else.",
  },
  LL: {
    id: "LL",
    name: "Learners for Life",
    shortName: "Learners for Life",
    archetype: "Learners for Life",
    chartLabel: "Learners for Life",
    icon: "compass",
    color: "#F03040",
    pairColor: "#FF253A",
    inkColor: "#0A0A0A",
    quickTake: "You keep finding your way.",
    prompt: "Reflect, reset, keep going.",
    description:
      "You learn by reflecting, asking for what you need, and staying in motion. You know growth is a path, not a finish line.",
    deeper:
      "You have a strong inner compass. You can reflect, reset, ask for support, and keep learning through feedback, pressure, and change.",
    careerPaths: ["Coach", "Program manager", "Counselor", "Learning designer"],
    growthMove:
      "Let people see your process, not just your progress, so they can support the journey.",
  },
};

const COMPETENCY_ASSET_FILES = {
  "FK.AC.1": "01_FK-AC-1_artistic-expression.svg",
  "FK.AC.2": "02_FK-AC-2_art-analysis.svg",
  "FK.SS.1": "03_FK-SS-1_governments.svg",
  "FK.SS.2": "04_FK-SS-2_politics.svg",
  "FK.SS.3": "05_FK-SS-3_economics.svg",
  "FK.SS.4": "06_FK-SS-4_cultures.svg",
  "FL.ID.1": "07_FL-ID-1_making-meaning.svg",
  "FL.ID.2": "08_FL-ID-2_persuasive-communication.svg",
  "FL.ID.3": "09_FL-ID-3_critical-dialogue.svg",
  "FL.MST.1": "10_FL-MST-1_computational-thinking.svg",
  "FL.MST.2": "11_FL-MST-2_mathematical-modeling.svg",
  "FL.MST.3": "12_FL-MST-3_interpreting-data.svg",
  "FL.MST.4": "13_FL-MST-4_scientific-investigation.svg",
  "GC.IS.1": "14_GC-IS-1_healthy-relationships.svg",
  "GC.IS.2": "15_GC-IS-2_negotiating-conflict.svg",
  "GC.IS.3": "16_GC-IS-3_building-empathy.svg",
  "GC.IS.4": "17_GC-IS-4_productive-collaboration.svg",
  "GC.SA.1": "18_GC-SA-1_diverse-perspectives.svg",
  "GC.SA.2": "19_GC-SA-2_navigating-power.svg",
  "GC.SAg.1": "20_GC-SAg-1_community-advocacy.svg",
  "GC.SAg.2": "21_GC-SAg-2_community-mobilization.svg",
  "LL.SAw.1": "22_LL-SAw-1_wellness.svg",
  "LL.SAw.2": "23_LL-SAw-2_managing-conflict.svg",
  "LL.SAw.3": "24_LL-SAw-3_understanding-self.svg",
  "LL.SD.1": "25_LL-SD-1_self-motivation.svg",
  "LL.SD.2": "26_LL-SD-2_wayfinding.svg",
  "LL.SD.3": "27_LL-SD-3_self-advocacy.svg",
  "LL.SM.1": "28_LL-SM-1_receiving-feedback.svg",
  "LL.SM.2": "29_LL-SM-2_pursuing-goals.svg",
  "LL.SM.3": "30_LL-SM-3_self-regulation.svg",
  "OT.Creat.1": "31_OT-Creat-1_creative-process.svg",
  "OT.Creat.2": "32_OT-Creat-2_sharing-ideas.svg",
  "OT.Crit.1": "33_OT-Crit-1_interpreting-information.svg",
  "OT.Crit.2": "34_OT-Crit-2_logical-thinking.svg",
  "OT.Crit.3": "35_OT-Crit-3_synthesis.svg",
  "OT.PS.1": "36_OT-PS-1_problem-seeking.svg",
  "OT.PS.2": "37_OT-PS-2_problem-solving.svg",
};

const ASSET_BASE_PATH = "/xq-competency-assets";

const KIOSK_ACCENTS = [
  "#1FCC38",
  "#FFEA00",
  "#00A3FF",
  "#FF4D00",
  "#FF2BD6",
  "#00E5FF",
  "#7CFF00",
  "#E8C832",
  "#3DBFB8",
  "#E040A0",
  "#F03040",
  "#D8A8D8",
  "#A8C43C",
  "#E09550",
  "#55B9DF",
  "#FFF38F",
  "#B7ACE3",
  "#E48AD1",
  "#EB5D4B",
  "#7A9E9A",
  "#C8B848",
  "#5B7FB8",
];

function getCompetencyAssetPath(code, shape = "square") {
  const filename = COMPETENCY_ASSET_FILES[code];
  return filename ? `${ASSET_BASE_PATH}/${shape}/${filename}` : "";
}

function getAnswerAssetCode(questionId, answerIndex, competencies) {
  if (!competencies?.length) return "";
  const offset = (questionId + answerIndex) % competencies.length;
  return competencies[offset] || competencies[0];
}

function getKioskAccent(seed) {
  return KIOSK_ACCENTS[Math.abs(seed) % KIOSK_ACCENTS.length];
}

function getAnswerAccent(questionId, orderIndex) {
  return KIOSK_ACCENTS[(questionId * 5 + orderIndex) % KIOSK_ACCENTS.length];
}

function getSoftAccent(hexColor) {
  const clean = String(hexColor || "#1FCC38")
    .replace("#", "")
    .trim();
  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : clean;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return "#DDFBE3";
  }

  const mixWithWhite = 0.68;
  const channels = [0, 2, 4].map((start) => {
    const value = parseInt(normalized.slice(start, start + 2), 16);
    return Math.round(value + (255 - value) * mixWithWhite)
      .toString(16)
      .padStart(2, "0");
  });

  return `#${channels.join("")}`;
}

const SVG_MARKUP_CACHE = new Map();

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scopeSvgMarkup(markup, scope) {
  const suffix = scope.replace(/[^a-zA-Z0-9_-]/g, "-");
  const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

  return ids.reduce((scopedMarkup, id) => {
    const escapedId = escapeRegExp(id);
    const scopedId = `${id}-${suffix}`;

    return scopedMarkup
      .replace(new RegExp(`id="${escapedId}"`, "g"), `id="${scopedId}"`)
      .replace(new RegExp(`url\\(#${escapedId}\\)`, "g"), `url(#${scopedId})`)
      .replace(new RegExp(`#${escapedId}(?=["'])`, "g"), `#${scopedId}`);
  }, markup);
}

function applySvgAccent(markup, accent) {
  return markup.replace(
    /var\(--svg-accent(?:,\s*#[0-9a-fA-F]{3,6})?\)/g,
    accent,
  );
}

const APP_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&family=Inter:wght@400;500&display=swap');

.xq-quiz-shell {
  min-height: 100vh;
  background: #0A0A0A;
  color: #FFFFFF;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.xq-quiz {
  width: 100%;
  max-width: 680px;
  padding: 48px 24px;
  box-sizing: border-box;
}

.fade-in {
  animation: xqFadeIn 200ms ease both;
}

@keyframes xqFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 34px;
}

.xq-mark {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #1FCC38;
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-weight: 900;
  font-size: 26px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0;
}

.eyebrow,
.progress-label,
.result-meta,
.attribution,
.competency-code,
.legend-item,
.score-note {
  font-size: 13px;
  line-height: 1.4;
  color: #C8C8C8;
}

.eyebrow,
.progress-label,
.result-meta,
.competency-code {
  text-transform: uppercase;
  letter-spacing: 0;
}

.headline,
.scenario,
.section-title,
.top-outcome-name {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0;
  margin: 0;
}

.headline {
  font-size: 56px;
  line-height: 0.94;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 24px;
  line-height: 1.25;
  color: #FFFFFF;
  margin: 0 0 22px;
}

.body-copy,
.audience-copy,
.outcome-description,
.competency-description,
.also-copy {
  font-size: 17px;
  line-height: 1.55;
  color: #C8C8C8;
  margin: 0;
}

.audience-copy {
  color: #FFFFFF;
  margin-top: 18px;
}

.welcome-actions {
  margin-top: 34px;
}

.button {
  appearance: none;
  border: 1px solid #FFFFFF;
  border-radius: 8px;
  background: transparent;
  color: #FFFFFF;
  cursor: pointer;
  min-height: 46px;
  padding: 0 18px;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease, opacity 160ms ease;
}

.button:hover:not(:disabled),
.button:focus-visible:not(:disabled) {
  background: #1FCC38;
  border-color: #1FCC38;
  color: #0A0A0A;
  outline: none;
}

.button.primary {
  background: #1FCC38;
  border-color: #1FCC38;
  color: #0A0A0A;
}

.button.primary:hover:not(:disabled),
.button.primary:focus-visible:not(:disabled) {
  background: #FFFFFF;
  border-color: #FFFFFF;
  color: #0A0A0A;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.38;
}

.question-top {
  margin-bottom: 28px;
}

.question-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.progress-track {
  width: 100%;
  height: 4px;
  background: #1A1A1A;
  border-radius: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #1FCC38;
  border-radius: 8px;
  transition: width 200ms ease;
}

.scenario {
  font-size: 36px;
  line-height: 1.02;
  margin: 28px 0 24px;
}

.answer-list {
  display: grid;
  gap: 12px;
}

.answer-card {
  width: 100%;
  min-height: 82px;
  text-align: left;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  background: #1A1A1A;
  color: #FFFFFF;
  padding: 18px;
  cursor: pointer;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.45;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.answer-card:hover,
.answer-card:focus-visible,
.answer-card.selected {
  border-color: var(--accent);
  background: var(--accent-tint);
  outline: none;
}

.answer-card:hover,
.answer-card:focus-visible {
  transform: translateY(-1px);
}

.answer-card.selected {
  transform: translateY(0);
}

.quiz-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
}

.quiz-actions .button {
  min-width: 120px;
}

.results-header {
  margin-bottom: 28px;
}

.section-title {
  font-size: 30px;
  line-height: 1;
  margin-bottom: 14px;
}

.top-outcome {
  border-left: 4px solid var(--accent);
  padding-left: 18px;
  margin-bottom: 28px;
}

.top-outcome-name {
  color: var(--accent);
  font-size: 40px;
  line-height: 0.98;
  margin-bottom: 12px;
}

.top-outcome-stack {
  display: grid;
  gap: 18px;
}

.chart-surface {
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 18px 12px 16px;
  margin: 24px 0 30px;
}

.radar-wrap {
  width: 100%;
  height: 320px;
}

.outcome-legend {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin-top: 8px;
}

.legend-item {
  min-height: 58px;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 10px;
  background: #0A0A0A;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
}

.legend-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex: 0 0 auto;
}

.legend-score {
  color: #FFFFFF;
  font-size: 18px;
}

.competency-list {
  display: grid;
  gap: 10px;
  margin: 14px 0 30px;
}

.competency-card {
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 16px;
}

.competency-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.competency-title {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  color: #FFFFFF;
}

.outcome-pill {
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 8px;
  padding: 4px 7px;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

.also-section {
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 18px;
  margin-bottom: 28px;
}

.also-name {
  color: var(--accent);
}

.results-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 28px;
}

.attribution {
  max-width: 310px;
}

@media (max-width: 720px) {
  .xq-quiz {
    max-width: none;
    padding: 28px 14px;
  }

  .headline {
    font-size: 46px;
  }

  .scenario {
    font-size: 32px;
  }

  .top-outcome-name {
    font-size: 36px;
  }

  .outcome-legend {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .radar-wrap {
    height: 300px;
  }
}

@media (max-width: 430px) {
  .headline {
    font-size: 40px;
  }

  .subtitle {
    font-size: 22px;
  }

  .scenario {
    font-size: 28px;
  }

  .answer-card {
    min-height: 92px;
    padding: 16px;
  }

  .quiz-actions,
  .results-actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .quiz-actions .button,
  .results-actions .button {
    width: 100%;
  }

  .outcome-legend {
    grid-template-columns: 1fr;
  }
}

/* Bright kiosk refresh */
.xq-quiz-shell {
  background-color: #0A0A0A;
  background-image:
    linear-gradient(#181818 1px, transparent 1px),
    linear-gradient(90deg, #181818 1px, transparent 1px);
  background-size: 34px 34px;
}

.xq-quiz {
  max-width: 980px;
  padding: 34px 24px 46px;
}

.brand-row {
  margin-bottom: 22px;
}

.brand-row-wide {
  justify-content: space-between;
}

.xq-mark {
  border: 3px solid #0A0A0A;
  box-shadow: 6px 6px 0 #FFFFFF;
}

.eyebrow {
  color: #FFFFFF;
}

.welcome-grid,
.question-layout,
.results-hero,
.results-grid {
  display: grid;
  gap: 20px;
}

.welcome-grid {
  grid-template-columns: 1fr;
  align-items: start;
}

.welcome-copy,
.question-main,
.results-copy,
.power-panel,
.also-section {
  background: #1A1A1A;
  border: 2px solid #FFFFFF;
  border-radius: 8px;
  padding: 24px;
}

.welcome-copy {
  border-color: #1FCC38;
}

.welcome-visual,
.question-side,
.results-character-panel {
  background: #1FCC38;
  border: 2px solid #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  color: #0A0A0A;
}

.welcome-visual {
  display: grid;
  grid-template-rows: auto auto auto;
  align-content: start;
  gap: 14px;
  background: #1A1A1A;
  border-color: #2A2A2A;
}

.welcome-visual-feature {
  background: transparent;
  border: 0;
  border-radius: 8px;
  min-height: 180px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
}

.welcome-visual-feature .gradient-art {
  max-width: none;
  min-height: 180px;
  border: 0;
}

.tiny-ticket,
.audience-chip,
.score-chip,
.mini-callout,
.power-count {
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  background: #FFFFFF;
  color: #0A0A0A;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 1;
  padding: 8px 10px;
}

.tiny-ticket {
  margin-bottom: 18px;
}

.headline {
  font-size: 64px;
  line-height: 0.9;
  max-width: 720px;
}

.subtitle {
  max-width: 520px;
  font-size: 25px;
}

.body-copy {
  max-width: 560px;
  color: #FFFFFF;
}

.audience-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.welcome-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.start-card-button {
  appearance: none;
  width: min(100%, 380px);
  min-height: 132px;
  border: 3px solid #0A0A0A;
  border-radius: 0;
  background: #FFFFFF;
  color: #0A0A0A;
  cursor: pointer;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  padding: 0;
  overflow: hidden;
  text-align: left;
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
}

.start-card-button:hover,
.start-card-button:focus-visible {
  background: #0A0A0A;
  color: #FFFFFF;
  transform: translateY(-4px);
  outline: 3px solid #FFFFFF;
  outline-offset: 3px;
}

.start-card-copy {
  display: grid;
  gap: 8px;
  padding: 20px;
}

.start-card-copy strong {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 42px;
  line-height: 0.9;
  text-transform: uppercase;
}

.start-card-copy span {
  font-size: 16px;
  line-height: 1.25;
}

.start-card-pick {
  min-height: 48px;
  border-top: 3px solid #0A0A0A;
  background: #E8C832;
  color: #0A0A0A;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 18px;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 26px;
  line-height: 1;
  text-transform: uppercase;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-width: 2px;
  border-color: #FFFFFF;
  min-height: 50px;
  padding: 0 20px;
}

.button.primary {
  border-color: #0A0A0A;
  box-shadow: 5px 5px 0 #FFFFFF;
}

.button.primary:hover:not(:disabled),
.button.primary:focus-visible:not(:disabled) {
  transform: translate(1px, 1px);
  box-shadow: 3px 3px 0 #FFFFFF;
}

.button:focus-visible,
.answer-card:focus-visible,
.profile-detail:focus-within {
  outline: 3px solid #1FCC38;
  outline-offset: 3px;
}

.button svg {
  flex: 0 0 auto;
}

.crew-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.crew-card {
  background: var(--accent);
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  padding: 7px;
  min-height: 158px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6px;
}

.crew-card span {
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 15px;
  line-height: 1;
  text-transform: uppercase;
  margin-top: auto;
}

.welcome-visual .crew-strip {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.welcome-visual .crew-card {
  background: transparent;
  border: 0;
  padding: 0;
  min-height: 0;
  gap: 8px;
}

.welcome-visual .crew-card span {
  color: #FFFFFF;
  font-size: 13px;
  line-height: 1;
  margin-top: 0;
}

.welcome-visual .gradient-art.compact {
  max-width: none;
  min-height: 78px;
  border: 0;
  background: linear-gradient(135deg, var(--art-a), var(--art-b));
}

.gradient-art {
  display: block;
  width: 100%;
  max-width: 360px;
  min-height: 240px;
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  background:
    radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.35), transparent 30%),
    linear-gradient(135deg, var(--art-a), var(--art-b));
  margin: 0 auto;
}

.gradient-art.compact {
  max-width: 96px;
  min-height: 78px;
  max-height: 86px;
}

.mini-callout {
  align-self: flex-start;
  font-size: 16px;
}

.question-layout {
  grid-template-columns: 250px minmax(0, 1fr);
  align-items: start;
}

.question-side {
  position: sticky;
  top: 20px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

.question-side .gradient-art {
  max-height: 300px;
  min-height: 260px;
}

.question-count-card {
  background: #FFFFFF;
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  padding: 14px;
}

.question-count-big {
  display: block;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 72px;
  line-height: 0.9;
  color: #0A0A0A;
}

.question-count-label {
  display: block;
  color: #0A0A0A;
  font-size: 14px;
}

.question-main {
  padding: 24px;
}

.question-top {
  margin-bottom: 20px;
}

.progress-track {
  height: 8px;
  background: #2A2A2A;
  border: 2px solid #FFFFFF;
}

.progress-fill {
  background: #1FCC38;
}

.scenario {
  font-size: 44px;
  line-height: 0.98;
  margin: 20px 0 22px;
}

.answer-list {
  gap: 10px;
}

.answer-card {
  min-height: 78px;
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  border-width: 2px;
  border-color: #FFFFFF;
  background: #FFFFFF;
  color: #0A0A0A;
  font-size: 17px;
  line-height: 1.28;
}

.answer-card:hover,
.answer-card:focus-visible {
  border-color: var(--accent);
  background: #0A0A0A;
  color: #FFFFFF;
}

.answer-card:hover .answer-icon,
.answer-card:focus-visible .answer-icon {
  border-color: #FFFFFF;
}

.answer-card.selected {
  border-color: #0A0A0A;
  background: var(--accent);
  color: var(--ink);
}

.answer-card.selected:hover,
.answer-card.selected:focus-visible {
  border-color: var(--accent);
  background: #0A0A0A;
  color: #FFFFFF;
}

.answer-icon,
.competency-icon {
  width: 46px;
  height: 46px;
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  background: #FFFFFF;
  color: #0A0A0A;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.answer-picked {
  width: 34px;
  height: 34px;
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  background: #1FCC38;
  color: #0A0A0A;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 160ms ease, transform 160ms ease;
}

.answer-card.selected .answer-picked {
  opacity: 1;
  transform: scale(1);
}

.quiz-actions {
  margin-top: 20px;
}

.results-hero {
  grid-template-columns: 190px minmax(0, 1fr);
  align-items: stretch;
  margin-bottom: 20px;
}

.results-character-panel {
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  overflow: hidden;
}

.results-character-panel .gradient-art {
  max-height: 190px;
  min-height: 160px;
}

.results-character-panel .crew-strip {
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
}

.results-copy {
  border-color: var(--accent);
}

.type-card-stack {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.type-card {
  background: var(--accent);
  border: 2px solid #FFFFFF;
  border-radius: 8px;
  color: var(--ink);
  padding: 16px;
}

.type-card .result-meta {
  color: var(--ink);
  opacity: 1;
}

.top-outcome-name {
  color: var(--ink);
  font-size: 40px;
  line-height: 0.95;
  margin-bottom: 10px;
}

.type-card-copy {
  color: var(--ink);
  font-size: 18px;
  line-height: 1.4;
  margin: 0 0 10px;
}

.official-name {
  color: var(--ink);
  font-size: 13px;
  line-height: 1.25;
  opacity: 0.95;
  margin: 0;
}

.score-note {
  color: #FFFFFF;
  margin: 12px 0 0;
}

.results-grid {
  grid-template-columns: 1fr;
  align-items: start;
}

.chart-surface {
  border: 2px solid #FFFFFF;
  background:
    radial-gradient(circle at 50% 45%, rgba(31, 204, 56, 0.25), transparent 34%),
    linear-gradient(135deg, #FFFFFF 0%, #FFF38F 100%);
  color: #0A0A0A;
  padding: 18px;
  margin: 0;
}

.results-chart-top {
  margin-bottom: 20px;
}

.chart-heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 6px;
}

.chart-heading-row .section-title {
  margin-bottom: 0;
}

.chart-kicker {
  max-width: 260px;
  color: #0A0A0A;
  font-size: 14px;
  line-height: 1.35;
  margin: 0;
}

.chart-surface .section-title {
  color: #0A0A0A;
}

.radar-wrap {
  height: 430px;
  background: rgba(255, 255, 255, 0.68);
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  margin: 12px 0;
}

.outcome-legend {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.legend-item {
  background: #0A0A0A;
  border: 2px solid #0A0A0A;
  color: #FFFFFF;
}

.legend-score {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 26px;
  line-height: 0.9;
}

.power-panel {
  border-color: #55B9DF;
}

.profile-detail-list {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}

.profile-detail {
  border: 2px solid #FFFFFF;
  border-radius: 8px;
  background: #1A1A1A;
  overflow: hidden;
}

.profile-detail summary {
  cursor: pointer;
  list-style: none;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 14px;
}

.profile-detail summary::-webkit-details-marker {
  display: none;
}

.profile-detail[open] summary {
  border-bottom: 2px solid #FFFFFF;
}

.profile-detail-icon {
  width: 42px;
  height: 42px;
  border: 2px solid #0A0A0A;
  border-radius: 8px;
  background: var(--accent);
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.profile-detail-label {
  color: #C8C8C8;
  display: block;
  font-size: 13px;
  line-height: 1.2;
}

.profile-detail-title {
  color: #FFFFFF;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 25px;
  line-height: 1;
  text-transform: uppercase;
}

.profile-detail-body {
  padding: 14px;
}

.profile-detail-body p {
  color: #FFFFFF;
  font-size: 15px;
  line-height: 1.45;
  margin: 0 0 12px;
}

.career-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.career-chip {
  border: 2px solid var(--accent);
  border-radius: 8px;
  color: #FFFFFF;
  padding: 7px 9px;
  font-size: 13px;
  line-height: 1;
}

.competency-list {
  margin: 14px 0 0;
}

.competency-card {
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  background: var(--accent);
  border: 2px solid #FFFFFF;
  color: var(--ink);
  padding: 13px;
}

.competency-card details {
  margin-top: 8px;
}

.competency-card summary {
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.competency-card details p {
  color: var(--ink);
  font-size: 13px;
  line-height: 1.35;
  margin: 8px 0 0;
}

.competency-heading {
  display: block;
  margin: 0;
}

.competency-title {
  color: var(--ink);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 25px;
  line-height: 0.95;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.competency-description {
  color: var(--ink);
  font-size: 14px;
  line-height: 1.35;
}

.power-count {
  margin-top: 8px;
  font-size: 13px;
}

.also-section {
  border-color: var(--accent);
  margin-top: 20px;
}

.also-name {
  color: var(--accent);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 32px;
  line-height: 0.95;
  text-transform: uppercase;
}

.results-actions {
  background: #1A1A1A;
  border: 2px solid #FFFFFF;
  border-radius: 8px;
  padding: 16px;
}

@media (max-width: 900px) {
  .welcome-grid,
  .question-layout,
  .results-hero,
  .results-grid {
    grid-template-columns: 1fr;
  }

  .welcome-visual,
  .question-side {
    min-height: auto;
  }

  .question-side {
    position: static;
    display: grid;
    grid-template-columns: 150px minmax(0, 1fr);
    align-items: center;
  }

  .question-side .gradient-art {
    max-height: 180px;
    min-height: 160px;
  }
}

@media (max-width: 720px) {
  .xq-quiz {
    padding: 24px 12px 36px;
  }

  .welcome-copy,
  .question-main,
  .results-copy,
  .power-panel,
  .also-section {
    padding: 18px;
  }

  .headline {
    font-size: 48px;
  }

  .scenario {
    font-size: 34px;
  }

  .outcome-legend {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .welcome-visual .crew-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .answer-card {
    grid-template-columns: 44px minmax(0, 1fr) 30px;
    gap: 10px;
    font-size: 16px;
  }
}

@media (max-width: 430px) {
  .headline {
    font-size: 40px;
  }

  .question-side {
    grid-template-columns: 1fr;
  }

  .question-side .gradient-art {
    max-width: 190px;
    min-height: 150px;
  }

  .scenario {
    font-size: 30px;
  }

  .outcome-legend {
    grid-template-columns: 1fr;
  }

  .crew-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .welcome-visual .crew-strip {
    grid-template-columns: 1fr;
  }
}

/* Kiosk-led redesign */
.xq-quiz-shell {
  align-items: flex-start;
  padding: 24px;
  background:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    #0A0A0A;
  background-size: 42px 42px;
}

.xq-quiz.quiz-kiosk-shell {
  width: min(100%, 1080px);
  max-width: 1080px;
  min-height: min(1920px, calc(100vh - 48px));
  padding: 0;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-sizing: border-box;
  overflow: hidden;
}

.kiosk-screen {
  min-height: min(1920px, calc(100vh - 48px));
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  background: #000000;
}

.kiosk-sidebar {
  background: #050505;
  border-right: 1px solid rgba(255, 255, 255, 0.22);
  padding: 34px 28px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
}

.kiosk-main {
  min-width: 0;
  padding: 42px;
  box-sizing: border-box;
}

.kiosk-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.kiosk-brand .xq-mark {
  width: 54px;
  height: 54px;
  border-radius: 0;
  box-shadow: none;
  border: 0;
}

.kiosk-brand-small {
  display: block;
  color: #C8C8C8;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}

.kiosk-brand strong {
  display: block;
  color: #FFFFFF;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 32px;
  line-height: 0.92;
  text-transform: uppercase;
}

.sidebar-stack,
.sidebar-mini-list,
.profile-detail-list {
  display: grid;
  gap: 12px;
}

.sidebar-slot {
  min-height: 60px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: #121212;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.sidebar-slot.active {
  border-color: var(--slot-accent);
  background: linear-gradient(90deg, var(--slot-accent) 0 9px, #121212 9px);
}

.sidebar-slot span,
.sidebar-note-label {
  color: #C8C8C8;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}

.sidebar-slot strong {
  color: #FFFFFF;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 26px;
  line-height: 0.98;
  text-transform: uppercase;
}

.sidebar-note {
  margin-top: auto;
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 14px;
  background: #101010;
}

.sidebar-note strong {
  color: #FFFFFF;
  display: block;
  font-size: 17px;
  line-height: 1.2;
  margin: 8px 0;
}

.sidebar-note p {
  color: #C8C8C8;
  font-size: 13px;
  line-height: 1.35;
  margin: 0;
}

.mini-progress-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mini-progress-dot {
  aspect-ratio: 1;
  border: 1px solid rgba(255, 255, 255, 0.26);
  color: #FFFFFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  line-height: 1;
  background: #111111;
}

.mini-progress-dot.answered {
  background: var(--dot-accent);
  color: #0A0A0A;
  border-color: var(--dot-accent);
}

.mini-progress-dot.current {
  outline: 3px solid #FFFFFF;
  outline-offset: 2px;
}

.welcome-main {
  display: grid;
  gap: 24px;
  align-content: stretch;
  align-items: stretch;
}

.kiosk-screen .welcome-copy,
.welcome-gallery,
.chart-surface,
.results-hero,
.power-panel,
.also-section,
.results-actions {
  border-radius: 0;
  box-shadow: none;
}

.kiosk-screen .welcome-copy {
  background: #1FCC38;
  color: #0A0A0A;
  border: 0;
  padding: 70px 42px;
  width: 100%;
  max-width: none;
  min-height: 100%;
  justify-self: stretch;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.kiosk-screen .welcome-copy .headline,
.kiosk-screen .welcome-copy .subtitle,
.kiosk-screen .welcome-copy .body-copy {
  color: #0A0A0A;
}

.kiosk-screen .welcome-copy .headline {
  max-width: 700px;
  font-size: 76px;
  line-height: 0.86;
}

.kiosk-screen .welcome-copy .body-copy {
  max-width: 620px;
}

.tiny-ticket,
.audience-chip {
  border-radius: 999px;
  border: 1px solid #0A0A0A;
  box-shadow: none;
}

.welcome-gallery {
  background: #101010;
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 18px;
  padding: 18px;
}

.hero-placeholder,
.results-character-panel {
  min-height: 230px;
  display: flex;
  align-items: stretch;
}

.character-placeholder {
  width: 100%;
  min-height: 210px;
  border: 2px dashed rgba(255, 255, 255, 0.42);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent),
    linear-gradient(135deg, var(--accent), var(--pair));
  color: var(--ink);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  box-sizing: border-box;
}

.character-placeholder span {
  color: var(--ink);
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}

.character-placeholder strong {
  color: var(--ink);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 30px;
  line-height: 0.95;
  text-transform: uppercase;
}

.character-placeholder.compact {
  min-height: 126px;
}

.outcome-rack {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.outcome-rack-item {
  min-height: 132px;
  background: #FFFFFF;
  color: #0A0A0A;
  display: grid;
  grid-template-rows: 1fr auto;
  border: 0;
}

.outcome-rack-item .character-placeholder {
  min-height: 98px;
  border: 0;
}

.outcome-rack-item span {
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
  padding: 9px;
}

.button {
  border-radius: 999px;
  box-shadow: none;
}

.button.secondary {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.58);
}

.restart-button {
  width: 100%;
  margin-top: auto;
}

.button.primary {
  border-color: #1FCC38;
  box-shadow: none;
}

.button.primary:hover:not(:disabled),
.button.primary:focus-visible:not(:disabled) {
  transform: none;
  box-shadow: none;
}

.quiz-main {
  display: flex;
  flex-direction: column;
}

.question-top {
  margin-bottom: 24px;
}

.question-meta {
  justify-content: space-between;
  gap: 16px;
}

.question-nav-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.question-nav-top .button {
  min-width: 120px;
}

.auto-advance-pill {
  min-height: 46px;
  border: 3px solid #FFFFFF;
  background: #FFFFFF;
  color: #0A0A0A;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 22px;
  line-height: 1;
  text-transform: uppercase;
}

.auto-advance-pill.active {
  background: #1FCC38;
  border-color: #1FCC38;
}

.progress-percent {
  margin-left: 0;
}

.progress-track {
  height: 4px;
  border: 0;
  border-radius: 0;
  background: #242424;
}

.progress-fill {
  border-radius: 0;
}

.scenario {
  max-width: 720px;
  margin: 28px 0 0;
  font-size: 56px;
  line-height: 0.9;
}

.quiz-main .answer-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.quiz-main .answer-card {
  position: relative;
  min-height: 330px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 0;
  align-items: stretch;
  padding: 0;
  border: 3px solid transparent;
  border-radius: 0;
  background: #FFFFFF;
  color: #0A0A0A;
  overflow: hidden;
  transform: translateY(10px);
  animation: kioskCardIn 420ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: var(--stagger);
}

.quiz-main .answer-card:disabled {
  cursor: default;
}

.quiz-main .answer-card:disabled:not(.selected) {
  opacity: 0.74;
}

@keyframes kioskCardIn {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.answer-letter {
  position: absolute;
  z-index: 2;
  top: 12px;
  left: 12px;
  width: 38px;
  height: 38px;
  background: #0A0A0A;
  color: #FFFFFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 28px;
  line-height: 1;
}

.competency-asset-frame {
  width: 100%;
  min-height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.34), transparent 58%),
    var(--tile-accent-soft, var(--tile-accent));
  border-bottom: 3px solid #0A0A0A;
  padding: 12px;
  box-sizing: border-box;
  overflow: hidden;
}

.competency-asset-frame img,
.competency-asset-frame .inline-svg,
.competency-asset-frame svg {
  width: 96%;
  height: 96%;
  min-height: 178px;
  display: block;
  object-fit: contain;
}

.competency-asset-frame .inline-svg {
  display: flex;
  align-items: center;
  justify-content: center;
}

.competency-asset-frame.missing {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0A0A0A;
  font-size: 13px;
  text-transform: uppercase;
}

.answer-copy {
  padding: 20px;
  color: inherit;
  font-size: 21px;
  line-height: 1.22;
}

.answer-picked {
  width: auto;
  height: auto;
  min-height: 46px;
  border: 0;
  border-top: 3px solid #0A0A0A;
  border-radius: 0;
  background: var(--tile-accent);
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 24px;
  line-height: 1;
  text-transform: uppercase;
  opacity: 1;
  transform: none;
}

.quiz-main .answer-card:hover,
.quiz-main .answer-card:focus-visible,
.quiz-main .answer-card.selected {
  background: #0A0A0A;
  color: #FFFFFF;
  border-color: var(--tile-accent);
  outline: none;
  transform: translateY(-4px);
}

.quiz-main .answer-card:hover .answer-picked,
.quiz-main .answer-card:focus-visible .answer-picked,
.quiz-main .answer-card.selected .answer-picked {
  color: #0A0A0A;
  background: var(--tile-accent);
  border-color: var(--tile-accent);
}

.quiz-main .answer-card:hover .answer-letter,
.quiz-main .answer-card:focus-visible .answer-letter,
.quiz-main .answer-card.selected .answer-letter {
  background: var(--tile-accent);
  color: #0A0A0A;
}

.quiz-actions {
  margin-top: auto;
  padding-top: 28px;
}

.results-main {
  display: grid;
  gap: 20px;
}

.results-sidebar .sidebar-mini-list {
  margin-top: auto;
}

.sidebar-mini-card {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  min-height: 64px;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 7px;
  color: #FFFFFF;
}

.sidebar-mini-card .competency-asset-frame {
  min-height: 50px;
  border: 0;
}

.sidebar-mini-card .competency-asset-frame img,
.sidebar-mini-card .competency-asset-frame .inline-svg,
.sidebar-mini-card .competency-asset-frame svg {
  min-height: 50px;
}

.sidebar-mini-card span:last-child {
  font-size: 13px;
  line-height: 1.1;
}

.results-chart-top {
  border: 0;
  background:
    radial-gradient(circle at 50% 45%, rgba(31, 204, 56, 0.32), transparent 34%),
    linear-gradient(135deg, #FFFFFF, #FFF38F);
  color: #0A0A0A;
  padding: 24px;
}

.chart-heading-row {
  align-items: flex-start;
}

.chart-heading-row .headline {
  color: #0A0A0A;
  margin: 8px 0 0;
  font-size: 60px;
}

.chart-kicker {
  max-width: 230px;
  color: #0A0A0A;
}

.radar-wrap {
  height: 520px;
  border-radius: 0;
  border: 3px solid #0A0A0A;
  background:
    linear-gradient(rgba(10, 10, 10, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10, 10, 10, 0.08) 1px, transparent 1px),
    rgba(255, 255, 255, 0.74);
  background-size: 28px 28px;
}

.outcome-legend {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.legend-item {
  border-radius: 0;
  border: 0;
  min-height: 64px;
}

.results-hero {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 16px;
  margin: 0;
}

.results-character-panel {
  min-height: 0;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 10px;
}

.results-character-panel .character-placeholder {
  min-height: 100%;
}

.results-copy {
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 0;
  padding: 18px;
}

.type-card {
  border-radius: 0;
  border: 0;
}

.profile-detail {
  border-radius: 0;
}

.profile-detail-icon {
  border-radius: 0;
}

.power-panel {
  background: #101010;
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 20px;
}

.section-heading-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
}

.section-heading-row .section-title {
  margin: 0;
}

.competency-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.competency-card {
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  gap: 0;
  background: #FFFFFF;
  color: #0A0A0A;
  border: 3px solid var(--tile-accent);
  border-radius: 0;
  padding: 0;
  overflow: hidden;
}

.competency-card .competency-asset-frame {
  min-height: 150px;
}

.competency-card .competency-asset-frame img,
.competency-card .competency-asset-frame .inline-svg,
.competency-card .competency-asset-frame svg {
  min-height: 150px;
}

.competency-card .competency-heading {
  padding: 14px;
}

.competency-card .power-count,
.competency-card .competency-title,
.competency-card .competency-description,
.competency-card summary,
.competency-card details p {
  color: #0A0A0A;
}

.competency-card .power-count {
  display: inline-flex;
  margin: 0 0 8px;
  background: var(--tile-accent);
  border-color: var(--tile-accent);
}

.also-section {
  background: #101010;
  border: 1px solid var(--accent);
  padding: 20px;
}

.also-section .section-title {
  margin-bottom: 10px;
}

.results-actions {
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: #101010;
  padding: 18px;
}

@media (max-width: 980px) {
  .xq-quiz-shell {
    padding: 0;
  }

  .xq-quiz.quiz-kiosk-shell,
  .kiosk-screen {
    min-height: 100vh;
  }

  .kiosk-screen {
    grid-template-columns: 1fr;
  }

  .kiosk-sidebar {
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.22);
    padding: 22px;
  }

  .sidebar-stack {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sidebar-note,
  .results-sidebar .sidebar-mini-list {
    display: none;
  }

  .kiosk-main {
    padding: 26px;
  }
}

@media (max-width: 780px) {
  .kiosk-screen .welcome-copy .headline,
  .scenario,
  .chart-heading-row .headline {
    font-size: 46px;
  }

  .welcome-gallery,
  .results-hero,
  .chart-heading-row {
    grid-template-columns: 1fr;
  }

  .chart-heading-row {
    display: grid;
  }

  .question-meta {
    align-items: center;
  }

  .question-nav-top {
    width: 100%;
  }

  .question-nav-top .button {
    flex: 1;
  }

  .progress-percent {
    margin-left: auto;
  }

  .quiz-main .answer-list,
  .competency-list {
    grid-template-columns: 1fr;
  }

  .radar-wrap {
    height: 390px;
  }

  .outcome-legend {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .kiosk-main {
    padding: 18px;
  }

  .sidebar-stack {
    grid-template-columns: 1fr;
  }

  .kiosk-screen .welcome-copy,
  .results-chart-top {
    padding: 20px;
  }

  .kiosk-screen .welcome-copy .headline,
  .scenario,
  .chart-heading-row .headline {
    font-size: 38px;
  }

  .quiz-main .answer-card {
    min-height: 286px;
  }

  .outcome-rack,
  .outcome-legend {
    grid-template-columns: 1fr;
  }

  .results-actions,
  .quiz-actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }
}

/* Next kiosk scaffold integration */
.xq-quiz-shell {
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0;
  align-items: stretch;
}

.xq-quiz.quiz-kiosk-shell {
  width: 100%;
  max-width: none;
  height: 100%;
  min-height: 100%;
  border: 0;
}

.xq-quiz.quiz-kiosk-shell .kiosk-screen {
  height: 100%;
  min-height: 100%;
}

.xq-quiz.quiz-kiosk-shell.screen-results {
  overflow-y: auto;
}

.xq-quiz.quiz-kiosk-shell.screen-results .kiosk-screen {
  height: auto;
  min-height: 100%;
}

.screen-results .kiosk-main {
  padding: 24px;
}

.screen-results .results-main {
  gap: 12px;
}

.screen-results .results-chart-top {
  padding: 18px;
  margin-bottom: 0;
}

.screen-results .chart-heading-row {
  margin-bottom: 8px;
}

.screen-results .chart-heading-row .headline {
  font-size: 46px;
  line-height: 0.9;
  margin-top: 4px;
}

.screen-results .chart-kicker {
  max-width: 210px;
  font-size: 12px;
  line-height: 1.25;
}

.screen-results .radar-wrap {
  height: 315px;
  margin: 8px 0;
}

.screen-results .outcome-legend {
  gap: 6px;
}

.screen-results .legend-item {
  min-height: 48px;
  padding: 8px;
}

.screen-results .legend-score {
  font-size: 22px;
}

.screen-results .results-hero {
  grid-template-columns: 1fr;
  gap: 0;
}

.screen-results .results-copy {
  padding: 12px;
}

.screen-results .results-copy-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.screen-results .results-copy-head .tiny-ticket {
  margin-bottom: 0;
}

.screen-results .type-card-stack {
  gap: 8px;
  margin-top: 0;
}

.screen-results .type-card {
  padding: 12px;
}

.screen-results .type-card .result-meta {
  font-size: 12px;
  margin-bottom: 4px;
}

.screen-results .top-outcome-name {
  font-size: 32px;
  line-height: 0.92;
  margin-bottom: 6px;
}

.screen-results .type-card-copy {
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 0;
}

.screen-results .score-note {
  font-size: 12px;
  margin-top: 8px;
}

.screen-results .power-panel {
  padding: 14px;
}

.screen-results .section-heading-row {
  margin-bottom: 10px;
}

.screen-results .section-title {
  font-size: 26px;
}

.screen-results .competency-list {
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 0;
}

.screen-results .competency-card {
  grid-template-columns: 76px minmax(0, 1fr);
  align-items: center;
}

.screen-results .competency-card .competency-asset-frame,
.screen-results .competency-card .competency-asset-frame img,
.screen-results .competency-card .competency-asset-frame .inline-svg,
.screen-results .competency-card .competency-asset-frame svg {
  min-height: 76px;
}

.screen-results .competency-card .competency-heading {
  padding: 10px;
}

.screen-results .competency-card .power-count {
  font-size: 11px;
  margin-bottom: 5px;
  padding: 4px 6px;
}

.screen-results .competency-title {
  font-size: 22px;
  margin-bottom: 3px;
}

.screen-results .competency-description {
  font-size: 13px;
  line-height: 1.25;
}

.screen-results .results-actions {
  margin-top: 0;
  padding: 12px;
}
`;

const createEmptyCompetencyScores = () =>
  Object.keys(COMPETENCY_MAP).reduce((scores, code) => {
    scores[code] = 0;
    return scores;
  }, {});

const MAX_OUTCOME_SCORES = QUESTIONS.reduce(
  (totals, question) => {
    OUTCOME_ORDER.forEach((outcomeId) => {
      const maxForQuestion = Math.max(
        ...question.answers.map((answer) =>
          answer.competencies.reduce((count, code) => {
            return COMPETENCY_MAP[code]?.outcome === outcomeId
              ? count + 1
              : count;
          }, 0),
        ),
      );
      totals[outcomeId] += maxForQuestion;
    });

    return totals;
  },
  OUTCOME_ORDER.reduce((totals, outcomeId) => {
    totals[outcomeId] = 0;
    return totals;
  }, {}),
);

function shuffleAnswers(answers, shuffleKey = "") {
  const salt = Array.from(String(shuffleKey)).reduce((total, character) => {
    return total + character.charCodeAt(0);
  }, 0);
  const accentPool = KIOSK_ACCENTS.map((accent, index) => ({
    accent,
    sort: Math.random() + ((salt + index) % 997) / 1000000,
  }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ accent }) => accent);

  return answers
    .map((answer, originalIndex) => ({
      ...answer,
      originalIndex,
      sort: Math.random() + ((salt + originalIndex) % 997) / 1000000,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ sort, ...answer }, orderIndex) => ({
      ...answer,
      displayAccent:
        accentPool[orderIndex % accentPool.length] ||
        getAnswerAccent(1, orderIndex),
    }));
}

function formatList(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getRankGroups(outcomes) {
  const sorted = [...outcomes].sort((a, b) => {
    return (
      b.score - a.score ||
      OUTCOME_ORDER.indexOf(a.id) - OUTCOME_ORDER.indexOf(b.id)
    );
  });

  return sorted.reduce((groups, outcome) => {
    const key = Math.round(outcome.score * 1000);
    const currentGroup = groups[groups.length - 1];

    if (currentGroup && currentGroup.key === key) {
      currentGroup.items.push(outcome);
    } else {
      groups.push({ key, items: [outcome] });
    }

    return groups;
  }, []);
}

function calculateResults(selectedAnswers) {
  const competencyScores = createEmptyCompetencyScores();

  QUESTIONS.forEach((question) => {
    const selectedIndex = selectedAnswers[question.id];
    const answer = question.answers[selectedIndex];

    if (!answer) return;

    answer.competencies.forEach((code) => {
      competencyScores[code] += 1;
    });
  });

  const outcomeTotals = OUTCOME_ORDER.reduce((totals, outcomeId) => {
    totals[outcomeId] = 0;
    return totals;
  }, {});

  Object.entries(competencyScores).forEach(([code, score]) => {
    const outcomeId = COMPETENCY_MAP[code].outcome;
    outcomeTotals[outcomeId] += score;
  });

  const absoluteOutcomeScores = OUTCOME_ORDER.map((outcomeId) => {
    const raw = outcomeTotals[outcomeId];
    const max = MAX_OUTCOME_SCORES[outcomeId] || 1;
    const score = Math.min((raw / max) * 10, 10);

    return {
      ...OUTCOMES[outcomeId],
      raw,
      max,
      score,
      absoluteValue: Number(score.toFixed(1)),
    };
  });
  const highestOutcomeScore = Math.max(
    ...absoluteOutcomeScores.map((outcome) => outcome.score),
    1,
  );
  const outcomeScores = absoluteOutcomeScores.map((outcome) => ({
    ...outcome,
    value: Number(((outcome.score / highestOutcomeScore) * 10).toFixed(1)),
  }));

  const topCompetencies = Object.entries(competencyScores)
    .filter(([, score]) => score > 0)
    .sort(([codeA, scoreA], [codeB, scoreB]) => {
      if (scoreB !== scoreA) return scoreB - scoreA;
      return COMPETENCY_MAP[codeA].label.localeCompare(
        COMPETENCY_MAP[codeB].label,
      );
    })
    .slice(0, 3)
    .map(([code, score]) => ({
      code,
      score,
      ...COMPETENCY_MAP[code],
      outcomeDetails: OUTCOMES[COMPETENCY_MAP[code].outcome],
    }));

  return {
    competencyScores,
    outcomeScores,
    rankGroups: getRankGroups(outcomeScores),
    topCompetencies,
  };
}

function IconGlyph({ name, color = "currentColor", size = 24 }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: "img",
    "aria-label": `${name} icon`,
  };

  if (["map", "sources", "learn"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M4 5.5l5-2.2 6 2.2 5-2.2v15.2l-5 2.2-6-2.2-5 2.2V5.5z" />
        <path d="M9 3.3v15.2" />
        <path d="M15 5.5v15.2" />
      </svg>
    );
  }

  if (["chart", "evidence"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M4 19h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-4" />
      </svg>
    );
  }

  if (["spark", "ideas"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M12 3l1.7 5.2L19 10l-5.3 1.8L12 17l-1.7-5.2L5 10l5.3-1.8L12 3z" />
        <path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z" />
      </svg>
    );
  }

  if (["people", "community"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M17 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
        <path d="M14 18.5a4.2 4.2 0 0 1 6.5 1.5" />
      </svg>
    );
  }

  if (["compass", "wayfind"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M15.7 8.3l-2 5.4-5.4 2 2-5.4 5.4-2z" />
      </svg>
    );
  }

  if (["angle", "power"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <circle cx="12" cy="12" r="3" />
        <path d="M4 12s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
        <path d="M17 4l3-1-1 3" />
      </svg>
    );
  }

  if (["chat", "question", "mentor"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M5 6.5h14v9H9l-4 3v-12z" />
        <path d="M9 10h6" />
        <path d="M9 13h3" />
      </svg>
    );
  }

  if (["pause", "reflect", "recalibrate"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <circle cx="12" cy="12" r="8" />
        <path d="M9.5 8v8" />
        <path d="M14.5 8v8" />
      </svg>
    );
  }

  if (["heart", "respect", "values", "listen"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  if (["reframe", "remix", "iterate", "revise"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M7 7h7a4 4 0 0 1 0 8H6" />
        <path d="M9 4L6 7l3 3" />
        <path d="M15 20l3-3-3-3" />
      </svg>
    );
  }

  if (["plan", "steps"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M7 6h13" />
        <path d="M7 12h13" />
        <path d="M7 18h13" />
        <path d="M4 6h.01" />
        <path d="M4 12h.01" />
        <path d="M4 18h.01" />
      </svg>
    );
  }

  if (["connect", "network"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.2 10.8l7.6-3.6" />
        <path d="M8.2 13.2l7.6 3.6" />
      </svg>
    );
  }

  if (["proof", "filter"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M4 5h16l-6 7v5l-4 2v-7L4 5z" />
      </svg>
    );
  }

  if (["story", "audience"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <rect x="4" y="5" width="16" height="13" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    );
  }

  if (["roots"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M12 4v12" />
        <path d="M12 9c-3 0-5-2-5-5 3 0 5 2 5 5z" />
        <path d="M12 10c3 0 5-2 5-5-3 0-5 2-5 5z" />
        <path d="M12 16l-4 4" />
        <path d="M12 16l4 4" />
      </svg>
    );
  }

  if (["mobilize"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M5 15h3l7-5v10l-7-5" />
        <path d="M18 10a5 5 0 0 1 0 10" />
        <path d="M4 15v4" />
      </svg>
    );
  }

  if (["inspiration", "curious"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4z" />
      </svg>
    );
  }

  if (["feedback"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M5 5h14v10H8l-3 3V5z" />
        <path d="M9 10l2 2 4-4" />
      </svg>
    );
  }

  if (["common"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </svg>
    );
  }

  if (["make"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M5 19l4-1 9-9-3-3-9 9-1 4z" />
        <path d="M13 8l3 3" />
      </svg>
    );
  }

  if (["target", "assumption"].includes(name)) {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12l6-6" />
      </svg>
    );
  }

  if (name === "arrow") {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M5 12h13" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (name === "back") {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M19 12H6" />
        <path d="M11 6l-6 6 6 6" />
      </svg>
    );
  }

  if (name === "refresh") {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M20 12a8 8 0 0 1-13.7 5.7" />
        <path d="M4 12A8 8 0 0 1 17.7 6.3" />
        <path d="M7 18H4v3" />
        <path d="M17 6h3V3" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <title>{name} icon</title>
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </svg>
  );
}

function CompetencyAsset({
  code,
  shape = "square",
  accent = "#1FCC38",
  className = "",
}) {
  const assetPath = getCompetencyAssetPath(code, shape);
  const competency = COMPETENCY_MAP[code];
  const softAccent = getSoftAccent(accent);
  const [svgMarkup, setSvgMarkup] = useState(() => {
    return assetPath ? SVG_MARKUP_CACHE.get(assetPath) || "" : "";
  });
  const scopedSvgMarkup = useMemo(() => {
    if (!svgMarkup) return "";
    return applySvgAccent(
      scopeSvgMarkup(svgMarkup, `${shape}-${code}`),
      softAccent,
    );
  }, [code, shape, softAccent, svgMarkup]);

  useEffect(() => {
    if (!assetPath) {
      setSvgMarkup("");
      return undefined;
    }

    const cachedMarkup = SVG_MARKUP_CACHE.get(assetPath);
    if (cachedMarkup) {
      setSvgMarkup(cachedMarkup);
      return undefined;
    }

    let isActive = true;

    fetch(assetPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load ${assetPath}`);
        }
        return response.text();
      })
      .then((markup) => {
        SVG_MARKUP_CACHE.set(assetPath, markup);
        if (isActive) setSvgMarkup(markup);
      })
      .catch(() => {
        if (isActive) setSvgMarkup("");
      });

    return () => {
      isActive = false;
    };
  }, [assetPath]);

  if (!assetPath) {
    return (
      <span
        className={`competency-asset-frame missing ${className}`}
        style={{
          "--tile-accent": accent,
          "--tile-accent-soft": softAccent,
          "--svg-accent": softAccent,
        }}
      >
        <span>Graphic needed</span>
      </span>
    );
  }

  const imageSource = scopedSvgMarkup
    ? `data:image/svg+xml;utf8,${encodeURIComponent(scopedSvgMarkup)}`
    : "";

  return (
    <span
      className={`competency-asset-frame ${className}`}
      style={{
        "--tile-accent": accent,
        "--tile-accent-soft": softAccent,
        "--svg-accent": softAccent,
      }}
      role="img"
      aria-label={`${competency?.label || code} illustration`}
    >
      {imageSource ? (
        <Image
          className="inline-svg"
          src={imageSource}
          alt=""
          width={220}
          height={220}
          loading="lazy"
          unoptimized
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}

function KioskBrand() {
  return (
    <div className="kiosk-brand">
      <span className="xq-mark" aria-hidden="true">
        XQ
      </span>
      <span>
        <span className="kiosk-brand-small">Learner Profile</span>
        <strong>XQ Quiz</strong>
      </span>
    </div>
  );
}

function SidebarSlot({ label, value, active = false, accent = "#1FCC38" }) {
  return (
    <div
      className={`sidebar-slot${active ? " active" : ""}`}
      style={{ "--slot-accent": accent }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MiniProgress({
  selectedAnswers,
  selectedAnswerAccents,
  currentIndex,
}) {
  return (
    <ul className="mini-progress-grid" aria-label="Quiz progress">
      {QUESTIONS.map((question, index) => {
        const isAnswered = selectedAnswers[question.id] !== undefined;
        const isCurrent = index === currentIndex;
        const accent =
          selectedAnswerAccents[question.id] ||
          getKioskAccent(index * 3 + question.id);

        return (
          <li
            className={`mini-progress-dot${isAnswered ? " answered" : ""}${
              isCurrent ? " current" : ""
            }`}
            key={question.id}
            style={{ "--dot-accent": accent }}
            title={`Question ${question.id}${isAnswered ? " answered" : ""}`}
          >
            {question.id}
          </li>
        );
      })}
    </ul>
  );
}

function ResultCompetencyCard({ competency, index }) {
  const accent = getKioskAccent(
    index * 5 + competency.score + competency.code.length,
  );

  return (
    <article className="competency-card" style={{ "--tile-accent": accent }}>
      <CompetencyAsset code={competency.code} shape="hexagon" accent={accent} />
      <div className="competency-heading">
        <span className="power-count">Strength {index + 1}</span>
        <h3 className="competency-title">{competency.label}</h3>
        <p className="competency-description">{competency.description}</p>
      </div>
    </article>
  );
}

function renderRadarTick({ payload, x, y, textAnchor }) {
  const outcome = Object.values(OUTCOMES).find((item) => {
    return item.chartLabel === payload.value || item.id === payload.value;
  });
  const words = String(payload.value).split(" ");
  const lines =
    words.length > 2
      ? [words.slice(0, -1).join(" "), words[words.length - 1]]
      : [payload.value];

  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor={textAnchor}
      fill={outcome?.color || "#FFFFFF"}
      fontFamily="'Inter', 'Helvetica Neue', sans-serif"
      fontSize={14}
      fontWeight={500}
    >
      {lines.map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? 0 : 15}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswerAccents, setSelectedAnswerAccents] = useState({});
  const [shuffleToken, setShuffleToken] = useState(0);
  const [pendingAdvance, setPendingAdvance] = useState(null);

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedAnswerIndex = selectedAnswers[currentQuestion.id];

  const shuffledAnswers = useMemo(() => {
    const shuffleKey = `${currentQuestion.id}-${shuffleToken}`;
    return shuffleAnswers(currentQuestion.answers, shuffleKey);
  }, [currentQuestion.answers, currentQuestion.id, shuffleToken]);

  const results = useMemo(() => {
    return calculateResults(selectedAnswers);
  }, [selectedAnswers]);

  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const isAutoAdvancing = pendingAdvance?.questionId === currentQuestion.id;
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  let advanceStatusText = "Pick one to continue";
  if (isAutoAdvancing && isLastQuestion) advanceStatusText = "Building profile";
  if (isAutoAdvancing && !isLastQuestion) advanceStatusText = "Next question";
  const topOutcomes = results.rankGroups[0]?.items || [];
  const secondOutcomes = results.rankGroups[1]?.items || [];
  const quizOutcome =
    OUTCOMES[OUTCOME_ORDER[currentIndex % OUTCOME_ORDER.length]];
  const primaryOutcome = topOutcomes[0] || OUTCOMES.FK;
  const secondaryOutcome = secondOutcomes[0];

  useEffect(() => {
    const scrollMoment = `${screen}-${currentIndex}`;
    if (typeof window !== "undefined" && scrollMoment) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [screen, currentIndex]);

  useEffect(() => {
    if (!pendingAdvance) return undefined;

    const timeout = window.setTimeout(() => {
      setPendingAdvance(null);

      if (pendingAdvance.fromIndex >= QUESTIONS.length - 1) {
        setScreen("results");
        return;
      }

      setCurrentIndex(pendingAdvance.fromIndex + 1);
    }, 520);

    return () => window.clearTimeout(timeout);
  }, [pendingAdvance]);

  const startQuiz = () => {
    setPendingAdvance(null);
    setSelectedAnswers({});
    setSelectedAnswerAccents({});
    setCurrentIndex(0);
    setShuffleToken((token) => token + 1);
    setScreen("quiz");
  };

  const resetToWelcome = () => {
    setPendingAdvance(null);
    setSelectedAnswers({});
    setSelectedAnswerAccents({});
    setCurrentIndex(0);
    setShuffleToken((token) => token + 1);
    setScreen("welcome");
  };

  const selectAnswer = (originalIndex, accent) => {
    if (pendingAdvance) return;

    setSelectedAnswers((answers) => ({
      ...answers,
      [currentQuestion.id]: originalIndex,
    }));
    setSelectedAnswerAccents((accents) => ({
      ...accents,
      [currentQuestion.id]: accent,
    }));
    setPendingAdvance({
      questionId: currentQuestion.id,
      fromIndex: currentIndex,
    });
  };

  const goBack = () => {
    setPendingAdvance(null);

    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
  };

  return (
    <>
      <style>{APP_STYLES}</style>

      <main className="xq-quiz-shell">
        <div className={`xq-quiz quiz-kiosk-shell screen-${screen}`}>
          {screen === "welcome" && (
            <section
              className="kiosk-screen welcome-screen fade-in"
              aria-labelledby="welcome-title"
            >
              <aside className="kiosk-sidebar">
                <KioskBrand />
                <div className="sidebar-stack">
                  <SidebarSlot label="Round" value="Welcome" active />
                  <SidebarSlot
                    label="Questions"
                    value={`0/${QUESTIONS.length}`}
                  />
                  <SidebarSlot label="Result" value="Learner Profile" />
                </div>
                <div className="sidebar-note">
                  <span className="sidebar-note-label">Framework</span>
                  <strong>XQ Learner Outcomes</strong>
                  <p>Five outcome areas, one profile shape.</p>
                </div>
              </aside>

              <div className="kiosk-main welcome-main">
                <section className="welcome-copy">
                  <span className="tiny-ticket">
                    <IconGlyph name="spark" size={18} />
                    Your profile in under 5
                  </span>
                  <h1 className="headline" id="welcome-title">
                    Discover Your XQ Learner Profile
                  </h1>
                  <p className="subtitle">
                    Real-world scenarios. No right answers.
                  </p>
                  <p className="body-copy">
                    This quiz identifies your strongest learning competencies
                    using the XQ Learner Outcomes framework.
                  </p>

                  <div className="welcome-actions">
                    <button
                      className="start-card-button"
                      type="button"
                      onClick={startQuiz}
                    >
                      <span className="start-card-copy">
                        <strong>Start the Quiz</strong>
                        <span>Build my profile</span>
                      </span>
                      <span className="start-card-pick" aria-hidden="true">
                        Start
                        <IconGlyph name="arrow" color="#0A0A0A" size={18} />
                      </span>
                    </button>
                  </div>
                </section>
              </div>
            </section>
          )}

          {screen === "quiz" && (
            <section
              className="kiosk-screen quiz-screen fade-in"
              key={currentQuestion.id}
              aria-labelledby={`question-${currentQuestion.id}`}
            >
              <aside className="kiosk-sidebar">
                <KioskBrand />
                <div className="sidebar-stack">
                  <SidebarSlot
                    label="Question"
                    value={`${currentIndex + 1}/${QUESTIONS.length}`}
                    active
                    accent={quizOutcome.color}
                  />
                  <SidebarSlot
                    label="Answered"
                    value={`${Object.keys(selectedAnswers).length}/${QUESTIONS.length}`}
                  />
                  <SidebarSlot
                    label="Continue"
                    value={isAutoAdvancing ? "Advancing" : "Auto"}
                  />
                </div>
                <MiniProgress
                  selectedAnswers={selectedAnswers}
                  selectedAnswerAccents={selectedAnswerAccents}
                  currentIndex={currentIndex}
                />
                <button
                  className="button secondary restart-button"
                  type="button"
                  onClick={resetToWelcome}
                >
                  <IconGlyph name="refresh" size={18} />
                  Restart
                </button>
              </aside>

              <div className="kiosk-main quiz-main">
                <header className="question-top">
                  <nav
                    className="question-nav-top"
                    aria-label="Question navigation"
                  >
                    <button
                      className="button secondary"
                      type="button"
                      onClick={goBack}
                      disabled={currentIndex === 0 || isAutoAdvancing}
                    >
                      <IconGlyph name="back" size={18} />
                      Back
                    </button>
                    <span
                      className={`auto-advance-pill${isAutoAdvancing ? " active" : ""}`}
                    >
                      {advanceStatusText}
                    </span>
                  </nav>
                  <div className="question-meta">
                    <span className="progress-label">
                      Question {currentIndex + 1} of {QUESTIONS.length}
                    </span>
                    <span className="progress-label progress-percent">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="progress-track" aria-hidden="true">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <h2
                    className="scenario"
                    id={`question-${currentQuestion.id}`}
                  >
                    {currentQuestion.scenario}
                  </h2>
                </header>

                <div className="answer-list">
                  {shuffledAnswers.map((answer, orderIndex) => {
                    const isSelected =
                      selectedAnswerIndex === answer.originalIndex;
                    const assetCode = getAnswerAssetCode(
                      currentQuestion.id,
                      answer.originalIndex,
                      answer.competencies,
                    );
                    const accent =
                      answer.displayAccent ||
                      getAnswerAccent(currentQuestion.id, orderIndex);

                    return (
                      <button
                        type="button"
                        key={`${currentQuestion.id}-${answer.originalIndex}`}
                        className={`answer-card${isSelected ? " selected" : ""}`}
                        style={{
                          "--tile-accent": accent,
                          "--stagger": `${orderIndex * 85}ms`,
                        }}
                        aria-pressed={isSelected}
                        disabled={isAutoAdvancing}
                        onClick={() =>
                          selectAnswer(answer.originalIndex, accent)
                        }
                      >
                        <span className="answer-letter" aria-hidden="true">
                          {String.fromCharCode(65 + orderIndex)}
                        </span>
                        <CompetencyAsset
                          code={assetCode}
                          shape="square"
                          accent={accent}
                        />
                        <span className="answer-copy">{answer.text}</span>
                        <span className="answer-picked" aria-hidden="true">
                          {isSelected ? "Selected" : "Pick"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="quiz-actions">
                  <button
                    className="button secondary"
                    type="button"
                    onClick={goBack}
                    disabled={currentIndex === 0 || isAutoAdvancing}
                  >
                    <IconGlyph name="back" size={18} />
                    Back
                  </button>
                  <span
                    className={`auto-advance-pill${isAutoAdvancing ? " active" : ""}`}
                  >
                    {advanceStatusText}
                  </span>
                </div>
              </div>
            </section>
          )}

          {screen === "results" && (
            <section
              className="kiosk-screen results-screen fade-in"
              aria-labelledby="results-title"
            >
              <aside className="kiosk-sidebar results-sidebar">
                <KioskBrand />
                <div className="sidebar-stack">
                  <SidebarSlot
                    label="Profile"
                    value="Complete"
                    active
                    accent={primaryOutcome.color}
                  />
                  <SidebarSlot
                    label="Top outcome"
                    value={formatList(
                      topOutcomes.map((outcome) => outcome.shortName),
                    )}
                    accent={primaryOutcome.color}
                  />
                  <SidebarSlot
                    label="Second"
                    value={
                      secondOutcomes.length > 0
                        ? formatList(
                            secondOutcomes.map((outcome) => outcome.shortName),
                          )
                        : "Balanced"
                    }
                    accent={secondaryOutcome?.color || "#1FCC38"}
                  />
                </div>
                <div className="sidebar-mini-list">
                  <button
                    className="button secondary restart-button"
                    type="button"
                    onClick={resetToWelcome}
                  >
                    <IconGlyph name="refresh" size={18} />
                    Restart
                  </button>
                </div>
              </aside>

              <div className="kiosk-main results-main">
                <section
                  className="chart-surface results-chart-top"
                  aria-label="Radar chart of five XQ learner outcomes"
                >
                  <div className="chart-heading-row">
                    <div>
                      <span className="tiny-ticket">Profile web</span>
                      <h1 className="headline" id="results-title">
                        Your XQ Learner Profile
                      </h1>
                    </div>
                    <p className="chart-kicker">
                      Scaled to your strongest learner outcome, so the web shows
                      your shape.
                    </p>
                  </div>

                  <div className="radar-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={results.outcomeScores}
                        outerRadius="72%"
                      >
                        <PolarGrid stroke="#0A0A0A" radialLines />
                        <PolarAngleAxis
                          dataKey="chartLabel"
                          tick={renderRadarTick}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 10]}
                          tickCount={6}
                          axisLine={false}
                          tick={{ fill: "#0A0A0A", fontSize: 11 }}
                        />
                        <Radar
                          name="Profile shadow"
                          dataKey="value"
                          stroke="#0A0A0A"
                          fill="transparent"
                          strokeWidth={10}
                        />
                        <Radar
                          name="XQ Learner Profile"
                          dataKey="value"
                          stroke={primaryOutcome.color}
                          fill={primaryOutcome.color}
                          fillOpacity={0.5}
                          strokeWidth={5}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="outcome-legend">
                    {results.outcomeScores.map((outcome) => (
                      <div className="legend-item" key={outcome.id}>
                        <span className="legend-label">
                          <span
                            className="legend-swatch"
                            style={{ background: outcome.color }}
                            aria-hidden="true"
                          />
                          {outcome.chartLabel}
                        </span>
                        <strong className="legend-score">
                          {outcome.value.toFixed(1)}
                        </strong>
                      </div>
                    ))}
                  </div>
                </section>

                <section
                  className="results-hero"
                  style={{
                    "--accent": primaryOutcome.color,
                    "--ink": primaryOutcome.inkColor,
                  }}
                >
                  <div className="results-copy">
                    <div className="results-copy-head">
                      <span className="tiny-ticket">
                        <IconGlyph name={primaryOutcome.icon} size={18} />
                        Top learner outcome
                      </span>
                      <button
                        className="button secondary restart-button"
                        type="button"
                        onClick={resetToWelcome}
                      >
                        <IconGlyph name="refresh" size={18} />
                        Restart
                      </button>
                    </div>

                    <div className="type-card-stack compact">
                      {topOutcomes.map((outcome) => (
                        <article
                          className="type-card"
                          key={outcome.id}
                          style={{
                            "--accent": outcome.color,
                            "--ink": outcome.inkColor,
                          }}
                        >
                          <p className="result-meta">
                            {topOutcomes.length > 1
                              ? "Top score tie"
                              : outcome.quickTake}
                          </p>
                          <h2 className="top-outcome-name">
                            {outcome.archetype}
                          </h2>
                          <p className="type-card-copy">
                            {outcome.description}
                          </p>
                        </article>
                      ))}
                    </div>

                    {topOutcomes.length > 1 && (
                      <p className="score-note">
                        Your highest score is shared by{" "}
                        {formatList(topOutcomes.map((item) => item.name))}.
                      </p>
                    )}
                  </div>
                </section>

                <section className="power-panel">
                  <div className="section-heading-row">
                    <h2 className="section-title">
                      Your Strongest Competencies
                    </h2>
                    <span className="tiny-ticket">Top 3</span>
                  </div>
                  <div className="competency-list">
                    {results.topCompetencies.map((competency, index) => (
                      <ResultCompetencyCard
                        competency={competency}
                        index={index}
                        key={competency.code}
                      />
                    ))}
                  </div>
                </section>

                <div className="results-actions">
                  <p className="attribution">
                    Based on the XQ Learner Outcomes framework -
                    xqsuperschool.org
                  </p>
                  <button
                    className="button primary"
                    type="button"
                    onClick={resetToWelcome}
                  >
                    <IconGlyph name="refresh" color="#0A0A0A" size={18} />
                    Retake the Quiz
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
