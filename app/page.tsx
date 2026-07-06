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

const COMPETENCY_DETAIL_MAP = {
  "FK.AC.1": {
    sourceShort: "Express myself artistically",
    componentSkills: ["Power of art", "Making art", "Art and community"],
  },
  "FK.AC.2": {
    sourceShort: "Appreciate art and art history",
    componentSkills: ["Art history", "Trends in art", "Art and society"],
  },
  "FK.SS.1": {
    sourceShort: "Understand governments",
    componentSkills: [
      "Role of government",
      "Rights of individuals",
      "Public policy",
    ],
  },
  "FK.SS.2": {
    sourceShort: "Understand political and social power",
    componentSkills: [
      "Influencing government",
      "Social movements",
      "Social equity",
      "Economic equity",
    ],
  },
  "FK.SS.3": {
    sourceShort: "Understand economic forces",
    componentSkills: [
      "Economic behavior",
      "Economic forces",
      "Access to resources",
      "Resource competition",
    ],
  },
  "FK.SS.4": {
    sourceShort: "Understand different cultures",
    componentSkills: [
      "Cultural difference",
      "Social groupings",
      "History and culture",
      "Global connections",
    ],
  },
  "FL.ID.1": {
    sourceShort: "Interpret information from many sources",
    componentSkills: [
      "Synthesizing information",
      "Formulating questions",
      "Evaluating information",
    ],
  },
  "FL.ID.2": {
    sourceShort: "Inform and persuade others",
    componentSkills: [
      "Knowing my audience",
      "Crafting narrative",
      "Deploying communication media",
    ],
  },
  "FL.ID.3": {
    sourceShort: "Make and support arguments",
    componentSkills: [
      "Reasoning",
      "Explaining my reasoning",
      "Using evidence",
      "Constructive critique",
    ],
  },
  "FL.MST.1": {
    sourceShort: "Use math to solve problems",
    componentSkills: [
      "Expressing equivalencies",
      "Using computational tools",
      "Stating and restating a problem",
      "Analyzing patterns",
      "Checking results",
      "Using algorithms",
    ],
  },
  "FL.MST.2": {
    sourceShort: "Use math to make predictions",
    componentSkills: [
      "Modeling",
      "Understanding models",
      "Explaining models",
      "Using models",
    ],
  },
  "FL.MST.3": {
    sourceShort: "Use data to explain relationships",
    componentSkills: ["Data tools", "Data quality", "Data visualization"],
  },
  "FL.MST.4": {
    sourceShort: "Explore questions using scientific concepts",
    componentSkills: [
      "Testing variables",
      "Collecting data",
      "Modeling systems",
      "Understanding causality",
    ],
  },
  "GC.IS.1": {
    sourceShort: "Build and maintain healthy relationships",
    componentSkills: [
      "Personal needs and boundaries",
      "Effective communication",
    ],
  },
  "GC.IS.2": {
    sourceShort: "Negotiate solutions to conflict",
    componentSkills: [
      "Managing disagreement",
      "Maintaining or adjusting my viewpoint",
    ],
  },
  "GC.IS.3": {
    sourceShort: "Cultivate my understanding of others",
    componentSkills: [
      "Understanding others' viewpoints",
      "Recognizing my impact",
      "Showing understanding",
    ],
  },
  "GC.IS.4": {
    sourceShort: "Work productively with a group",
    componentSkills: [
      "Valuing others",
      "Navigating roles",
      "Reflecting on our work",
    ],
  },
  "GC.SA.1": {
    sourceShort: "Recognize the value of differences",
    componentSkills: [
      "Collaborating across difference",
      "Situating my perspective",
    ],
  },
  "GC.SA.2": {
    sourceShort: "Read and manage social dynamics",
    componentSkills: ["Holders of power", "Social Identities"],
  },
  "GC.SAg.1": {
    sourceShort: "Advocate for myself and others",
    componentSkills: ["Power dynamics", "Self and Community", "Case-making"],
  },
  "GC.SAg.2": {
    sourceShort: "Inspire and organize others",
    componentSkills: ["Effective advocacy", "Building relationships"],
  },
  "LL.SAw.1": {
    sourceShort: "Understand my physical and emotional health",
    componentSkills: [
      "Thoughts and behavior",
      "Meeting my needs",
      "Group identity",
    ],
  },
  "LL.SAw.2": {
    sourceShort: "Cope constructively with conflict",
    componentSkills: [
      "Recognizing Conflict",
      "Reacting to conflict",
      "Drivers of conflict",
    ],
  },
  "LL.SAw.3": {
    sourceShort: "Know my strengths and areas for growth",
    componentSkills: ["Academic strengths", "Skills and mindsets"],
  },
  "LL.SD.1": {
    sourceShort: "Nurture a sense of purpose",
    componentSkills: [
      "Creating conditions for learning",
      "Making learning relevant",
      "Making learning joyful",
    ],
  },
  "LL.SD.2": {
    sourceShort: "Navigate my learning path",
    componentSkills: ["Weighing options", "Iterative thinking"],
  },
  "LL.SD.3": {
    sourceShort: "Seek out the support I need",
    componentSkills: ["Identifying allies", "Visioning success"],
  },
  "LL.SM.1": {
    sourceShort: "Seek and act on feedback from others",
    componentSkills: ["Absorbing feedback", "Evaluating feedback"],
  },
  "LL.SM.2": {
    sourceShort: "Set goals and work to achieve them",
    componentSkills: [
      "Resource management",
      "Action planning",
      "Adapting my approach",
      "Planning for postsecondary",
    ],
  },
  "LL.SM.3": {
    sourceShort: "Manage emotions and behavior",
    componentSkills: ["Self-Management", "Self-Monitoring"],
  },
  "OT.Creat.1": {
    sourceShort: "Seek and develop new concepts",
    componentSkills: [
      "Asking questions",
      "Connecting relevant ideas",
      "Innovative thinking",
      "Creating original works",
    ],
  },
  "OT.Creat.2": {
    sourceShort: "Put forward new concepts",
    componentSkills: [
      "Seeking feedback",
      "Ideas for impact",
      "Ideas in context",
    ],
  },
  "OT.Crit.1": {
    sourceShort: "Understand and assess evidence",
    componentSkills: [
      "Extracting ideas",
      "Relevance",
      "Information management",
    ],
  },
  "OT.Crit.2": {
    sourceShort: "Analyze assumptions and reasoning",
    componentSkills: [
      "Language and evidence",
      "Identifying bias",
      "Contextualizing my perspective",
      "Testing my perspective",
      "Recognizing patterns",
    ],
  },
  "OT.Crit.3": {
    sourceShort: "See and make connections",
    componentSkills: [
      "Making connections",
      "Analyzing contradiction",
      "Understanding relationships",
    ],
  },
  "OT.PS.1": {
    sourceShort: "Identify and define a problem",
    componentSkills: [
      "Problem diagnosis",
      "Empathic Problem Analysis",
      "Responsible engagement",
    ],
  },
  "OT.PS.2": {
    sourceShort: "Generate creative solutions",
    componentSkills: [
      "Creating solutions",
      "Managing constraints",
      "Using design techniques",
      "Proposing improvements",
    ],
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

const FAST_QUESTION_ANSWERS = {
  1: [
    {
      text: "Check what history, rules, or context shaped the issue.",
      competencies: ["FK.SS.2", "FK.SS.4", "FK.SS.1"],
    },
    {
      text: "Compare the claims and evidence side by side.",
      competencies: ["FL.ID.1", "FL.MST.3", "LL.SD.2"],
    },
    {
      text: "Look for the assumption each article is building from.",
      competencies: ["OT.Crit.1", "OT.Crit.2", "OT.Crit.3"],
    },
    {
      text: "Ask people with different experiences how they read it.",
      competencies: ["GC.SA.1", "GC.IS.3", "LL.SAw.3"],
    },
  ],
  2: [
    {
      text: "Understand the local context and constraints first.",
      competencies: ["FK.SS.1", "FK.SS.3", "LL.SAw.3"],
    },
    {
      text: "Organize what is working and what is not.",
      competencies: ["FL.ID.1", "FL.MST.3", "FL.ID.3"],
    },
    {
      text: "Reframe the challenge before we keep pushing.",
      competencies: ["OT.PS.1", "OT.PS.2", "LL.SM.3"],
    },
    {
      text: "Bring everyone back to needs, roles, and trust.",
      competencies: ["GC.IS.1", "GC.IS.4", "GC.IS.2"],
    },
  ],
  3: [
    {
      text: "Build background through examples, culture, and context.",
      competencies: ["FK.SS.4", "FK.AC.2", "FK.SS.3"],
    },
    {
      text: "Break the topic into terms, patterns, and resources.",
      competencies: ["FL.ID.1", "FL.MST.1", "GC.IS.3"],
    },
    {
      text: "Try a small version, see what fails, and revise.",
      competencies: ["OT.Creat.1", "OT.PS.2", "GC.SA.1"],
    },
    {
      text: "Map what I know, what I need, and how I will keep going.",
      competencies: ["LL.SD.2", "LL.SD.1", "LL.SM.2"],
    },
  ],
  4: [
    {
      text: "Study the context before I decide what to emphasize.",
      competencies: ["FK.SS.2", "FK.SS.1", "LL.SAw.1"],
    },
    {
      text: "Shape the evidence into a clear, persuasive story.",
      competencies: ["FL.ID.2", "FL.ID.3", "FL.MST.3"],
    },
    {
      text: "Find the strongest counterargument and rethink my approach.",
      competencies: ["OT.Crit.2", "OT.Crit.1", "OT.Crit.3"],
    },
    {
      text: "Start from shared values and respect for the room.",
      competencies: ["GC.IS.3", "GC.SA.1", "LL.SM.3"],
    },
  ],
  5: [
    {
      text: "Learn what systems, money, or rules are shaping it.",
      competencies: ["FK.SS.1", "FK.SS.3", "FK.SS.2"],
    },
    {
      text: "Turn the facts into something clear and usable.",
      competencies: ["FL.ID.1", "FL.ID.2", "LL.SAw.2"],
    },
    {
      text: "Look for the root problem before jumping to a fix.",
      competencies: ["OT.PS.1", "OT.PS.2", "LL.SD.3"],
    },
    {
      text: "Connect them to people who can act together.",
      competencies: ["GC.SAg.1", "GC.SAg.2", "GC.IS.4"],
    },
  ],
  6: [
    {
      text: "Look at art, culture, and examples before making my move.",
      competencies: ["FK.AC.2", "FK.AC.1", "FK.SS.4"],
    },
    {
      text: "Turn the idea into a clear message someone can follow.",
      competencies: ["FL.ID.2", "FL.ID.1", "LL.SD.2"],
    },
    {
      text: "Generate a pile of possibilities before choosing one.",
      competencies: ["OT.Creat.1", "OT.Creat.2", "OT.PS.2"],
    },
    {
      text: "Share an early version and use reactions to shape it.",
      competencies: ["GC.IS.3", "GC.IS.4", "LL.SM.1"],
    },
  ],
  7: [
    {
      text: "Compare the feedback with the purpose of the work.",
      competencies: ["FK.AC.2", "FK.AC.1", "GC.IS.1"],
    },
    {
      text: "Ask clarifying questions until the feedback is specific.",
      competencies: ["FL.ID.3", "FL.ID.1", "FL.ID.2"],
    },
    {
      text: "Test whether the feedback points to a stronger idea.",
      competencies: ["OT.Crit.2", "OT.Crit.3", "GC.IS.2"],
    },
    {
      text: "Separate my reaction from what might help me grow.",
      competencies: ["LL.SM.1", "LL.SM.3", "LL.SAw.3"],
    },
  ],
  8: [
    {
      text: "Notice the history, rules, and culture under the disagreement.",
      competencies: ["FK.SS.1", "FK.SS.2", "FK.SS.4"],
    },
    {
      text: "Track the strongest evidence and what each claim means.",
      competencies: ["FL.ID.1", "FL.ID.3", "LL.SD.2"],
    },
    {
      text: "Combine the best parts into a better option.",
      competencies: ["OT.Crit.3", "OT.Creat.1", "LL.SD.1"],
    },
    {
      text: "Pay attention to power, voice, conflict, and trust.",
      competencies: ["GC.SA.2", "GC.SA.1", "GC.IS.2"],
    },
  ],
  9: [
    {
      text: "Explore a topic, place, or story I am curious about.",
      competencies: ["FK.SS.4", "FK.AC.2", "GC.IS.1"],
    },
    {
      text: "Read, watch, or listen until I can explain something new.",
      competencies: ["FL.ID.1", "FL.ID.2", "GC.IS.3"],
    },
    {
      text: "Make something just to see what happens.",
      competencies: ["OT.Creat.1", "OT.Creat.2", "OT.PS.2"],
    },
    {
      text: "Rest, reset, and check in with where I am headed.",
      competencies: ["LL.SAw.1", "LL.SAw.3", "LL.SM.2"],
    },
  ],
  10: [
    {
      text: "Ask what real-world context the numbers came from.",
      competencies: ["FK.SS.3", "FK.SS.1", "LL.SD.2"],
    },
    {
      text: "Chart it, model it, or break it into smaller pieces.",
      competencies: ["FL.MST.3", "FL.MST.2", "FL.MST.1"],
    },
    {
      text: "Question the frame and look for a different angle.",
      competencies: ["OT.Crit.2", "OT.PS.1", "LL.SM.3"],
    },
    {
      text: "Talk it through with someone who sees patterns differently.",
      competencies: ["GC.SA.1", "GC.IS.3", "GC.IS.4"],
    },
  ],
};

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
    strengths: [
      "See broad context and connections others miss.",
      "Translate history, systems, and culture into actionable insight.",
      "Spot long-term patterns that improve decisions.",
    ],
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
    strengths: [
      "Turn complex information into clear, usable ideas.",
      "Make evidence and data meaningful for different audiences.",
      "Explain findings so others can act on them.",
    ],
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
    strengths: [
      "Generate bold ideas and move from concept to prototype.",
      "Experiment quickly to learn what works.",
      "Embrace uncertainty and adapt fast.",
    ],
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
    strengths: [
      "Bring people together and build trust across differences.",
      "Facilitate productive teamwork under pressure.",
      "Design fair processes that help groups act effectively.",
    ],
  },
  LL: {
    id: "LL",
    name: "Learners for Life",
    shortName: "Learners for Life",
    archetype: "Learners for Life",
    chartLabel: "Learners for Life",
    icon: "compass",
    color: "#1FCC38",
    pairColor: "#0FAF2E",
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
    strengths: [
      "Reflect and adapt to grow continuously.",
      "Set goals, iterate, and sustain momentum.",
      "Ask for and use feedback to improve.",
    ],
  },
};

