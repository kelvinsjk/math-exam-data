import Question from "./components/Question.svelte";
import Exam from "./components/Exam.svelte";
import { Qn, Qns } from "./classes/qn.js";
import { StackedQn, StackedQns } from "./classes/stacked.js";
import StackedQuestion from "./components/StackedQuestion.svelte";
import StackedExam from "./components/StackedExam.svelte";
import type { QnObject } from "./classes/types.js";

export { 
  // Svelte Components
  Question, Exam, StackedQuestion, StackedExam,
  // Classes
  Qn, Qns, StackedQn, StackedQns,
  // Types
  type QnObject 
};