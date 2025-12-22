import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Footer from "../components/Footer";
import { toast } from "sonner";

interface Question {
  id: number;
  text: string;
  trait: string;
}

interface TraitGroup {
  trait: string;
  questions: Question[];
}

interface CareerRecommendation {
  rank: number;
  career: string;
  distance: number;
}

const TRAITS = {
  OPENNESS: "Openness",
  CONSCIENTIOUSNESS: "Conscientiousness",
  EXTRAVERSION: "Extraversion",
  AGREEABLENESS: "Agreeableness",
  NEUROTICISM: "Neuroticism",
  NUMERICAL_APTITUDE: "Numerical Aptitude",
  SPATIAL_APTITUDE: "Spatial Aptitude",
  PERCEPTUAL_APTITUDE: "Perceptual Aptitude",
  ABSTRACT_REASONING: "Abstract Reasoning",
  VERBAL_REASONING: "Verbal Reasoning",
};

const ANSWER_OPTIONS = [
  {
    value: "10",
    label: "Strongly Agree",
    color: "text-purple-500 bg-white border-green-500 h-10 w-10",
  },
  {
    value: "8",
    label: "Slightly Agree",
    color: "text-purple-500 bg-white border-green-500 h-8 w-8",
  },
  {
    value: "6",
    label: "Agree",
    color: "text-purple-500 bg-white border-green-500 h-6 w-6",
  },
  {
    value: "5",
    label: "Neutral",
    color: "text-gray-500 bg-white border-gray-500 h-5 w-5",
  },
  {
    value: "4",
    label: "Disagree",
    color: "text-green-500 bg-white border-purple-500 h-6 w-6",
  },
  {
    value: "2",
    label: "Slightly Disagree",
    color: "text-green-500 bg-white border-purple-500 h-8 w-8",
  },
  {
    value: "0",
    label: "Strongly Disagree",
    color: "text-green-500 bg-white border-purple-500 h-10 w-10",
  },
];

