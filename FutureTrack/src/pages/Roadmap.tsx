import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Position,
  Node,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Footer from "../components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, DownloadIcon, RefreshCw } from "lucide-react";
import jsPDF from "jspdf";
import { RoadmapData } from "@/types/user"; //roadmap type
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

// Fallback data for "Doctor" career
const fallbackRoadmapData = {
  career: "Doctor",
  description:
    "Doctors diagnose and treat illnesses, injuries, and medical conditions to improve patient health. They use medical knowledge, clinical skills, and empathy to provide care in various settings.",
  skills: [
    "Medical Knowledge",
    "Communication",
    "Problem Solving",
    "Empathy",
    "Attention to Detail",
  ],
  education: [
    { level: "High School", focus: "Biology, Chemistry, Physics, Mathematics" },
    {
      level: "Bachelor's Degree",
      focus: "Pre-Medical Studies, Biology, or related field",
    },
    {
      level: "Medical School",
      focus: "Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)",
    },
    {
      level: "Residency",
      focus: "Specialized training in chosen medical field",
    },
  ],
  alternativePaths: [
    "Physician Assistant training for a shorter path",
    "Nursing degree with specialization",
    "Medical research with a PhD",
  ],
  careerEntry: [
    "Complete clinical rotations during medical school",
    "Pass licensing exams (e.g., USMLE or COMLEX)",
    "Apply for residency programs in your specialty",
    "Network with healthcare professionals",
    "Volunteer in medical settings to gain experience",
  ],
  careerAdvancement: [
    "Complete residency and pursue fellowship for specialization",
    "Obtain board certification in your specialty",
    "Stay updated with continuing medical education (CME)",
    "Explore leadership roles like chief resident or medical director",
    "Contribute to medical research or teaching",
  ],
  timelineYears: 8,
};

// Fallback alternative careers
const fallbackAlternateCareers = [
  "Nurse",
  "Physician Assistant",
  "Medical Researcher",
  "Pharmacist",
  "Physical Therapist",
  "Dentist",
];

// Parse quiz prompt to extract careers
const parseQuizPrompt = (prompt: string | null) => {
  if (!prompt) {
    return { topCareer: "Doctor", alternateCareers: fallbackAlternateCareers };
  }

  // Expected format: "Recommended careers: 1. Career1, 2. Career2, 3. Career3, 4. Career4, 5. Career5"
  const careerMatch = prompt.match(/Recommended careers: (.+)/);
  if (!careerMatch) {
    return { topCareer: "Doctor", alternateCareers: fallbackAlternateCareers };
  }

  const careers = careerMatch[1]
    .split(", ")
    .map((item) => item.replace(/^\d+\.\s*/, "").trim());

  if (careers.length < 5) {
    return { topCareer: "Doctor", alternateCareers: fallbackAlternateCareers };
  }

  return {
    topCareer: careers[0],
    alternateCareers: careers.slice(1),
  };
};