const PROFILE_CHARACTER_ASSETS = {
  FK: "/xq-profile-characters/foundational-knowledge.svg",
  FL: "/xq-profile-characters/fundamental-literacies.svg",
  OT: "/xq-profile-characters/original-thinkers.svg",
  GC: "/xq-profile-characters/generous-collaborators.svg",
  LL: "/xq-profile-characters/learners-for-life.svg",
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

function getMutedAccent(hexColor) {
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
    return "#255A2D";
  }

  const [red, green, blue] = [0, 2, 4].map((start) => {
    return parseInt(normalized.slice(start, start + 2), 16) / 255;
  });
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;
  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === red) hue = (green - blue) / delta + (green < blue ? 6 : 0);
    if (max === green) hue = (blue - red) / delta + 2;
    if (max === blue) hue = (red - green) / delta + 4;
    hue /= 6;
  }

  const mutedSaturation = saturation * 0.68;
  const darkerLightness = Math.min(Math.max(lightness * 0.42, 0.2), 0.32);

  const hueToRgb = (p, q, t) => {
    let value = t;
    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
    return p;
  };

  const q =
    darkerLightness < 0.5
      ? darkerLightness * (1 + mutedSaturation)
      : darkerLightness + mutedSaturation - darkerLightness * mutedSaturation;
  const p = 2 * darkerLightness - q;
  const channels =
    mutedSaturation === 0
      ? [darkerLightness, darkerLightness, darkerLightness]
      : [
          hueToRgb(p, q, hue + 1 / 3),
          hueToRgb(p, q, hue),
          hueToRgb(p, q, hue - 1 / 3),
        ];

  return `#${channels
    .map((channel) =>
      Math.round(channel * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

const SVG_MARKUP_CACHE = new Map();
const COMPETENCY_ASSET_COLOR_CACHE = {};

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

function getOriginalSvgAccent(markup) {
  const match = markup.match(/var\(--svg-accent,\s*(#[0-9a-fA-F]{3,6})\)/);
  return match?.[1] || "#1FCC38";
}

function applyOriginalSvgAccent(markup) {
  return markup.replace(/var\(--svg-accent,\s*(#[0-9a-fA-F]{3,6})\)/g, "$1");
}

function normalizeHex(hex) {
  if (!hex) return null;
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) cleaned = cleaned.split('').map(c => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
  return `#${cleaned.toUpperCase()}`;
}

function hexToRgb(hex) {
  const h = normalizeHex(hex);
  if (!h) return null;
  return [0,2,4].map(i => parseInt(h.slice(1+i, 1+i+2), 16));
}

