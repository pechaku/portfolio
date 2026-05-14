export type TechStackGroup = {
  category: string;
  items: string[];
};

export type CaseStudySectionKey =
  | "problem"
  | "approach"
  | "techStack"
  | "challenges"
  | "results"
  | "improvements";

export const DEFAULT_CASE_STUDY_SECTION_ORDER: CaseStudySectionKey[] = [
  "problem",
  "approach",
  "techStack",
  "challenges",
  "results",
  "improvements",
];

export const DEFAULT_CASE_STUDY_SECTION_TITLES: Record<CaseStudySectionKey, string> = {
  problem: "Problem / context",
  approach: "Approach",
  techStack: "Tech stack",
  challenges: "Challenges",
  results: "Results",
  improvements: "What I'd improve next",
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  stack: string[];
  tags: string[];
  featured: boolean;
  period: string;
  role: string;
  /** Override default `<h2>` labels for this project. */
  sectionTitles?: Partial<Record<CaseStudySectionKey, string>>;
  /** Defaults to `DEFAULT_CASE_STUDY_SECTION_ORDER`. */
  sectionOrder?: CaseStudySectionKey[];
  /** Omit these keys when rendering (body text can remain in `sections`). */
  hiddenSections?: CaseStudySectionKey[];
  sections: {
    problem: string;
    approach: string;
    techStack: TechStackGroup[];
    challenges: string;
    results: string;
    improvements: string;
  };
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "wireless-mesh-cattle-tracking",
    title: "Wireless mesh cattle tracking",
    outcome: "RFID and mesh telemetry wired into barn, office, and export-alley web apps.",
    summary:
      "RFID-backed pen and export/import flows on a wireless mesh stack. I stay mostly on software: Flask and MongoDB talking to gateways and sensors, with owners and pen staff using focused web surfaces.",
    stack: ["Python", "Flask", "MongoDB", "ESP32"],
    tags: ["IoT", "SaaS", "Analytics"],
    featured: true,
    period: "Jul 2025 to present",
    role: "Software Developer · University of Lethbridge, Neuroscience",
    sectionTitles: {
      problem: "Operators and export alleys",
      approach: "What we built",
      techStack: "Stack",
      challenges: "Field networks vs crisp UX",
      results: "Where it landed",
      improvements: "What I'd push next",
    },
    sectionOrder: ["problem", "approach", "challenges", "results", "techStack", "improvements"],
    sections: {
      problem:
        "Export/import and pen moves do not tolerate guesswork. Staff work in barns, offices, and export alleys; spreadsheets and side-channel notes drift from what RFID and sensors actually say. I cared about keeping those views honest under real feedlot time pressure.",
      approach:
        "Separate surfaces for barn, office, and export-alley work, plus a SaaS-style app so owners can watch and steer cattle activity across sites. I did not treat hardware as a black box: Flask participates in request/response with gateways and sensors so payloads and domain models in Mongo stay aligned. The integration work is the product, not an afterthought.",
      techStack: [
        {
          category: "Software",
          items: ["Python", "Flask", "MongoDB", "RFID / wireless mesh middleware (shared with hardware)"],
        },
        {
          category: "Hardware / edge",
          items: [
            "Raspberry Pi 4",
            "ESP32",
            "Sensors (DS18B20, DHT22, HX711, MLX90640, I²S mic)",
            "Solar-powered edge deployments",
          ],
        },
      ],
      challenges:
        "Mesh links that flicker in the field against UX that wants immediacy. Firmware timing and Flask need to agree so operators never see a calm screen while the yard is chaos. I kept flows blunt and obvious on purpose.",
      results:
        "Location-aware dashboards and SaaS scaffolding owners can run per site, with a clear seam between raw device payloads and the Mongo models the UI reasons about. Proud of how much time we spent on the hardware handshake instead of papering over it.",
      improvements:
        "Deeper observability hop-by-hop on the mesh, tighter automated pen reconciliation when RFID looks noisy, and operator runbooks inside the Flask UI so night-shift staff do not rely on tribal knowledge.",
    },
  },
  {
    slug: "adviser-platform",
    title: "The Adviser Platform (NZ CRM SaaS)",
    outcome: "NZ insurance CRM with pipelines, client files, and in-app digital advice.",
    summary:
      "CRM SaaS aimed at New Zealand advice teams: configurable UI, sales pipelines, multi-service client histories, and an end-to-end digital advice path so users keep an auditable policy trail without tab-hopping.",
    stack: ["C#", ".NET 4.8", "Azure", "EF", "REST"],
    tags: ["SaaS", "Insurance", "Team lead"],
    featured: true,
    period: "Mar 2018 to Feb 2023",
    role: "Project Manager & Developer · Deployed Philippines",
    sectionTitles: {
      problem: "Advisers and auditors",
      approach: "How we shipped",
      techStack: "Stack and platform",
      challenges: "Multitenancy and distance",
      results: "What stayed in market",
      improvements: "Where I'd invest next",
    },
    sections: {
      problem:
        "Advisers were stitching bespoke CRM setups to heavy compliance workflows. Auditors expect complete histories you can hand over without reconstructing the story from invoices and emails. The NZ advice niche needed that record inside one system.",
      approach:
        "I ran distributed sub-teams (back end, front end, QA), translated executive asks into developer-sized work, stayed in client conversations when requirements wobbled, and still shipped fixes and Sev support myself when queues backed up. Deployments and risk sat with me; I preferred early bad news to late surprises.",
      techStack: [
        {
          category: "Backend & data",
          items: ["C# .NET Framework 4.8", "Entity Framework", "SQL Azure Elastic Pool"],
        },
        {
          category: "Cloud",
          items: ["Azure App Services", "Azure Active Directory", "Azure Functions"],
        },
        {
          category: "Practices",
          items: ["Dependency injection", "REST-shaped contracts", "Progress reporting against SLAs"],
        },
      ],
      challenges:
        "Tenant-specific configuration without letting data bleed across insurers. Reviews across time zones. Release trains that could not freeze every time production screamed.",
      results:
        "A CRM tuned for NZ brokers: customised interfaces, pipelines people could act on, and auditable artefacts for advice sessions. Velocity mattered, but correctness for insurers mattered more; we held that line in production support.",
      improvements:
        "Automate provisioning for new insurer tenants so onboarding is repeatable, and expand safe experimentation flags so product owners can trial UI changes behind policy gates without a deploy gamble.",
    },
  },
  {
    slug: "lethpol-etax",
    title: "LethPol-eTax",
    outcome: "Online intake for the Polytechnic Free Tax Clinic with validation-first flows.",
    summary:
      "Student and alumni intake that replaces paper forms and USB sneaker-net: Blazor and Bootstrap on the front, SQL Server in the back, with campus IT in the loop for compliance.",
    stack: ["Blazor", "C#", "SQL Server", "Bootstrap"],
    tags: ["EdTech", "Compliance", ".NET Core"],
    featured: true,
    period: "Sep 2024 to Apr 2025",
    role: "Developer · Lethbridge Polytechnic School of Business",
    sectionTitles: {
      problem: "Paper, USB drives, tax season",
      approach: "Workshops, IT, and Blazor",
      techStack: "Stack",
      challenges: "Semester-shaped delivery",
      results: "What volunteers get",
      improvements: "Still on the wishlist",
    },
    sectionOrder: ["problem", "approach", "challenges", "results", "techStack", "improvements"],
    sections: {
      problem:
        "The clinic lived on handwriting and USB sticks. That meant legibility nightmares, transcription work for student volunteers, and slower turnarounds every season. Real-time validation was the obvious win if IT would host it.",
      approach:
        "Recurring client workshops until requirements stopped shifting under us, Blazor plus Bootstrap prototypes that mirrored those decisions, pairing on UX copy with classmates, and explicit check-ins with institutional IT so hosting and infosec expectations were real, not assumed.",
      techStack: [
        { category: "Frontend", items: ["Blazor", "Bootstrap", "Responsive layouts"] },
        { category: "Backend", items: ["C# .NET Core", "SQL Server", "Validated intake APIs"] },
        { category: "Delivery", items: ["Git/GitHub", "Compliance reviews with campus IT"] },
      ],
      challenges:
        "Mid-semester stakeholders, infosec reviews that could have stalled the build, and peers who had never lived inside Blazor lifecycles. Teaching as you ship is slow, but the alternative was a brittle handoff.",
      results:
        "An app ready to replace analogue capture: richer metadata, fewer illegible fields, and a repeatable yearly run for volunteers. I'd rather own the boring validation rules than watch another season of untyped paper.",
      improvements:
        "Multilingual intake, institutional SSO when the IdP approves it, and export automation toward CRA-ready bundles so staff spend less time assembling packages by hand.",
    },
  },
  {
    slug: "southland-blazor-enterprise",
    title: "Southland Trailers enterprise web suite",
    outcome: "Blazor and SQL features with regression coverage from disciplined TDD habits.",
    summary:
      "Short co-op maintaining production Blazor portals: C#, SQL Server, GitHub, and test-first work next to senior developers when financing rules or trailer SKUs changed.",
    stack: ["C#", ".NET Core", "Blazor", "SQL Server"],
    tags: ["Enterprise", "TDD"],
    featured: false,
    period: "Mar 2025 to May 2025",
    role: "C# Developer (Co-op) · Southland Trailers",
    sectionTitles: {
      problem: "Regression surface",
      approach: "Tests first, mentors second",
      techStack: "Stack",
      challenges: "Huge codebase, short runway",
      results: "What QA saw",
      improvements: "Hardening I'd add",
    },
    sectionOrder: ["problem", "approach", "challenges", "results", "techStack", "improvements"],
    sections: {
      problem:
        "Enterprise portals accrue silent breaks. New trailer SKUs or financing edits land fast; without tests you only hear about it when finance or sales shouts.",
      approach:
        "Built features test-first, pulled seniors in before architectural bets curdled, and kept stored procedures for cases where the org genuinely required them instead of sprinkling SQL magic everywhere.",
      techStack: [
        {
          category: "Stack",
          items: ["C# .NET Core", "Blazor", "SQL Server", "GitHub"],
        },
        {
          category: "Practices",
          items: ["Test-driven collaboration", "Code review rituals", "AI-assisted pair programming"],
        },
      ],
      challenges:
        "Learning the map of legacy modules while the co-op clock ticked. There is no shortcut besides reading code and asking targeted questions.",
      results:
        "More regression paths covered and merges that left QA with predictable surfaces. Small, but real, for a ten-week window.",
      improvements:
        "Contract tests between Blazor WASM modules and downstream services so schema drift fails in CI instead of UAT.",
    },
  },
  {
    slug: "delta-air-lines-kiosk-accessibility",
    title: "Delta Air Lines kiosk accessibility",
    outcome: "ADA peripheral support on kiosks via Windows services and hardened logging.",
    summary:
      "Check-in kiosk work for Delta: ADA-focused flows, Unity shell plus .NET services, SignalR bridges, onsite rollout coordination, and mentoring juniors on device integration.",
    stack: ["C#", ".NET", "SignalR", "Unity", "Windows Services"],
    tags: ["Aviation", "Accessibility", "Onsite"],
    featured: false,
    period: "Sep 2012 to Feb 2018",
    role: "Software Engineer · Pointwest Innovations Corp.",
    sectionTitles: {
      problem: "Kiosks are not touch-only",
      approach: "Peripherals and services",
      techStack: "Stack",
      challenges: "Labs, OEM variance, night windows",
      results: "Audits and quieter crashes",
      improvements: "Telemetry I'd centralise",
    },
    sections: {
      problem:
        "Kiosks had to support earphones, physical switches, refreshable displays, and other assistive-tech peripherals, not only glass multitouch. Touch-only assumptions quietly exclude passengers; the airlines knew it.",
      approach:
        "Extended kiosk clients for accessibility paths, wrote Windows services to multiplex peripherals cleanly, and coordinated onsite validation with airline stakeholders while junior engineers learned SignalR-style bridges between UI and hardware.",
      techStack: [
        {
          category: "Platforms",
          items: ["C# .NET Framework", "Unity kiosk shell", "Windows Services", "Windows Forms"],
        },
        {
          category: "Real-time comms",
          items: ["SignalR", "Device manager bridging web UI to peripherals"],
        },
      ],
      challenges:
        "Different OEM images behaved differently. Lab slots were scarce. Deployments had to ride overnight windows so daytime travellers were not the test bench.",
      results:
        "Flows auditors could run end-to-end with real peripherals, plus logging that cut noisy crashes enough that support stopped paging for ghost failures.",
      improvements:
        "Single telemetry sink for peripheral health dashboards and remote feature flags so OEM builds do not fork configuration by accident.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
