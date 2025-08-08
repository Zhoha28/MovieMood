import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        if (!footerRef.current) return;

        const elems = footerRef.current.children;

        const animation = gsap.fromTo(
            elems,
            { autoAlpha: 0, y: 30 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.25,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                    // markers: true,
                },
            }
        );

        return () => {
            animation.scrollTrigger.kill();
            animation.kill();
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="wrapper"
            style={{
                textAlign: "center",
                padding: "3rem 0",
                color: "#bbb",
            }}
        >
            <h2
                className="text-gradient mb-[30px]"
                style={{ color: "#ff3c78", fontWeight: "700" }}
            >
                MovieMood
            </h2>
            <p
                className="max-w-[70%] mx-auto"
                style={{
                    marginBottom: "1.5rem",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                }}
            >
                MovieMood is a sleek and modern movie discovery app built with React,
                Appwrite, and the TMDB API. Users can search for movies, view trending
                results, and track the most searched movie terms using Appwrite's
                database.
            </p>
            <p className="text-white" style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                Built by <strong>Zhoha Damani</strong>
            </p>
            <p>
                <a
                    href="https://github.com/Zhoha28/MovieMood"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "#ff3c78",
                        textDecoration: "underline",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    View on GitHub
                </a>
            </p>
        </footer>
    );
};

export default Footer;
