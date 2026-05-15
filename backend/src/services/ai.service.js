const { GoogleGenAI } =require("@google/genai")

const { z } = require("zod")

const ai = new GoogleGenAI({
    apiKey:
    process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({

    matchScore: z.number(),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum([
                "low",
                "medium",
                "high"
            ])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
})

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
You are a senior HR executive and technical interviewer.

Analyze:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Generate:
- matchScore
- technicalQuestions
- behavioralQuestions
- skillGaps
- preparationPlan

IMPORTANT:

technicalQuestions MUST be:
[
  {
    "question": "...",
    "intention": "...",
    "answer": "..."
  }
]

behavioralQuestions MUST be:
[
  {
    "question": "...",
    "intention": "...",
    "answer": "..."
  }
]

skillGaps MUST be:
[
  {
    "skill": "...",
    "severity": "low"
  }
]

preparationPlan MUST be:
[
  {
    "day": 1,
    "focus": "...",
    "tasks": ["...", "..."]
  }
]

Return ONLY valid JSON.
No markdown.
No explanations.
`

    const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt,

            config: {
                responseMimeType:
                    "application/json"
            }
        })

    const parsed =
        JSON.parse(response.text)

    const validated =
        interviewReportSchema.parse(parsed)

    return validated
}

module.exports =
generateInterviewReport