// Generate nodes and edges for React Flow
const generateRoadmapGraph = (roadmapData: RoadmapData) => {
  const baseNodes: Node[] = [];
  const baseEdges: any[] = [];

  // Career node (center)
  baseNodes.push({
    id: "career",
    type: "default",
    data: { label: roadmapData.career },
    position: { x: 250, y: 250 },
    style: {
      background: "linear-gradient(to right, #7c3aed, #6d28d9)",
      color: "white",
      fontWeight: "bold",
      borderRadius: "8px",
      width: 200,
      textAlign: "center",
    },
  });

  // Education path nodes
  const educationNodes = roadmapData.education.map(
    (edu: any, index: number) => ({
      id: `education-${index + 1}`,
      type: "default",
      data: { label: edu.level },
      position: { x: 50 + index * 200, y: 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        background: "#f3e8ff",
        borderRadius: "8px",
        width: 150,
        textAlign: "center",
      },
    })
  );

  // Skill nodes (limit to 3 for layout)
  const skillNodes = roadmapData.skills
    .slice(0, 3)
    .map((skill: string, index: number) => ({
      id: `skill-${index + 1}`,
      type: "default",
      data: { label: skill },
      position: { x: 80 + index * 150, y: 400 },
      style: {
        background: "#ddd6fe",
        borderRadius: "8px",
        width: 130,
        textAlign: "center",
      },
    }));

  // Alternative path nodes
  const alternativeNodes = roadmapData.alternativePaths.map(
    (path: string, index: number) => ({
      id: `alt-${index + 1}`,
      type: "default",
      data: { label: path.split(" ")[0] + " Path" },
      position: { x: 600, y: 180 + index * 70 },
      targetPosition: Position.Left,
      style: {
        background: "#ede9fe",
        borderRadius: "8px",
        width: 170,
        textAlign: "center",
      },
    })
  );

  // Add all nodes
  baseNodes.push(...educationNodes, ...skillNodes, ...alternativeNodes);

  // Add edges
  // Education path edges
  educationNodes.forEach((node: Node, index: number) => {
    if (index < educationNodes.length - 1) {
      baseEdges.push({
        id: `edge-edu-${index + 1}-${index + 2}`,
        source: node.id,
        target: educationNodes[index + 1].id,
        type: "smoothstep",
        animated: true,
      });
    }
    baseEdges.push({
      id: `edge-edu-${index + 1}-career`,
      source: node.id,
      target: "career",
      type: "smoothstep",
    });
  });

  // Skill edges
  skillNodes.forEach((node: Node) => {
    baseEdges.push({
      id: `edge-skill-${node.id}-career`,
      source: node.id,
      target: "career",
      type: "straight",
    });
  });

  // Alternative path edges
  alternativeNodes.forEach((node: Node, index: number) => {
    baseEdges.push({
      id: `edge-alt-${index + 1}-career`,
      source: node.id,
      target: "career",
      type: "smoothstep",
      style: { strokeDasharray: "5,5" },
    });
  });

  return { nodes: baseNodes, edges: baseEdges };
};

// React Flow options
const flowOptions = {
  fitView: true,
  attributionPosition: "bottom-right" as PanelPosition,
  connectionLineType: ConnectionLineType.SmoothStep,
};

