export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PROFESSIONAL";

export type MockCourse = {
  slug: string;
  title: string;
  description: string;
  level: CourseLevel;
  category: string;
  durationHours: number;
  lessonCount: number;
  thumbnailGradient: string;
  instructor: { name: string; title: string };
  modules: { title: string; lessons: string[] }[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
};

export const LEVEL_LABELS: Record<CourseLevel, string> = {
  BEGINNER: "Cơ bản",
  INTERMEDIATE: "Trung cấp",
  ADVANCED: "Nâng cao",
  PROFESSIONAL: "Chuyên sâu",
};

export const COURSES: MockCourse[] = [
  {
    slug: "vibe-coding-nhap-mon",
    title: "Vibe Coding Nhập Môn",
    description:
      "Làm quen với tư duy Vibe Coding: dùng AI để biến ý tưởng thành sản phẩm thật chỉ trong vài giờ.",
    level: "BEGINNER",
    category: "Vibe Coding",
    durationHours: 8,
    lessonCount: 24,
    thumbnailGradient: "from-brand-blue to-brand-violet",
    instructor: { name: "Minh Trần", title: "Senior Product Engineer" },
    modules: [
      {
        title: "Tư duy Vibe Coding",
        lessons: ["Vibe Coding là gì", "Khi nào nên dùng AI để code", "Thiết lập môi trường"],
      },
      {
        title: "Công cụ AI cốt lõi",
        lessons: ["Làm việc với Claude Code", "Prompt hiệu quả cho code", "Debug cùng AI"],
      },
    ],
    outcomes: [
      "Hiểu quy trình xây dựng sản phẩm bằng AI",
      "Thành thạo prompt cho coding",
      "Tự tay dựng một ứng dụng web hoàn chỉnh",
    ],
    faqs: [
      { question: "Cần biết code trước không?", answer: "Không cần. Khóa học dành cho người mới bắt đầu." },
      { question: "Học trong bao lâu?", answer: "Khoảng 8 giờ nội dung, học theo tốc độ riêng của bạn." },
    ],
  },
  {
    slug: "xay-dung-saas-voi-ai",
    title: "Xây Dựng SaaS Với AI",
    description:
      "Từ ý tưởng đến sản phẩm SaaS hoàn chỉnh: thiết kế, lập trình, triển khai với sự hỗ trợ của AI.",
    level: "INTERMEDIATE",
    category: "Phát triển sản phẩm",
    durationHours: 16,
    lessonCount: 38,
    thumbnailGradient: "from-brand-violet to-brand-cyan",
    instructor: { name: "Lan Phạm", title: "Founder & Full-stack Engineer" },
    modules: [
      { title: "Kiến trúc sản phẩm", lessons: ["Lên ý tưởng", "Thiết kế database", "Chọn tech stack"] },
      { title: "Triển khai", lessons: ["Deploy lên Vercel", "Kết nối PostgreSQL", "Giám sát ứng dụng"] },
    ],
    outcomes: ["Xây dựng SaaS từ đầu đến cuối", "Thiết kế database thực tế", "Triển khai sản phẩm lên Internet"],
    faqs: [
      { question: "Có cần biết React trước không?", answer: "Nên có kiến thức cơ bản về lập trình web." },
    ],
  },
  {
    slug: "ai-prompt-engineering-chuyen-sau",
    title: "AI Prompt Engineering Chuyên Sâu",
    description:
      "Nắm vững kỹ thuật prompt engineering cho các mô hình AI hàng đầu để tối ưu kết quả công việc.",
    level: "ADVANCED",
    category: "AI & Prompt",
    durationHours: 12,
    lessonCount: 30,
    thumbnailGradient: "from-brand-cyan to-brand-blue",
    instructor: { name: "Huy Nguyễn", title: "AI Research Engineer" },
    modules: [
      { title: "Nền tảng Prompt Engineering", lessons: ["Cấu trúc prompt hiệu quả", "Chain-of-thought"] },
      { title: "Ứng dụng thực tế", lessons: ["Prompt cho coding", "Prompt cho phân tích dữ liệu"] },
    ],
    outcomes: ["Thiết kế prompt chuyên nghiệp", "Tối ưu chi phí và độ chính xác AI"],
    faqs: [{ question: "Khóa học có thực hành không?", answer: "Có, mỗi module đều có bài tập thực hành." }],
  },
  {
    slug: "lo-trinh-full-stack-ai-engineer",
    title: "Lộ Trình Full-stack AI Engineer",
    description:
      "Lộ trình toàn diện để trở thành kỹ sư phần mềm chuyên sâu về AI, từ cơ bản đến cấp độ chuyên nghiệp.",
    level: "PROFESSIONAL",
    category: "Lộ trình nghề nghiệp",
    durationHours: 40,
    lessonCount: 96,
    thumbnailGradient: "from-brand-blue via-brand-violet to-brand-cyan",
    instructor: { name: "Đức Anh Vũ", title: "Head of Engineering" },
    modules: [
      { title: "Nền tảng kỹ thuật", lessons: ["Cấu trúc dữ liệu", "Thiết kế hệ thống"] },
      { title: "Chuyên môn AI", lessons: ["Tích hợp LLM vào sản phẩm", "Đánh giá và giám sát AI"] },
    ],
    outcomes: ["Sẵn sàng cho vị trí Senior AI Engineer", "Danh mục dự án thực tế"],
    faqs: [{ question: "Có chứng chỉ không?", answer: "Có chứng chỉ hoàn thành khi kết thúc lộ trình." }],
  },
];

export function getCourseBySlug(slug: string) {
  return COURSES.find((c) => c.slug === slug) ?? null;
}
