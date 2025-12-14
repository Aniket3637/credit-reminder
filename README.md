Credit Reminder – BahiKhata + AI Agents
Live app (deployed on Vercel):
https://credit-reminder-shobha.vercel.app​

GitHub repo:
https://github.com/Aniket3637/credit-reminder​

Problem
Small shopkeepers who give goods on credit (udhar/khata) often forget to follow up on pending payments, which delays cash flow and creates awkward conversations with customers.​
Manual reminders via phone or WhatsApp are inconsistent and time‑consuming, especially when there are many customers.​

Solution
Credit Reminder is a BahiKhata‑style web app combined with automation agents:

The UI lets shopkeepers record customers, credits, due dates, and contact details.

A Kestra flow regularly fetches all pending credits from the app’s /api/pending-credits endpoint.​

The flow triggers an n8n workflow, which uses Gmail to send professional payment reminder emails automatically—no manual action required.​

Tech Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS (deployed on Vercel).​

Orchestration: Kestra for scheduled flows and HTTP tasks.​

Automation: n8n for webhook handling and Gmail email sending.​

Email: Gmail OAuth2 integration inside n8n for sending reminder emails.​

Architecture
Shopkeeper manages customers and credits in the Credit Reminder web app.

A Kestra flow runs on a schedule and calls the /api/pending-credits endpoint to get all due payments.​

Kestra posts this data to an n8n webhook.

n8n parses each customer and uses a Gmail node to send personalized reminder emails (name, amount, items, due date).​

This creates an end‑to‑end automated reminder agent that keeps following up on dues in the background.

How to Run Locally
Clone the repo:

bash
git clone https://github.com/Aniket3637/credit-reminder.git
cd bahikhata
Install dependencies:

bash
npm install
Start the dev server:

bash
npm run dev
Open http://localhost:3000 in your browser.

(For the hackathon demo, Kestra and n8n are already configured and running separately.)

Demo Flow for Judges
Open the deployed app on Vercel:
https://credit-reminder-shobha.vercel.app and show customers with pending credits.​

In Kestra, run the bahikhata_pending_credits_to_n8n flow and show a successful execution (get_pending_credits and send_to_n8n green).​

In n8n, open the latest execution where the Webhook and Send a message (Gmail) nodes are green and show the email payload.​

Open the inbox of the configured email account and show the received payment reminder email with correct customer name, amount, items, and due date.​

Future Improvements
Add WhatsApp and SMS channels using the same pipeline for higher reach.​

Add more advanced scheduling and escalation rules (multiple reminders, overdue escalation).​

Add authentication and multi‑shop support so different merchants can use the same system safely.

