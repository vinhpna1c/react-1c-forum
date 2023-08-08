import React from "react";

type RowProfileLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    title: string,
}

function RowProfileLayout(props: RowProfileLayoutProps) {
    const { children, title, ...rest } = props;
    return (
        <div className="flex max-md:flex-col mb-2">
            <div className="flex items-center justify-end mr-2">
                <span className="md:w-[160px] font-[501]">{title}</span>
            </div>

            {children}
        </div>
    )
}

export default RowProfileLayout;