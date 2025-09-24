# SkillForge Hub

![SkillForge Hub Banner](path/to/banner.png) <!-- Replace with actual image path if available -->

## Overview

SkillForge Hub is a next-generation EdTech platform designed to bridge the gap between students and industry. Developed by the Nerd Ninjas team for the Dr. Kalam Young Achiever Award 2025, it unifies career development through personalized learning paths, project collaboration, hackathon participation, internship discovery, and portfolio building. Powered by agentic AI and blockchain technology, it provides verifiable credentials, AI-driven mentorship, mock interviews, and transparent skill tracking to address key challenges like skill identification gaps, untrusted achievements, employability crises, and inequality of opportunities.

The platform targets students, institutions, and recruiters in India's growing EdTech market, projected to reach $33.2 billion by 2033. It aims to enhance employability from 51.25% in 2024 to higher rates through AI tools and reduce certificate fraud by 90% via blockchain.

## Problem Statement

India's youth population (65% under 35) faces significant barriers:
- **Fragmented Learning & Career Resources**: Students struggle to identify essential skills and plan effective paths, leading to confusion and slow growth. Lack of guidance makes it hard to prioritize skills, slowing growth and reducing clarity about career goals and requirements.
- **Lack of Unified Growth Tracking**: Systems ignore extracurriculars, focusing only on academics (78% of schools per ASER Report).
- **Scattered & Untrusted Achievements**: 30% of certificates are unverifiable (NASSCOM), eroding trust.
- **Employability Crisis**: Only 54.81% of graduates are employable (India Skills Report 2025).
- **Skill Identification Gap**: 65% unaware of strengths until late (UNESCO).
- **Inequality of Opportunities**: Rural students 3x less likely to access resources (NCERT).

Without intervention, this could turn India's demographic dividend into a burden.

## Proposed Solution

SkillForge Hub integrates:
- **Personalized Learning**: AI-recommended courses and mentor guidance for faster skill acquisition.
- **AI-Based Career Mentor**: Acts as a productivity planner, evaluator, career chatbot, and mock interviewer with MNC-style simulations.
- **Blockchain-Based Credentials**: Tamper-proof records of skills, achievements, course completions, and peer endorsements. Verification process: Students add certificates, providers verify, stored immutably.
- **Portfolio Generator**: Automated industry-ready profiles.
- **Collaboration & Opportunities**: Hackathons, projects, workshops, and internships.
- **Recruiter Dashboard**: Access to verified candidates for efficient hiring.

### Workflow Overview

The platform simulates recruitment processes:
- **Aptitude Round**: AI-driven adaptive tests with real-time evaluation (accuracy %, time per question, cognitive load), proctoring (tab-switching, idle time, webcam monitoring), and outputs like scorecards (accuracy, speed, cognitive profile). Includes student login, profile verification, and adaptive test generation based on previous attempts, skill level, and difficulty matrix.
- **Coding Round**: AI selects challenges based on skill level and domain; students write code in a sandboxed cloud IDE monitored by AI; automatic judging for correctness, efficiency, quality, and originality; real-time feedback with hints/suggestions; outputs coding report (pass/fail status, complexity score, time efficiency) stored in database and converted to blockchain-verified skill badge.
- **Technical Interview**: Domain-specific question generation based on skill graph; interactive interview via text or voice; AI analyzes and scores answers; technical interview transcript with detailed feedback stored in database.
- **HR & Behavioral Round**: Soft skills assessment.
- **Personalized Learning**: Tailored paths based on assessments.

Blockchain Module:
- Tracks engagement (completion %, quiz scores, mock performance).
- Ensures transparent, holistic growth ledgers.

## Impacts and Benefits

### For Students
- Personalized Learning → Faster Skill Acquisition
- Verifiable Achievements → Better Job Opportunities
- AI Career Mentorship → Guided Growth
- Mock Interviews → Confidence Boost
- Portfolio Generator → Saves Time, Improves Visibility

