# Portfolio Website

A modern, responsive portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features 3D animations, interactive sections, and a dark/light theme toggle.

## 🚀 Live Demo

[View Live Portfolio](https://attanavaid.com) _(Update this URL after deployment)_

## ✨ Features

- **3D Hero Section** - Interactive 3D logo using Three.js
- **Responsive Design** - Fully responsive across all devices
- **Dark/Light Theme** - System preference detection with manual toggle
- **Smooth Animations** - Powered by Framer Motion
- **Project Showcase** - Detailed project cards with live demos and GitHub links
- **Experience Timeline** - Interactive work and education timeline
- **Skills Section** - Comprehensive tech stack display
- **Contact Form** - Integrated EmailJS contact form
- **SEO Optimized** - Meta tags, Open Graph, structured data, and sitemap
- **Performance** - Optimized images, fonts, and code splitting
- **Analytics** - Vercel Analytics and Speed Insights integration

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **3D Graphics:** Three.js
- **Animations:** Framer Motion
- **Email Service:** EmailJS
- **Analytics:** Vercel Analytics & Speed Insights
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/attanavaid/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Contact Form Setup

The contact form uses EmailJS. To set it up:

1. Sign up at [EmailJS](https://dashboard.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env.local` file

**Note:** If EmailJS is not configured, the form will fall back to opening the default email client.

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL` (your deployment URL)
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Deploy!

### Environment Variables for Production

Make sure to set `NEXT_PUBLIC_SITE_URL` to your production domain in Vercel's environment variables.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── components/        # React components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # UI components
│   ├── fonts/            # Local fonts
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── data/                 # Data files (projects, skills, etc.)
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── lib/                  # Utility functions
```

## 🎨 Customization

### Update Personal Information

- **Projects:** Edit `data/projectsData.ts`
- **Skills:** Edit `data/skillsData.ts`
- **Experience:** Edit `data/workData.ts` and `data/educationData.ts`
- **Languages:** Edit `data/languagesData.ts`
- **Contact Info:** Update contact section components and `app/components/StructuredData.tsx`

### Styling

The project uses Tailwind CSS. Customize colors, fonts, and other styles in:
- `app/globals.css` - Global styles and CSS variables
- Component files - Component-specific styles

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Privacy & Security

- Environment variables are not committed to the repository
- EmailJS uses public keys (safe to expose)
- No sensitive data is stored in the codebase
- All user data is handled securely through EmailJS

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

## 📧 Contact

**Atta Navaid**

- Portfolio: [attanavaid.com](https://attanavaid.com)
- Email: attanavaid@gmail.com
- GitHub: [@attanavaid](https://github.com/attanavaid)
- LinkedIn: [Atta Navaid](https://linkedin.com/in/attanavaid)

---

Built with ❤️ using Next.js and TypeScript
