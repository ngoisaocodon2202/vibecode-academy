import { Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Chứng chỉ — VibeCode Academy" };

export default function CertificatesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Chứng chỉ của tôi</h1>
      <p className="mt-1 text-text-secondary">Chứng chỉ bạn nhận được sau khi hoàn thành khóa học</p>

      <Card className="mt-6 flex flex-col items-center gap-2 py-16 text-center">
        <Award className="h-8 w-8 text-text-secondary" />
        <p className="text-sm font-medium text-text-primary">Chưa có chứng chỉ nào</p>
        <p className="text-sm text-text-secondary">Hoàn thành một khóa học để nhận chứng chỉ</p>
      </Card>
    </div>
  );
}
