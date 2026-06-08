import "/src/style.css";
import { useState } from "react";
import {
    Button,
} from '@heroui/react';

export function TutorialView() {
    const [activeTab, setActiveTab] = useState("howto");
    const [activeSpread, setActiveSpread] = useState(0);

    const steps = [
        { number: "01", title: "Focus Your Question", description: "Clear your mind and think of one specific question — about love, career, or life direction." },
        { number: "02", title: "Choose a Spread", description: "Pick one of three spreads depending on what you'd like to explore." },
        { number: "03", title: "Start Your Reading", description: "Hit the \"Divine\" button on the home page and the cards will be drawn for you." },
        { number: "04", title: "Interpret the Cards", description: "Each card comes with a detailed meaning. Read the AI-generated interpretation alongside your question." },
        { number: "05", title: "Revisit Your History", description: "All your past readings are saved in the History page — come back anytime to reflect." },
    ];

    const spreads = [
        {
            title: "Past · Present · Future",
            description: "A classic three-card spread for any general question.",
            positions: [
                { label: "Card 1", role: "The Past", desc: "What led you to this situation" },
                { label: "Card 2", role: "The Present", desc: "What is happening right now" },
                { label: "Card 3", role: "The Future", desc: "Guidance or a possible outcome" },
            ],
        },
        {
            title: "Relationship",
            description: "A five-card spread to explore the dynamics between you and another person.",
            positions: [
                { label: "Card 1", role: "Your Energy", desc: "What you bring to the relationship" },
                { label: "Card 2", role: "Their Energy", desc: "What they bring to the relationship" },
                { label: "Card 3", role: "The Dynamic", desc: "How you interact together" },
                { label: "Card 4", role: "The Challenge", desc: "What needs to be worked on" },
                { label: "Card 5", role: "The Potential", desc: "Where this relationship can go" },
            ],
        },
        {
            title: "Life Purpose",
            description: "A five-card spread to help you understand your deeper calling.",
            positions: [
                { label: "Card 1", role: "Your Essence", desc: "Who you truly are at your core" },
                { label: "Card 2", role: "Your Talents", desc: "The gifts you carry" },
                { label: "Card 3", role: "Your Mission", desc: "What you are here to do" },
                { label: "Card 4", role: "Your Challenge", desc: "What you need to overcome" },
                { label: "Card 5", role: "Your Ultimate Potential", desc: "What you can become" },
            ],
        },
    ];

    return (
        <div className="tutorialView">

            <div className="tutorial-tabs">
                <button
                    className={"tutorial-tab" + (activeTab === "howto" ? " tutorial-tab-active" : "")}
                    onClick={function showHowtoACB() { setActiveTab("howto"); }}
                >
                    How to Start
                </button>
                <button
                    className={"tutorial-tab" + (activeTab === "spread" ? " tutorial-tab-active" : "")}
                    onClick={function showSpreadACB() { setActiveTab("spread"); }}
                >
                    Spread Guide
                </button>
            </div>

            <div className="tutorial-tab-content">
                {activeTab === "howto" && (
                    <div>
                        <div className="tutorial-steps">
                            {steps.map(stepCardCB)}
                        </div>
                        <div className="tutorial-cta">
                            <Button
                                
                                className="w-40 bg-[#c9a96e] text-white hover:bg-gray-800"
                                onPress={goToDashACB}
                            >
                                Start My Reading →
                            </Button>
                        </div>
                    </div>
                )}

                {activeTab === "spread" && (
                    <div>
                        <div className="tutorial-spread-tabs">
                            {spreads.map(spreadTabCB)}
                        </div>
                        <div className="tutorial-spread-content">
                            <p className="tutorial-spread-desc">{spreads[activeSpread].description}</p>
                            <div className="tutorial-positions">
                                {spreads[activeSpread].positions.map(positionCardCB)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    function stepCardCB(step) {
        return (
            <div key={step.number} className="tutorial-step-card">
                <div className="tutorial-step-number">{step.number}</div>
                <div className="tutorial-step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                </div>
            </div>
        );
    }

    function spreadTabCB(spread, index) {
        return (
            <button
                key={spread.title}
                className={"tutorial-spread-tab" + (activeSpread === index ? " tutorial-spread-tab-active" : "")}
                onClick={function selectSpreadACB() { setActiveSpread(index); }}
            >
                {spread.title}
            </button>
        );
    }

    function positionCardCB(pos) {
        return (
            <div key={pos.label} className="tutorial-position-card">
                <div className="tutorial-position-label">{pos.label}</div>
                <div className="tutorial-position-role">{pos.role}</div>
                <div className="tutorial-position-desc">{pos.desc}</div>
            </div>
        );
    }

    function goToDashACB() {
        window.location.hash = "#/";
    }
}