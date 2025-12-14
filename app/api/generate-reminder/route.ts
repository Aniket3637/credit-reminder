import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { customerName, amount, items, dueDate, overdueDays } = body;

    // Validate required fields
    if (!customerName || !amount || !items || !dueDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not configured");
      return NextResponse.json(
        { 
          error: "API key not configured",
          message: `Dear ${customerName},\n\nThis is a gentle reminder that your payment of ₹${amount.toLocaleString()} for "${items}" is overdue by ${overdueDays} days.\n\nDue Date: ${dueDate}\n\nRequest you to please clear this amount at the earliest.\n\nThank you!`
        },
        { status: 200 }
      );
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Generate reminder message using Groq AI
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates polite and professional payment reminder messages for a credit ledger system in India. Keep messages concise, respectful, and culturally appropriate.",
        },
        {
          role: "user",
          content: `Generate a polite WhatsApp payment reminder message for:
Customer Name: ${customerName}
Amount: ₹${amount}
Items: ${items}
Due Date: ${dueDate}
Overdue by: ${overdueDays} days

The message should be:
- Polite and respectful
- Brief (under 200 words)
- Include all payment details
- Encourage prompt payment
- End with a thank you`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    const message = completion.choices[0]?.message?.content;

    if (!message) {
      throw new Error("No message generated from AI");
    }

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error("Error generating reminder:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Return fallback message even on error
    const body = await request.json().catch(() => ({}));
    
    return NextResponse.json(
      { 
        error: "Failed to generate AI reminder",
        details: errorMessage,
        message: `Dear ${body.customerName || "Customer"},\n\nThis is a gentle reminder that your payment of ₹${body.amount?.toLocaleString() || "0"} for "${body.items || "items"}" is overdue by ${body.overdueDays || "0"} days.\n\nDue Date: ${body.dueDate || "N/A"}\n\nRequest you to please clear this amount at the earliest.\n\nThank you!`
      },
      { status: 200 }
    );
  }
}