const Roadmap = () => {
  const { user, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alternateCareers, setAlternateCareers] = useState<string[]>(
    fallbackAlternateCareers
  );

  // Initialize React Flow state
  const initialGraph = generateRoadmapGraph(fallbackRoadmapData);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges);

  // Clean API response from markdown
  const cleanResponse = (response: string) => {
    if (!response || typeof response !== "string") return "";
    let cleaned = response.trim();
    cleaned = cleaned.replace(/```json\n?|\n?```/g, "");
    cleaned = cleaned.replace(/```/g, "");
    cleaned = cleaned.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed.education)) {
        parsed.education = parsed.education.map((edu: any) => ({
          level: typeof edu.level === "string" ? edu.level : "",
          focus: typeof edu.focus === "string" ? edu.focus : "",
        }));
      }
      return JSON.stringify(parsed);
    } catch (error) {
      cleaned = cleaned.replace(/([{,]\s*)(\w[\w\s-]*\w)\s*:/g, '$1"$2":');
      cleaned = cleaned.replace(/,\s*[^,}]*[^,}"]\s*([,}])/g, "$1");
      return cleaned.trim();
    }
  };

  // Fetch roadmap data from Ollama
  useEffect(() => {
    const fetchRoadmapData = async (retry = true) => {
      try {
        setIsLoading(true);

        // Parse quiz prompt
        const quizPrompt = localStorage.getItem("quizPrompt");
        const { topCareer, alternateCareers } = parseQuizPrompt(quizPrompt);
        setAlternateCareers(alternateCareers);

        // Warn if no quiz results
        if (!quizPrompt || topCareer === "Doctor") {
          toast({
            title: "No quiz results found",
            description:
              "You're viewing a sample roadmap for Doctor. Take the quiz for personalized results.",
            variant: "default",
          });
        }

        const prompt = `Return a JSON object for a career roadmap for "${topCareer}". The object must have exactly these fields: "career" (string), "description" (string), "skills" (array of strings), "education" (array of objects, each with only "level" and "focus" as strings), "alternativePaths" (array of strings), "careerEntry" (array of strings for steps to enter the career), "careerAdvancement" (array of strings for steps to advance in the career), "timelineYears" (number). Do not include additional fields or properties. Ensure data is accurate, concise, and relevant. Return ONLY the JSON object as a plain string, with no markdown, code fences (\`\`\`), or extra text. Example: {"career":"Doctor","description":"Diagnoses and treats patients","skills":["Communication"],"education":[{"level":"Medical School","focus":"Medicine"}],"alternativePaths":["Nurse"],"careerEntry":["Complete clinical rotations","Pass licensing exams"],"careerAdvancement":["Complete residency","Obtain board certification"],"timelineYears":11}`;

        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization:
                "your own api key",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama3-70b-8192",
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
              temperature: 0.7,
            }),
          }
        );

        // Check if response is OK
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Body: ${errorText}`
          );
        }

        const data = await response.json();

        // Check if the response is as expected
        if (!data || !data.choices || !data.choices[0]?.message?.content) {
          throw new Error(
            "Response format is unexpected or missing the content."
          );
        }

        const cleanedResponse = cleanResponse(data.choices[0].message.content);

        // Check if the cleaned response is empty
        if (!cleanedResponse) {
          throw new Error("Received an empty response after cleaning.");
        }

        // Parse the cleaned response
        let roadmap;
        try {
          roadmap = JSON.parse(cleanedResponse);
        } catch (parseError) {
          throw new Error(`JSON parse failed: ${parseError.message}`);
        }

        // Validate JSON structure
        if (
          !roadmap.career ||
          typeof roadmap.career !== "string" ||
          !roadmap.description ||
          typeof roadmap.description !== "string" ||
          !Array.isArray(roadmap.skills) ||
          !roadmap.skills.every((s: any) => typeof s === "string") ||
          !Array.isArray(roadmap.education) ||
          !roadmap.education.every(
            (e: any) =>
              typeof e.level === "string" && typeof e.focus === "string"
          ) ||
          !Array.isArray(roadmap.alternativePaths) ||
          !roadmap.alternativePaths.every((p: any) => typeof p === "string") ||
          !Array.isArray(roadmap.careerEntry) ||
          !roadmap.careerEntry.every((s: any) => typeof s === "string") ||
          !Array.isArray(roadmap.careerAdvancement) ||
          !roadmap.careerAdvancement.every((s: any) => typeof s === "string") ||
          typeof roadmap.timelineYears !== "number"
        ) {
          throw new Error("Invalid JSON structure");
        }

        setRoadmapData(roadmap);
        const newGraph = generateRoadmapGraph(roadmap);
        setNodes(newGraph.nodes);
        setEdges(newGraph.edges);

        toast({
          title: "Roadmap Loaded",
          description: `Career path for ${roadmap.career} loaded successfully.`,
        });
      } catch (error) {
        console.error("Error fetching roadmap:", error.message);
        if (retry) {
          console.log("Retrying API call...");
          return fetchRoadmapData(false);
        }
        setRoadmapData(fallbackRoadmapData);
        const newGraph = generateRoadmapGraph(fallbackRoadmapData);
        setNodes(newGraph.nodes);
        setEdges(newGraph.edges);
        setAlternateCareers(fallbackAlternateCareers);
        toast({
          title: "Error",
          description: `Failed to load roadmap: ${error.message}. Using fallback data.`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapData();
  }, [toast]);

  // Handle alternative career selection
  const handleAlternateCareer = (career: string) => {
    setIsLoading(true);
    const fetchAlternateRoadmap = async () => {
      try {
        const prompt = `Return a JSON object for a career roadmap for "${career}". The object must have exactly these fields: "career" (string), "description" (string), "skills" (array of strings), "education" (array of objects, each with only "level" and "focus" as strings), "alternativePaths" (array of strings), "careerEntry" (array of strings for steps to enter the career), "careerAdvancement" (array of strings for steps to advance in the career), "timelineYears" (number). Do not include additional fields or properties. Ensure data is accurate, concise, and relevant. Return ONLY the JSON object as a plain string, with no markdown, code fences (\`\`\`), or extra text. Example: {"career":"Doctor","description":"Diagnoses and treats patients","skills":["Communication"],"education":[{"level":"Medical School","focus":"Medicine"}],"alternativePaths":["Nurse"],"careerEntry":["Complete clinical rotations","Pass licensing exams"],"careerAdvancement":["Complete residency","Obtain board certification"],"timelineYears":11}`;

        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "phi4-mini",
            prompt: prompt,
            stream: false,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const cleanedResponse = cleanResponse(data.response);
        const roadmap = JSON.parse(cleanedResponse);

        setRoadmapData(roadmap);
        const newGraph = generateRoadmapGraph(roadmap);
        setNodes(newGraph.nodes);
        setEdges(newGraph.edges);

        toast({
          title: "Roadmap Updated",
          description: `Now showing career path for: ${career}`,
        });
      } catch (error) {
        console.error("Error fetching alternate roadmap:", error.message);
        setRoadmapData(fallbackRoadmapData);
        const newGraph = generateRoadmapGraph(fallbackRoadmapData);
        setNodes(newGraph.nodes);
        setEdges(newGraph.edges);
        toast({
          title: "Error",
          description: `Failed to load roadmap for ${career}. Using fallback data.`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlternateRoadmap();
  };
  // Handle saving the roadmap
  const handleSaveRoadmap = async () => {
    if (!roadmapData) {
      toast({
        title: "Error",
        description: "No roadmap data available to save.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(
        "/api/saveRoadmap",
        {
          roadmap: roadmapData,
        },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.message === "Roadmap saved successfully") {
        toast({
          title: "Roadmap Saved",
          description: "Your roadmap has been saved successfully.",
        });
        navigate("/user");
      } else {
        toast({
          title: "Error",
          description: "Failed to save roadmap. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving roadmap:", error);
      toast({
        title: "Error",
        description: "Failed to save roadmap. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to generate and download PDF
  const handleDownload = () => {
    if (!roadmapData) {
      toast({
        title: "Error",
        description: "No roadmap data available to download.",
        variant: "destructive",
      });
      return;
    }

    try {
      const doc = new jsPDF();
      let yOffset = 20;

      // Title
      doc.setFontSize(18);
      doc.text(`${roadmapData.career} Career Roadmap`, 20, yOffset);
      yOffset += 10;

      // Description
      doc.setFontSize(12);
      doc.text("Description:", 20, yOffset);
      yOffset += 7;
      const descriptionLines = doc.splitTextToSize(
        roadmapData.description,
        170
      );
      doc.text(descriptionLines, 20, yOffset);
      yOffset += descriptionLines.length * 7 + 5;

      // Skills
      doc.setFontSize(12);
      doc.text("Key Skills:", 20, yOffset);
      yOffset += 7;
      roadmapData.skills.forEach((skill: string) => {
        doc.text(`• ${skill}`, 25, yOffset);
        yOffset += 7;
      });
      yOffset += 5;

      // Education
      doc.text("Education Path:", 20, yOffset);
      yOffset += 7;
      roadmapData.education.forEach((edu: any) => {
        doc.text(`• ${edu.level}: ${edu.focus}`, 25, yOffset);
        yOffset += 7;
      });
      yOffset += 5;

      // Career Entry
      doc.text("Career Entry Steps:", 20, yOffset);
      yOffset += 7;
      roadmapData.careerEntry.forEach((step: string) => {
        const stepLines = doc.splitTextToSize(`• ${step}`, 170);
        doc.text(stepLines, 25, yOffset);
        yOffset += stepLines.length * 7;
      });
      yOffset += 5;

      // Career Advancement
      doc.text("Career Advancement Steps:", 20, yOffset);
      yOffset += 7;
      roadmapData.careerAdvancement.forEach((step: string) => {
        const stepLines = doc.splitTextToSize(`• ${step}`, 170);
        doc.text(stepLines, 25, yOffset);
        yOffset += stepLines.length * 7;
      });
      yOffset += 5;

      // Alternative Paths
      doc.text("Alternative Paths:", 20, yOffset);
      yOffset += 7;
      roadmapData.alternativePaths.forEach((path: string) => {
        const pathLines = doc.splitTextToSize(`• ${path}`, 170);
        doc.text(pathLines, 25, yOffset);
        yOffset += pathLines.length * 7;
      });
      yOffset += 5;

      // Timeline
      doc.text(
        `Estimated Timeline: ${roadmapData.timelineYears} years`,
        20,
        yOffset
      );

      // Save the PDF
      doc.save(`${roadmapData.career}_Career_Roadmap.pdf`);

      toast({
        title: "PDF Downloaded",
        description: "Your career roadmap has been saved as a PDF.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || !roadmapData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center text-future-600">
          <RefreshCw className="h-6 w-6 mr-2 animate-spin" />
          Loading roadmap...
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar with Career Info */}
          <div className="w-full md:w-1/3 md:sticky md:top-20">
            <div className="mb-6">
              <Link
                to="/"
                className="text-future-600 hover:text-future-800 inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
              </Link>
            </div>

            <Card className="shadow-lg border-future-100 mb-6">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-future-600 to-future-800 bg-clip-text text-transparent">
                  {roadmapData.career}
                </h1>
                <p className="text-gray-700 mb-4">{roadmapData.description}</p>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Key Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmapData.skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-future-100 text-future-800 hover:bg-future-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Education Path
                  </h3>
                  <ul className="space-y-2">
                    {roadmapData.education.map((edu: any, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-future-500 mr-2"></div>
                        <div>
                          <span className="font-medium">{edu.level}:</span>{" "}
                          {edu.focus}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Timeline
                  </h3>
                  <p className="text-gray-700">
                    Estimated time to enter this field:{" "}
                    <span className="font-medium">
                      {roadmapData.timelineYears} years
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-future-600 hover:bg-future-700"
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                  {isLoggedIn && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-future-200 text-future-700 hover:bg-future-50"
                      onClick={handleSaveRoadmap}
                    >
                      <Link to="/save">Save to dash</Link>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-future-200 text-future-700 hover:bg-future-50"
                  >
                    <Link to="/quiz">Retake Quiz</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-future-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Not quite right?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore these alternative career paths that might match your
                  skills and interests.
                </p>
                <div className="flex flex-wrap gap-2">
                  {alternateCareers.map((career: string, index: number) => (
                    <Badge
                      key={index}
                      className="bg-white border border-future-200 text-future-700 hover:bg-future-50 cursor-pointer py-1.5 px-3"
                      onClick={() => handleAlternateCareer(career)}
                    >
                      {career}
                    </Badge>
                  ))}
                </div>
                {isLoading && (
                  <div className="mt-4 flex items-center justify-center text-future-600 text-sm">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Updating roadmap...
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Main Content with Roadmap Visualization */}
          <div className="w-full md:w-2/3">
            <Card className="shadow-lg border-future-100 mb-6">
              <CardContent className="p-6">
                <Tabs defaultValue="flow">
                  <TabsList className="mb-4">
                    <TabsTrigger value="flow">Visual Roadmap</TabsTrigger>
                    <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
                  </TabsList>

                  <TabsContent value="flow" className="mt-0">
                    <div
                      style={{ height: "600px" }}
                      className="border border-gray-200 rounded-md"
                    >
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        fitView={flowOptions.fitView}
                        connectionLineType={flowOptions.connectionLineType}
                        attributionPosition={flowOptions.attributionPosition}
                      >
                        <Background />
                        <Controls />
                        <MiniMap
                          nodeColor={(node: Node) => {
                            switch (true) {
                              case node.id === "career":
                                return "#7c3aed";
                              case node.id.includes("education"):
                                return "#f3e8ff";
                              case node.id.includes("skill"):
                                return "#ddd6fe";
                              case node.id.includes("alt"):
                                return "#ede9fe";
                              default:
                                return "#eee";
                            }
                          }}
                        />
                      </ReactFlow>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Tip: Drag to pan, scroll to zoom, and click nodes to
                      select them.
                    </div>
                  </TabsContent>

                  <TabsContent value="steps" className="mt-0">
                    <TabsContent value="steps" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Step 1: Education Foundation
                          </h3>
                          <div className="space-y-4 ml-4">
                            {roadmapData.education.map(
                              (edu: any, index: number) => (
                                <div
                                  key={index}
                                  className="border-l-2 border-future-200 pl-4 py-1"
                                >
                                  <h4 className="font-medium">{edu.level}</h4>
                                  <p className="text-gray-600 text-sm">
                                    {edu.focus}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Step 2: Building Skills
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {roadmapData.skills.map(
                              (skill: string, index: number) => (
                                <li key={index}>
                                  {skill}: Practice through coursework,
                                  volunteering, or internships
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Step 3: Career Entry
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {roadmapData.careerEntry.map(
                              (step: string, index: number) => (
                                <li key={index}>{step}</li>
                              )
                            )}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Step 4: Career Advancement
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {roadmapData.careerAdvancement.map(
                              (step: string, index: number) => (
                                <li key={index}>{step}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Roadmap;
