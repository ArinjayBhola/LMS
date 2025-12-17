"use client";

import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { Provider } from "react-redux";
import appStore from "@/redux/appStore";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Provider store={appStore}>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar - Floating Glass Panel */}
        <div className="hidden md:block w-64 fixed top-4 left-4 bottom-4 z-30 rounded-2xl glass shadow-2xl overflow-hidden">
          <SideBar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden animate-in fade-in duration-200">
            <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs glass border-r shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="relative h-full">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-50 hover:bg-white/10" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <SideBar />
              </div>
            </div>
            <div className="absolute inset-0 -z-10" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        <div className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
          <Header onMenuClick={() => setMobileMenuOpen(true)} />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default Dashboard;