const traitGroups: TraitGroup[] = [
  {
    trait: TRAITS.OPENNESS,
    questions: [
      {
        id: 1,
        text: "I enjoy trying new experiences and stepping outside my comfort zone.",
        trait: TRAITS.OPENNESS,
      },
      {
        id: 2,
        text: "I am often curious about new ideas and concepts.",
        trait: TRAITS.OPENNESS,
      },
      {
        id: 3,
        text: "I enjoy artistic activities like painting, writing, or designing.",
        trait: TRAITS.OPENNESS,
      },
    ],
  },
  {
    trait: TRAITS.CONSCIENTIOUSNESS,
    questions: [
      {
        id: 4,
        text: "I always complete tasks on time and keep things organized.",
        trait: TRAITS.CONSCIENTIOUSNESS,
      },
      {
        id: 5,
        text: "I prefer to plan things in advance rather than leave them to the last minute.",
        trait: TRAITS.CONSCIENTIOUSNESS,
      },
      {
        id: 6,
        text: "I pay great attention to detail in everything I do.",
        trait: TRAITS.CONSCIENTIOUSNESS,
      },
    ],
  },
  {
    trait: TRAITS.EXTRAVERSION,
    questions: [
      {
        id: 7,
        text: "I enjoy socializing and find it energizing.",
        trait: TRAITS.EXTRAVERSION,
      },
      {
        id: 8,
        text: "I am talkative and enjoy meeting new people.",
        trait: TRAITS.EXTRAVERSION,
      },
      {
        id: 9,
        text: "I feel confident in group settings.",
        trait: TRAITS.EXTRAVERSION,
      },
    ],
  },
  {
    trait: TRAITS.AGREEABLENESS,
    questions: [
      {
        id: 10,
        text: "I prefer to help others and avoid conflicts.",
        trait: TRAITS.AGREEABLENESS,
      },
      {
        id: 11,
        text: "I am patient and try to see things from other people's perspectives.",
        trait: TRAITS.AGREEABLENESS,
      },
      {
        id: 12,
        text: "I enjoy working in a team and collaborating with others.",
        trait: TRAITS.AGREEABLENESS,
      },
    ],
  },
  {
    trait: TRAITS.NEUROTICISM,
    questions: [
      {
        id: 13,
        text: "I often feel anxious or stressed in unfamiliar situations.",
        trait: TRAITS.NEUROTICISM,
      },
      {
        id: 14,
        text: "I get upset easily when things don't go as planned.",
        trait: TRAITS.NEUROTICISM,
      },
      {
        id: 15,
        text: "I sometimes find it hard to remain calm during stressful situations.",
        trait: TRAITS.NEUROTICISM,
      },
    ],
  },
  {
    trait: TRAITS.NUMERICAL_APTITUDE,
    questions: [
      {
        id: 16,
        text: "I find it easy to solve math problems quickly.",
        trait: TRAITS.NUMERICAL_APTITUDE,
      },
      {
        id: 17,
        text: "I am comfortable working with data and numbers.",
        trait: TRAITS.NUMERICAL_APTITUDE,
      },
      {
        id: 18,
        text: "I can interpret graphs, charts, and statistical data easily.",
        trait: TRAITS.NUMERICAL_APTITUDE,
      },
    ],
  },
  {
    trait: TRAITS.SPATIAL_APTITUDE,
    questions: [
      {
        id: 19,
        text: "I can easily imagine how objects will look from different angles.",
        trait: TRAITS.SPATIAL_APTITUDE,
      },
      {
        id: 20,
        text: "I am good at solving puzzles, especially ones that involve shapes.",
        trait: TRAITS.SPATIAL_APTITUDE,
      },
      {
        id: 21,
        text: "I can quickly spot the differences in objects when they are presented in different forms.",
        trait: TRAITS.SPATIAL_APTITUDE,
      },
    ],
  },
  {
    trait: TRAITS.PERCEPTUAL_APTITUDE,
    questions: [
      {
        id: 22,
        text: "I can quickly identify patterns in data or objects.",
        trait: TRAITS.PERCEPTUAL_APTITUDE,
      },
      {
        id: 23,
        text: "I am very attentive to small details when working on a task.",
        trait: TRAITS.PERCEPTUAL_APTITUDE,
      },
      {
        id: 24,
        text: "I can spot mistakes or inconsistencies that others might miss.",
        trait: TRAITS.PERCEPTUAL_APTITUDE,
      },
    ],
  },
  {
    trait: TRAITS.ABSTRACT_REASONING,
    questions: [
      {
        id: 25,
        text: "I enjoy solving complex problems that require thinking outside the box.",
        trait: TRAITS.ABSTRACT_REASONING,
      },
      {
        id: 26,
        text: "I can easily understand abstract concepts without needing concrete examples.",
        trait: TRAITS.ABSTRACT_REASONING,
      },
      {
        id: 27,
        text: "I am good at identifying solutions to challenges that have no obvious answers.",
        trait: TRAITS.ABSTRACT_REASONING,
      },
    ],
  },
  {
    trait: TRAITS.VERBAL_REASONING,
    questions: [
      {
        id: 28,
        text: "I can understand and summarize complex texts with ease.",
        trait: TRAITS.VERBAL_REASONING,
      },
      {
        id: 29,
        text: "I enjoy reading and analyzing articles, essays, and reports.",
        trait: TRAITS.VERBAL_REASONING,
      },
      {
        id: 30,
        text: "I can quickly draw conclusions from written information or conversations.",
        trait: TRAITS.VERBAL_REASONING,
      },
    ],
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentGroup = traitGroups[currentGroupIndex];
  const progress = (currentGroupIndex / traitGroups.length) * 100;

  const handleAnswerSelect = (questionId: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const areAllQuestionsAnsweredInGroup = () => {
    return currentGroup.questions.every(
      (question) => selectedAnswers[question.id] !== undefined
    );
  };

  const handleNext = () => {
    if (
      areAllQuestionsAnsweredInGroup() &&
      currentGroupIndex < traitGroups.length - 1
    ) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    } else if (!areAllQuestionsAnsweredInGroup()) {
      toast.error(
        "Please answer all questions in this section before proceeding."
      );
    }
  };

  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const calculateTraitScores = () => {
    const traitScores: Record<string, number> = {};
    const questionCounts: Record<string, number> = {};

    // Initialize scores and question counts for all traits
    Object.values(TRAITS).forEach((trait) => {
      traitScores[trait] = 0;
      questionCounts[trait] = 0;
    });

    // Sum raw scores and count questions for each trait
    Object.entries(selectedAnswers).forEach(([questionId, value]) => {
      const question = traitGroups
        .flatMap((group) => group.questions)
        .find((q) => q.id === parseInt(questionId));
      if (question && question.trait) {
        traitScores[question.trait] += parseInt(value);
        questionCounts[question.trait] += 1;
      }
    });

    // Scale scores to 0–10 based on the number of questions per trait
    const scaledScores: Record<string, number> = {};
    Object.entries(traitScores).forEach(([trait, score]) => {
      const numQuestions = questionCounts[trait];
      if (numQuestions > 0) {
        // Max raw score per question is 10, so max raw score = numQuestions * 10
        const maxRawScore = numQuestions * 10;
        scaledScores[trait] = Number(((score / maxRawScore) * 10).toFixed(2));
      } else {
        scaledScores[trait] = 0;
      }
    });

    return scaledScores;
  };

  const handleSubmit = async () => {
    if (!areAllQuestionsAnsweredInGroup()) {
      toast.error(
        "Please answer all questions in this section before submitting."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate trait scores
      const scaledScores = calculateTraitScores();

      // Prepare sample array in the order of TRAITS
      const sample = Object.values(TRAITS).map((trait) => scaledScores[trait]);

      // Send POST request to Flask API
      const response = await fetch(
        "http://localhost:5001/get-career-recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sample }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch career recommendations");
      }

      const recommendations: CareerRecommendation[] = await response.json();

      // Generate prompt from recommendations
      const prompt = `Recommended careers: ${recommendations
        .map((rec) => `${rec.rank}. ${rec.career}`)
        .join(", ")}`;

      // Store prompt in localStorage
      localStorage.setItem("quizPrompt", prompt);

      toast.success("Quiz completed! Generating your career roadmap...", {
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/roadmap");
      }, 2000);
    } catch (error) {
      toast.error(
        "Error fetching career recommendations. Please try again later."
      );
      setIsSubmitting(false);
    }
  };

  const isLastGroup = currentGroupIndex === traitGroups.length - 1;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600 mb-4">
              Career Path Quiz
            </h1>
            <p className="text-gray-600">
              Answer these questions to discover your strengths and career fit.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Section {currentGroupIndex + 1} of {traitGroups.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-300/40" />
          </div>

          <Card className="mb-8 shadow-lg border-pastel-purple bg-pastel-light/80">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-6 text-center">
                {currentGroup.trait} Questions
              </h2>
              {currentGroup.questions.map((question) => (
                <div key={question.id} className="mb-8">
                  <h3 className="text-lg font-medium mb-4">{question.text}</h3>
                  <RadioGroup
                    value={selectedAnswers[question.id]}
                    onValueChange={(value) =>
                      handleAnswerSelect(question.id, value)
                    }
                    className="flex justify-between items-center gap-4"
                  >
                    {ANSWER_OPTIONS.map((option) => (
                      <div
                        key={option.value}
                        className="flex flex-col items-center"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`${question.id}-${option.value}`}
                          className={`peer ${
                            option.color
                          } border-2 focus:ring-2 focus:ring-offset-2 focus:ring-${
                            option.color.split("-")[1]
                          }-500`}
                        />
                        <Label
                          htmlFor={`${question.id}-${option.value}`}
                          className="mt-2 text-sm text-gray-700 peer-checked:text-pastel-purple peer-checked:font-semibold"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentGroupIndex === 0}
              className="border-pastel-blue text-purple-600 hover:bg-pastel-blue/30"
            >
              Previous
            </Button>

            {isLastGroup ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !areAllQuestionsAnsweredInGroup()}
                className="bg-pastel-purple hover:bg-pastel-green text-gray-900"
              >
                {isSubmitting ? "Processing..." : "Submit Answers"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!areAllQuestionsAnsweredInGroup()}
                className="bg-pastel-purple hover:bg-pastel-green text-gray-900"
              >
                Next Section
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Quiz;
