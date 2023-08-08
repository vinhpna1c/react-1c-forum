import React from "react";

export default function CardLayout({children}:{children:React.ReactNode}){
    return (
        <div className="p-2 rounded-2xl bg-white">
            {children}
        </div>
    )
}