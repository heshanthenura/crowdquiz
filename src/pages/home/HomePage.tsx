import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Welcome from "../../components/welcome/Welcome";
import RecentSection from "../../components/recentsection/RecentSection";

function HomePage() {
  return (
    <>
      <NavBar />
      <Welcome />
      <RecentSection />
    </>
  );
}

export default HomePage;
