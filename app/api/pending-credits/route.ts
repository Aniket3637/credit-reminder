import { NextResponse } from "next/server";

export async function GET() {
  // For demo: hardcoded overdue credits
  const pendingCredits = [
    {
      customerName: "Ramesh Kumar",
      phone: "91XXXXXXXXXX",
      email: "23053637@kiit.ac.in",
      amount: 2500,
      items: "Monthly groceries",
      dueDate: "2024-04-15",
    },
    {
      customerName: "Priya Sharma",
      phone: "91YYYYYYYYYY",
      email: "aniketkushawaha84@gmail.com",
      amount: 1800,
      items: "Salon services",
      dueDate: "2024-04-10",
    },
  ];

  return NextResponse.json(pendingCredits);
}
