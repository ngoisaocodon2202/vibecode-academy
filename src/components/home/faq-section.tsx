import { Accordion } from "@/components/ui/accordion";
import { AnimateIn } from "@/components/ui/animate-in";

const FAQS = [
  {
    question: "Tôi hoàn toàn chưa biết code, có học được không?",
    answer: "Hoàn toàn được. Lộ trình Beginner được thiết kế cho người chưa có kiến thức lập trình.",
  },
  {
    question: "Tôi cần công cụ gì để bắt đầu học?",
    answer: "Chỉ cần một máy tính có kết nối Internet. Các công cụ AI sẽ được hướng dẫn cài đặt trong khóa học.",
  },
  {
    question: "Có hỗ trợ sau khi hoàn thành khóa học không?",
    answer: "Có cộng đồng học viên để trao đổi và nhận hỗ trợ sau khi hoàn thành khóa học.",
  },
  {
    question: "Khóa học có cấp chứng chỉ không?",
    answer: "Một số lộ trình nâng cao có cấp chứng chỉ hoàn thành khóa học.",
  },
];

export function FaqSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Câu hỏi thường gặp
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <Accordion items={FAQS} />
        </AnimateIn>
      </div>
    </section>
  );
}
