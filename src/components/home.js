import React from "react";
import HeroSection from "./heroSection";
import SectionHelp from "./sectionHelp";
import { useAuth } from "../contexts/AuthContext";

export const Home = () => {
  const { currentUser } = useAuth();

  if (currentUser && currentUser != null) {
    window.location.href = "/dashboard";
  }

  return (
    <div>
      <HeroSection />
      <SectionHelp />
    </div>
  );
};
