"use client";
import { Chapter, Question } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuizCardsProps {
  chapter: Chapter & {
    questions: Question[];
  };
}

export const QuizCards: FC<QuizCardsProps> = ({ chapter }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionState, setQuestionState] = useState<
    Record<string, boolean | null>
  >({});

  const checkAnswer = useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (!userAnswer) return;
      newQuestionState[question.id] = userAnswer === question.answer;
      setQuestionState(newQuestionState);
    });
  }, [answers, questionState, chapter.questions]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Concept Check</h1>
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <div
              key={question.id}
              className={cn("rounded-lg border border-secondary p-3", {
                "bg-green-700": questionState[question.id] === true,
                "bg-red-700": questionState[question.id] === false,
                "bg-secondary": questionState[question.id] === null,
              })}
            >
              <h1 className="text-lg font-semibold">{question.question}</h1>
              <div className="mt-2">
                <RadioGroup
                  onValueChange={(e: string) => {
                    setAnswers((prev) => {
                      return {
                        ...prev,
                        [question.id]: e,
                      };
                    });
                  }}
                >
                  {options.map((option, index) => {
                    return (
                      <div className="flex space-x-2" key={index}>
                        <RadioGroupItem
                          value={option}
                          id={question.id + index.toString()}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={question.id + index.toString()}
                          className="leading-relaxed"
                        >
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>

      <Button className="w-full" size="lg" onClick={checkAnswer}>
        Check Answer
        <ChevronRight />
      </Button>
    </div>
  );
};
