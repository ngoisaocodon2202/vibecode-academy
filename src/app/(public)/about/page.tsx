import { GraduationCap, Rocket, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Giới thiệu — VibeCode Academy" };

const VALUES = [
  {
    icon: Rocket,
    title: "Học qua thực hành",
    description: "Mỗi bài học gắn với một sản phẩm thật, không chỉ lý thuyết suông.",
  },
  {
    icon: GraduationCap,
    title: "Lộ trình rõ ràng",
    description: "Từ người mới bắt đầu đến chuyên nghiệp, từng bước có mục tiêu cụ thể.",
  },
  {
    icon: Users,
    title: "Cộng đồng đồng hành",
    description: "Học cùng những người có cùng mục tiêu, hỗ trợ nhau trong suốt hành trình.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">
          VibeCode Academy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          Chúng tôi tin rằng AI đang thay đổi cách con người xây dựng sản phẩm công nghệ.
          VibeCode Academy được tạo ra để giúp bất kỳ ai, dù chưa từng biết code, có thể học cách
          dùng AI để biến ý tưởng thành sản phẩm thật.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {VALUES.map((value) => (
          <Card key={value.title}>
            <value.icon className="h-8 w-8 text-brand-blue" />
            <h3 className="mt-4 text-base font-semibold text-text-primary">{value.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{value.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold text-text-primary">Phương pháp đào tạo</h2>
        <p className="mt-3 text-sm text-text-secondary">
          Chương trình học của VibeCode Academy kết hợp giữa hướng dẫn thực hành, phản hồi nhanh
          từ AI và một lộ trình được thiết kế theo cấp độ, giúp học viên tiến bộ vững chắc từ cơ
          bản đến nâng cao mà không bị choáng ngợp.
        </p>
      </div>
    </div>
  );
}
