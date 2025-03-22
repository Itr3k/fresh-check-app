import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  AlertCircle,
  Bug, 
  Shield,
  Calendar, 
  CheckCircle2, 
  XCircle,
  Printer, 
  FileDown,
  ExternalLink,
  UserRound
} from "lucide-react";
import PageTransition from "../../components/PageTransition";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AdUnit from "../../components/AdUnit";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead,
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FoodborneIllnessPrevention = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Schema.org structured data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Prevent Foodborne Illness",
    "description": "Learn how to identify, prevent, and respond to common foodborne illnesses including Salmonella, E. coli, Listeria and Norovirus.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Clean",
        "text": "Wash hands and surfaces often with warm, soapy water before, during, and after preparing food."
      },
      {
        "@type": "HowToStep",
        "name": "Separate",
        "text": "Prevent cross-contamination by keeping raw meat, poultry, seafood, and eggs separate from ready-to-eat foods."
      },
      {
        "@type": "HowToStep",
        "name": "Cook",
        "text": "Cook foods to the proper internal temperature to kill harmful bacteria. Use a food thermometer."
      },
      {
        "@type": "HowToStep",
        "name": "Chill",
        "text": "Refrigerate perishable food within 2 hours (1 hour if the temperature is above 90°F)."
      }
    ]
  };
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the most common foodborne illnesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most common foodborne illnesses are caused by Norovirus, Salmonella, Clostridium perfringens, Campylobacter, and Staphylococcus aureus. Other significant pathogens include E. coli, Listeria monocytogenes, and Vibrio."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly do symptoms of food poisoning appear?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Symptoms can appear within hours or up to several days after consuming contaminated food, depending on the pathogen. Staphylococcus aureus can cause symptoms within 30 minutes to 6 hours, while Listeria might not cause symptoms for up to 70 days."
        }
      },
      {
        "@type": "Question",
        "name": "When should I see a doctor for food poisoning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Seek medical attention if you experience any of these symptoms: high fever (over 101.5°F), blood in stools, prolonged vomiting preventing liquid retention, signs of dehydration (extreme thirst, dry mouth, little/no urination, dizziness), or diarrhea lasting more than 3 days."
        }
      }
    ]
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Foodborne Illness Prevention - Complete Guide | FreshCheck</title>
        <meta 
          name="description" 
          content="Learn symptoms and prevention strategies for Salmonella, E. coli, Listeria, and more. Protect yourself and your family from food poisoning with our expert tips."
        />
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="text-sm mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link to="/food-safety" className="text-muted-foreground hover:text-primary">Food Safety</Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-primary font-medium">Foodborne Illness Prevention</li>
            </ol>
          </nav>

          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Foodborne Illness Prevention Guide
            </h1>
            
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer size={16} className="mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <FileDown size={16} className="mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <Calendar size={16} className="mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Last updated: October 15, 2023</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span className="text-muted-foreground">Information verified by CDC and FDA guidelines</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                  <p className="text-sm text-red-700">
                    <strong>Important Health Information:</strong> According to the CDC, foodborne diseases cause approximately 
                    48 million illnesses, 128,000 hospitalizations, and 3,000 deaths in the United States each year.
                    Proper food handling is crucial for prevention.
                  </p>
                </div>
              </div>
              
              <h2 id="what-is-foodborne-illness" className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                <Bug className="mr-2 text-primary" />
                What is Foodborne Illness?
              </h2>
              
              <p>
                <strong>Foodborne illness</strong> (commonly known as food poisoning) occurs when you consume food or beverages 
                contaminated with bacteria, viruses, parasites, or chemical substances. These harmful 
                organisms are not typically visible, nor do they usually affect the taste, smell, or appearance of food.
              </p>

              <p>
                Most foodborne illnesses are infections caused by pathogens like bacteria, viruses, and parasites. 
                Other cases are caused by toxins produced by bacteria that have grown in food due to improper handling or storage.
              </p>
              
              <h2 id="common-foodborne-pathogens" className="text-2xl font-semibold mt-8 mb-4">
                Common Foodborne Pathogens and Their Symptoms
              </h2>
              
              <p>
                Understanding the different pathogens that cause foodborne illness can help you recognize symptoms 
                and seek appropriate treatment. Here are the most common foodborne pathogens:
              </p>
              
              <Tabs defaultValue="bacteria" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bacteria">Bacteria</TabsTrigger>
                  <TabsTrigger value="viruses">Viruses</TabsTrigger>
                  <TabsTrigger value="parasites">Parasites</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bacteria" className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pathogen</TableHead>
                        <TableHead>Symptoms</TableHead>
                        <TableHead>Onset Time</TableHead>
                        <TableHead>Common Food Sources</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Salmonella</TableCell>
                        <TableCell>Diarrhea, fever, abdominal cramps, vomiting</TableCell>
                        <TableCell>6-72 hours</TableCell>
                        <TableCell>Raw/undercooked eggs, poultry, meat, unpasteurized milk or juice</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">E. coli (STEC)</TableCell>
                        <TableCell>Severe stomach cramps, bloody diarrhea, vomiting</TableCell>
                        <TableCell>3-4 days</TableCell>
                        <TableCell>Undercooked ground beef, raw milk, contaminated produce</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Listeria monocytogenes</TableCell>
                        <TableCell>Fever, muscle aches, headache, stiff neck, confusion, loss of balance</TableCell>
                        <TableCell>1-4 weeks</TableCell>
                        <TableCell>Ready-to-eat deli meats, soft cheeses, raw sprouts, unpasteurized milk</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Campylobacter</TableCell>
                        <TableCell>Diarrhea (often bloody), fever, abdominal cramps</TableCell>
                        <TableCell>2-5 days</TableCell>
                        <TableCell>Raw/undercooked poultry, unpasteurized milk, contaminated water</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Clostridium perfringens</TableCell>
                        <TableCell>Abdominal pain, diarrhea</TableCell>
                        <TableCell>8-16 hours</TableCell>
                        <TableCell>Meats, stews, gravies kept at improper temperatures</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="viruses" className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pathogen</TableHead>
                        <TableHead>Symptoms</TableHead>
                        <TableHead>Onset Time</TableHead>
                        <TableHead>Common Food Sources</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Norovirus</TableCell>
                        <TableCell>Nausea, vomiting, diarrhea, stomach pain</TableCell>
                        <TableCell>12-48 hours</TableCell>
                        <TableCell>Ready-to-eat foods touched by infected food workers</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hepatitis A</TableCell>
                        <TableCell>Fatigue, nausea, abdominal pain, jaundice</TableCell>
                        <TableCell>15-50 days</TableCell>
                        <TableCell>Raw shellfish, contaminated water, foods handled by infected workers</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Rotavirus</TableCell>
                        <TableCell>Watery diarrhea, vomiting, fever, abdominal pain</TableCell>
                        <TableCell>1-3 days</TableCell>
                        <TableCell>Foods contaminated by infected individuals, particularly with poor hygiene</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="parasites" className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pathogen</TableHead>
                        <TableHead>Symptoms</TableHead>
                        <TableHead>Onset Time</TableHead>
                        <TableHead>Common Food Sources</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Toxoplasma gondii</TableCell>
                        <TableCell>Flu-like symptoms; severe consequences for pregnant women</TableCell>
                        <TableCell>5-23 days</TableCell>
                        <TableCell>Undercooked meat, unwashed fruits and vegetables</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cyclospora</TableCell>
                        <TableCell>Watery diarrhea, loss of appetite, weight loss, cramping</TableCell>
                        <TableCell>1-14 days</TableCell>
                        <TableCell>Imported fresh produce, especially berries and herbs</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Trichinella</TableCell>
                        <TableCell>Nausea, diarrhea, vomiting, fatigue, fever, muscle pain</TableCell>
                        <TableCell>1-2 days (intestinal), 2-8 weeks (muscle symptoms)</TableCell>
                        <TableCell>Raw or undercooked pork, wild game meat</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
              
              <div className="my-8">
                <h3 className="text-xl font-semibold mb-4">High-Risk Foods by Pathogen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2 flex items-center">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                          <Bug className="text-red-600 h-3 w-3" />
                        </div>
                        Salmonella
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Raw or undercooked eggs</li>
                        <li>• Raw or undercooked poultry</li>
                        <li>• Raw sprouts</li>
                        <li>• Unpasteurized milk and juices</li>
                        <li>• Raw fruits and vegetables</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2 flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <Bug className="text-blue-600 h-3 w-3" />
                        </div>
                        E. coli
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Undercooked ground beef</li>
                        <li>• Unpasteurized milk</li>
                        <li>• Unpasteurized apple cider</li>
                        <li>• Soft cheeses made from raw milk</li>
                        <li>• Raw fruits and vegetables (especially leafy greens)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2 flex items-center">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                          <Bug className="text-green-600 h-3 w-3" />
                        </div>
                        Listeria
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Ready-to-eat deli meats</li>
                        <li>• Hot dogs</li>
                        <li>• Refrigerated pâtés</li>
                        <li>• Soft cheeses (feta, Brie, Camembert)</li>
                        <li>• Raw sprouts</li>
                        <li>• Cold smoked seafood</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2 flex items-center">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                          <Bug className="text-purple-600 h-3 w-3" />
                        </div>
                        Norovirus
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Raw or undercooked shellfish (oysters)</li>
                        <li>• Foods touched by infected food handlers</li>
                        <li>• Fresh produce</li>
                        <li>• Any food consumed raw or handled after cooking</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <h2 id="prevention-strategies" className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                <Shield className="mr-2 text-primary" />
                Foodborne Illness Prevention Strategies
              </h2>
              
              <p>
                The good news is that most foodborne illnesses can be prevented by following proper food handling 
                practices. The CDC and FDA recommend these four simple steps:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-medium">Clean</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Wash hands with soap and water for at least 20 seconds before, during, and after food preparation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Wash utensils, cutting boards, and countertops with hot, soapy water</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Rinse fresh fruits and vegetables under running water</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <span className="text-yellow-600 font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-medium">Separate</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Use separate cutting boards for produce and for raw meat, poultry, seafood, and eggs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Keep raw meat, poultry, seafood, and eggs separate from other foods in shopping cart and refrigerator</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Never place cooked food on a plate that previously held raw meat, poultry, seafood, or eggs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-medium">Cook</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Use a food thermometer to ensure foods are cooked to a safe internal temperature</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Cook ground meat to at least 160°F (71°C)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Cook poultry to at least 165°F (74°C)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Reheat leftovers to 165°F (74°C)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">4</span>
                    </div>
                    <h3 className="text-lg font-medium">Chill</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Refrigerate perishable food within 2 hours (1 hour if temperature is above 90°F/32°C)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Never thaw food at room temperature; thaw in refrigerator, cold water, or microwave</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span>Keep your refrigerator at 40°F (4°C) or below and freezer at 0°F (-18°C) or below</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h2 id="when-to-seek-medical-help" className="text-2xl font-semibold mt-8 mb-4">
                When to Seek Medical Help
              </h2>
              
              <p>
                Most cases of foodborne illness are mild and resolve on their own. However, sometimes food poisoning 
                can be severe or even life-threatening. Seek medical help if you experience:
              </p>
              
              <div className="bg-red-50 rounded-lg p-5 my-4">
                <h3 className="font-medium mb-3 text-red-800">Warning Signs - Seek Medical Attention</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <AlertCircle size={16} className="text-red-600 mr-2 mt-0.5" />
                        <span>High fever (over 101.5°F/38.6°C)</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle size={16} className="text-red-600 mr-2 mt-0.5" />
                        <span>Blood in your stool</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle size={16} className="text-red-600 mr-2 mt-0.5" />
                        <span>Prolonged vomiting that prevents keeping liquids down</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <AlertCircle size={16} className="text-red-600 mr-2 mt-0.5" />
                        <span>Signs of dehydration (excessive thirst, dry mouth, little/no urination, dizziness)</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle size={16} className="text-red-600 mr-2 mt-0.5" />
                        <span>Diarrhea lasting more than 3 days</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle size={16} className="text-red-600 mr-2 mt-0.5" />
                        <span>Neurological symptoms such as blurry vision, muscle weakness, or tingling in arms</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h2 id="special-considerations" className="text-2xl font-semibold mt-8 mb-4">
                Special Considerations for High-Risk Groups
              </h2>
              
              <p>
                Some people are at higher risk of developing severe illness from foodborne pathogens and should 
                take extra precautions:
              </p>
              
              <ul className="space-y-3 my-4">
                <li className="flex items-start">
                  <UserRound size={18} className="text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Pregnant women</span> - More susceptible to Listeria, which can cause miscarriage, 
                    premature delivery, or infection in newborns
                  </div>
                </li>
                <li className="flex items-start">
                  <UserRound size={18} className="text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Adults aged 65 and older</span> - Weakened immune systems and organs make it 
                    harder to fight off infection
                  </div>
                </li>
                <li className="flex items-start">
                  <UserRound size={18} className="text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Children under 5</span> - Developing immune systems and lower body weight 
                    make infections more severe
                  </div>
                </li>
                <li className="flex items-start">
                  <UserRound size={18} className="text-primary mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">People with weakened immune systems</span> - Including those with diabetes, 
                    liver or kidney disease, alcoholism, or receiving chemotherapy
                  </div>
                </li>
              </ul>
              
              <p>
                We cover more detailed food safety guidelines for these vulnerable groups in our 
                <Link to="/food-safety/vulnerable-groups" className="text-primary hover:underline"> Special Populations food safety guide</Link>.
              </p>
              
              <h2 id="frequently-asked-questions" className="text-2xl font-semibold mt-8 mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Can I tell if food is contaminated by its appearance or smell?</h3>
                  <p className="text-sm">
                    Usually not. Most pathogens that cause foodborne illness don't affect the taste, smell, or appearance of food. 
                    While spoiled food may look or smell bad, harmful bacteria can be present in food that looks and smells normal.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Is it safe to eat raw cookie dough or cake batter?</h3>
                  <p className="text-sm">
                    No. Raw cookie dough and cake batter can contain harmful bacteria from uncooked eggs (Salmonella) 
                    and raw flour (E. coli). Always bake items containing flour and eggs before eating.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">How should I handle food after a suspected case of food poisoning?</h3>
                  <p className="text-sm">
                    Discard any food you suspect caused the illness. Clean and sanitize all surfaces, utensils, 
                    and containers that may have come in contact with the contaminated food to prevent cross-contamination.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Can cooking kill all foodborne pathogens?</h3>
                  <p className="text-sm">
                    Proper cooking can kill most foodborne pathogens but not all toxins produced by bacteria. For example, 
                    Staphylococcus aureus produces heat-resistant toxins that aren't destroyed by cooking. Additionally, 
                    some toxins produced by molds can withstand high temperatures.
                  </p>
                </div>
              </div>
              
              <h2 id="related-resources" className="text-2xl font-semibold mt-8 mb-4">
                Related Food Safety Resources
              </h2>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/food-safety/temperature-danger-zone" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Temperature Danger Zone Guide</h3>
                    <p className="text-sm text-muted-foreground">Learn about the 40°F-140°F range where bacteria multiply rapidly</p>
                  </Link>
                </li>
                <li>
                  <Link to="/food-safety/prevent-cross-contamination" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Cross-Contamination Prevention</h3>
                    <p className="text-sm text-muted-foreground">Techniques to prevent spreading bacteria between foods</p>
                  </Link>
                </li>
                <li>
                  <Link to="/food-safety/vulnerable-groups" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Food Safety for Special Populations</h3>
                    <p className="text-sm text-muted-foreground">Extra precautions for pregnant women, elderly, and children</p>
                  </Link>
                </li>
                <li>
                  <Link to="/recalls" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Food Recall Alerts</h3>
                    <p className="text-sm text-muted-foreground">Check the latest food recall information</p>
                  </Link>
                </li>
              </ul>
              
              <div className="mt-8 mb-4">
                <h3 className="text-lg font-medium mb-2">Authoritative Sources</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <ExternalLink size={16} className="mr-2 text-primary" />
                    <a 
                      href="https://www.cdc.gov/foodsafety/foodborne-germs.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      CDC: Foodborne Pathogens and Illnesses
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink size={16} className="mr-2 text-primary" />
                    <a 
                      href="https://www.fda.gov/food/foodborne-pathogens/bad-bug-book-second-edition" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      FDA: Bad Bug Book (2nd Edition)
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink size={16} className="mr-2 text-primary" />
                    <a 
                      href="https://www.fsis.usda.gov/food-safety/foodborne-illness-and-disease/pathogens" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      USDA: Foodborne Illness and Disease
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="print:hidden my-8 p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-4">Find Storage Information for Common High-Risk Foods</h3>
                <p className="mb-4">
                  Now that you understand foodborne illness prevention, check the proper storage methods for these high-risk foods:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Link to="/food/chicken" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Chicken</Link>
                  <Link to="/food/eggs" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Eggs</Link>
                  <Link to="/food/ground-beef" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Ground Beef</Link>
                  <Link to="/food/seafood" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Seafood</Link>
                  <Link to="/food/deli-meat" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Deli Meat</Link>
                  <Link to="/food/soft-cheese" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Soft Cheese</Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1 print:hidden">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AdUnit slotId="food-safety-sidebar" />
                
                <div className="mt-6 bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Quick Navigation</h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a href="#what-is-foodborne-illness" className="text-primary hover:underline">
                        What is Foodborne Illness?
                      </a>
                    </li>
                    <li>
                      <a href="#common-foodborne-pathogens" className="text-primary hover:underline">
                        Common Pathogens & Symptoms
                      </a>
                    </li>
                    <li>
                      <a href="#prevention-strategies" className="text-primary hover:underline">
                        Prevention Strategies
                      </a>
                    </li>
                    <li>
                      <a href="#when-to-seek-medical-help" className="text-primary hover:underline">
                        When to Seek Medical Help
                      </a>
                    </li>
                    <li>
                      <a href="#special-considerations" className="text-primary hover:underline">
                        Special Considerations
                      </a>
                    </li>
                    <li>
                      <a href="#frequently-asked-questions" className="text-primary hover:underline">
                        FAQs
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium mb-2 text-green-800">Download Our Free Resources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <FileDown size={16} className="mr-2 text-green-600" />
                      <a href="#" className="text-green-700 hover:underline text-sm">
                        Foodborne Illness Quick Reference Guide
                      </a>
                    </li>
                    <li className="flex items-center">
                      <FileDown size={16} className="mr-2 text-green-600" />
                      <a href="#" className="text-green-700 hover:underline text-sm">
                        Food Safety Checklist for Home Kitchens
                      </a>
                    </li>
                    <li className="flex items-center">
                      <FileDown size={16} className="mr-2 text-green-600" />
                      <a href="#" className="text-green-700 hover:underline text-sm">
                        High-Risk Foods Reference Chart
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Related Food Items</h3>
                  <div className="space-y-3">
                    <Link to="/food/eggs" className="flex items-center bg-background p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=100&h=100&fit=crop" 
                        alt="Eggs" 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-sm">Egg Safety Guide</h4>
                        <p className="text-xs text-muted-foreground">Reduce your risk of Salmonella</p>
                      </div>
                    </Link>
                    
                    <Link to="/food/deli-meat" className="flex items-center bg-background p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1551135020-39e4ca508d9b?w=100&h=100&fit=crop" 
                        alt="Deli Meat" 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-sm">Deli Meat Storage Guide</h4>
                        <p className="text-xs text-muted-foreground">Listeria prevention tips</p>
                      </div>
                    </Link>
                    
                    <Link to="/food/ground-beef" className="flex items-center bg-background p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1588259748451-9ca50a1953a7?w=100&h=100&fit=crop" 
                        alt="Ground Beef" 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-sm">Ground Beef Safety</h4>
                        <p className="text-xs text-muted-foreground">E. coli prevention and cooking tips</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FoodborneIllnessPrevention;
