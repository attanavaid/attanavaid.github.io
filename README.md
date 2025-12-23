This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## EmailJS Setup (Contact Form)

The contact form uses EmailJS to send emails. To set it up:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Create a new **Service** (or use existing):
   - Go to **Email Services** → **Add New Service**
   - Choose your email provider (Gmail, Outlook, etc.)
   - This gives you a **Service ID**
3. Create a new **Email Template**:
   - Go to **Email Templates** → **Create New Template**
   - Use these template variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Message content
   - Set **To Email** to: `attanavaid@gmail.com`
   - This gives you a **Template ID**
4. Get your **Public Key**:
   - Go to **Account** → **General** → **API Keys**
   - Copy your **Public Key**
5. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
6. Restart your development server after adding the environment variables

**Note:** If EmailJS is not configured, the form will fall back to opening your default email client.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important:** When deploying, add the same environment variables in your Vercel project settings:
- Go to your project → **Settings** → **Environment Variables**
- Add all three `NEXT_PUBLIC_EMAILJS_*` variables

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
