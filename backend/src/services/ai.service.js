const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_key,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidates profile is ",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "the technical question that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe(
            "the intention of interviewer behind asking this question ",
          ),
        answer: z
          .string()
          .describe(
            "how to answer these questions,what points to cover ,what approach you should use",
          ),
      }),
    )
    .describe(
      "tehcnical question that can be asked in interview their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "the behavioral question that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe(
            "the intention of interviewer behind asking this question ",
          ),
        answer: z
          .string()
          .describe(
            "how to answer these questions,what points to cover ,what approach you should use",
          ),
      }),
    )
    .describe(
      "behavioral question that can be asked in interview their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skills: z.string().describe("skills that the candidate is lacking "),
        severity: z.enum[("low", "medium", "high")].describe(
          "the severity of this skill i.e low,medium,high",
        ),
      }),
    )
    .describe(
      "list of skillgap of the candidate like which skill is he lacking and severity of those skills",
    ),
  preprationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "the day number in the prepration plan starting from day 1",
          ),
        focous: z
          .string()
          .describe("the main focus of this day in the prepration plan"),
        tasks: z
          .array(z.string())
          .describe("list of tasks to be done on this day"),
      }),
    )
    .describe("A day-wise prepration plan to follow"),
});

async function generateInterviewReport({
  resume,
  selfdescribe,
  jobdescribe,
}) {
  const prompt = `genereate an interview report for candidatewith the following details:
resume:${resume},
selfdescribe:${selfdescribe},
jobdescribe:${jobdescribe}

`;

  const response = await ai.models.generateContent({
    model: gemini - 2.5 - flash,
    contents: prompt ,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },

  });

  console.log(JSON.parse(response.text))
}

module.exports=generateInterviewReport
