
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/20 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FreshCheck. All rights reserved.
          </p>
          
          <div className="text-sm text-muted-foreground flex items-center">
            Created By{" "}
            <a 
              href="https://elevatedai.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary mx-1"
            >
              Elevated AI
            </a>{" "}
            a{" "}
            <a 
              href="https://n3rdlabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary mx-1"
            >
              N3RD Labs
            </a>{" "}
            company
          </div>
          
          <div className="flex gap-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/recalls" className="text-sm text-muted-foreground hover:text-foreground">
              Recalls
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

