import { useRef } from "react";

export function TiltCard({ children, className, onClick }) {
    const ref = useRef(null);

    function handleMouseMoveACB(e) {
        const card = ref.current;
        if (!card) return;
        const img = card.querySelector(".card-image");
        if (!img) return;

        const rect = card.getBoundingClientRect();
        const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        const rotX = ny * -7;
        const rotY = nx * 7;
        const reversed = img.style.transform.includes("rotate(180deg)") ? "rotate(180deg)" : "";

        img.style.transition = "none";
        img.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotX}deg) rotateY(${rotY}deg) ${reversed}`;
    }

    function handleMouseLeaveACB() {
        const card = ref.current;
        if (!card) return;
        const img = card.querySelector(".card-image");
        if (!img) return;

        const reversed = img.style.transform.includes("rotate(180deg)") ? "rotate(180deg)" : "";
        img.style.transition = "transform 0.3s ease";
        img.style.transform = `translateY(0) rotateX(0) rotateY(0) ${reversed}`;
    }

    return (
        <div ref={ref} className={className} onClick={onClick} onMouseMove={handleMouseMoveACB} onMouseLeave={handleMouseLeaveACB}>
            {children}
        </div>
    );
}
