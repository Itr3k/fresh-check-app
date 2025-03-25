
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Thermometer, Utensils, Users, CalendarDays, Microscope, SirenIcon, Tags, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const FoodSafetyEducation = () => {
  return (
    <section className="py-12 bg-muted/30" id="food-safety-education">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Food Safety Education</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn essential food safety practices to keep you and your family healthy.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <SafetyCard
            icon={<Thermometer />}
            title="Temperature Danger Zone"
            description="Learn about the critical temperature range where bacteria multiply rapidly."
            href="/food-safety/temperature-danger-zone"
            color="bg-red-100 text-red-800"
          />
          
          <SafetyCard
            icon={<AlertTriangle />}
            title="Prevent Foodborne Illness"
            description="Understand common causes of food poisoning and how to prevent them."
            href="/food-safety/foodborne-illness-prevention"
            color="bg-amber-100 text-amber-800"
          />
          
          <SafetyCard
            icon={<Utensils />}
            title="Cross-Contamination"
            description="Discover how to prevent harmful bacteria from spreading between foods."
            href="/food-safety/cross-contamination"
            color="bg-blue-100 text-blue-800"
          />
          
          <SafetyCard
            icon={<Users />}
            title="Vulnerable Groups"
            description="Special considerations for pregnant women, children, elderly, and immunocompromised."
            href="/food-safety/vulnerable-groups"
            color="bg-purple-100 text-purple-800"
          />
          
          <SafetyCard
            icon={<CalendarDays />}
            title="Holiday & Events"
            description="Keep food safe during special occasions and gatherings."
            href="/food-safety/holiday-events"
            color="bg-green-100 text-green-800"
          />
          
          <SafetyCard
            icon={<Microscope />}
            title="Science of Spoilage"
            description="The biology and chemistry behind food spoilage and preservation."
            href="/food-safety/science-of-spoilage"
            color="bg-indigo-100 text-indigo-800"
          />
          
          <SafetyCard
            icon={<SirenIcon />}
            title="Emergency Situations"
            description="How to manage food safety during power outages and natural disasters."
            href="/food-safety/emergency"
            color="bg-orange-100 text-orange-800"
          />
          
          <SafetyCard
            icon={<Tags />}
            title="Food Labels"
            description="Understand date labels, nutrition facts, and ingredient listings."
            href="/food-safety/understanding-food-labels"
            color="bg-teal-100 text-teal-800"
          />
          
          <SafetyCard
            icon={<Pill />}
            title="Food Ingredients Guide"
            description="Learn about common food additives, preservatives, and their health impacts."
            href="/ingredients"
            color="bg-yellow-100 text-yellow-800"
          />
        </div>
      </div>
    </section>
  );
};

interface SafetyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}

const SafetyCard = ({ icon, title, description, href, color }: SafetyCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-2`}>
          <span className="sr-only">{title} icon</span>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full justify-between">
          <Link to={href}>
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodSafetyEducation;
