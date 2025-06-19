import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // make sure this env variable is defined

export async function POST(req: Request) {
  try {
    const { resumes, keywords } = await req.json();

    const prompt = `
You are an AI resume screener. Sort the following resumes based on how well they match the following skills: ${keywords.join(', ')}.
Return only a JSON array of the sorted resumes, no explanation, no headings, no text — just valid JSON.

Here is the input JSON:
${JSON.stringify(resumes, null, 2)}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    // ✅ Safely extract the response text
    const responseText = (await result.response.text()).trim();

    // ✅ Clean markdown code fences if Gemini wrapped response in ```json
    const cleaned = responseText
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    let sorted;
    try {
      sorted = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ JSON parse error. Raw output:", cleaned);
      return NextResponse.json({ error: "Invalid JSON from AI" }, { status: 500 });
    }

    if (!Array.isArray(sorted)) {
      return NextResponse.json({ error: "AI response is not an array" }, { status: 500 });
    }

    return NextResponse.json({ sorted });
  } catch (err) {
    console.error("❌ Gemini sorting failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
