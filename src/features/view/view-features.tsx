"use client";
export default function ViewFeature() {
    const value = localStorage.getItem("items");
    return (
        <div>
            <h1 className="text-2xl">View: {value}</h1>
        </div>
    );
}
