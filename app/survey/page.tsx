"use client";

import "formsmd/dist/css/formsmd.min.css";
import { useEffect, useRef } from "react";
import { Composer, Formsmd } from "formsmd";

const composer = new Composer({
    id: "mailing-list-form",
    postUrl: "/api/survey"
});

composer.emailInput("email", {
    question: "Please enter your email",
    required: true,
});

// // Choice input for position
// composer.choiceInput("position", {
//     question: "What's your position?",
//     choices: ["Product Manager", "Software Engineer", "Founder", "Other"],
//     required: true
// });

composer.numberInput("age", {
    question: "What is your age?",
    description: "Must be 18 or older to participate",
    min: 18,
    max: 120,
    required: true
});

// Text input if user selects "Other" position
composer.textInput("full_name", {
    question: "Your Name",
    required: true,
    // labelStyle: "classic",
    // displayCondition: {
    //     dependencies: ["position"],
    //     condition: "position == 'Other'"
    // }
});

// // Start new slide, progress indicator at 50%
// composer.slide({
//     pageProgress: "50%"
// });

// // Choice input for how user discovered the product
// composer.choiceInput("referralSource", {
//     question: "How did you hear about us?",
//     choices: ["News", "Search Engine", "Social Media", "Recommendation"],
//     required: true
// });


// // Start new slide, show only if user was recommended, progress indicator at 75%
// composer.slide({
//     jumpCondition: "referralSource == 'Recommendation'",
//     pageProgress: "75%"
// });

// // Email input for recommender email address
// composer.emailInput("recommender", {
//     question: "Who recommended you?",
//     description: "We may be able to reach out to them and provide a discount for helping us out."
// });


export default function Survey() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const formsmd = new Formsmd(composer.template, containerRef.current, {
                postHeaders: {
                    // 'Content-Type': 'multipart/form-data',
                    // Authorization: `Basic ${process.env.PUBLIC_API_KEY}`,
                },
                themeLight: {
                    accent: "#353148",
                    accentForeground: "#e2d2b6",
                    backgroundColor: "#e2d2b6",
                    color: "#353148"
                }
            });
            formsmd.init();
        }
    }, []);


    return (
        <div ref={containerRef} className="w-full h-screen p-3"></div>
    );
}
