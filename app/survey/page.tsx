"use client";

import "formsmd/dist/css/formsmd.min.css";
import { useEffect, useRef } from "react";
import { Composer, Formsmd } from "formsmd";
import { redirect, RedirectType } from "next/navigation";
import { useRouter } from 'next/navigation'

const composer = new Composer({
    id: "mailing-list-form",
    postUrl: "/api/survey",
    restartButton: "show",
    autofocus: "all-slides",
});

composer.startSlide({
    buttonAlignment: "center"
});
composer.h1("Welcome to Our Baltimore City Survey!", {
    classNames: ["text-center"]
});
composer.p("We appreciate you taking the time to share your feedback with us.", {
    classNames: ["text-center"]
});
composer.slide({});

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
composer.slide({});
composer.h1("Welcome, {$ name $}!");
composer.p("Thank for taking your time to improve our city {$ name $}.");

composer.emailInput("email", {
    question: "Please enter your email",
    required: true,
});
composer.slide({
    pageProgress: "10%"
});

// Choice input for position
composer.choiceInput("position", {
    question: "What's your position?",
    choices: ["Product Manager", "Software Engineer", "Founder", "Other"],
    required: true
});
composer.slide({
    pageProgress: "20%"
});


composer.numberInput("age", {
    question: "What is your age?",
    description: "Must be 18 or older to participate",
    min: 18,
    max: 120,
});
composer.slide({
    pageProgress: "30%"
});

// Choice input for how user discovered the product
composer.choiceInput("referralSource", {
    question: "How did you hear about us?",
    choices: ["News", "Search Engine", "Social Media", "Recommendation"],
    required: true
});
// Start new slide, show only if user was recommended, progress indicator at 75%
composer.slide({
    jumpCondition: "referralSource == 'Recommendation'",
    pageProgress: "40%"
});
// Email input for recommender email address
composer.emailInput("recommender", {
    question: "Who recommended you?",
    description: "We may be able to reach out to them and provide a discount for helping us out."
});
// Start new slide, progress indicator at 50%
composer.slide({ pageProgress: "50%" });

composer.choiceInput("experience", {
    question: "How was your experience with your Neighborhood",
    choices: ["Excellent", "Good", "Fair", "Poor"],
    required: true
});
composer.endSlide({
    // redirectUrl: "/results"
});

composer.h1("Thank For Participating {$ name $}", {
    classNames: ["text-center"]
});
composer.p("You will be redirected to results page in 3 seconds.", {
    classNames: ["text-center"]
});

export default function Survey() {
    const containerRef = useRef(null);
    const router = useRouter()

    useEffect(() => {
        if (containerRef.current) {
            const formsmd = new Formsmd(composer.template, containerRef.current, {
                postHeaders: {
                    // 'Content-Type': 'multipart/form-data',
                    // Authorization: `Basic ${process.env.PUBLIC_API_KEY}`,
                },
                // themeLight: {
                //     accent: "#353148",
                //     accentForeground: "#e2d2b6",
                //     backgroundColor: "#e2d2b6",
                //     color: "#353148"
                // }
            });
            formsmd.init();

            formsmd.onCompletion = function (json) {
                setTimeout(() => {
                    router.push('/results')
                }, 3000);
            }
        }
    }, []);



    return (
        <div ref={containerRef} className="w-full h-screen p-3"></div>
    );
}
