"use client";

import { Button } from "@/components/ui/button";
import { Check, Loader } from "lucide-react";
import React from "react";

interface PriceCardProps {
  processPayment: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

const monthlyPlan = [
  { id: 1, content: "Create Unlimited Courses" },
  { id: 2, content: "Higher Priority AI Processing" },
  { id: 3, content: "Advanced Study Material" },
  { id: 4, content: "Direct PDF Export" },
  { id: 5, content: "Personalized Dashboards" },
  { id: 6, content: "24/7 Priority Support" }
];

const PriceCard = ({ processPayment, loading }: PriceCardProps) => {
    return (
        <div className="flex flex-col items-center py-12 px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none">
                    Simple <span className="text-primary italic">Pro</span> Plan
                </h2>
                <p className="text-xl text-muted-foreground mt-6 font-medium max-w-xl mx-auto leading-relaxed">
                    One simple price to unlock your full potential. No hidden fees, just pure productivity.
                </p>
            </div>

            <div className="w-full bg-card border border-border/10 rounded-[3rem] p-10 md:p-16 shadow-premium relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />
                
                <div className="flex flex-col md:flex-row gap-12 items-start relative z-10 text-left">
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-foreground tracking-tight uppercase">Lifetime Access</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl font-black text-primary">₹199</span>
                                <span className="text-xl text-muted-foreground font-bold">/once</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {monthlyPlan.map((item) => (
                                <div key={item.id} className="flex gap-3 items-center group/item">
                                    <div className="bg-primary/10 p-1.5 rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-lg font-semibold text-foreground/80 group-hover/item:text-foreground transition-colors">{item.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-auto shrink-0 space-y-6">
                        <div className="bg-secondary p-8 rounded-[2rem] space-y-6 text-center shadow-sm">
                            <p className="text-sm font-black text-secondary-foreground/60 uppercase tracking-widest leading-none">Best Value</p>
                            <div className="space-y-2">
                                <p className="text-3xl font-black text-secondary-foreground leading-none italic">Unlimited</p>
                                <p className="text-sm font-bold text-secondary-foreground/80">Growth awaits you</p>
                            </div>
                        </div>

                        <Button
                            className="w-full py-8 text-xl font-black rounded-2xl shadow-premium hover:shadow-premium-hover hover:scale-[1.02] transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={processPayment}
                            disabled={loading}>
                            {loading ? <Loader className="animate-spin w-6 h-6" /> : "UPGRADE NOW"}
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest opacity-60">Secure payment via Razorpay</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCard;
