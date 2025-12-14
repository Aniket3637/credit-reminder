export function generateFallbackReminder({
  name,
  amount,
  items,
  dueDate,
  daysOverdue,
}: {
  name: string;
  amount: number;
  items: string;
  dueDate: string;
  daysOverdue: number;
}): string {
  const overdueText = daysOverdue > 0
    ? `Your payment is ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue.`
    : `Payment is due on ${dueDate}.`;

  return `🙏 Namaste ${name} ji,

This is a friendly reminder about your pending payment of ₹${amount.toLocaleString('en-IN')} for "${items}".

📅 Due Date: ${dueDate}
${overdueText}

Request you to kindly clear this amount at your earliest convenience. Your cooperation is highly appreciated! 🙏

Thank you for your business!

Regards,
Your Local Shop`;
}