function luminanceOf(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 1;
  const [r,g,b] = rgb.map(v => v / 255).map(v => (v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function extractCandidateHexesFromSvg(markup) {
  if (!markup) return [];
  const matches = [...markup.matchAll(/(?:fill|stroke)=["']\s*(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}))\s*["']/g)];
  const seen = new Map();
  for (const m of matches) {
    const raw = m[1];
    const hex = normalizeHex(raw);
    if (!hex) continue;
    // skip transparent-like
    if (hex === '#000000' || hex === '#FFFFFF') continue;
    // skip extremes by luminance
    const lum = luminanceOf(hex);
    if (lum > 0.94 || lum < 0.06) continue;
    seen.set(hex, (seen.get(hex) || 0) + 1);
  }
  // sort by frequency
  return [...seen.entries()].sort((a,b) => b[1]-a[1]).map(e => e[0]);
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
  align-items: stretch;
  gap: 12px;
}

.start-card-button {
  appearance: none;
  flex: 1 1 260px;
  min-width: min(100%, 260px);
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

.start-card-button.fast-mode .start-card-pick {
  background: #FFF38F;
}

.start-card-button.detailed-mode .start-card-pick {
  background: #55B9DF;
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

.results-restart-button {
  width: 100%;
  height: 46px;
  min-height: 46px;
  max-height: 46px;
  align-self: start;
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

.kiosk-screen .welcome-copy .tiny-ticket {
  align-self: flex-start;
  width: fit-content;
  border: 0;
  background: transparent;
  color: #0A0A0A;
  padding: 0;
  margin-bottom: 16px;
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
  min-height: 46px;
  padding-block: 0;
  box-sizing: border-box;
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

.question-nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.question-nav-top .button {
  min-width: 120px;
}

.question-nav-top .theme-icon-toggle {
  width: 46px;
  min-width: 46px;
  height: 46px;
  min-height: 46px;
  padding: 0;
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
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: 43px;
  font-weight: 500;
  line-height: 1.1;
  text-transform: none;
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
  min-height: 0;
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
  max-width: 100%;
  width: 100%;
  height: auto;
  max-height: 100%;
  display: block;
  object-fit: cover;
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

.answer-picked-check {
  display: none;
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
  background: var(--tile-accent-soft, #FFFFFF);
  color: #0A0A0A;
  border: 3px solid var(--tile-accent);
  border-radius: 0;
  padding: 0;
  overflow: hidden;
}

.competency-card .competency-asset-frame {
  min-height: 150px;
  padding-top: 18px;
  box-sizing: border-box;
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

.screen-results .attribution {
  max-width: none;
}

.screen-results .results-restart-button {
  margin-top: 0;
  height: 46px;
  min-height: 46px;
  max-height: 46px;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 0 0 auto;
  border-radius: 999px;
}

.theme-toggle svg {
  flex: 0 0 auto;
}

.theme-icon-toggle {
  width: 46px;
  min-width: 46px;
  height: 46px;
  min-height: 46px;
  padding: 0;
}

.theme-icon-toggle .theme-toggle-label {
  display: none;
}

.theme-mode-switch {
  appearance: none;
  min-height: 66px;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: #121212;
  padding: 8px 12px 9px;
  display: block;
  box-sizing: border-box;
}

.theme-mode-label {
  float: left;
  width: 100%;
  color: #C8C8C8;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
  padding: 0;
  margin: 0 0 7px;
}

.theme-mode-switch::after {
  content: "";
  display: block;
  clear: both;
}

.theme-mode-track {
  clear: both;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-height: 34px;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: #050505;
  box-sizing: border-box;
  overflow: hidden;
}

.theme-mode-thumb {
  position: absolute;
  z-index: 0;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc((100% - 6px) / 2);
  background: #1FCC38;
  border: 1px solid #1FCC38;
  box-sizing: border-box;
  transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1), background 160ms ease, border-color 160ms ease;
}

.theme-mode-switch[data-theme-mode="dark"] .theme-mode-thumb {
  transform: translateX(100%);
  background: #FFFFFF;
  border-color: #FFFFFF;
}

.theme-mode-option {
  position: relative;
  z-index: 1;
  appearance: none;
  border: 0;
  background: transparent;
  color: #C8C8C8;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 28px;
  min-width: 0;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  transition: color 160ms ease, transform 160ms ease;
}

.theme-mode-option.active {
  color: #0A0A0A;
  transform: translateY(-1px);
}

.theme-mode-option:focus-visible {
  outline: 2px solid #1FCC38;
  outline-offset: -2px;
}

.mobile-screen-tools {
  display: none;
}

.mobile-theme-toggle {
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  padding: 0;
  border-radius: 999px;
}

.mobile-theme-toggle .theme-toggle-label {
  display: none;
}

.mobile-only {
  display: none;
}

.preview-mode-toggle {
  display: none;
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 50;
  gap: 6px;
  margin: 0;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(10, 10, 10, 0.88);
  color: #FFFFFF;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(10px);
}

.preview-mode-toggle button {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: transparent;
  color: #FFFFFF;
  cursor: pointer;
  min-height: 34px;
  padding: 0 12px;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.preview-mode-toggle button.active {
  background: #1FCC38;
  border-color: #1FCC38;
  color: #0A0A0A;
}

.preview-mode-toggle legend {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (min-width: 701px) {
  .preview-mode-toggle {
    display: flex;
  }
}

.xq-quiz-shell.preview-mobile {
  --phone-preview-height: 844px;
  align-items: center;
  justify-content: center;
  padding: 22px;
  overflow: auto;
}

.xq-quiz-shell.preview-mobile .xq-quiz.quiz-kiosk-shell {
  width: 390px;
  max-width: calc(100vw - 44px);
  height: var(--phone-preview-height);
  min-height: 0;
  flex: 0 0 auto;
  border: 8px solid #181818;
  border-radius: 30px;
  overflow: hidden;
}

.xq-quiz-shell.preview-mobile .kiosk-screen {
  grid-template-columns: 1fr;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.xq-quiz-shell.preview-mobile .kiosk-sidebar {
  display: none;
}

.xq-quiz-shell.preview-mobile .kiosk-main {
  padding: 14px;
}

.xq-quiz-shell.preview-mobile .welcome-main {
  align-content: stretch;
}

.xq-quiz-shell.preview-mobile .kiosk-screen .welcome-copy {
  padding: 22px 18px;
}

.xq-quiz-shell.preview-mobile .kiosk-screen .welcome-copy .tiny-ticket {
  margin-bottom: 12px;
  font-size: 12px;
}

.xq-quiz-shell.preview-mobile .kiosk-screen .welcome-copy .headline {
  font-size: 46px;
  line-height: 0.86;
  margin-bottom: 10px;
}

.xq-quiz-shell.preview-mobile .kiosk-screen .welcome-copy .subtitle {
  font-size: 18px;
  line-height: 1.15;
  margin-bottom: 12px;
}

.xq-quiz-shell.preview-mobile .kiosk-screen .welcome-copy .body-copy {
  font-size: 13px;
  line-height: 1.32;
  max-width: none;
}

.xq-quiz-shell.preview-mobile .welcome-actions {
  gap: 8px;
  margin-top: 18px;
}

.xq-quiz-shell.preview-mobile .start-card-button {
  flex-basis: 100%;
  min-height: 104px;
}

.xq-quiz-shell.preview-mobile .start-card-copy {
  gap: 5px;
  padding: 14px;
}

.xq-quiz-shell.preview-mobile .start-card-copy strong {
  font-size: 31px;
}

.xq-quiz-shell.preview-mobile .start-card-copy span {
  font-size: 13px;
}

.xq-quiz-shell.preview-mobile .start-card-pick {
  min-height: 38px;
  font-size: 20px;
}

.xq-quiz-shell.preview-mobile .quiz-main {
  gap: 10px;
}

.xq-quiz-shell.preview-mobile .question-top {
  margin-bottom: 10px;
}

.xq-quiz-shell.preview-mobile .question-nav-top {
  gap: 6px;
  margin-bottom: 8px;
}

.xq-quiz-shell.preview-mobile .question-nav-top .button {
  min-width: 0;
  min-height: 36px;
  padding: 0 10px;
  font-size: 12px;
}

.xq-quiz-shell.preview-mobile .mobile-only {
  display: inline-flex;
}

.xq-quiz-shell.preview-mobile .auto-advance-pill {
  min-height: 36px;
  border-width: 2px;
  padding: 0 9px;
  font-size: 15px;
}

.xq-quiz-shell.preview-mobile .question-meta {
  margin-bottom: 8px;
}

.xq-quiz-shell.preview-mobile .progress-label {
  font-size: 11px;
}

.xq-quiz-shell.preview-mobile .scenario {
  font-size: 28px;
  line-height: 0.92;
  margin: 14px 0 0;
}

.xq-quiz-shell.preview-mobile .quiz-main .answer-list {
  grid-template-columns: 1fr;
  gap: 8px;
}

.xq-quiz-shell.preview-mobile .quiz-main .answer-card {
  height: 90px;
  min-height: 90px;
  grid-template-columns: 90px minmax(0, 1fr) 38px;
  grid-template-rows: 1fr;
  animation-delay: calc(var(--stagger) / 2);
}

.xq-quiz-shell.preview-mobile .answer-letter {
  top: 6px;
  left: 6px;
  width: 24px;
  height: 24px;
  font-size: 18px;
}

.xq-quiz-shell.preview-mobile .competency-asset-frame,
.xq-quiz-shell.preview-mobile .competency-asset-frame img,
.xq-quiz-shell.preview-mobile .competency-asset-frame .inline-svg,
.xq-quiz-shell.preview-mobile .competency-asset-frame svg {
  min-height: 90px;
}

.xq-quiz-shell.preview-mobile .competency-asset-frame {
  /* Fill available width of the host column and clip overflow so
     artwork can be cropped with object-fit:cover without showing
     stray bars. */
  width: 100%;
  height: 100%;
  max-width: 100%;
  border-right: 0; /* remove preview right border to avoid thin black bar */
  border-bottom: 0;
  padding: 0;
  margin: 0 auto; /* center horizontally inside its grid cell */
  display: block;
  align-self: center; /* center vertically in the grid row */
  overflow: hidden; /* ensure no black bars from underlying background */
  position: relative; /* allow absolute-fill child */
}

.xq-quiz-shell.preview-mobile .competency-asset-frame img,
.xq-quiz-shell.preview-mobile .competency-asset-frame .inline-svg,
.xq-quiz-shell.preview-mobile .competency-asset-frame svg {
  /* Make the graphic fill and crop the frame to avoid gaps */
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 0;
  object-fit: cover !important;
  transform: none !important;
  transform-origin: center;
  display: block;
  margin: 0;
  object-position: center center;
}

.xq-quiz-shell.preview-mobile .answer-copy {
  padding: 9px;
  font-size: 13px;
  line-height: 1.14;
  align-self: center;
}

.xq-quiz-shell.preview-mobile .answer-picked {
  min-width: 38px;
  min-height: 100%;
  border-top: 0;
  border-left: 3px solid #0A0A0A;
  font-size: 14px;
}

.xq-quiz-shell.preview-mobile .answer-picked.is-selected .answer-picked-text {
  display: none;
}

.xq-quiz-shell.preview-mobile .answer-picked.is-selected .answer-picked-check {
  display: inline-flex;
}

.xq-quiz-shell.preview-mobile .quiz-actions {
  display: none;
}

.xq-quiz-shell.preview-mobile .xq-quiz.quiz-kiosk-shell.screen-results {
  overflow-y: auto;
}

.xq-quiz-shell.preview-mobile .xq-quiz.quiz-kiosk-shell.screen-results .kiosk-screen {
  height: auto;
  min-height: 100%;
  overflow: visible;
}

.xq-quiz-shell.preview-mobile .screen-results .kiosk-main {
  padding: 12px;
}

.xq-quiz-shell.preview-mobile .screen-results .chart-heading-row {
  display: grid;
  gap: 8px;
}

.xq-quiz-shell.preview-mobile .screen-results .chart-heading-row .headline {
  font-size: 34px;
}

.xq-quiz-shell.preview-mobile .screen-results .radar-wrap {
  height: 280px;
}

.xq-quiz-shell.preview-mobile .screen-results .outcome-legend {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 700px) {
  html,
  body {
    width: 100%;
    min-height: 100dvh;
    overflow: hidden;
  }

  body,
  .kiosk-shell {
    display: block;
  }

  .kiosk-shell {
    width: 100vw;
    min-height: 100dvh;
    padding: 0;
  }

  .kiosk-canvas {
    width: 100vw;
    height: 100dvh;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .xq-quiz-shell {
    padding: 0;
    overflow: hidden;
  }

  .xq-quiz.quiz-kiosk-shell {
    width: 100%;
    max-width: none;
    height: 100dvh;
    min-height: 0;
    border: 0;
    border-radius: 0;
    overflow: hidden;
  }

  .kiosk-screen {
    grid-template-columns: 1fr;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  .kiosk-sidebar {
    display: none;
  }

  .kiosk-main {
    padding: 14px;
  }

  .kiosk-screen .welcome-copy {
    padding: 22px 18px;
  }

  .kiosk-screen .welcome-copy .tiny-ticket {
    margin-bottom: 12px;
    font-size: 12px;
  }

  .kiosk-screen .welcome-copy .headline {
    font-size: 46px;
    line-height: 0.86;
    margin-bottom: 10px;
  }

  .kiosk-screen .welcome-copy .subtitle {
    font-size: 18px;
    line-height: 1.15;
    margin-bottom: 12px;
  }

  .kiosk-screen .welcome-copy .body-copy {
    font-size: 13px;
    line-height: 1.32;
    max-width: none;
  }

  .welcome-actions {
    gap: 8px;
    margin-top: 18px;
  }

  .start-card-button {
    flex-basis: 100%;
    min-height: 104px;
  }

  .start-card-copy {
    gap: 5px;
    padding: 14px;
  }

  .start-card-copy strong {
    font-size: 31px;
  }

  .start-card-copy span {
    font-size: 13px;
  }

  .start-card-pick {
    min-height: 38px;
    font-size: 20px;
  }

  .question-top {
    margin-bottom: 10px;
  }

  .question-nav-top {
    gap: 6px;
    margin-bottom: 8px;
  }

  .question-nav-top .button {
    flex: 0 1 auto;
    min-width: 0;
    min-height: 36px;
    padding: 0 10px;
    font-size: 12px;
  }

  .mobile-only {
    display: inline-flex;
  }

  .auto-advance-pill {
    min-height: 36px;
    border-width: 2px;
    padding: 0 9px;
    font-size: 15px;
  }

  .question-meta {
    margin-bottom: 8px;
  }

  .progress-label {
    font-size: 11px;
  }

  .scenario {
    font-size: 28px;
    line-height: 0.92;
    margin: 14px 0 0;
  }

  .quiz-main .answer-list {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .quiz-main .answer-card {
    height: 90px;
    min-height: 90px;
    grid-template-columns: 90px minmax(0, 1fr) 38px;
    grid-template-rows: 1fr;
  }

  .answer-letter {
    top: 6px;
    left: 6px;
    width: 24px;
    height: 24px;
    font-size: 18px;
  }

  .quiz-main .competency-asset-frame,
  .quiz-main .competency-asset-frame img,
  .quiz-main .competency-asset-frame .inline-svg,
  .quiz-main .competency-asset-frame svg {
    min-height: 90px;
  }

  .quiz-main .competency-asset-frame {
    width: 90px;
    height: 90px;
    aspect-ratio: 1;
    border-right: 3px solid #0A0A0A;
    border-bottom: 0;
    padding: 0;
  }

  .quiz-main .competency-asset-frame img,
  .quiz-main .competency-asset-frame .inline-svg,
  .quiz-main .competency-asset-frame svg {
    width: 118%;
    height: 118%;
    min-height: 0;
    object-fit: cover;
    transform: scale(1.08);
    transform-origin: center;
  }

  .quiz-main .answer-copy {
    padding: 9px;
    font-size: 13px;
    line-height: 1.14;
    align-self: center;
  }

  .quiz-main .answer-picked {
    min-width: 38px;
    min-height: 100%;
    border-top: 0;
    border-left: 3px solid #0A0A0A;
    font-size: 14px;
  }

  .quiz-main .answer-picked.is-selected .answer-picked-text {
    display: none;
  }

  .quiz-main .answer-picked.is-selected .answer-picked-check {
    display: inline-flex;
  }

  .quiz-actions {
    display: none;
  }

  .xq-quiz.quiz-kiosk-shell.screen-results {
    overflow-y: auto;
  }

  .xq-quiz.quiz-kiosk-shell.screen-results .kiosk-screen {
    height: auto;
    min-height: 100%;
    overflow: visible;
  }

  .screen-results .kiosk-main {
    padding: 12px;
  }

  .screen-results .chart-heading-row {
    display: grid;
    gap: 8px;
  }

  .screen-results .chart-heading-row .headline {
    font-size: 34px;
  }

  .screen-results .radar-wrap {
    height: 280px;
  }

  .screen-results .outcome-legend {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.theme-light {
  background:
    linear-gradient(rgba(10, 10, 10, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10, 10, 10, 0.05) 1px, transparent 1px),
    #F7F3E8;
  color: #0A0A0A;
}

.theme-light .xq-quiz.quiz-kiosk-shell,
.theme-light .kiosk-screen {
  background: #F7F3E8;
  color: #0A0A0A;
}

.theme-light .kiosk-sidebar {
  background: #FFFFFF;
  border-color: rgba(10, 10, 10, 0.22);
}

.theme-light .kiosk-brand strong,
.theme-light .sidebar-slot strong,
.theme-light .sidebar-note strong,
.theme-light .scenario,
.theme-light .section-title,
.theme-light .progress-label,
.theme-light .attribution,
.theme-light .chart-kicker,
.theme-light .result-meta,
.theme-light .headline,
.theme-light .subtitle {
  color: #0A0A0A;
}

.theme-light .kiosk-brand-small,
.theme-light .sidebar-slot span,
.theme-light .sidebar-note-label,
.theme-light .sidebar-note p,
.theme-light .body-copy,
.theme-light .competency-description,
.theme-light .type-card-copy,
.theme-light .score-note {
  color: #474747;
}

.theme-light .sidebar-slot,
.theme-light .sidebar-note {
  background: #FBFAF4;
  border-color: rgba(10, 10, 10, 0.22);
}

.theme-light .sidebar-slot.active {
  background: linear-gradient(90deg, var(--slot-accent) 0 9px, #FFFFFF 9px);
}

.theme-light .theme-mode-switch {
  background: #FBFAF4;
  border-color: rgba(10, 10, 10, 0.22);
}

.theme-light .theme-mode-label,
.theme-light .theme-mode-option {
  color: #474747;
}

.theme-light .theme-mode-track {
  background: #FFFFFF;
  border-color: rgba(10, 10, 10, 0.22);
}

.theme-light .theme-mode-switch[data-theme-mode="dark"] .theme-mode-thumb {
  background: #0A0A0A;
  border-color: #0A0A0A;
}

.theme-light .theme-mode-option.active {
  color: #0A0A0A;
}

.theme-light .theme-mode-switch[data-theme-mode="dark"] .theme-mode-option.active {
  color: #FFFFFF;
}

.theme-light .button.secondary,
.theme-light .theme-toggle,
.theme-light .auto-advance-pill {
  background: #FFFFFF;
  border-color: #0A0A0A;
  color: #0A0A0A;
}

.theme-light .button.secondary:hover:not(:disabled),
.theme-light .button.secondary:focus-visible:not(:disabled),
.theme-light .theme-toggle:hover,
.theme-light .theme-toggle:focus-visible {
  background: #0A0A0A;
  border-color: #0A0A0A;
  color: #FFFFFF;
}

.theme-light .button.secondary:disabled {
  background: #EFECE1;
  border-color: rgba(10, 10, 10, 0.28);
  color: #77736A;
}

.theme-light .progress-track {
  background: #D8D4C7;
}

.theme-light .mini-progress-dot {
  background: transparent;
  border-color: #0A0A0A;
  color: #0A0A0A;
}

.theme-light .mini-progress-dot.answered {
  background: var(--dot-accent);
  border-color: var(--dot-accent);
  color: #0A0A0A;
}

.theme-light .mini-progress-dot.current {
  outline-color: #0A0A0A;
}

.theme-light .results-copy,
.theme-light .power-panel,
.theme-light .results-actions,
.theme-light .profile-detail {
  background: #FFFFFF;
  border-color: rgba(10, 10, 10, 0.22);
}

.theme-light .screen-results .results-copy {
  border-color: var(--accent);
}

.theme-light .chart-surface.results-chart-top {
  background:
    radial-gradient(circle at 50% 45%, rgba(31, 204, 56, 0.32), transparent 34%),
    linear-gradient(135deg, #FFFFFF, #FFF38F);
  border-color: #0A0A0A;
}

.theme-light .legend-item {
  background: linear-gradient(90deg, var(--legend-accent) 0 9px, #FFFFFF 9px);
  color: #0A0A0A;
  border: 1px solid var(--legend-accent);
}

.theme-light .legend-score,
.theme-light .legend-label {
  color: #0A0A0A;
}

.theme-light .competency-card,
.theme-light .type-card {
  background: #FFFFFF;
  border-color: #0A0A0A;
}

.theme-light .screen-results .type-card {
  background: var(--accent);
  border-color: #0A0A0A;
  color: var(--ink);
}

.theme-light .screen-results .type-card .result-meta,
.theme-light .screen-results .top-outcome-name,
.theme-light .screen-results .type-card-copy {
  color: var(--ink);
}

.theme-light .screen-results .competency-card {
  border-color: var(--tile-accent);
}

.theme-light .screen-results .competency-card .power-count {
  background: var(--tile-accent);
  border-color: var(--tile-accent);
}

.theme-light .answer-card {
  background: #FFFFFF;
  border-color: #0A0A0A;
  color: #0A0A0A;
}

.theme-light .answer-card:hover,
.theme-light .answer-card:focus-visible,
.theme-light .answer-card.selected {
  background: var(--tile-accent-deep);
  border-color: var(--tile-accent-deep);
  color: #FFFFFF;
}

.theme-light .answer-card:hover .answer-copy,
.theme-light .answer-card:focus-visible .answer-copy,
.theme-light .answer-card.selected .answer-copy {
  color: #FFFFFF;
}

.theme-light .answer-card:hover .answer-letter,
.theme-light .answer-card:focus-visible .answer-letter,
.theme-light .answer-card.selected .answer-letter {
  background: #FFFFFF;
  color: #0A0A0A;
}

.theme-light .answer-picked {
  background: var(--tile-accent);
  color: #0A0A0A;
}

.theme-light .answer-card:hover .answer-picked,
.theme-light .answer-card:focus-visible .answer-picked,
.theme-light .answer-card.selected .answer-picked {
  background: var(--tile-accent);
  color: #0A0A0A;
}

.theme-light .preview-mode-toggle {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(10, 10, 10, 0.22);
  color: #0A0A0A;
}

.theme-light .preview-mode-toggle button {
  border-color: rgba(10, 10, 10, 0.32);
  color: #0A0A0A;
}

.theme-light .preview-mode-toggle button.active {
  background: #1FCC38;
  border-color: #1FCC38;
  color: #0A0A0A;
}

.xq-quiz-shell.preview-mobile .mobile-screen-tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 8px;
}

.xq-quiz-shell.preview-mobile .question-nav-top {
  justify-content: flex-end;
}

.xq-quiz-shell.preview-mobile .question-nav-left,
.xq-quiz-shell.preview-mobile .top-back-button,
.xq-quiz-shell.preview-mobile .desktop-status-pill {
  display: none;
}

.xq-quiz-shell.preview-mobile .quiz-main {
  position: relative;
  padding-bottom: 62px;
}

.xq-quiz-shell.preview-mobile .quiz-actions {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  display: grid;
  grid-template-columns: minmax(72px, 0.42fr) minmax(0, 1fr);
  gap: 8px;
  margin: 0;
  padding: 0;
}

.xq-quiz-shell.preview-mobile .quiz-actions .button,
.xq-quiz-shell.preview-mobile .bottom-status-button {
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 0 10px;
  font-size: 12px;
}

.xq-quiz-shell.preview-mobile .bottom-status-button {
  justify-content: center;
  border-width: 2px;
  cursor: default;
}

@media (max-width: 700px) {
  .mobile-screen-tools {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: 8px;
  }

  .question-nav-top {
    justify-content: flex-end;
  }

  .question-nav-left,
  .top-back-button,
  .desktop-status-pill {
    display: none;
  }

  .quiz-main {
    position: relative;
    padding-bottom: 62px;
  }

  .quiz-actions {
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 14px;
    display: grid;
    grid-template-columns: minmax(72px, 0.42fr) minmax(0, 1fr);
    gap: 8px;
    margin: 0;
    padding: 0;
  }

  .quiz-actions .button,
  .bottom-status-button {
    width: 100%;
    min-width: 0;
    min-height: 42px;
    padding: 0 10px;
    font-size: 12px;
  }

  .bottom-status-button {
    justify-content: center;
    border-width: 2px;
    cursor: default;
  }
}

.kiosk-results-content {
  display: grid;
  gap: 12px;
}

.mobile-results-flow {
  display: none;
}

.profile-character-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  min-height: 156px;
  border: 3px solid #0A0A0A;
  background:
    radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.55), transparent 24%),
    linear-gradient(135deg, var(--accent), var(--pair));
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.profile-character-image {
  width: 86%;
  height: 86%;
  max-width: 86%;
  max-height: 86%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.profile-character-frame.no-overlay {
  border: none;
  background: transparent;
}

.profile-character-frame.no-overlay .profile-character-image {
  mix-blend-mode: normal;
}

.profile-character-frame span {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 42px;
  line-height: 1;
  text-transform: uppercase;
}

.mobile-result-page {
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  width: 100%;
  border: 2px solid var(--mobile-border, #0A0A0A);
  background: var(--mobile-surface, #FFFFFF);
  color: var(--mobile-ink, #0A0A0A);
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: visible;
}

.mobile-result-topbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.mobile-result-kicker {
  margin: 0 0 8px;
  color: var(--mobile-muted, #555555);
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}

.mobile-result-title {
  color: var(--mobile-ink, #0A0A0A);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: clamp(22px, 6.5vw, 42px);
  line-height: 0.95;
  text-transform: uppercase;
  margin: 0;
}

.mobile-radar-page {
  justify-content: flex-start;
}

.mobile-radar-card {
  width: 100%;
  height: min(310px, 43vh);
  min-height: 250px;
  margin: 16px 0 10px;
  border: 3px solid #0A0A0A;
  background:
    linear-gradient(rgba(10, 10, 10, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10, 10, 10, 0.08) 1px, transparent 1px),
    linear-gradient(135deg, #FFFFFF, #FFF38F);
  background-size: 24px 24px, 24px 24px, auto;
}

.mobile-radar-legend {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  margin-top: auto;
}

.mobile-radar-legend span {
  min-height: 32px;
  border: 2px solid #0A0A0A;
  background: #FFFFFF;
  color: #0A0A0A;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 8px;
  font-size: 11px;
  line-height: 1;
  text-align: left;
}

.mobile-radar-legend i {
  width: 11px;
  height: 11px;
  flex: 0 0 auto;
  border: 1px solid #0A0A0A;
}

.mobile-result-nav {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(76px, 0.42fr) minmax(0, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.mobile-result-nav .button {
  min-width: 0;
  width: 100%;
  min-height: 44px;
  height: 44px;
  border: 2px solid #0A0A0A;
  border-radius: 999px;
  box-shadow: none;
  font-size: 13px;
}

.mobile-result-nav .button.secondary {
  background: #FFFFFF;
  color: #0A0A0A;
}

.mobile-result-nav .button.primary {
  background: #1FCC38;
  border-color: #0A0A0A;
  color: #0A0A0A;
}

.mobile-profile-page {
  justify-content: center;
  background: var(--mobile-surface, #FFFFFF);
  color: var(--mobile-ink, #0A0A0A);
}

.mobile-profile-page .mobile-result-kicker,
.mobile-profile-page .mobile-result-title {
  color: var(--ink);
}

.mobile-profile-character {
  width: min(230px, 72%);
  min-height: 0;
  margin: 16px auto 18px;
  border-radius: 999px;
  background: #FFFFFF;
}

.mobile-profile-subtitle {
  color: var(--ink, #0A0A0A);
  font-size: 16px;
  line-height: 1.2;
  margin: 8px 0 22px;
}

.mobile-profile-points {
  width: min(300px, 100%);
  margin: 0 auto 18px;
  color: var(--ink, #0A0A0A);
  text-align: left;
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 20px;
}

.mobile-profile-points li {
  margin: 6px 0;
  font-size: 15px;
  line-height: 1.35;
}

.mobile-competencies-page {
  justify-content: center;
}

.mobile-stamp-carousel,
.mobile-profile-carousel {
  position: relative;
  width: 100%;
  height: min(345px, 48vh);
  min-height: 300px;
  margin: 14px 0 8px;
  overflow: hidden;
}

.mobile-stamp-slide,
.mobile-profile-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: min(230px, 70%);
  height: 100%;
  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 220ms ease;
}

.mobile-stamp-slide[data-offset="0"],
.mobile-profile-card[data-offset="0"] {
  opacity: 1;
  z-index: 3;
  transform: translateX(-50%) scale(1) rotate(0);
  pointer-events: auto;
}

.mobile-stamp-slide[data-offset="1"],
.mobile-profile-card[data-offset="1"] {
  opacity: 0.72;
  z-index: 2;
  transform: translateX(14%) scale(0.82) rotate(7deg);
  pointer-events: none;
}

.mobile-stamp-slide[data-offset="-1"],
.mobile-profile-card[data-offset="-1"] {
  opacity: 0.72;
  z-index: 2;
  transform: translateX(-114%) scale(0.82) rotate(-7deg);
  pointer-events: none;
}

.mobile-stamp-slide:not([data-offset="-1"]):not([data-offset="0"]):not([data-offset="1"]),
.mobile-profile-card:not([data-offset="-1"]):not([data-offset="0"]):not([data-offset="1"]) {
  opacity: 0;
  z-index: 1;
  transform: translateX(-50%) scale(0.68);
  pointer-events: none;
}

.mobile-competency-stamp {
  position: relative;
  appearance: none;
  width: 100%;
  height: 100%;
  border: 3px solid var(--tile-accent);
  background: #FFFFFF;
  color: #0A0A0A;
  cursor: pointer;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto auto;
  gap: 9px;
  padding: 18px 12px 12px;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 12px 0 rgba(10, 10, 10, 0.12);
  justify-items: center; /* center grid children horizontally */
}

.mobile-competency-stamp .competency-asset-frame {
  justify-self: center; /* ensure the asset frame centers inside the grid cell */
}


.mobile-competency-stamp::before {
  content: "";
  position: absolute;
  inset: 8px;
  border: 2px dashed rgba(10, 10, 10, 0.18);
  pointer-events: none;
}

.mobile-competency-stamp .mobile-stamp-art {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  min-height: 0;
  height: 100%;
  width: 100%;
  margin: 6px auto 0;
  border: 0;
  border-bottom: 3px solid #0A0A0A;
  padding: 6px 0 0;
  background: var(--tile-accent-soft);
  position: relative;
  overflow: hidden;
}

/* Summary page specific: remove fills/outlines around primary outcome illustrations */
.mobile-summary-page .mobile-competency-stamp::before {
  display: none;
}

.mobile-summary-page .mobile-competency-stamp {
  border: none;
  box-shadow: none;
}

.mobile-summary-page .mobile-competency-stamp .mobile-stamp-art {
  background: transparent !important;
  border-bottom: none !important;
}

.mobile-summary-header .summary-character,
.mobile-summary-page .summary-character {
  background: transparent !important;
  border: none !important;
}

.mobile-summary-header .summary-character .profile-character-image,
.mobile-summary-page .summary-character .profile-character-image {
  mix-blend-mode: normal !important;
  width: 86% !important;
  height: 86% !important;
  max-width: 86% !important;
  max-height: 86% !important;
}

.mobile-competency-stamp .mobile-stamp-art img,
.mobile-competency-stamp .mobile-stamp-art .inline-svg,
.mobile-competency-stamp .mobile-stamp-art svg {
  min-height: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: cover;
  transform: none;
  transform-origin: center;
  display: block;
}

/* Force inline SVG/img to absolutely fill the stamp art container */
.mobile-competency-stamp .mobile-stamp-art > img.inline-svg,
.mobile-competency-stamp .mobile-stamp-art > .inline-svg {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* For cases where we want the illustration to fill the container width
   while preserving aspect ratio, use a non-absolute image that scales
   to 100% width and lets the height auto-adjust. This overrides the
   absolute-fill rule above when present. */
.mobile-competency-stamp .mobile-stamp-art > img.inline-svg.fill-width {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}
.mobile-competency-stamp > strong {
  position: relative;
  z-index: 1;
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 30px;
  line-height: 0.9;
  text-transform: uppercase;
}

.mobile-competency-stamp > span:not(.competency-asset-frame) {
  position: relative;
  z-index: 1;
  color: #333333;
  font-size: 12px;
  line-height: 1.2;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.mobile-carousel-controls {
  display: inline-grid;
  grid-template-columns: 40px auto 40px;
  align-items: center;
  gap: 10px;
  border: 0;
  margin: 0;
  padding: 0;
  color: var(--mobile-ink, #0A0A0A);
}

.mobile-carousel-legend {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.mobile-carousel-controls button {
  appearance: none;
  width: 40px;
  height: 40px;
  border: 2px solid #0A0A0A;
  border-radius: 999px;
  background: #FFFFFF;
  color: #0A0A0A;
  cursor: pointer;
}

.mobile-carousel-controls span {
  font-size: 12px;
  line-height: 1;
}

.mobile-competency-hint {
  color: var(--mobile-muted, #555555);
  font-size: 12px;
  line-height: 1.3;
  margin: 10px 0 0;
}

.mobile-detail-page,
.mobile-profile-detail-page,
.mobile-summary-page,
.mobile-explore-page,
.mobile-profiles-page,
.mobile-under-construction-page {
  align-items: stretch;
  text-align: left;
  overflow-y: auto;
}

.mobile-detail-art {
  width: 100%;
  min-height: 210px;
  border: 3px solid #0A0A0A;
  margin-bottom: 14px;
}

.mobile-detail-copy {
  color: var(--mobile-muted, #555555);
  font-size: 15px;
  line-height: 1.42;
  margin: 12px 0 14px;
}

.mobile-detail-skills {
  border: 2px solid #0A0A0A;
  background: #FFFFFF;
  color: #0A0A0A;
  padding: 14px;
  margin-top: 4px;
}

.mobile-detail-skills h2 {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 28px;
  line-height: 0.95;
  text-transform: uppercase;
  margin: 0 0 10px;
}

.mobile-detail-skills ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 18px;
}

.mobile-detail-skills li {
  font-size: 14px;
  line-height: 1.24;
}

.mobile-token-page {
  justify-content: center;
  background:
    radial-gradient(circle at 50% 52%, rgba(232, 200, 50, 0.36), transparent 32%),
    #FFFFFF;
  color: #0A0A0A;
}

.token-burst {
  position: relative;
  width: 220px;
  height: 250px;
  margin: 10px auto 12px;
}

.gold-token {
  position: absolute;
  left: 50%;
  top: 52%;
  width: 132px;
  height: 132px;
  border-radius: 999px;
  border: 8px solid #FFFFFF;
  background:
    radial-gradient(circle at 34% 28%, #FFF38F, transparent 30%),
    linear-gradient(135deg, #E8C832, #FF9F1C);
  color: #0A0A0A;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  box-shadow: 0 18px 0 rgba(10, 10, 10, 0.12);
  animation: tokenFly 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.token-spark {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 12px;
  background: #F03040;
  animation: sparkleBurst 900ms ease-out both;
}

.token-spark.two {
  background: #3DBFB8;
  animation-delay: 80ms;
}

.token-spark.three {
  background: #E040A0;
  animation-delay: 130ms;
}

.token-spark.four {
  background: #6B5BEB;
  animation-delay: 170ms;
}

@keyframes tokenFly {
  from {
    opacity: 0;
    transform: translate(-50%, 55%) scale(0.48) rotate(-16deg);
  }
  72% {
    opacity: 1;
    transform: translate(-50%, -58%) scale(1.08) rotate(8deg);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0);
  }
}

@keyframes sparkleBurst {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3) rotate(0);
  }
  to {
    opacity: 1;
    transform: translate(calc(-50% + var(--spark-x, 70px)), calc(-50% + var(--spark-y, -70px))) scale(1) rotate(35deg);
  }
}

.token-spark.one {
  --spark-x: -76px;
  --spark-y: -84px;
}

.token-spark.two {
  --spark-x: 88px;
  --spark-y: -72px;
}

.token-spark.three {
  --spark-x: -62px;
  --spark-y: 76px;
}

.token-spark.four {
  --spark-x: 78px;
  --spark-y: 82px;
}

.mobile-summary-header {
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.summary-character {
  min-height: 86px;
  border-radius: 999px;
}

.mobile-summary-stamps {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.mobile-summary-stamps .mobile-competency-stamp {
  flex: 1 1 0;
  min-width: 0; /* allow items to shrink evenly and avoid content-driven expansion */
}

.mobile-summary-stamps .competency-asset-frame {
  width: 100%;
  display: block;
}

.mobile-summary-stamps .mobile-competency-stamp {
  min-height: 166px;
  padding: 0; /* remove inner padding so art fills the stamp uniformly */
  box-shadow: none;
  position: relative; /* allow child art to absolutely fill this slot */
}

.mobile-summary-stamps .mobile-competency-stamp .mobile-stamp-art {
  /* Absolutely fill the stamp slot so artwork matches the parent's
     computed width exactly and crops consistently. */
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  margin: 0;
  box-sizing: border-box;
}

.mobile-summary-stamps .mobile-competency-stamp .mobile-stamp-art img,
.mobile-summary-stamps .mobile-competency-stamp .mobile-stamp-art .inline-svg,
.mobile-summary-stamps .mobile-competency-stamp .mobile-stamp-art svg {
  /* Ensure summary thumbnails fill their art container and crop consistently */
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  transform: none;
}

.mobile-summary-stamps .mobile-competency-stamp > strong {
  font-size: 17px;
}

.mobile-summary-stamps .mobile-competency-stamp > span:not(.competency-asset-frame) {
  display: none;
}

.mobile-explore-buttons {
  display: grid;
  gap: 8px;
  margin: 8px 0 12px;
}

.mobile-explore-buttons button,
.mobile-mini-stamp,
.mobile-profile-card {
  appearance: none;
  border: 2px solid #0A0A0A;
  background: #FFFFFF;
  color: #0A0A0A;
  cursor: pointer;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-weight: 500;
}

.mobile-explore-buttons button {
  min-height: 46px;
  border-radius: 999px;
  padding: 0 14px;
  text-align: left;
}

.mobile-summary-attribution {
  color: var(--mobile-muted, #555555);
  margin: 0 0 8px;
}

.mobile-summary-page .results-restart-button {
  width: 100%;
  min-height: 44px;
  height: 44px;
  margin: 0 0 8px;
  border: 2px solid #0A0A0A;
  box-shadow: none;
}

.mobile-outcome-groups {
  display: grid;
  gap: 14px;
  margin-top: 14px;
}

.mobile-outcome-group {
  border: 2px solid var(--accent);
  background: #FFFFFF;
  padding: 10px;
}

.mobile-outcome-group h2 {
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 30px;
  line-height: 0.9;
  text-transform: uppercase;
  margin: 0 0 10px;
}

.mobile-competency-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.mobile-mini-stamp {
  min-height: 134px;
  padding: 6px;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 6px;
}

.mobile-mini-stamp-art {
  min-height: 82px;
  border: 0;
}

.mobile-mini-stamp span {
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 18px;
  line-height: 0.95;
  text-transform: uppercase;
}

.mobile-profiles-page {
  text-align: center;
}

.mobile-profile-card {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 10px;
  padding: 12px;
  height: 100%;
}

.mobile-profile-card .profile-character-frame {
  min-height: 0;
  height: 100%;
}

.mobile-profile-card strong {
  color: #0A0A0A;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 26px;
  line-height: 0.9;
  text-transform: uppercase;
}

.mobile-profile-detail-page .mobile-profile-character {
  width: min(230px, 74%);
  align-self: center;
  background: linear-gradient(135deg, var(--accent), var(--pair));
}

.mobile-under-construction-page {
  justify-content: center;
  text-align: center;
}

.construction-token {
  width: 112px;
  height: 112px;
  margin: 0 auto 20px;
  border-radius: 999px;
  background: #FFF38F;
  border: 3px solid #0A0A0A;
  color: #0A0A0A;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xq-quiz-shell.preview-mobile .kiosk-results-content {
  display: none;
}

.xq-quiz-shell.preview-mobile .screen-results .kiosk-main.results-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding: 10px;
  overflow: hidden;
}

.xq-quiz-shell.preview-mobile .xq-quiz.quiz-kiosk-shell.screen-results {
  height: var(--phone-preview-height);
  min-height: 0;
  overflow: hidden;
}

.xq-quiz-shell.preview-mobile .xq-quiz.quiz-kiosk-shell.screen-results .kiosk-screen {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.xq-quiz-shell.preview-mobile .mobile-results-flow {
  --mobile-bg: #FBFAF4;
  --mobile-surface: #FFFFFF;
  --mobile-ink: #0A0A0A;
  --mobile-muted: #555555;
  --mobile-border: #0A0A0A;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  max-height: 100%;
  min-height: 0;
  width: 100%;
  flex-direction: column;
  background: var(--mobile-bg);
  overflow: hidden;
}

.xq-quiz-shell.preview-mobile.theme-dark .mobile-results-flow {
  --mobile-bg: #0A0A0A;
  --mobile-surface: #101010;
  --mobile-ink: #FFFFFF;
  --mobile-muted: #D8D8D8;
  --mobile-border: #FFFFFF;
}

.xq-quiz-shell.preview-mobile.theme-dark .mobile-radar-card,
.xq-quiz-shell.preview-mobile.theme-dark .mobile-detail-skills,
.xq-quiz-shell.preview-mobile.theme-dark .mobile-token-page,
.xq-quiz-shell.preview-mobile.theme-dark .mobile-outcome-group,
.xq-quiz-shell.preview-mobile.theme-dark .mobile-profile-card,
.xq-quiz-shell.preview-mobile.theme-dark .mobile-mini-stamp,
.xq-quiz-shell.preview-mobile.theme-dark .mobile-explore-buttons button {
  background: #FFFFFF;
  color: #0A0A0A;
}

@media (max-width: 700px) {
  .kiosk-results-content {
    display: none;
  }

  .screen-results .kiosk-main.results-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    padding: 10px;
    overflow: hidden;
  }

  .xq-quiz.quiz-kiosk-shell.screen-results,
  .xq-quiz.quiz-kiosk-shell.screen-results .kiosk-screen {
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
  }

  .mobile-results-flow {
    --mobile-bg: #FBFAF4;
    --mobile-surface: #FFFFFF;
    --mobile-ink: #0A0A0A;
    --mobile-muted: #555555;
    --mobile-border: #0A0A0A;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    max-height: 100%;
    min-height: 0;
    width: 100%;
    flex-direction: column;
    background: var(--mobile-bg);
    overflow: hidden;
  }

  .theme-dark .mobile-results-flow {
    --mobile-bg: #0A0A0A;
    --mobile-surface: #101010;
    --mobile-ink: #FFFFFF;
    --mobile-muted: #D8D8D8;
    --mobile-border: #FFFFFF;
  }

  .theme-dark .mobile-radar-card,
  .theme-dark .mobile-detail-skills,
  .theme-dark .mobile-token-page,
  .theme-dark .mobile-outcome-group,
  .theme-dark .mobile-profile-card,
  .theme-dark .mobile-mini-stamp,
  .theme-dark .mobile-explore-buttons button {
    background: #FFFFFF;
    color: #0A0A0A;
  }
}
`;

const createEmptyCompetencyScores = () =>
  Object.keys(COMPETENCY_MAP).reduce((scores, code) => {
    scores[code] = 0;
    return scores;
  }, {});

const createEmptyOutcomeTotals = () =>
  OUTCOME_ORDER.reduce((totals, outcomeId) => {
    totals[outcomeId] = 0;
    return totals;
  }, {});

const FAST_QUESTION_COUNT = 5;

const FAST_QUESTION_POOL = QUESTIONS.map((question) => ({
  ...question,
  answers: FAST_QUESTION_ANSWERS[question.id] || question.answers,
}));

const QUIZ_MODES = {
  fast: {
    label: "Fast Mode",
    questionCount: FAST_QUESTION_COUNT,
    sidebarLabel: "Fast",
  },
  detailed: {
    label: "Detailed Mode",
    questionCount: QUESTIONS.length,
    sidebarLabel: "Detailed",
  },
};

function getMaxOutcomeScores(questions) {
  return questions.reduce((totals, question) => {
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
  }, createEmptyOutcomeTotals());
}

function scoreFastQuestionSet(questions) {
  const outcomeCounts = createEmptyOutcomeTotals();
  const competencyCounts = {};

  questions.forEach((question) => {
    question.answers.forEach((answer) => {
      answer.competencies.forEach((code) => {
        const outcomeId = COMPETENCY_MAP[code]?.outcome;
        if (outcomeId) outcomeCounts[outcomeId] += 1;
        competencyCounts[code] = (competencyCounts[code] || 0) + 1;
      });
    });
  });

  const outcomeValues = OUTCOME_ORDER.map(
    (outcomeId) => outcomeCounts[outcomeId],
  );
  const outcomeSpread = Math.max(...outcomeValues) - Math.min(...outcomeValues);
  const competencyPenalty = Object.values(competencyCounts).reduce(
    (total, count) => {
      return total + Math.max(0, count - 1) ** 2;
    },
    0,
  );
  const maxCompetencyRepeat = Math.max(...Object.values(competencyCounts), 1);

  return outcomeSpread * 1000 + maxCompetencyRepeat * 10 + competencyPenalty;
}

function selectFastQuestions() {
  let bestSet = null;
  let bestScore = Number.POSITIVE_INFINITY;

  Array.from({ length: 80 }).forEach(() => {
    const candidate = FAST_QUESTION_POOL.map((question) => ({
      question,
      sort: Math.random(),
    }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, FAST_QUESTION_COUNT)
      .map(({ question }) => question);
    const score = scoreFastQuestionSet(candidate) + Math.random() / 1000;

    if (score < bestScore) {
      bestScore = score;
      bestSet = candidate;
    }
  });

  return bestSet || FAST_QUESTION_POOL.slice(0, FAST_QUESTION_COUNT);
}

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

function calculateResults(selectedAnswers, questions = QUESTIONS) {
  const competencyScores = createEmptyCompetencyScores();
  const maxOutcomeScores = getMaxOutcomeScores(questions);

  questions.forEach((question) => {
    const selectedIndex = selectedAnswers[question.id];
    const answer = question.answers[selectedIndex];

    if (!answer) return;

    answer.competencies.forEach((code) => {
      competencyScores[code] += 1;
    });
  });

  const outcomeTotals = createEmptyOutcomeTotals();

  Object.entries(competencyScores).forEach(([code, score]) => {
    const outcomeId = COMPETENCY_MAP[code].outcome;
    outcomeTotals[outcomeId] += score;
  });

  const absoluteOutcomeScores = OUTCOME_ORDER.map((outcomeId) => {
    const raw = outcomeTotals[outcomeId];
    const max = maxOutcomeScores[outcomeId] || 1;
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

  if (name === "check") {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M5 12.5l4.2 4.2L19 6.8" />
      </svg>
    );
  }

  if (name === "sun") {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.93 19.07l1.41-1.41" />
        <path d="M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }

  if (name === "moon") {
    return (
      <svg {...commonProps}>
        <title>{name} icon</title>
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z" />
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
  preserveSvgAccent = false,
}) {
  const assetPath = getCompetencyAssetPath(code, shape);
  const competency = COMPETENCY_MAP[code];
  const softAccent = getSoftAccent(accent);
  const [svgMarkup, setSvgMarkup] = useState(() => {
    return assetPath ? SVG_MARKUP_CACHE.get(assetPath) || "" : "";
  });
  const scopedSvgMarkup = useMemo(() => {
    if (!svgMarkup) return "";
    const scopedMarkup = scopeSvgMarkup(svgMarkup, `${shape}-${code}`);
    if (preserveSvgAccent) return applyOriginalSvgAccent(scopedMarkup);

    // try to detect the primary hex used in the original asset and replace
    // its explicit fill/stroke occurrences with the softened accent so the
    // background/hue matches the competency color without preserving neon greens
    try {
      const candidates = extractCandidateHexesFromSvg(svgMarkup);
      const primary = candidates[0] || getOriginalSvgAccent(svgMarkup) || null;
      let replaced = scopedMarkup;
      if (primary) {
        const p = primary.replace('#', '');
        const re = new RegExp(`(fill|stroke)=(\\\"|\\\')#${p}(\\\"|\\\')`, 'ig');
        replaced = replaced.replace(re, `$1=$2${softAccent}$3`);
      }

      return applySvgAccent(replaced, softAccent);
    } catch (e) {
      return applySvgAccent(scopedMarkup, softAccent);
    }
  }, [code, preserveSvgAccent, shape, softAccent, svgMarkup]);
  const frameAccent = preserveSvgAccent
    ? getOriginalSvgAccent(svgMarkup)
    : softAccent;

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
          "--tile-accent-soft": frameAccent,
          "--svg-accent": frameAccent,
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
        "--tile-accent-soft": frameAccent,
        "--svg-accent": frameAccent,
      }}
      role="img"
      aria-label={`${competency?.label || code} illustration`}
    >
      {imageSource ? (
        <img
          className={`inline-svg ${String(className || "").includes("mobile-stamp-art") ? "fill-width" : ""}`}
          src={imageSource}
          alt=""
          loading="lazy"
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

function ThemeToggle({ themeMode, onToggle, mobile = false, className = "" }) {
  const isDark = themeMode === "dark";
  const nextLabel = isDark ? "Light mode" : "Dark mode";
  const iconName = isDark ? "sun" : "moon";

  return (
    <button
      className={`button secondary theme-toggle theme-icon-toggle${mobile ? " mobile-theme-toggle" : ""}${className ? ` ${className}` : ""}`}
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextLabel}`}
      title={`Switch to ${nextLabel}`}
    >
      <IconGlyph name={iconName} size={18} />
      <span className="theme-toggle-label">{nextLabel}</span>
    </button>
  );
}

function ThemeModeSwitch({ themeMode, onToggle }) {
  const options = [
    { id: "light", icon: "sun", label: "Light" },
    { id: "dark", icon: "moon", label: "Dark" },
  ];

  return (
    <fieldset className="theme-mode-switch" data-theme-mode={themeMode}>
      <legend className="theme-mode-label">Display</legend>
      <div className="theme-mode-track">
        <span className="theme-mode-thumb" aria-hidden="true" />
        {options.map((option) => (
          <button
            className={`theme-mode-option${themeMode === option.id ? " active" : ""}`}
            type="button"
            key={option.id}
            onClick={() => {
              if (themeMode !== option.id) onToggle();
            }}
            aria-pressed={themeMode === option.id}
          >
            <IconGlyph name={option.icon} size={16} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function MiniProgress({
  questions,
  selectedAnswers,
  selectedAnswerAccents,
  currentIndex,
}) {
  return (
    <ul className="mini-progress-grid" aria-label="Quiz progress">
      {questions.map((question, index) => {
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
            {index + 1}
          </li>
        );
      })}
    </ul>
  );
}

function ResultCompetencyCard({ competency, index }) {
  const fallback = getKioskAccent(
    index * 5 + competency.score + competency.code.length,
  );
  const assetPrimary = COMPETENCY_ASSET_COLOR_CACHE[competency.code];
  const outcomeColor = (competency.outcome && OUTCOMES[competency.outcome]?.color) || null;
  const accent = assetPrimary || competency.outcomeDetails?.color || outcomeColor || fallback;
  const tileAccentSoft = getSoftAccent(accent);

  return (
    <article
      className="competency-card"
      style={{ "--tile-accent": accent, "--tile-accent-soft": tileAccentSoft }}
    >
      <CompetencyAsset code={competency.code} shape="hexagon" accent={accent} />
      <div className="competency-heading">
        <span className="power-count">Strength {index + 1}</span>
        <h3 className="competency-title">{competency.label}</h3>
        <p className="competency-description">{competency.description}</p>
      </div>
    </article>
  );
}

function getCircularOffset(index, activeIndex, length) {
  if (!length) return 0;
  let offset = index - activeIndex;
  const halfway = length / 2;

  if (offset > halfway) offset -= length;
  if (offset < -halfway) offset += length;

  return offset;
}

function ProfileCharacter({ outcome, className = "" }) {
  const src = PROFILE_CHARACTER_ASSETS[outcome.id];
  const extraClass = outcome.id === 'LL' ? 'no-overlay' : '';

  return (
    <div
      className={`profile-character-frame ${extraClass} ${className}`}
      style={{
        "--accent": outcome.color,
        "--pair": outcome.pairColor,
        "--ink": outcome.inkColor,
      }}
    >
      {src ? (
        <Image
          className="profile-character-image"
          src={src}
          alt=""
          width={320}
          height={320}
          unoptimized
          aria-hidden="true"
        />
      ) : (
        <span>{outcome.shortName}</span>
      )}
    </div>
  );
}

function MobileResultNav({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Next",
  hideBack = false,
  hideNext = false,
}) {
  return (
    <div className="mobile-result-nav">
      {hideBack ? (
        <span aria-hidden="true" />
      ) : (
        <button className="button secondary" type="button" onClick={onBack}>
          <IconGlyph name="back" size={18} />
          {backLabel}
        </button>
      )}
      {hideNext ? (
        <span aria-hidden="true" />
      ) : (
        <button className="button primary" type="button" onClick={onNext}>
          {nextLabel}
          <IconGlyph name="arrow" color="#0A0A0A" size={18} />
        </button>
      )}
    </div>
  );
}

function ProfileRadarChart({ results, primaryOutcome }) {
  return (
    <section className="mobile-result-page mobile-radar-page">
      <div className="mobile-result-kicker">Your top learner profile</div>
      <h1 className="mobile-result-title">{primaryOutcome.archetype}</h1>
      <div className="mobile-radar-card">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={results.outcomeScores} outerRadius="72%">
            <PolarGrid stroke="#0A0A0A" radialLines />
            <PolarAngleAxis dataKey="chartLabel" tick={renderRadarTick} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tickCount={6}
              axisLine={false}
              tick={false}
            />
            <Radar
              name="Profile shadow"
              dataKey="value"
              stroke="#0A0A0A"
              fill="transparent"
              strokeWidth={8}
            />
            <Radar
              name="XQ Learner Profile"
              dataKey="value"
              stroke={primaryOutcome.color}
              fill={primaryOutcome.color}
              fillOpacity={0.5}
              strokeWidth={4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mobile-radar-legend">
        {results.outcomeScores.map((outcome) => (
          <span key={outcome.id}>
            <i style={{ background: outcome.color }} />
            {outcome.shortName}
          </span>
        ))}
      </div>
    </section>
  );
}

function MobileProfileResult({ outcome }) {
  return (
    <section
      className="mobile-result-page mobile-profile-page"
      style={{
        "--accent": outcome.color,
        "--pair": outcome.pairColor,
        "--ink": outcome.inkColor,
      }}
    >
      <p className="mobile-result-kicker">Congratulations!</p>
      <ProfileCharacter
        outcome={outcome}
        className="mobile-profile-character"
      />
      <h1 className="mobile-result-title">{outcome.archetype}</h1>
      <p className="mobile-profile-subtitle">New profile unlocked</p>
      <ul className="mobile-profile-points">
            {(
              outcome.strengths || [outcome.quickTake, outcome.prompt, outcome.growthMove]
            ).map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
      </ul>
    </section>
  );
}

function CompetencyStampCard({ competency, index, active = false, onClick }) {
  const assetPrimary = COMPETENCY_ASSET_COLOR_CACHE[competency.code];
  const outcomeColor = (competency.outcome && OUTCOMES[competency.outcome]?.color) || null;
  const accent = assetPrimary || competency.outcomeDetails?.color || outcomeColor || getKioskAccent(index);
  const tileAccentSoft = getSoftAccent(accent);
  const detail = COMPETENCY_DETAIL_MAP[competency.code] || {};

  return (
    <button
      className={`mobile-competency-stamp${active ? " active" : ""}`}
      type="button"
      onClick={onClick}
      style={{ "--tile-accent": accent, "--tile-accent-soft": tileAccentSoft }}
    >
      <CompetencyAsset
        code={competency.code}
        shape="square"
        accent={accent}
        className="mobile-stamp-art"
      />
      <strong>{competency.label}</strong>
      <span>{detail.sourceShort || competency.description}</span>
    </button>
  );
}

function MobileCompetencyCarousel({
  competencies,
  activeIndex,
  setActiveIndex,
  onOpenDetail,
}) {
  const [touchStart, setTouchStart] = useState(null);
  const activeCompetency = competencies[activeIndex] || competencies[0];

  const rotate = (direction) => {
    if (!competencies.length) return;
    setActiveIndex((index) => {
      return (index + direction + competencies.length) % competencies.length;
    });
  };

  const finishSwipe = (clientX) => {
    if (touchStart === null) return;
    const delta = clientX - touchStart;
    if (Math.abs(delta) > 36) rotate(delta < 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <section className="mobile-result-page mobile-competencies-page">
      <p className="mobile-result-kicker">Your strongest competencies</p>
      <h1 className="mobile-result-title">Your top three strengths</h1>
      <div
        className="mobile-stamp-carousel"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) =>
          finishSwipe(event.changedTouches[0]?.clientX || touchStart)
        }
      >
        {competencies.map((competency, index) => {
          const offset = getCircularOffset(
            index,
            activeIndex,
            competencies.length,
          );
          return (
            <div
              className="mobile-stamp-slide"
              data-offset={offset}
              key={competency.code}
              style={{ "--offset": offset }}
            >
              <CompetencyStampCard
                competency={competency}
                index={index}
                active={index === activeIndex}
                onClick={() => onOpenDetail(competency.code)}
              />
            </div>
          );
        })}
      </div>
      <fieldset className="mobile-carousel-controls">
        <legend className="mobile-carousel-legend">Competency cards</legend>
        <button
          type="button"
          onClick={() => rotate(-1)}
          aria-label="Previous competency"
        >
          <IconGlyph name="back" size={18} />
        </button>
        <span>
          {activeIndex + 1}/{competencies.length}
        </span>
        <button
          type="button"
          onClick={() => rotate(1)}
          aria-label="Next competency"
        >
          <IconGlyph name="arrow" size={18} />
        </button>
      </fieldset>
      {activeCompetency && (
        <p className="mobile-competency-hint">Tap the card to learn more!</p>
      )}
    </section>
  );
}

function CompetencyDetailPanel({ competency, onBack, onNext, nextLabel }) {
  const detail = COMPETENCY_DETAIL_MAP[competency?.code] || {};
  const outcome =
    competency?.outcomeDetails || OUTCOMES[competency?.outcome] || OUTCOMES.FK;
  const accent = outcome.color;

  if (!competency) return null;

  return (
    <section
      className="mobile-result-page mobile-detail-page"
      style={{ "--tile-accent": accent }}
    >
      <CompetencyAsset
        code={competency.code}
        shape="hexagon"
        accent={accent}
        className="mobile-detail-art"
      />
      <p className="mobile-result-kicker">{outcome.shortName}</p>
      <h1 className="mobile-result-title">{competency.label}</h1>
      <p className="mobile-detail-copy">{competency.description}</p>
      <div className="mobile-detail-skills">
        <h2>Component skills</h2>
        <ul>
          {(detail.componentSkills || []).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <MobileResultNav
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        hideNext={!onNext}
      />
    </section>
  );
}

function MobileTokenEarned({ onBack, onNext }) {
  return (
    <section className="mobile-result-page mobile-token-page">
      <h1 className="mobile-result-title">Token earned</h1>
      <div className="token-burst" aria-hidden="true">
        <span className="token-spark one" />
        <span className="token-spark two" />
        <span className="token-spark three" />
        <span className="token-spark four" />
        <div className="gold-token">
          <IconGlyph name="spark" size={44} />
        </div>
      </div>
      <p className="mobile-profile-subtitle">Your XQ strengths are unlocked.</p>
      <MobileResultNav onBack={onBack} onNext={onNext} nextLabel="Summary" />
    </section>
  );
}

function MobileSummary({
  primaryOutcome,
  topCompetencies,
  onOpenCompetency,
  onExploreCompetencies,
  onExploreProfiles,
  onWhy,
  onBack,
  onRetake,
}) {
  return (
    <section className="mobile-result-page mobile-summary-page">
      <div className="mobile-summary-header">
        <ProfileCharacter
          outcome={primaryOutcome}
          className="summary-character"
        />
        <div>
          <p className="mobile-result-kicker">Summary</p>
          <h1 className="mobile-result-title">{primaryOutcome.shortName}</h1>
        </div>
      </div>
      <p className="mobile-detail-copy">{primaryOutcome.description}</p>
      <div className="mobile-summary-stamps">
        {topCompetencies.map((competency, index) => (
          <CompetencyStampCard
            competency={competency}
            index={index}
            key={competency.code}
            onClick={() => onOpenCompetency(competency.code)}
          />
        ))}
      </div>
      <div className="mobile-explore-buttons">
        <button type="button" onClick={onExploreCompetencies}>
          Explore all XQ competencies
        </button>
        <button type="button" onClick={onExploreProfiles}>
          Explore all learner profiles
        </button>
        <button type="button" onClick={onWhy}>
          Why XQ competencies?
        </button>
      </div>
      <p className="attribution mobile-summary-attribution">
        Based on the XQ Learner Outcomes framework - xqsuperschool.org
      </p>
      <button
        className="button primary results-restart-button"
        type="button"
        onClick={onRetake}
      >
        <IconGlyph name="refresh" color="#0A0A0A" size={18} />
        Retake the Quiz
      </button>
      <MobileResultNav onBack={onBack} hideNext />
    </section>
  );
}

function MobileAllCompetencies({ onOpenCompetency, onBack }) {
  return (
    <section className="mobile-result-page mobile-explore-page">
      <p className="mobile-result-kicker">Explore</p>
      <h1 className="mobile-result-title">All XQ competencies</h1>
      <div className="mobile-outcome-groups">
        {OUTCOME_ORDER.map((outcomeId) => {
          const outcome = OUTCOMES[outcomeId];
          const competencies = Object.entries(COMPETENCY_MAP).filter(
            ([, item]) => {
              return item.outcome === outcomeId;
            },
          );

          return (
            <section
              className="mobile-outcome-group"
              key={outcomeId}
              style={{ "--accent": outcome.color }}
            >
              <h2>{outcome.shortName}</h2>
              <div className="mobile-competency-grid">
                {competencies.map(([code, competency]) => (
                  <button
                    className="mobile-mini-stamp"
                    type="button"
                    key={code}
                    onClick={() => onOpenCompetency(code)}
                  >
                    <CompetencyAsset
                      code={code}
                      shape="square"
                      accent={outcome.color}
                      className="mobile-mini-stamp-art"
                    />
                    <span>{competency.label}</span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <MobileResultNav onBack={onBack} hideNext />
    </section>
  );
}

function MobileAllProfiles({
  profileIndex,
  setProfileIndex,
  onOpenProfile,
  onBack,
}) {
  const [touchStart, setTouchStart] = useState(null);

  const rotate = (direction) => {
    setProfileIndex((index) => {
      return (index + direction + OUTCOME_ORDER.length) % OUTCOME_ORDER.length;
    });
  };

  const finishSwipe = (clientX) => {
    if (touchStart === null) return;
    const delta = clientX - touchStart;
    if (Math.abs(delta) > 36) rotate(delta < 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <section className="mobile-result-page mobile-profiles-page">
      <p className="mobile-result-kicker">Explore</p>
      <h1 className="mobile-result-title">All learner profiles</h1>
      <div
        className="mobile-profile-carousel"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) =>
          finishSwipe(event.changedTouches[0]?.clientX || touchStart)
        }
      >
        {OUTCOME_ORDER.map((outcomeId, index) => {
          const outcome = OUTCOMES[outcomeId];
          const offset = getCircularOffset(
            index,
            profileIndex,
            OUTCOME_ORDER.length,
          );
          return (
            <button
              className="mobile-profile-card"
              data-offset={offset}
              type="button"
              key={outcomeId}
              onClick={() => onOpenProfile(outcomeId)}
              style={{ "--accent": outcome.color, "--offset": offset }}
            >
              <ProfileCharacter outcome={outcome} />
              <strong>{outcome.archetype}</strong>
            </button>
          );
        })}
      </div>
      <fieldset className="mobile-carousel-controls">
        <legend className="mobile-carousel-legend">Learner profiles</legend>
        <button
          type="button"
          onClick={() => rotate(-1)}
          aria-label="Previous profile"
        >
          <IconGlyph name="back" size={18} />
        </button>
        <span>
          {profileIndex + 1}/{OUTCOME_ORDER.length}
        </span>
        <button
          type="button"
          onClick={() => rotate(1)}
          aria-label="Next profile"
        >
          <IconGlyph name="arrow" size={18} />
        </button>
      </fieldset>
      <MobileResultNav onBack={onBack} hideNext />
    </section>
  );
}

function ProfileDetailPanel({ outcome, onBack }) {
  return (
    <section
      className="mobile-result-page mobile-profile-detail-page"
      style={{
        "--accent": outcome.color,
        "--pair": outcome.pairColor,
        "--ink": outcome.inkColor,
      }}
    >
      <ProfileCharacter
        outcome={outcome}
        className="mobile-profile-character"
      />
      <p className="mobile-result-kicker">{outcome.shortName}</p>
      <h1 className="mobile-result-title">{outcome.archetype}</h1>
      <p className="mobile-detail-copy">{outcome.deeper}</p>
      <div className="mobile-detail-skills">
        <h2>Where this strength shows up</h2>
        <ul>
          {outcome.careerPaths.map((path) => (
            <li key={path}>{path}</li>
          ))}
        </ul>
      </div>
      <MobileResultNav onBack={onBack} hideNext />
    </section>
  );
}

function MobileWhyXQ({ onBack }) {
  return (
    <section className="mobile-result-page mobile-under-construction-page">
      <div className="construction-token">
        <IconGlyph name="spark" size={44} />
      </div>
      <h1 className="mobile-result-title">Under construction</h1>
      <p className="mobile-detail-copy">Check back soon.</p>
      <MobileResultNav onBack={onBack} hideNext />
    </section>
  );
}

function MobileResultsFlow({
  resultStep,
  setResultStep,
  results,
  primaryOutcome,
  topCompetencies,
  activeCompetencyIndex,
  setActiveCompetencyIndex,
  detailCompetencyCode,
  detailReturnStep,
  openCompetencyDetail,
  profileBrowseIndex,
  setProfileBrowseIndex,
  profileDetailId,
  openProfileDetail,
  resetToWelcome,
  themeMode,
  toggleThemeMode,
}) {
  const topCompetency =
    topCompetencies.find((item) => item.code === detailCompetencyCode) ||
    Object.entries(COMPETENCY_MAP)
      .map(([code, competency]) => ({
        code,
        ...competency,
        outcomeDetails: OUTCOMES[competency.outcome],
      }))
      .find((item) => item.code === detailCompetencyCode);
  const profileDetail = profileDetailId ? OUTCOMES[profileDetailId] : null;

  return (
    <div className={`mobile-results-flow result-step-${resultStep}`}>
      <div className="mobile-result-topbar">
        <ThemeToggle themeMode={themeMode} onToggle={toggleThemeMode} mobile />
      </div>

      {resultStep === "radar" && (
        <>
          <ProfileRadarChart
            results={results}
            primaryOutcome={primaryOutcome}
          />
          <MobileResultNav hideBack onNext={() => setResultStep("profile")} />
        </>
      )}

      {resultStep === "profile" && (
        <>
          <MobileProfileResult outcome={primaryOutcome} />
          <MobileResultNav
            onBack={() => setResultStep("radar")}
            onNext={() => setResultStep("competencies")}
          />
        </>
      )}

      {resultStep === "competencies" && (
        <>
          <MobileCompetencyCarousel
            competencies={topCompetencies}
            activeIndex={activeCompetencyIndex}
            setActiveIndex={setActiveCompetencyIndex}
            onOpenDetail={(code) => openCompetencyDetail(code, "competencies")}
          />
          <MobileResultNav
            onBack={() => setResultStep("profile")}
            onNext={() => setResultStep("token")}
          />
        </>
      )}

      {resultStep === "competencyDetail" && (
        <CompetencyDetailPanel
          competency={topCompetency}
          onBack={() => setResultStep(detailReturnStep)}
          onNext={
            detailReturnStep === "competencies"
              ? () => setResultStep("token")
              : undefined
          }
          nextLabel="Continue"
        />
      )}

      {resultStep === "token" && (
        <MobileTokenEarned
          onBack={() => setResultStep("competencies")}
          onNext={() => setResultStep("summary")}
        />
      )}

      {resultStep === "summary" && (
        <MobileSummary
          primaryOutcome={primaryOutcome}
          topCompetencies={topCompetencies}
          onOpenCompetency={(code) => openCompetencyDetail(code, "summary")}
          onExploreCompetencies={() => setResultStep("allCompetencies")}
          onExploreProfiles={() => setResultStep("allProfiles")}
          onWhy={() => setResultStep("why")}
          onBack={() => setResultStep("token")}
          onRetake={resetToWelcome}
        />
      )}

      {resultStep === "allCompetencies" && (
        <MobileAllCompetencies
          onOpenCompetency={(code) =>
            openCompetencyDetail(code, "allCompetencies")
          }
          onBack={() => setResultStep("summary")}
        />
      )}

      {resultStep === "allProfiles" && (
        <MobileAllProfiles
          profileIndex={profileBrowseIndex}
          setProfileIndex={setProfileBrowseIndex}
          onOpenProfile={(outcomeId) => openProfileDetail(outcomeId)}
          onBack={() => setResultStep("summary")}
        />
      )}

      {resultStep === "profileDetail" && profileDetail && (
        <ProfileDetailPanel
          outcome={profileDetail}
          onBack={() => setResultStep("allProfiles")}
        />
      )}

      {resultStep === "why" && (
        <MobileWhyXQ onBack={() => setResultStep("summary")} />
      )}
    </div>
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
  const [svgColorVersion, setSvgColorVersion] = useState(0);
  const [previewMode, setPreviewMode] = useState("kiosk");
  const [themeMode, setThemeMode] = useState("light");
  const [screen, setScreen] = useState("welcome");
  const [quizMode, setQuizMode] = useState("detailed");
  const [activeQuestions, setActiveQuestions] = useState(QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswerAccents, setSelectedAnswerAccents] = useState({});
  const [shuffleToken, setShuffleToken] = useState(0);
  const [pendingAdvance, setPendingAdvance] = useState(null);
  const [resultStep, setResultStep] = useState("radar");
  const [activeCompetencyIndex, setActiveCompetencyIndex] = useState(0);
  const [detailCompetencyCode, setDetailCompetencyCode] = useState(null);
  const [detailReturnStep, setDetailReturnStep] = useState("competencies");
  const [profileBrowseIndex, setProfileBrowseIndex] = useState(0);
  const [profileDetailId, setProfileDetailId] = useState(null);

  const totalQuestions = activeQuestions.length;
  const currentQuestion =
    activeQuestions[currentIndex] || activeQuestions[0] || QUESTIONS[0];
  const selectedAnswerIndex = selectedAnswers[currentQuestion.id];

  const shuffledAnswers = useMemo(() => {
    const shuffleKey = `${currentQuestion.id}-${shuffleToken}`;
    return shuffleAnswers(currentQuestion.answers, shuffleKey);
  }, [currentQuestion.answers, currentQuestion.id, shuffleToken]);

  const results = useMemo(() => {
    return calculateResults(selectedAnswers, activeQuestions);
  }, [activeQuestions, selectedAnswers]);

  useEffect(() => {
    // Programmatically fetch profile SVGs, extract primary hex colors,
    // and apply them to the OUTCOMES object so UI uses original XQ colors.
    async function fetchAndApply() {
      try {
        await Promise.all(
          Object.entries(PROFILE_CHARACTER_ASSETS).map(async ([id, path]) => {
            try {
              const res = await fetch(path);
              if (!res.ok) return;
              const text = await res.text();
              const candidates = extractCandidateHexesFromSvg(text);
              const primary = candidates[0] || getOriginalSvgAccent(text) || OUTCOMES[id]?.color;
              const secondary = candidates[1] || getSoftAccent(primary) || OUTCOMES[id]?.pairColor;
              if (primary && OUTCOMES[id]) {
                OUTCOMES[id].color = primary;
                OUTCOMES[id].pairColor = secondary;
              }
            } catch (err) {
              // ignore individual asset failures
            }
          }),
        );
        // also fetch competency asset primary colors and cache them
        try {
          await Promise.all(
            Object.entries(COMPETENCY_ASSET_FILES).map(async ([code, filename]) => {
              try {
                const path = `${ASSET_BASE_PATH}/square/${filename}`;
                const res = await fetch(path);
                if (!res.ok) return;
                const text = await res.text();
                const candidates = extractCandidateHexesFromSvg(text);
                const primary = candidates[0] || getOriginalSvgAccent(text) || null;
                if (primary) COMPETENCY_ASSET_COLOR_CACHE[code] = primary;
              } catch (e) {
                // ignore
              }
            }),
          );
        } catch (e) {
          // ignore
        }

        // trigger re-render so components pick up updated OUTCOMES and asset colors
        setSvgColorVersion((v) => v + 1);
      } catch (err) {
        // swallow
      }
    }

    if (typeof window !== "undefined") fetchAndApply();
    // run once on mount
  }, []);

  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isAutoAdvancing = pendingAdvance?.questionId === currentQuestion.id;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  let advanceStatusText = "Pick one to continue";
  if (isAutoAdvancing && isLastQuestion) advanceStatusText = "Building profile";
  if (isAutoAdvancing && !isLastQuestion) advanceStatusText = "Next question";
  const topOutcomes = results.rankGroups[0]?.items || [];
  const secondOutcomes = results.rankGroups[1]?.items || [];
  const quizOutcome =
    OUTCOMES[OUTCOME_ORDER[currentIndex % OUTCOME_ORDER.length]];
  const primaryOutcome = topOutcomes[0] || OUTCOMES.FK;
  const secondaryOutcome = secondOutcomes[0];
  const modeMeta = QUIZ_MODES[quizMode] || QUIZ_MODES.detailed;
  const toggleThemeMode = () => {
    setThemeMode((mode) => (mode === "dark" ? "light" : "dark"));
  };

  const resetResultFlow = () => {
    setResultStep("radar");
    setActiveCompetencyIndex(0);
    setDetailCompetencyCode(null);
    setDetailReturnStep("competencies");
    setProfileBrowseIndex(
      Math.max(0, OUTCOME_ORDER.indexOf(primaryOutcome.id)),
    );
    setProfileDetailId(null);
  };

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

      if (pendingAdvance.fromIndex >= totalQuestions - 1) {
        setScreen("results");
        return;
      }

      setCurrentIndex(pendingAdvance.fromIndex + 1);
    }, 520);

    return () => window.clearTimeout(timeout);
  }, [pendingAdvance, totalQuestions]);

  useEffect(() => {
    if (screen !== "results") return;

    setResultStep("radar");
    setActiveCompetencyIndex(0);
    setDetailCompetencyCode(null);
    setDetailReturnStep("competencies");
    setProfileBrowseIndex(
      Math.max(0, OUTCOME_ORDER.indexOf(primaryOutcome.id)),
    );
    setProfileDetailId(null);
  }, [screen, primaryOutcome.id]);

  const startQuiz = (mode) => {
    const nextMode = mode === "fast" ? "fast" : "detailed";
    const nextQuestions =
      nextMode === "fast" ? selectFastQuestions() : QUESTIONS;

    setPendingAdvance(null);
    setQuizMode(nextMode);
    setActiveQuestions(nextQuestions);
    setSelectedAnswers({});
    setSelectedAnswerAccents({});
    setCurrentIndex(0);
    setShuffleToken((token) => token + 1);
    resetResultFlow();
    setScreen("quiz");
  };

  const resetToWelcome = () => {
    setPendingAdvance(null);
    setQuizMode("detailed");
    setActiveQuestions(QUESTIONS);
    setSelectedAnswers({});
    setSelectedAnswerAccents({});
    setCurrentIndex(0);
    setShuffleToken((token) => token + 1);
    resetResultFlow();
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

  const openCompetencyDetail = (code, returnStep = "competencies") => {
    setDetailCompetencyCode(code);
    setDetailReturnStep(returnStep);
    setResultStep("competencyDetail");
  };

  const openProfileDetail = (outcomeId) => {
    setProfileDetailId(outcomeId);
    setResultStep("profileDetail");
  };

  return (
    <>
      <style>{APP_STYLES}</style>

      <main
        className={`xq-quiz-shell preview-${previewMode} theme-${themeMode}`}
      >
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
                    value={`${QUIZ_MODES.fast.questionCount} or ${QUIZ_MODES.detailed.questionCount}`}
                  />
                  <SidebarSlot label="Result" value="Learner Profile" />
                  <ThemeModeSwitch
                    themeMode={themeMode}
                    onToggle={toggleThemeMode}
                  />
                </div>
                <div className="sidebar-note">
                  <span className="sidebar-note-label">Framework</span>
                  <strong>XQ Learner Outcomes</strong>
                  <p>Five outcome areas, one profile shape.</p>
                </div>
              </aside>

              <div className="kiosk-main welcome-main">
                <div className="mobile-screen-tools mobile-only">
                  <ThemeToggle
                    themeMode={themeMode}
                    onToggle={toggleThemeMode}
                    mobile
                  />
                </div>
                <section className="welcome-copy">
                  <span className="tiny-ticket">
                    <IconGlyph name="spark" size={18} />
                    Your profile under 5
                  </span>
                  <h1 className="headline" id="welcome-title">
                    Discover Your XQ Learner Profile
                  </h1>
                  <p className="subtitle">
                    Real-world scenarios. No right answers.
                  </p>
                  <p className="body-copy">
                    Find your strongest learning competencies through fast,
                    real-world choices built around the XQ Learner Outcomes
                    framework.
                  </p>

                  <div className="welcome-actions">
                    <button
                      className="start-card-button fast-mode"
                      type="button"
                      onClick={() => startQuiz("fast")}
                    >
                      <span className="start-card-copy">
                        <strong>Fast Mode</strong>
                        <span>5 questions. Balanced and quick.</span>
                      </span>
                      <span className="start-card-pick" aria-hidden="true">
                        Start fast
                        <IconGlyph name="arrow" color="#0A0A0A" size={18} />
                      </span>
                    </button>

                    <button
                      className="start-card-button detailed-mode"
                      type="button"
                      onClick={() => startQuiz("detailed")}
                    >
                      <span className="start-card-copy">
                        <strong>Detailed Mode</strong>
                        <span>10 questions. More accurate.</span>
                      </span>
                      <span className="start-card-pick" aria-hidden="true">
                        Go deeper
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
                    label={modeMeta.sidebarLabel}
                    value={`${currentIndex + 1}/${totalQuestions}`}
                    active
                    accent={quizOutcome.color}
                  />
                  <SidebarSlot
                    label="Answered"
                    value={`${Object.keys(selectedAnswers).length}/${totalQuestions}`}
                  />
                  <SidebarSlot
                    label="Continue"
                    value={isAutoAdvancing ? "Advancing" : "Auto"}
                  />
                  <ThemeModeSwitch
                    themeMode={themeMode}
                    onToggle={toggleThemeMode}
                  />
                </div>
                <MiniProgress
                  questions={activeQuestions}
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
                    <div className="question-nav-left">
                      <button
                        className="button secondary top-back-button"
                        type="button"
                        onClick={goBack}
                        disabled={currentIndex === 0 || isAutoAdvancing}
                      >
                        <IconGlyph name="back" size={18} />
                        Back
                      </button>
                      <ThemeToggle
                        themeMode={themeMode}
                        onToggle={toggleThemeMode}
                        className="desktop-question-theme-toggle"
                      />
                    </div>
                    <button
                      className="button secondary mobile-only"
                      type="button"
                      onClick={resetToWelcome}
                      disabled={isAutoAdvancing}
                    >
                      <IconGlyph name="refresh" size={18} />
                      Restart
                    </button>
                    <ThemeToggle
                      themeMode={themeMode}
                      onToggle={toggleThemeMode}
                      mobile
                      className="mobile-only"
                    />
                    <span
                      className={`auto-advance-pill desktop-status-pill${isAutoAdvancing ? " active" : ""}`}
                    >
                      {advanceStatusText}
                    </span>
                  </nav>
                  <div className="question-meta">
                    <span className="progress-label">
                      Question {currentIndex + 1} of {totalQuestions}
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
                    const mutedAccent = getMutedAccent(accent);

                    return (
                      <button
                        type="button"
                        key={`${currentQuestion.id}-${answer.originalIndex}`}
                        className={`answer-card${isSelected ? " selected" : ""}`}
                        style={{
                          "--tile-accent": accent,
                          "--tile-accent-deep": mutedAccent,
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
                        <span
                          className={`answer-picked${isSelected ? " is-selected" : ""}`}
                          aria-hidden="true"
                        >
                          <span className="answer-picked-text">
                            {isSelected ? "Selected" : "Pick"}
                          </span>
                          {isSelected && (
                            <span className="answer-picked-check">
                              <IconGlyph name="check" size={20} />
                            </span>
                          )}
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
                  <button
                    type="button"
                    className={`auto-advance-pill bottom-status-button${isAutoAdvancing ? " active" : ""}`}
                    aria-disabled="true"
                    aria-live="polite"
                    tabIndex={-1}
                  >
                    {advanceStatusText}
                  </button>
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
                  <ThemeModeSwitch
                    themeMode={themeMode}
                    onToggle={toggleThemeMode}
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
                <MobileResultsFlow
                  resultStep={resultStep}
                  setResultStep={setResultStep}
                  results={results}
                  primaryOutcome={primaryOutcome}
                  topCompetencies={results.topCompetencies}
                  activeCompetencyIndex={activeCompetencyIndex}
                  setActiveCompetencyIndex={setActiveCompetencyIndex}
                  detailCompetencyCode={detailCompetencyCode}
                  detailReturnStep={detailReturnStep}
                  openCompetencyDetail={openCompetencyDetail}
                  profileBrowseIndex={profileBrowseIndex}
                  setProfileBrowseIndex={setProfileBrowseIndex}
                  profileDetailId={profileDetailId}
                  openProfileDetail={openProfileDetail}
                  resetToWelcome={resetToWelcome}
                  themeMode={themeMode}
                  toggleThemeMode={toggleThemeMode}
                />

                <div className="kiosk-results-content">
                  <div className="mobile-screen-tools mobile-only">
                    <ThemeToggle
                      themeMode={themeMode}
                      onToggle={toggleThemeMode}
                      mobile
                    />
                  </div>
                  <section
                    className="chart-surface results-chart-top"
                    aria-label="Radar chart of five XQ learner outcomes"
                  >
                    <div className="chart-heading-row">
                      <div>
                        <h1 className="headline" id="results-title">
                          Your XQ Learner Profile
                        </h1>
                      </div>
                      <p className="chart-kicker">
                        Scaled to your strongest learner outcome, so the web
                        shows your shape.
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
                        <div
                          className="legend-item"
                          key={outcome.id}
                          style={{ "--legend-accent": outcome.color }}
                        >
                          <span className="legend-label">
                            <span
                              className="legend-swatch"
                              style={{ background: outcome.color }}
                              aria-hidden="true"
                            />
                            {outcome.chartLabel}
                          </span>
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
                  </div>
                  <button
                    className="button primary results-restart-button"
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

      <fieldset className="preview-mode-toggle">
        <legend>Preview layout</legend>
        <button
          className={previewMode === "kiosk" ? "active" : ""}
          type="button"
          onClick={() => setPreviewMode("kiosk")}
        >
          Kiosk
        </button>
        <button
          className={previewMode === "mobile" ? "active" : ""}
          type="button"
          onClick={() => setPreviewMode("mobile")}
        >
          Mobile
        </button>
      </fieldset>
    </>
  );
}
