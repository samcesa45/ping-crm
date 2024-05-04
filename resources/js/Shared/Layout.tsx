import React from "react";
import Seo from "./Seo";
import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";
import MainMenu from "./MainMenu";
import FlashMessages from "./FlashMessages";

export default function Layout({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <main>
            <Seo title="" description="" name="" type="" />
            <div className="flex flex-col">
                <div className="flex flex-col h-screen">
                    <div className="md:flex">
                        <TopHeader/>
                        <BottomHeader/>
                    </div>
                    <div className="flex flex-grow overflow-hidden">
                       <MainMenu className="flex-shrink-0 hidden w-56 p-12 overflow-y-auto bg-indigo-800 md:block" />
                       <div className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12">
                        <FlashMessages/>
                        {children}
                       </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