### For Institutions
- Centralized Skill Tracking → Streamlined Monitoring
- Placement Support → Easier Job Connections
- Enhanced Reputation → Stronger Institutional Prestige

### For Recruiters/Industry
- Access to Verified Candidates → Skill-Verified Talent
- Blockchain Credentials → Trustworthy Profiles
- Efficient Filtering → Time Saved in Screening

AI integration reduces inequality by 50% through cloud-based mentorship and early skill identification (40% earlier).

## Market Opportunity

- **Target Segments**:
  - Students: Employability, skill validation, internships, mock interviews.
  - Colleges/Universities: Placement success, skill analytics, industry connect.
  - Employers/Recruiters: Cost-effective, trustworthy hiring pipelines.
- **Higher Education in India**: 43.3 million students (AISHE 2021-22, latest available; projections for 2025 suggest growth to ~45 million), 1,213 universities (up from 723 in 2014), ~45,000 colleges. Placement & employability critical.
- **EdTech & Skills Market**: India $2.8 billion in 2024, projected to $33.2 billion by 2033 at 28.7% CAGR.
- **Recruitment & HR Tech**: India ~$1.12 billion in 2024, projected to $2.3 billion by 2033 at 7.88% CAGR. Corporates spend on background verification & campus hiring; SkillForge reduces costs with AI-verified records.

## Competitive Advantage

Unlike platforms like Udemy, Coursera, LinkedIn, or GitHub, SkillForge Hub offers an all-in-one ecosystem:
- AI-driven skill assessment and profiling.
- Personalized learning with recommended courses and mentors.
- Participation in collaborative projects & workshops.
- Career preparation via mock interviews and resume reviews.
- Credentialing and skill validation through blockchain.

## Business Model

### Revenue Streams
- Institutional Subscriptions: For tracking and placement support.
- Recruiter Subscriptions: Access to verified candidates.
- Student Premium Add-ons: Resume builder, advanced AI mock interviews, career coaching.
- Event Hosting Fees: Hackathons/internships from companies.
- Projected: Rs. 1.2-2.4L/year per institution.

### Job Creation
- Direct: Developers, AI trainers, support, mentors.
- Indirect: Field agents, campus coordinators, content creators.
- Enables startups by empowering students with verified portfolios.

### Financial Projections (3-Year Estimate)
- Year 1: Pilot in 10 institutions, Rs. 20–30 lakhs.
- Year 2: Scale to 50+ institutions, Rs. 1–1.5 crores.
- Year 3: National reach with 200+ institutions, Rs. 5+ crores.

### Roadmap
- Phase 1 (2025): Pilot with 10 institutions & 5 partners.
- Phase 2 (2026): Expand to 50+ institutions, 100+ recruiters.
- Phase 3 (2027): International features, 500+ institutions.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Flask, Node.js, PHP
- **Database**: MongoDB
- **AI Components**: Gemini API (Q generation, feedback), LangChain (orchestration), CodeT5+ (code evaluation), Whisper (speech-to-text), LangGraph (AI agents), RAG (retrieval-augmented generation).
- **Blockchain**: For credential verification using free testnets.
- **Server**: Apache/Nginx on Ubuntu 22.04


## Installation & Setup

1. Clone the repository:
   ```
   git clone https://github.com/nerd-ninjas/skillforgehub.git
   ```
2. Install dependencies:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && pip install -r requirements.txt` (for Flask); `npm install` (for Node.js)
3. Set up environment variables (e.g., database creds, API keys).
4. Run locally:
   - Frontend: `npm run dev`
   - Backend: `flask run` or `node server.js`
5. Deploy to AWS: Use Docker for containerization.



## Contributors

- A. Sri Hari Prasath
- B. Naveen Bharathi
- J.S. Aaswin
- M. Karunya Sree

Team: Nerd Ninjas
